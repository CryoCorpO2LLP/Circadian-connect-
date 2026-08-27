import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SeoExpertiseGlossary from './SeoExpertiseGlossary';
import Footer from './Footer';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import {
  Check, FileText, ArrowUpRight, ChevronRight,
  ShieldAlert, Users, Award, BookOpen,
  Sparkles, GraduationCap, Briefcase,
  MapPin, Mail, Phone, Globe, Shield, Star, Zap, Target,
  BarChart3, X, Menu, Quote
} from 'lucide-react';

const NAVY = '#4c1d95';

const ScrollReveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    scale: { y: 0, x: 0, scale: 0.92 },
  };
  const d = directionMap[direction] || directionMap.up;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: d.y, x: d.x, scale: d.scale ?? 1 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Button = ({ className = '', variant = 'primary', size = 'md', ...props }) => {
  const base = 'group inline-flex items-center justify-center font-bold tracking-wide focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer rounded-full transition-all duration-500 hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-sm hover:shadow-xl overflow-hidden relative z-10';
  const sizes = {
    sm: 'text-xs px-5 py-2.5',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
    xl: 'text-lg px-10 py-5',
  };
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-[#2b084c] text-white shadow-primary/30 border border-white/10 hover:shadow-primary/40',
    teal: 'bg-gradient-to-r from-accent to-amber-500 text-white shadow-accent/30 border border-white/20 hover:shadow-accent/40',
    navy: 'bg-gradient-to-r from-[#22073d] to-[#110121] text-white shadow-purple-950/30 border border-white/10 hover:shadow-purple-950/40',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent hover:shadow-primary/20',
    'outline-white': 'bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-primary backdrop-blur-sm hover:shadow-white/20',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`} {...props}>
      <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      {props.children}
    </button>
  );
};

const Eyebrow = ({ children }) => (
  <div className="eyebrow-animated inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/15 to-primary/10 border border-accent/30 mb-5 shadow-sm">
    <span className="w-2 h-2 rounded-full bg-accent inline-block shrink-0 animate-pulse"></span>
    <span className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-accent">{children}</span>
    <span className="w-2 h-2 rounded-full bg-primary/40 inline-block shrink-0"></span>
  </div>
);

const GoogleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Card = ({ className = '', children, ...props }) => (
  <div className={`bento-card ${className}`} {...props}>{children}</div>
);

const MethodologyPipeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Grounded Field Inquiry",
      tag: "Phase 01",
      icon: <Users className="h-6 w-6" />,
      desc: "We begin at the grassroots level. Rigorous social science methodologies are used to engage directly with local communities, ensuring the research captures the nuances of language, identity, and socioeconomic diversity.",
      bullets: [
        "Participatory community engagement",
        "Qualitative user trust mapping",
        "Multilingual ethnographic inquiries"
      ],
      metric: "17+ Years",
      metricLabel: "Fieldwork experience"
    },
    {
      title: "Socio-Technical Bias Auditing",
      tag: "Phase 02",
      icon: <ShieldAlert className="h-6 w-6" />,
      desc: "Collaborating with global AI leaders, we benchmark Large Language Models (LLMs) to identify systemic biases, cultural stereotypes, and equity gaps, particularly in the Global South and multilingual settings.",
      bullets: [
        "Stereo Harm benchmark design",
        "Multilingual prompt evaluation",
        "Algorithmic auditing & mitigation"
      ],
      metric: "25K+ Samples",
      metricLabel: "Co-designed with Google"
    },
    {
      title: "Impact Mapping & Evaluation",
      tag: "Phase 03",
      icon: <Target className="h-6 w-6" />,
      desc: "We construct custom Monitoring, Evaluation, and Learning (MEL) systems and Theory of Change frameworks that map out the social, legal, and operational risks of AI integration.",
      bullets: [
        "Socio-technical risk matrices",
        "Custom MEL indicators",
        "Human-centric impact assessments"
      ],
      metric: "100%",
      metricLabel: "Commitment to Equity"
    },
    {
      title: "Governance & Safe Scaling",
      tag: "Phase 04",
      icon: <Globe className="h-6 w-6" />,
      desc: "We deliver concrete evidence, governance policy briefs, and integration scorecards (like the RAIR Scorecard) to help organizations scale their solutions while complying with international regulations.",
      bullets: [
        "Compliance check & advisory",
        "Policy brief documentation",
        "Continuous audit verification"
      ],
      metric: "Global",
      metricLabel: "Research Footprint"
    }
  ];

  return (
    <div className="py-24 px-6 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Tech background dots */}
      <div className="absolute inset-0 pointer-events-none opacity-45" style={{ backgroundImage: 'radial-gradient(rgba(107,33,168,0.06) 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />
      
      <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24 relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Eyebrow>OUR RIGOROUS APPROACH</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">Socio-Technical Research Pipeline</h2>
          <p className="text-muted text-lg font-medium">How we bridge the gap between scientific methodology, societal needs, and artificial intelligence.</p>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-1 w-12 rounded-full bg-primary/20"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
            <div className="h-1 w-12 rounded-full bg-primary/20"></div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Tab selection buttons */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-4 text-left p-5 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                  activeStep === idx
                    ? 'bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-md'
                    : 'bg-white/80 border-slate-100 hover:bg-slate-50/55 hover:border-slate-200'
                }`}
              >
                {/* Left Border Indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all duration-300 ${
                  activeStep === idx ? 'bg-primary' : 'bg-transparent group-hover:bg-slate-200'
                }`} />
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  activeStep === idx ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:text-primary group-hover:bg-slate-200'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <span className={`text-[10px] font-black tracking-widest uppercase block ${
                    activeStep === idx ? 'text-accent' : 'text-slate-400'
                  }`}>
                    {step.tag}
                  </span>
                  <span className={`text-base font-bold transition-colors ${
                    activeStep === idx ? 'text-primary font-extrabold' : 'text-slate-600 group-hover:text-primary'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Details Panel */}
          <div className="lg:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50/60 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-stretch h-full justify-between"
              >
                {/* Text Description */}
                <div className="flex-1 flex flex-col gap-6 justify-center">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/25 px-3 py-1.5 rounded-lg inline-block">
                      {steps[activeStep].tag} • Process Stage
                    </span>
                    <h3 className="text-3xl font-display font-bold text-primary leading-tight">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                  <p className="text-base text-slate-600 leading-relaxed font-medium">
                    {steps[activeStep].desc}
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    {steps[activeStep].bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-sm font-semibold text-slate-600">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Separator */}
                <div className="hidden md:block w-px bg-slate-200/60 my-2"></div>

                {/* Visual Stats Showcase */}
                <div className="md:w-1/3 shrink-0 flex flex-col justify-center items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mx-auto shadow-lg">
                      {steps[activeStep].icon}
                    </div>
                    <div className="pt-4">
                      <div className="text-3xl font-display font-black text-primary tracking-tight">
                        {steps[activeStep].metric}
                      </div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1.5 max-w-[150px] mx-auto leading-tight">
                        {steps[activeStep].metricLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};


  const offerClusters = [
    {
      theme: "Module 1",
      title: "Responsible AI Evaluation Modules",
      description: "Frame these as concrete work packages, not abstract ethics.",
      items: [
        {
          name: "Dataset and model bias assessments for India",
          desc: "We audit datasets and model behaviour for socio‑cultural and linguistic bias in multilingual Indian contexts, and translate findings into practical mitigation options for your teams.",
          output: "Assessment report + workshop"
        },
        {
          name: "Responsible AI risk and impact mapping",
          desc: "We identify fairness, explainability, safety, and governance risks across the AI lifecycle, and co‑design risk registers and mitigation plans aligned with EU AI Act–style expectations, adapted to India and Global South deployments.",
          output: "Risk register + governance roadmap"
        },
        {
          name: "Human‑centred evaluation of AI products",
          desc: "We run mixed‑methods evaluations of AI‑driven tools in health, education, governance and climate projects, examining user behaviour, trust, and unintended consequences in the field.",
          output: "Evaluation report + field insights"
        }
      ]
    },
    {
      theme: "Module 2",
      title: "Socio-technical Evaluation and MEL Services",
      description: "Use language that MEL firms and evaluators recognise, then layer in your 'responsible AI' edge.",
      items: [
        {
          name: "Theory of Change and evaluation design with AI layer",
          desc: "We design ToC‑driven evaluation and MEL frameworks for digital and AI‑enabled programmes, integrating institutional analysis (e.g. Ostrom’s IAD), gender and inclusion, and responsible AI considerations.",
          output: "ToC + MEL Framework"
        },
        {
          name: "Governance and institutional diagnostics for digital projects",
          desc: "We map actors, incentives and institutional rules to understand how AI and data projects interact with public systems, frontline workers and communities in India.",
          output: "Diagnostic report + stakeholder map"
        },
        {
          name: "Embedded MEL modules in international projects",
          desc: "We plug into existing international projects as the local evaluation and learning partner, conducting fieldwork, participatory workshops and synthesis for reports and consortia.",
          output: "Fieldwork synthesis + consortium reporting"
        }
      ]
    },
    {
      theme: "Module 3",
      title: "Training, Facilitation and Capacity Building",
      description: "Global agencies and local partners often have budget lines for capacity building and participatory processes.",
      items: [
        {
          name: "Responsible AI and socio‑technical evaluation workshops",
          desc: "We design and deliver short courses and workshops on responsible AI and socio‑technical evaluation for programme teams, evaluators and researchers, tailored to India and Global South contexts.",
          output: "Tailored workshop + training materials"
        },
        {
          name: "Participatory systems and governance design labs",
          desc: "We facilitate Dialogue‑Matters‑style multi‑stakeholder processes to co‑design governance reforms, digital strategies and evaluation frameworks with frontline workers and communities.",
          output: "Co-design lab + strategy document"
        },
        {
          name: "Evaluation and MEL training for AI‑enabled programmes",
          desc: "We train MEL and programme staff to integrate AI‑specific questions, indicators and ethical checks into existing logframes and evaluation plans.",
          output: "Training sessions + updated logframes"
        }
      ]
    },
    {
      theme: "Module 4",
      title: "Partnership Formats for Global and Regional Clients",
      description: "Explicit entry routes for how we work together.",
      items: [
        {
          name: "Named expert in proposals",
          desc: "We join your project as a named expert (individual CV) providing a clearly defined responsible AI and socio‑technical evaluation module for India.",
          output: "Named expert + defined module"
        },
        {
          name: "Specialist work package or subcontract",
          desc: "We design and deliver a self‑contained work package (e.g. 'Socio‑technical evaluation of AI pilots in India') under your proposal or contract.",
          output: "Self-contained work package"
        },
        {
          name: "Joint research and publications",
          desc: "We co‑develop concept notes, case studies and papers on responsible AI and socio‑technical governance, building a pipeline from research to deployment and evaluation in India.",
          output: "Co-developed research + publications pipeline"
        }
      ],
      whoWeWorkWith: "Who we work with: Applied research institutes (Fraunhofer-type), AI governance research groups (HIIG-type), evaluation consultancies, and development implementers working in India."
    }
  ];

  const indiaUseCases = [
    {
      theme: "Nutrition Governance",
      title: "Child Nutrition Governance",
      image: "/nutrition_india_v2.png",
      link: "https://tally.so/r/3ERZrN",
      description: "We are specialists in Policy analysis, Advocacy, and Evaluation services on programmes on Early Childhood Care and Nutrition. We consult on government policies and programs related to child nutrition. It includes data collection and analysis to evaluate the effectiveness of child nutrition initiatives. Report writing and policy recommendations. Dr. Jaya Goyal has published several research papers on the Governance of Public Health and Child Nutrition programmes in India, including latest book funded by ICSSR and published by Motilal Banarsidas Publishers, titled, 'Public Service Delivery: Does Accountability and Institutions Matter?'. She has co-authored a TISS Report on working of ICDS programme under the 11th Five Year Plan for the Andaman and Nicobar Islands, funded by the erstwhile Planning Commission of India.",
      projects: [
        "Book Release 2024: Goyal, Jaya. Public Service Delivery: Does Accountability and Local Institutions Matter? A Comparative Perspective of Child Nutrition Programmes in India.",
        "Journal Article: Goyal, Jaya (2018). Andaman Nicobar Islands Recovery: Food and Nutrition Schemes. Issue No. 175. Southasiadisasters.net.",
        "International Journal Article: Goyal, Jaya & Madhushree Sekher. (2015). Accountability, Nutrition and Local Institutions in India.",
        "Book Chapter: Goyal, Jaya. 2015. Role of State in Public Private Partnerships in Reproductive and Child Health Services.",
        "International Journal Article: Goyal, Jaya. (2014). Centrally sponsored schemes in Andaman and Nicobar Islands: a governance paradox.",
        "Indian Journal Article: Jaswal, Surinder & Goyal, Jaya. (2011). Public Sector Health Scheme for the Poor: Maharashtra's Jeevandayee Arogya Yojana.",
        "Indian Journal Article: Datta, Vrinda & Goyal, Jaya. (2011). Reaching the Unreached: The Integrated Child Development Scheme in Maharashtra."
      ]
    },
    {
      theme: "International Higher Education",
      title: "International Higher Education Partnerships",
      image: "/education_india_v2.png",
      link: "https://tally.so/r/3ERZrN",
      description: "Higher Education is at the forefront of achieving impactful solutions at the interface of science and society. Our Higher Education solutions offer strategy development for international academic collaborations, and research on partnership evaluation using IAD framework methodology. Circadian Connect LLP is committed to bridging the gap between scientific innovation and social impact. We are dedicated to providing tailored guidance to help institutions achieve international academic partnerships that add value to their institution.",
      projects: [
        "Partnership design and development: A paper presented, 'Can unequal partners succeed with matched efforts? Lessons from UK-India partnerships in Higher Education.' at BAICE, University of Edinburgh, Scotland UK (2022).",
        "Strategy development: A paper presented, 'Are matched efforts viable in North-South partnerships? Learnings from UK-India Higher Education Initiative (UKIERI)' at CESA 11th Biennial conference at Hiroshima (2023).",
        "Analysis of OBC Reservation Policy, an evidence-based report by TISS and funded by NASI (National Academy of Sciences, India), published in EPW."
      ]
    },
    {
      theme: "Environment Social Governance",
      title: "ESG (Environment Social Governance)",
      image: "/esg_india_v2.png",
      link: "https://tally.so/r/3ERZrN",
      description: "Our track in Governance has included: Improving delivery of public programmes by analyzing their governance structures; Performance and Impact evaluations; Advisory on Public-private Partnerships; Risk Assessment and mitigation strategies. One of the innovative and experimental governance reforms project that the founder has experience in is the Outcome Budget & Social Audits, with the Government of Maharashtra. Outcome Budgets were perceived as report cards of the government and hence politically risky. Social Audits were institutionalized by the CAG in 2011, demonstrating the impact of such policy work.",
      projects: [
        "Outcome Budget with 32 government schemes across 11 departments published as a special issue of TISS's in-house journal the Indian Journal of Social Work (IJSW).",
        "Report on Narmada Sardar Sarovar Dam presents the longest litigation case from India's independence, from a scientific and humanitarian lens.",
        "The Urban Age Project by LSE Cities and TISS Mumbai compared the tracks of development of many cities of the world on various development parameters."
      ]
    }
  ];

          

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathToTab = {
    '/': 'home',
    '/home': 'home',
    '/usecases': 'usecases',
    '/research_work': 'research_work',
    '/about': 'about',
    '/book': 'book',
    '/faq': 'faq',
    '/rair_scorecard': 'rair_scorecard',
    '/usecases_india': 'usecases_india',
    '/privacy-policy': 'privacy_policy',
    '/terms-of-use': 'terms_of_use',
    '/#home': 'home',
    '/#usecases': 'usecases',
    '/#research_work': 'research_work',
    '/#about': 'about',
    '/#book': 'book',
    '/#faq': 'faq',
    '/#rair_scorecard': 'rair_scorecard',
    '/#usecases_india': 'usecases_india'
  };

  const tabToPath = {
    'home': '/',
    'usecases': '/usecases',
    'research_work': '/research_work',
    'about': '/about',
    'book': '/book',
    'faq': '/faq',
    'rair_scorecard': '/rair_scorecard',
    'usecases_india': '/usecases_india',
    'privacy_policy': '/privacy-policy',
    'terms_of_use': '/terms-of-use'
  };

  const currentPath = location.pathname === '/' && location.hash ? `/${location.hash}` : location.pathname;
  const activeTab = pathToTab[currentPath] || 'home';

  const setActiveTab = (tabId) => {
    navigate(tabToPath[tabId] || '/');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);
  const [activeTeamFilter, setActiveTeamFilter] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    fullName: '',
    contactNo: '',
    emailId: '',
    companyName: '',
    designation: '',
    noOfEmployees: '',
    sector: ''
  });
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");
  const [currentQuizStep, setCurrentQuizStep] = useState(0);

  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSendingCode(true);
    try {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(generatedCode);

      const SERVICE_ID = "service_wv8jitp";
      const TEMPLATE_ID = "template_4jg9o8x";
      const PUBLIC_KEY = "6nkhGG4edfcNpLRZo";

      const templateParams = {
        to_email: leadFormData.emailId,
        to_name: leadFormData.fullName,
        verification_code: generatedCode
      };

      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
          publicKey: PUBLIC_KEY,
        });
      } catch (err) {
        console.error("EmailJS error:", err);
        alert("EmailJS is not configured correctly. Please check console.");
      }

      setShowLeadForm(false);
      setShowVerification(true);
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("Failed to send verification code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (userEnteredCode !== verificationCode) {
      alert("Incorrect verification code. Please try again.");
      return;
    }
    
    setIsSubmittingLead(true);
    try {
      const score = Object.values(quizAnswers).reduce((a, b) => a + b, 0);
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtN07evvImEsuU4QBzQV0EGcA_f8eA4bvaoalU1H3q-vjYwB4jB6iV4T05TLj7DrWeHQ/exec";
      
      if (GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) {
        await new Promise(r => setTimeout(r, 1000));
        console.warn("Google Script URL is a placeholder. Form submitted locally only.");
      } else {
        const formData = new FormData();
        Object.entries(leadFormData).forEach(([key, value]) => formData.append(key, value));
        
        for (let i = 1; i <= 14; i++) {
          formData.append(`q${i}`, quizAnswers[i] || '');
        }
        formData.append('q15', openEndedAnswer || '');
        formData.append('quizScore', score);
        
        const urlEncodedData = new URLSearchParams(formData).toString();
        
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlEncodedData,
          mode: 'no-cors'
        });
      }
      
      setShowVerification(false);
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead form:", error);
      setShowVerification(false);
      setQuizSubmitted(true);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleQuizChange = (qNum, points) => {
    setQuizAnswers(prev => ({ ...prev, [qNum]: points }));
  };

  const calculateScore = () => {
    return Object.values(quizAnswers).reduce((a, b) => a + b, 0);
  };
  
  const getScoreMessage = (score) => {
    if (score >= 47) return { title: "RESPONSIBLE AI LEADER", desc: "You demonstrate mature, embedded responsible AI practice. Consider sharing your approach as a model for other organisations in your sector.", color: "text-[#0d9488]", bg: "bg-[#0d9488]/10", border: "" };
    if (score >= 36) return { title: "BUILDING PRACTICE", desc: "Your organisation is on the right track. Focus on formalising processes, closing documentation gaps, and deepening community involvement.", color: "text-primary", bg: "bg-primary/10", border: "" };
    if (score >= 23) return { title: "DEVELOPING AWARENESS", desc: "You have some awareness but lack systems. Gaps in governance, data, and accountability need structured attention before they become crises.", color: "text-accent", bg: "bg-accent/10", border: "" };
    return { title: "CRITICAL RISK ZONE", desc: "Your project has significant responsible AI gaps that expose your organisation to reputational, legal, and ethical harm. Immediate action is needed.", color: "text-red-600", bg: "bg-red-50", border: "border-red-600" };
  };



  const researchPublications = [
    { type: "Book Release 2024", title: "Goyal, Jaya. Public Service Delivery: Does Accountability and Local Institutions Matter? A Comparative Perspective of Child Nutrition Programmes in India", desc: "supported by Publication Grant from ICSSR (Indian Council for Social Science Research), Govt of India.", link: "https://www.academia.edu/19937286/Accountability_Nutrition_and_Local_Institutions_in_India", category: "Nutrition Governance", image: "/nutrition_india.png" },
    { type: "Journal Article", title: "Goyal, Jaya (2018). Andaman Nicobar Islands Recovery: Food and Nutrition Schemes.", desc: "Understanding Recovery in Andaman and Nicobar Islands. Issue No. 175. Southasiadisasters.net. October 2018.", link: "https://reliefweb.int/report/india/understanding-recovery-andaman-and-nicobar-islands-southasiadisastersnet-issue-no-175-0", category: "Nutrition Governance", image: "/india_nutrition.png" },
    { type: "International Journal Article", title: "Goyal, Jaya & Madhushree Sekher. (2015). Accountability, Nutrition and Local Institutions in India.", desc: "Development. Rethinking Democracy, Society for International Development, 58(1), United Kingdom: Palgrave McMillan.", link: "https://www.academia.edu/19937286/Accountability_Nutrition_and_Local_Institutions_in_India", category: "Nutrition Governance", image: "/nutrition_india_v3.png" },
    { type: "Book Chapter", title: "Goyal, Jaya. 2015. Role of State in Public Private Partnerships in Reproductive and Child Health Services", desc: "in B V Sharma (Ed.), Medical Anthropology, New Delhi: Concept Publishers.", link: "https://tally.so/r/3ERZrN", category: "Nutrition Governance", image: "/healthcare_partnerships_1780997153775.png" },
    { type: "International Journal Article", title: "Goyal, Jaya. (2014). Centrally sponsored schemes in Andaman and Nicobar Islands: a governance paradox.", desc: "International Journal of Sociology and Social Policy, 34(3/4), 196–213.", link: "https://www.academia.edu/7298212/Centrally_sponsored_schemes_in_Andaman_and_Nicobar_Islands_a_governance_paradox", category: "Nutrition Governance", image: "/nutrition_india_v4.png" },
    { type: "Indian Journal Article", title: "Jaswal, Surinder & Goyal, Jaya. (2011). Public Sector Health Scheme for the Poor: Maharashtra's Jeevandayee Arogya Yojana.", desc: "The Indian Journal of Social Work. 72 (4), 617-634.", link: "https://www.academia.edu/6415520/Public_Sector_Health_Scheme_for_the_Poor_Maharashtras_Jeevandayi_Arogya_Yojana", category: "Nutrition Governance", image: "/nutrition_india_v5.png" },
    { type: "Indian Journal Article", title: "Datta, Vrinda & Goyal, Jaya. (2011). Reaching the Unreached: The Integrated Child Development Scheme in Maharashtra.", desc: "The Indian Journal of Social Work. 72 (4), 589-604.", link: "https://www.academia.edu/6415481/Reaching_the_Unreached_The_Integrated_Child_Development_Services_in_Maharashtra", category: "Nutrition Governance", image: "/child_nutrition_policy_1780997057177.png" },
    { type: "Paper Presented", title: "Can unequal partners succeed with ‘matched efforts’? Lessons from UK-India partnerships in Higher Education.", desc: "Co-authored by Jaya Goyal and Shrikant Wad, presented by Jaya Goyal at BAICE (British Association for International Comparative Education) at the University of Edinburgh, Scotland UK, representing Circadian Connect LLP, on 13th September 2022.", link: "https://tally.so/r/3ERZrN", category: "Higher Education", image: "/education_india_v3.png" },
    { type: "Strategy Development Paper", title: "Are matched efforts viable in North-South partnerships? Learnings from UK-India Higher Education Initiative (UKIERI)", desc: "Co-authored by Shrikant Wad and Jaya Goyal to be presented by Jaya Goyal at CESA (Comparative Education Society of Asia) 11th Biennial conference at Hiroshima in November 24-26, 2023.", link: "https://tally.so/r/3ERZrN", category: "Higher Education", image: "/education_india.png" },
    { type: "Journal Article", title: "Goyal, Jaya & Singh, D.P. (2014). Academic Performance of OBC Students in Universities.", desc: "Economic and Political Weekly, 49(5), 55–62.", link: "https://www.epw.in/journal/2014/5/special-articles/academic-performance-obc-students-universities.html", category: "Higher Education", image: "/india_education.png" },
    { type: "Evidence-Based Report", title: "Analysis of Reservation Policy for Higher Education in India", desc: "TISS Report for NASI (2008).", link: "https://tally.so/r/3ERZrN", category: "Higher Education", image: "/hero_indian_professionals.png" },
    { type: "Innovative Governance Reform", title: "Social Audits in Outcome Budgeting: An experiment of accountability in Maharashtra", desc: "Governance reforms project with the Government of Maharashtra.", link: "https://www.academia.edu/6415346/Social_Audits_in_Outcome_Budgeting_An_experiment_of_accountability_in_Maharashtra", category: "ESG", image: "/serve_evaluation_1781695112218.png" },
    { type: "Journal Article", title: "Outcome Budget Special Issue (IJSW)", desc: "Outcome Budget with 32 government schemes across 11 departments published as a special issue of TISS’s in-house journal - the Indian Journal of Social Work (IJSW).", link: "https://ijsw.tiss.edu/greenstone/collect/ijsw/index/assoc/HASH016a/d3150157.dir/doc.pdf", category: "ESG", image: "/esg_india.png" },
    { type: "Journal Article", title: "Goyal, Jaya (2018). Andaman Nicobar Islands Recovery: Food and Nutrition Schemes.", desc: "Understanding Recovery in Andaman and Nicobar Islands. Issue No. 175. Southasiadisasters.net.", link: "https://reliefweb.int/report/india/understanding-recovery-andaman-and-nicobar-islands-southasiadisastersnet-issue-no-175-0", category: "ESG", image: "/nutrition_india_v2.png" },
    { type: "Report", title: "Report on Narmada Sardar Sarovar Dam", desc: "Presents the longest litigation case from India’s independence, from a scientific and humanitarian lens. A report by TISS Mumbai was released in Bhopal.", link: "http://surl.li/lwywu", category: "ESG", image: "/narmada_dam_esg_1780997095791.png" },
    { type: "Research Paper", title: "Skybus vs Metro: Mumbai Deserves the Best", desc: "Urban development research analyzing transit solutions for Mumbai. Published by Observer Research Foundation.", link: "https://www.orfonline.org/research/skybus-vs-metro-mumbai-deserves-the-best/", category: "ESG", image: "/urban_age_cities_1780997112920.png" },
    { type: "Research Paper", title: "Mumbai Vision 2015: Agenda for Urban Renewal", desc: "Research agenda focusing on the urban renewal and trajectory of Mumbai's development. Published by Observer Research Foundation.", link: "https://www.orfonline.org/research/mumbai-vision-2015-agenda-for-urban-renewal/", category: "ESG", image: "/serve_consultancy_1781695087497.png" },
    { type: "Case Study", title: "Goyal, Jaya. (2021). Science Diplomacy & Gender: A Case Study of the British Council.", desc: "Science Diplomacy: A New Chapter in IISF 2020. January-March 2021. 4(3). 9-12.", link: "https://niscpr.res.in/includes/images/sciencediplomacy/Science-Diplomacy-January-March-2021.pdf", category: "Women in Science", image: "/academic_footprint.png" },
    { type: "Paper Presented", title: "Goyal, Jaya 2021. The expanding scope of careers for Women in STEM. Science Diplomacy and Gender", desc: "A paper presented virtually at India International Science Festival on December 24, 2020 organised by Department of Science and Technology and CSIR Govt of India.", link: "https://www.britishcouncil.in/blog/expanding-scope-careers-women-stem", category: "Women in Science", image: "/women_in_stem_leadership_1780997130040.png" },
    { type: "Newspaper Article", title: "Goyal, Jaya, 2017. Ponder Over Potbelly.", desc: "The Asian Age. August 8.", link: "https://tally.so/r/3ERZrN", category: "Women in Science", image: "/environment_ai_indian.png" },
    { type: "Quoted Article", title: "Gender Discourse by Mumbai Mix Team", desc: "May 10, 2017 The Afternoon Dispatch and Courier", link: "https://tally.so/r/3ERZrN", category: "Women in Science", image: "/women_science_india.png" },
    { type: "Quoted Article", title: "Why do women quit working? by Vibha Singh", desc: "April 8, 2017 Free Press Journal Mumbai Edition", link: "https://www.freepressjournal.in/featured-blog/why-do-women-quit-working", category: "Women in Science", image: "/fieldwork_research_new.png" },
    { type: "Quoted Article", title: "Are you Ready to be a Mom? By Vibha Singh", desc: "March 4, 2017 Free Press Journal Mumbai Edition", link: "https://tally.so/r/3ERZrN", category: "Women in Science", image: "/serve_startup_1781695125139.png" },
    { type: "Book Chapter", title: "Role of State in Public Private Partnerships in Reproductive & Child Health Services", desc: "A study funded by Observer Research Foundation in 2007, Goyal, Jaya. 2011.", link: "https://tally.so/r/3ERZrN", category: "Women in Science", image: "/serve_agency_1781695144848.png" },
    { type: "Newspaper Article", title: "Goyal, Jaya. 2006. Sex Education in Schools (Sex Sense)", desc: "Mumbai Mirror. February 16.", link: "https://www.academia.edu/6415414/Sex_Education_in_Schools", category: "Women in Science", image: "/serve_research_1781695063452.png" }
  ];




  const navItems = [
    { id: 'home',          label: 'Home' },
    { id: 'usecases',      label: 'Responsible AI' },
    { id: 'research_work', label: 'Governance' },
    { id: 'about',         label: 'About Us' },
    { id: 'book',          label: 'Book a Meeting' },
    { id: 'faq',           label: 'FAQ' },
    { id: 'contact',       label: 'Contact Us', href: 'https://tally.so/r/3ERZrN' }
  ];

  const currentSeo = {
    'home': { title: 'Circadian Connect - Empowering Communities Through Responsible AI', description: 'Bridging technical advancement with social responsibility.' },
    'usecases': { title: 'Use Cases & Projects | Circadian Connect', description: 'Explore our responsible AI use cases and projects.' },
    'research_work': { title: 'Research & Publications | Circadian Connect', description: 'Our research on AI governance, ethics, and policy.' },
    'about': { title: 'About Us | Circadian Connect', description: 'Learn more about our founder and collaborators.' },
    'book': { title: 'Book | Circadian Connect', description: 'Insights and literature from Circadian Connect.' },
    'faq': { title: 'FAQ | Circadian Connect', description: 'Frequently asked questions about our work.' },
    'privacy_policy': { title: 'Privacy Policy | Circadian Connect', description: 'Read the Circadian Connect Privacy Policy to understand how we collect, use, protect and manage personal information.' },
    'terms_of_use': { title: 'Terms of Use | Circadian Connect', description: 'Read the Circadian Connect Terms of Use governing access to and use of the Circadian Connect website.' }
  }[activeTab] || { title: 'Circadian Connect', description: 'Responsible AI & Governance' };

  return (
    <div className="min-h-screen bg-surface font-sans text-foreground selection:bg-accent/20 selection:text-primary flex flex-col relative w-full overflow-x-hidden">
      <Helmet>
        <title>{currentSeo.title}</title>
        <meta name="description" content={currentSeo.description} />
        <link rel="canonical" href={`https://circadianconnect.com${location.pathname === '/' && location.hash ? `/${location.hash.replace('#', '')}` : location.pathname}`} />
        <meta property="og:title" content={currentSeo.title} />
        <meta property="og:description" content={currentSeo.description} />
        <meta property="og:image" content="https://circadianconnect.com/hero_ai_india.png" />
        <meta property="og:url" content={`https://circadianconnect.com${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
      </Helmet>
      <div className="mesh-bg"></div>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-7xl glass-nav rounded-full px-4 md:px-6 transition-all duration-300">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <img src="/circadian_logo.png" alt="Circadian Connect Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-primary text-xl leading-none tracking-tight">Circadian</span>
              <span className="font-display font-bold text-accent text-sm leading-none tracking-wide">Connect</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-amber-500 text-white text-[0.7rem] font-black uppercase tracking-wide shadow-md shadow-accent/30 hover:shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.id}
                  to={tabToPath[item.id] || '/home'}
                  className={`nav-link-hover text-[0.7rem] font-bold uppercase tracking-normal whitespace-nowrap transition-colors duration-200 ${
                    activeTab === item.id ? 'text-accent active' : 'text-muted hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <button className="lg:hidden p-2 text-muted" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map(item => {
                  if (item.href) {
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-4 rounded-xl bg-purple-50 text-purple-900 font-bold text-sm tracking-wide shadow-sm"
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 ml-auto" />
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={item.id}
                      to={tabToPath[item.id] || '/home'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-wide p-4 rounded-xl transition-all flex items-center justify-between ${
                        activeTab === item.id 
                          ? 'bg-accent/10 text-accent shadow-inner' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                      <ChevronRight className={`h-4 w-4 ${activeTab === item.id ? 'text-accent' : 'text-slate-300'}`} />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Floating Book a Meeting CTA ── */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
        <a
          href="https://calendar.app.google/6BW693F9VsVsR8fV8"
          target="_blank"
          rel="noopener noreferrer"
          className="float-cta-btn group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-accent to-amber-500 text-white text-sm font-black shadow-2xl shadow-accent/40 hover:-translate-y-1 hover:shadow-accent/60 transition-all duration-300 border border-white/20"
          aria-label="Book a Meeting"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
          Book a Meeting
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          



          {activeTab === 'rair_scorecard' && (() => {
            const quizQuestions = [
              { q: `Q1. How would you describe your organisation's current understanding of "responsible AI"?`, opts: [
                { p: 1, text: `a) We have not discussed it yet — our focus is on functionality and delivery.` },
                { p: 2, text: `b) We treat it as a compliance checkbox; we follow whatever regulations apply.` },
                { p: 3, text: `c) We discuss it informally but have no structured approach or AI frameworks.` },
                { p: 4, text: `d) We have a documented responsible AI framework guiding our project decisions.` }
              ]},
              { q: `Q2. When your project deploys AI or a data-driven digital tool, who is responsible for ensuring it does not cause harm to end users or communities?`, opts: [
                { p: 1, text: `a) The technology vendor or platform provider — it's their product.` },
                { p: 2, text: `b) No one has formally been assigned this responsibility.` },
                { p: 3, text: `c) Our project manager or team lead handles it on a case-by-case basis.` },
                { p: 4, text: `d) A designated responsible AI lead or ethics review process is in place.` }
              ]},
              { q: `Q3. Has your organisation reviewed whether the AI tools you are using were trained on data representative of the communities you serve (e.g. multilingual, Global South, gender-diverse data)?`, opts: [
                { p: 1, text: `a) No — we assumed the tool works well enough for our context.` },
                { p: 2, text: `b) We raised the question but received no satisfactory answer from the provider.` },
                { p: 3, text: `c) We reviewed it partially but have no documented findings.` },
                { p: 4, text: `d) Yes — we conducted a bias audit and have mitigation measures in place.` }
              ]},
              { q: `Q4. How does your project currently handle personal or sensitive data collected from field communities, beneficiaries, or research participants?`, opts: [
                { p: 1, text: `a) We collect data as needed; data governance has not been a priority.` },
                { p: 2, text: `b) We rely on GDPR or national regulations but have not checked if they apply to AI-specific risks.` },
                { p: 3, text: `c) We have a data management plan but it does not yet address AI processing risks.` },
                { p: 4, text: `d) We have a robust data governance protocol covering consent, anonymisation, and AI-specific data risks.` }
              ]},
              { q: `Q5. Are the communities or end users your AI tools affect able to understand, question, or appeal decisions made by those tools?`, opts: [
                { p: 1, text: `a) No — the system operates as a black box; users have no recourse.` },
                { p: 2, text: `b) Users can contact us with complaints, but there is no structured process.` },
                { p: 3, text: `c) We have a grievance mechanism, but it is not specifically designed for AI-related harms.` },
                { p: 4, text: `d) We have an explainability and appeals mechanism built into our AI deployment process.` }
              ]},
              { q: `Q6. Has your organisation mapped how AI or digital tools interact with existing institutional rules, power dynamics, or frontline worker practices in the communities where they are deployed?`, opts: [
                { p: 1, text: `a) No — we focus on the technical deployment and assume adoption will follow.` },
                { p: 2, text: `b) We did a stakeholder analysis but did not specifically examine institutional or power dynamics.` },
                { p: 3, text: `c) We conducted a socio-technical review informally during pilot phase.` },
                { p: 4, text: `d) Yes — we used a structured institutional analysis (e.g. actor mapping, IAD framework) to guide deployment.` }
              ]},
              { q: `Q7. Does your organisation's Theory of Change (ToC) or monitoring, evaluation, and learning (MEL) framework specifically account for risks and unintended consequences of AI tools?`, opts: [
                { p: 1, text: `a) We do not have a ToC or MEL framework.` },
                { p: 2, text: `b) Our ToC exists but does not mention AI risks or digital tool failures.` },
                { p: 3, text: `c) Our MEL framework monitors outputs and outcomes, but AI-specific risks are not flagged.` },
                { p: 4, text: `d) Our ToC and MEL framework explicitly address AI risks, including fairness, safety, and unintended consequences.` }
              ]},
              { q: `Q8. When selecting an AI vendor or digital platform for your project, how does your organisation assess compliance with responsible AI standards (e.g. EU AI Act, OECD AI Principles)?`, opts: [
                { p: 1, text: `a) We select based on cost, ease of use, and donor preference only.` },
                { p: 2, text: `b) We are aware of standards but do not formally check vendor compliance.` },
                { p: 3, text: `c) We ask vendors informally but have no procurement checklist for responsible AI.` },
                { p: 4, text: `d) We have a responsible AI procurement checklist and require vendors to demonstrate compliance.` }
              ]},
              { q: `Q9. Does your organisation have a process for identifying and managing the risk of your AI project reinforcing gender, caste, ethnicity, or socioeconomic biases among the populations you serve?`, opts: [
                { p: 1, text: `a) We have not considered this — the tool is designed to be neutral.` },
                { p: 2, text: `b) We are aware this could be an issue but have not taken specific action.` },
                { p: 3, text: `c) We have raised it in team discussions but have no formal bias-assessment process.` },
                { p: 4, text: `d) We have a formal inclusion and bias review embedded in our AI deployment lifecycle.` }
              ]},
              { q: `Q10. How prepared is your organisation to meet EU AI Act requirements if your project receives EU funding or operates in the European regulatory environment?`, opts: [
                { p: 1, text: `a) We are unaware of the EU AI Act and its relevance to our work.` },
                { p: 2, text: `b) We know it exists but have not assessed how it applies to our project.` },
                { p: 3, text: `c) We have a basic understanding and are in the process of mapping requirements.` },
                { p: 4, text: `d) We have conducted a full EU AI Act risk classification and are actively working toward compliance.` }
              ]},
              { q: `Q11. How does your organisation currently build staff capacity to understand and manage AI-related risks in digital projects?`, opts: [
                { p: 1, text: `a) We do not invest in this — we assume staff will learn as they go.` },
                { p: 2, text: `b) We share articles or news informally but have no structured training.` },
                { p: 3, text: `c) We attended one-off webinars or conferences on AI and ethics.` },
                { p: 4, text: `d) We have a formal and ongoing responsible AI training programme for our team.` }
              ]},
              { q: `Q12. When your digital or AI project produces unexpected or harmful outcomes in the field, what is your organisation's typical response?`, opts: [
                { p: 1, text: `a) We wait to see if the problem resolves itself or gets reported by the implementing team.` },
                { p: 2, text: `b) We address it reactively when it comes to our attention, without a documented process.` },
                { p: 3, text: `c) We have an incident reporting system but it is not specifically designed for AI-related harms.` },
                { p: 4, text: `d) We have a proactive AI harm monitoring system with defined protocols for response and learning.` }
              ]},
              { q: `Q13. Does your organisation meaningfully involve affected communities in the design, testing, and evaluation of AI tools used in their contexts?`, opts: [
                { p: 1, text: `a) No — communities are the end beneficiaries but not design participants.` },
                { p: 2, text: `b) We consult communities after decisions are made to validate the approach.` },
                { p: 3, text: `c) We involve community representatives at key stages but not systematically.` },
                { p: 4, text: `d) We have participatory co-design processes with community members embedded throughout the AI lifecycle.` }
              ]},
              { q: `Q14. How confident is your organisation that your AI project, if scrutinised by your funder (BMZ, DFG, EU), a journalist, or a community rights group, would demonstrate responsible and ethical practice?`, opts: [
                { p: 1, text: `a) Not at all confident — we would struggle to justify our current practices.` },
                { p: 2, text: `b) Slightly confident — we have good intentions but lack documented evidence.` },
                { p: 3, text: `c) Moderately confident — we have some documentation but significant gaps remain.` },
                { p: 4, text: `d) Very confident — we have documentation, processes, and evidence to substantiate responsible AI practice at every stage.` }
              ]}
            ];

            const handleNext = () => {
              if (currentQuizStep < quizQuestions.length) {
                if (currentQuizStep < 14 && !quizAnswers[currentQuizStep + 1]) return; // require answer
                setCurrentQuizStep(prev => prev + 1);
              } else {
                setShowLeadForm(true);
              }
            };

            const handlePrev = () => {
              if (currentQuizStep > 0) setCurrentQuizStep(prev => prev - 1);
            };

            const totalScore = calculateScore();
            const percentage = Math.round((totalScore / 56) * 100);

            return (
            <motion.div
              key="rair_scorecard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pt-32 pb-10 min-h-[90vh] bg-surface"
            >
              <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-6">
                <div className="text-center space-y-3 mb-6">
                  <Eyebrow>Diagnostic</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase">Responsible AI Integration Readiness (RAIR) Scorecard</h2>
                  <p className="text-accent text-xl font-bold">How AI-Ready Is Your Digital Project?</p>
                </div>
                
                <Card className="p-6 md:p-8 relative overflow-hidden">
                  {showVerification ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                      <div className="text-center space-y-3">
                        <h3 className="text-3xl font-display font-bold text-primary">Verify Your Email</h3>
                        <p className="text-slate-500">We've sent a 6-digit verification code to <span className="font-bold text-primary">{leadFormData.emailId}</span>.</p>
                      </div>
                      <form onSubmit={handleVerifyCode} className="space-y-4 max-w-sm mx-auto">
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-primary text-center block">Enter Code</label>
                          <input 
                            required 
                            type="text" 
                            className="w-full text-center tracking-widest text-2xl rounded-xl border-2 border-slate-200 p-3 focus:outline-none focus:border-accent" 
                            value={userEnteredCode} 
                            onChange={e => setUserEnteredCode(e.target.value)}
                            maxLength={6}
                          />
                        </div>
                        <div className="pt-4">
                          <Button type="submit" variant="teal" className="w-full" disabled={isSubmittingLead}>
                            {isSubmittingLead ? "Verifying..." : "Verify & View Score"}
                          </Button>
                        </div>
                        <div className="text-center mt-4">
                          <button type="button" onClick={() => {setShowVerification(false); setShowLeadForm(true);}} className="text-sm text-muted hover:text-primary transition-colors underline">Back to details</button>
                        </div>
                      </form>
                    </motion.div>
                  ) : showLeadForm ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                      <div className="text-center space-y-3">
                        <h3 className="text-3xl font-display font-bold text-primary">Almost There!</h3>
                        <p className="text-slate-500">Please provide your details to view your Responsible AI Diagnostic Score.</p>
                      </div>
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-primary">Full Name *</label>
                            <input required type="text" className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.fullName} onChange={e => setLeadFormData({...leadFormData, fullName: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-primary">Contact No *</label>
                            <input required type="tel" className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.contactNo} onChange={e => setLeadFormData({...leadFormData, contactNo: e.target.value})} />
                          </div>
                          <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-bold text-primary">Email ID *</label>
                            <input required type="email" className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.emailId} onChange={e => setLeadFormData({...leadFormData, emailId: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-primary">Company Name *</label>
                            <input required type="text" className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.companyName} onChange={e => setLeadFormData({...leadFormData, companyName: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-primary">Designation *</label>
                            <input required type="text" className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.designation} onChange={e => setLeadFormData({...leadFormData, designation: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-primary">No of Employees</label>
                            <select className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.noOfEmployees} onChange={e => setLeadFormData({...leadFormData, noOfEmployees: e.target.value})}>
                              <option value="">Select...</option>
                              <option value="1-10">1-10</option>
                              <option value="11-50">11-50</option>
                              <option value="51-200">51-200</option>
                              <option value="201-500">201-500</option>
                              <option value="500+">500+</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-primary">Sector *</label>
                            <input required type="text" className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm focus:outline-none focus:border-accent" value={leadFormData.sector} onChange={e => setLeadFormData({...leadFormData, sector: e.target.value})} />
                          </div>
                        </div>
                        <div className="pt-4">
                          <Button type="submit" variant="teal" className="w-full" disabled={isSendingCode}>
                            {isSendingCode ? "Sending Code..." : "Send Verification Code"}
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  ) : !quizSubmitted ? (
                    <div className="space-y-6">
                      {/* Intro paragraph */}
                      {currentQuizStep === 0 && (
                        <div className="bg-orange-50 border-l-4 border-accent p-5 rounded-r-xl">
                          <p className="text-sm text-slate-700 italic leading-relaxed m-0">
                            This 15-question diagnostic helps your organisation understand where you stand on responsible AI integration — and what risks you face if gaps remain unaddressed. Answer honestly. There are no wrong answers, only blind spots.
                          </p>
                        </div>
                      )}
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                        <motion.div 
                          className="h-full bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuizStep) / (quizQuestions.length + 1)) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Step {currentQuizStep + 1} of {quizQuestions.length + 1}</p>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentQuizStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="min-h-[220px]"
                        >
                          {currentQuizStep < quizQuestions.length ? (
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-5 leading-relaxed">
                                {quizQuestions[currentQuizStep].q}
                              </h3>
                              <div className="space-y-3">
                                {quizQuestions[currentQuizStep].opts.map((opt, oIdx) => {
                                  const isSelected = quizAnswers[currentQuizStep + 1] === opt.p;
                                  return (
                                    <label key={oIdx} className={`group relative flex items-start gap-4 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${isSelected ? 'bg-orange-50 border-accent shadow-md shadow-accent/10 transform -translate-y-0.5' : 'border-slate-200 hover:border-accent/40 hover:bg-slate-50'}`}>
                                      {isSelected && <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-accent"></div>}
                                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-accent bg-accent/10' : 'border-slate-300 group-hover:border-accent/50'}`}>
                                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>}
                                      </div>
                                      <input type="radio" name={`q${currentQuizStep+1}`} value={opt.p} onChange={() => handleQuizChange(currentQuizStep+1, opt.p)} checked={isSelected} className="sr-only" />
                                      <span className={`text-sm leading-relaxed ${isSelected ? 'text-accent font-bold' : 'text-slate-700 font-medium'}`}>{opt.text}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-4 leading-relaxed">
                                Q15 (OPEN ENDED). Reflecting on your answers, describe in your own words:
                              </h3>
                              <p className="text-sm text-slate-500 mb-6">What is the single biggest responsible AI gap in your current digital project, and what would it mean for your organisation, your funders, and the communities you serve if that gap were left unaddressed?</p>
                              <textarea 
                                rows="6" 
                                className="w-full rounded-xl border-2 border-slate-200 p-5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all "
                                placeholder="Type your reflection here..."
                                value={openEndedAnswer}
                                onChange={(e) => setOpenEndedAnswer(e.target.value)}
                              ></textarea>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-5">
                        <Button variant="outline" onClick={handlePrev} disabled={currentQuizStep === 0}>
                          Previous
                        </Button>
                        <Button 
                          variant="teal" 
                          onClick={handleNext} 
                          disabled={currentQuizStep < 14 && !quizAnswers[currentQuizStep + 1]}
                        >
                          {currentQuizStep === quizQuestions.length ? "See My Results" : "Next Question"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-10"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-3xl font-display font-bold text-primary">Your Diagnostic Report</h3>
                        <p className="text-slate-500">Based on your 15-point assessment</p>
                      </div>

                      {/* Animated Gauge Result */}
                      <div className={`p-10 rounded-3xl border-2 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden ${getScoreMessage(totalScore).border} ${getScoreMessage(totalScore).bg}`}>
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-current to-transparent pointer-events-none"></div>
                        <div className="relative">
                          {/* Circular progress equivalent (CSS representation) */}
                          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/30" />
                            <motion.circle 
                              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                              className={getScoreMessage(totalScore).color}
                              initial={{ strokeDasharray: "0, 300" }}
                              animate={{ strokeDasharray: `${(percentage / 100) * 283}, 300` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-5xl font-black ${getScoreMessage(totalScore).color}`}>{percentage}%</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Score</span>
                          </div>
                        </div>

                        <div className="space-y-3 z-10">
                          <h3 className={`text-xl font-bold ${getScoreMessage(totalScore).color}`}>{getScoreMessage(totalScore).title}</h3>
                          <p className="text-lg text-slate-700 font-medium max-w-xl mx-auto">{getScoreMessage(totalScore).desc}</p>
                          <p className="text-sm font-bold text-slate-500 mt-2">Raw Score: {totalScore} / 56 points</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 border border-slate-200">
                          <h4 className="font-bold text-primary flex items-center gap-2 mb-3"><FileText className="w-5 h-5 text-accent" /> Your Reflection</h4>
                          <div className="p-4 rounded-xl bg-surface border border-purple-100/60 italic text-slate-600 text-sm shadow-inner">
                            "{openEndedAnswer || 'No specific gap was documented.'}"
                          </div>
                        </Card>
                        <Card className="p-6 border border-slate-200">
                          <h4 className="font-bold text-primary flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-accent" /> Next Steps</h4>
                          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                            Regardless of your score, Responsible AI is a continuous journey. We can help you close these gaps, build robust frameworks, and confidently navigate the intersection of science, society, and AI.
                          </p>
                          <div className="flex flex-col gap-3">
                            <Button onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank')} variant="navy" className="w-full">Schedule a Strategy Session</Button>
                            <Button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setOpenEndedAnswer(""); setCurrentQuizStep(0); }} variant="outline" className="w-full">Retake Assessment</Button>
                          </div>
                        </Card>
                      </div>

                    </motion.div>
                  )}
                </Card>
                </div>
            </motion.div>
            );
          })()}
          
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex-1 w-full"
            >
              <div className="w-full text-foreground">
                {/* Hero Section */}
                <div className="relative w-full min-h-[90vh] flex items-center bg-transparent overflow-hidden pt-28 lg:pt-32 pb-10">
                  {/* Huge Cryocorp Style Glow Orbs */}
                  <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

                  {/* Symmetrical Tech Dots & Grid Background Pattern */}
                  <div className="absolute inset-0 tech-dots opacity-40 pointer-events-none z-0" />
                  <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none z-0" />
                  
                  <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24 py-20 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
                      {/* Left: Typography */}
                      <div className="space-y-6">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Eyebrow>Research Solutions Provider</Eyebrow>
                        </motion.div>
                        
                        <motion.h1 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="display-bold text-5xl md:text-6xl lg:text-7xl"
                        >
                          Bridging <span className="font-serif italic text-accent font-normal">Science,</span> <br />Society & AI
                        </motion.h1>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="prose-body text-lg md:text-xl max-w-xl"
                        >
                          Curating design and methodology at the interface of science, society, and AI. We empower sustainable, inclusive solutions for a better tomorrow.
                        </motion.p>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6"
                        >
                          <Button className="w-full sm:w-auto group" variant="navy" size="xl" onClick={() => setActiveTab('usecases')}>
                            Explore Our Projects <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </Button>
                          <Button className="w-full sm:w-auto group" variant="outline" size="xl" onClick={() => setActiveTab('about')}>
                            Discover Who We Are <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </motion.div>

                        {/* ── Reference-style Feature Chips Strip ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.55 }}
                          className="pt-8 flex flex-wrap gap-2.5"
                        >
                          {[
                            { label: 'Responsible AI', icon: <ShieldAlert className="h-3.5 w-3.5" /> },
                            { label: 'Bias Audits', icon: <Target className="h-3.5 w-3.5" /> },
                            { label: 'MEL Frameworks', icon: <BarChart3 className="h-3.5 w-3.5" /> },
                            { label: 'Global Reach', icon: <Globe className="h-3.5 w-3.5" /> },
                            { label: 'Google AI Partner', icon: <Sparkles className="h-3.5 w-3.5" /> },
                          ].map((chip, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.7rem] font-bold tracking-wide border bg-white/80 backdrop-blur-sm shadow-sm transition-transform hover:-translate-y-0.5"
                              style={{
                                borderColor: i % 2 === 0 ? 'rgba(107,33,168,0.25)' : 'rgba(217,119,6,0.25)',
                                color: i % 2 === 0 ? 'hsl(270 80% 30%)' : 'hsl(32 95% 44%)'
                              }}
                            >
                              {chip.icon}{chip.label}
                            </span>
                          ))}
                        </motion.div>
                      </div>

                      {/* Right: Clean Image Frame with Circular Accent Vectors */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col gap-6 mt-12 lg:mt-0 relative"
                      >
                        {/* Rotating dashed ring backdrop */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-2 border-dashed border-accent/20 animate-rotate-dashed pointer-events-none hidden md:block" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full border border-dashed border-primary/20 animate-rotate-dashed pointer-events-none hidden md:block" style={{ animationDirection: 'reverse' }} />
                        
                        {/* Glow halo behind image container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl rounded-[2.5rem] pointer-events-none" />

                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 aspect-[4/3] img-hover-zoom offset-dashed-frame">
                           <img src="/hero_indian_professionals.png" alt="Indian Professionals" className="w-full h-full object-cover relative z-10" />
                           <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-40 mix-blend-multiply z-10" />
                        </div>
                        <div className="card-clean p-5 md:p-6 flex items-center gap-4 md:gap-5 glass-panel rounded-3xl shadow-xl border border-white/60 w-full z-20 transition-all hover:scale-[1.01] duration-300">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg shrink-0">
                            <ShieldAlert className="h-6 w-6 md:h-7 md:w-7 text-white" />
                          </div>
                          <div>
                            <p className="font-display font-bold text-base md:text-lg text-primary leading-tight">Pioneering AI Equity</p>
                            <p className="text-xs md:text-sm text-muted font-semibold mt-1">Co-designing global standards for responsible algorithms with tech pioneers</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* RAIR Quiz Section */}
                <div className="py-24 relative bg-white border-t border-slate-100 overflow-hidden">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
                  
                  {/* Grid background line pattern */}
                  <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />

                  <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
                      {/* Alternating layout: Image on the Left on desktop, Text on the Right */}
                      <ScrollReveal delay={0.2} direction="right" className="lg:order-first order-last relative">
                        {/* Rotating ring backdrop for quiz */}
                        <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full border border-dashed border-accent/20 animate-rotate-dashed pointer-events-none hidden md:block" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border-2 border-dashed border-primary/20 animate-rotate-dashed pointer-events-none hidden md:block" style={{ animationDirection: 'reverse' }} />
                        
                        <div className="relative mt-12 lg:mt-0 offset-dashed-frame-purple">
                          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 aspect-square img-hover-zoom z-10">
                             <img src="/rair_readiness.png" alt="Responsible AI Integration Readiness Scorecard" className="w-full h-full object-contain" />
                             <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-40 mix-blend-multiply" />
                          </div>
                          {/* Button below RAIR image */}
                          <div className="mt-5 flex justify-center">
                            <Button variant="teal" size="xl" onClick={() => setActiveTab('rair_scorecard')} className="group">
                              Take the RAIR Quiz <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Button>
                          </div>
                        </div>
                      </ScrollReveal>

                      <div className="space-y-6 lg:order-last order-first relative z-10">
                        <ScrollReveal delay={0}>
                          <Eyebrow>Self-Assessment</Eyebrow>
                          {/* Quick-read metric badges */}
                          <div className="flex flex-wrap gap-2 mt-3 mb-1">
                            {[
                              { label: '14 Questions', icon: '📋' },
                              { label: '~10 Mins', icon: '⏱️' },
                              { label: 'Free Assessment', icon: '✅' },
                            ].map((badge) => (
                              <span key={badge.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-bold uppercase tracking-wide bg-primary/8 text-primary border border-primary/15 shadow-sm">
                                <span>{badge.icon}</span>{badge.label}
                              </span>
                            ))}
                          </div>
                          <h2 className="display-bold text-4xl md:text-5xl text-primary mt-4">
                            Evaluate Your Responsible AI Integration Readiness (RAIR)
                          </h2>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.1}>
                          <p className="prose-body text-lg max-w-xl text-slate-600 font-medium">
                            In an era of rapid AI adoption, checking a compliance box is no longer enough. The <strong>Responsible AI Integration Readiness (RAIR)</strong> scorecard empowers organisations to measure their socio-technical maturity across key dimensions—from data equity to community impact.
                          </p>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.2}>
                          <div className="space-y-4">
                            {[
                              { title: 'Governance & Accountability:', desc: 'Discover if your organisational structure can effectively manage AI-induced risks and provide grievance mechanisms.', color: 'bg-primary/10 text-primary border-primary/15' },
                              { title: 'Data & Algorithmic Equity:', desc: 'Determine whether your datasets reflect the nuances of the communities you serve, including multilingual and Global South contexts.', color: 'bg-accent/10 text-accent border-accent/15' },
                              { title: 'Human-Centred Impact:', desc: 'Understand how your AI tools affect end-users and if your frontline workers are trained to use them responsibly.', color: 'bg-primary/10 text-primary border-primary/15' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.005] duration-300">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                                  <Check className="h-5 w-5 stroke-[3]" />
                                </div>
                                <div>
                                  <h4 className="font-display font-bold text-sm text-primary">{item.title}</h4>
                                  <p className="text-xs text-muted leading-relaxed font-semibold mt-1">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollReveal>
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact by the Numbers */}
                <div className="py-10 lg:py-20 relative">
                  <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <ScrollReveal delay={0}>
                      <Card className="stat-card p-10 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-105 duration-300">
                          <Award className="h-6 w-6" />
                        </div>
                        <p className="stat-number font-display font-black text-6xl mb-3 text-primary tracking-tighter font-mono">17+</p>
                        <p className="eyebrow text-muted mb-0 font-bold tracking-widest uppercase text-xs">Years Experience</p>
                      </Card>
                      </ScrollReveal>
                      <ScrollReveal delay={0.1}>
                      <Card className="stat-card p-10 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 transition-transform group-hover:scale-105 duration-300">
                          <Globe className="h-6 w-6" />
                        </div>
                        <p className="stat-number font-display font-black text-6xl mb-3 text-accent tracking-tighter">Global</p>
                        <p className="eyebrow text-muted mb-0 font-bold tracking-widest uppercase text-xs">Research Footprint</p>
                      </Card>
                      </ScrollReveal>
                      <ScrollReveal delay={0.2}>
                      <Card className="stat-card p-10 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-105 duration-300">
                          <Target className="h-6 w-6" />
                        </div>
                        <p className="stat-number font-display font-black text-6xl mb-3 text-primary tracking-tighter font-mono">100%</p>
                        <p className="eyebrow text-muted mb-0 font-bold tracking-widest uppercase text-xs">Commitment to Equity</p>
                      </Card>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>

                {/* Core Pillars Section */}
                <div className="py-24 px-6 bg-[#f8fafc] border-t border-slate-100 relative">
                  {/* Subtle decorative mesh or tech grid overlay */}
                  <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

                  <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24 space-y-16 relative z-10">
                    <ScrollReveal>
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      {/* Pill divider — reference vibe */}
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40"></div>
                        <div className="h-2 w-2 rounded-full bg-accent"></div>
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/40"></div>
                      </div>
                      <h2 className="section-heading text-4xl md:text-5xl">Our Expertise</h2>
                      <p className="prose-body text-lg">Specialized domains where we deliver the most impact through rigorous methodology.</p>
                    </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto">
                      {/* Box 1: Responsible AI */}
                      <motion.div 
                        className="card-3d-tilt h-full p-0 rounded-[2rem] flex flex-col relative overflow-hidden group cursor-pointer bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
                        onClick={() => setActiveTab('usecases')}
                      >
                        <div className="h-[250px] md:h-[280px] w-full relative overflow-hidden shrink-0">
                          <img src="/responsible_ai_indian.png" alt="Responsible AI" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 right-4 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 bg-primary">
                            <ShieldAlert className="h-6 w-6 text-accent" />
                          </div>
                          {/* Image Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-65 pointer-events-none" />
                        </div>
                        
                        <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10 bg-white justify-between">
                          <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-primary mb-3">Responsible AI</h3>
                            <p className="text-muted leading-relaxed max-w-xl mb-8 font-semibold text-sm">Evaluating Large Language Models (LLMs) for societal biases and ensuring equitable technological deployment across multilingual and complex environments.</p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-primary/20">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary"><Check className="h-5 w-5 stroke-[3]" /></div>
                                <span className="font-bold text-sm text-foreground">Dataset & Model Bias Audits</span>
                              </div>
                              <div className="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-primary/20">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary"><Check className="h-5 w-5 stroke-[3]" /></div>
                                <span className="font-bold text-sm text-foreground">Risk & Impact Mapping</span>
                              </div>
                              <div className="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-primary/20">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary"><Check className="h-5 w-5 stroke-[3]" /></div>
                                <span className="font-bold text-sm text-foreground">Human-Centred Evaluations</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 flex items-center justify-between w-full pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-sm font-bold text-accent group-hover:text-primary transition-colors">
                              Explore Frameworks <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setActiveTab('rair_scorecard'); }} className="group inline-flex items-center justify-center text-xs font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-5 py-2.5 z-20 relative overflow-hidden">
                              RAIR Quiz
                            </button>
                          </div>
                        </div>
                      </motion.div>

                      {/* Box 2: Environment & Governance */}
                      <motion.div 
                        className="card-3d-tilt h-full p-0 flex flex-col rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer bg-white"
                        onClick={() => setActiveTab('usecases')}
                      >
                        <div className="h-[250px] md:h-[280px] w-full relative overflow-hidden shrink-0">
                          <img src="/environment_ai_indian.png" alt="Environment & Governance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 right-4 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 bg-primary">
                            <Globe className="h-6 w-6 text-white" />
                          </div>
                          {/* Image Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-65 pointer-events-none" />
                        </div>
                        
                        <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10 bg-white justify-between">
                          <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-primary mb-4">Environment & Governance</h3>
                            <p className="text-muted leading-relaxed mb-8 font-semibold text-sm">Comprehensive risk assessments, impact evaluations, and systematic analysis of governance structures to optimize public program delivery and partnerships.</p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-accent/20">
                                <div className="bg-accent/10 p-2 rounded-lg text-accent"><Check className="h-5 w-5 stroke-[3]" /></div>
                                <span className="font-bold text-sm text-foreground">Stakeholder Impact Evaluations</span>
                              </div>
                              <div className="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-accent/20">
                                <div className="bg-accent/10 p-2 rounded-lg text-accent"><Check className="h-5 w-5 stroke-[3]" /></div>
                                <span className="font-bold text-sm text-foreground">Public-Private Partnerships</span>
                              </div>
                              <div className="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-accent/20">
                                <div className="bg-accent/10 p-2 rounded-lg text-accent"><Check className="h-5 w-5 stroke-[3]" /></div>
                                <span className="font-bold text-sm text-foreground">Regulatory Risk Assessment</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 flex items-center justify-between w-full pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-colors">
                              View Case Studies <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-xs font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-5 py-2.5 z-20 relative overflow-hidden">
                              Enquire Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              {/* Focus Areas (Videos) */}
              <div className="py-24 px-6 relative bg-transparent overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[800px] bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none -translate-y-1/2"></div>
                <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24 space-y-32 relative z-10">
                  <ScrollReveal>
                  <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                    <Eyebrow>Our Focus Areas</Eyebrow>
                    {/* Pill divider strip */}
                    <div className="flex items-center justify-center gap-2 my-2">
                      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent opacity-70"></div>
                      <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                      <div className="h-1 w-8 rounded-full bg-primary/40"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-primary">Domains of Impact</h2>
                    <p className="text-muted text-xl font-medium">A closer look at how our methodologies translate to real-world outcomes across our four main practice areas.</p>
                  </div>
                  </ScrollReveal>

                  {offerClusters.map((cluster, index) => (
                    <ScrollReveal key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1}>
                    <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24 relative`}>
                      
                      {/* Video Side with Cinematic hardware-like player bezel */}
                      <div className="w-full md:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
                        
                        {/* Decorative background shape */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-dashed border-accent/25 animate-rotate-dashed pointer-events-none hidden md:block" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-primary/20 animate-rotate-dashed pointer-events-none hidden md:block" style={{ animationDirection: 'reverse' }} />

                        <div className="relative rounded-[2rem] overflow-hidden cinematic-player shadow-2xl p-2 video-hover">
                          <video 
                            src={`/video_${index + 1}.mp4`} 
                            controls
                            playsInline 
                            className="w-full h-auto object-cover aspect-[4/5] bg-slate-950 rounded-2xl"
                          />
                        </div>
                        {/* Get in Touch button below focus area video */}
                        <div className="mt-5 flex justify-center">
                          <Button variant="teal" size="xl" onClick={() => window.open("https://tally.so/r/3ERZrN", "_blank")} className="group">
                            Get in Touch <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Text Side */}
                      <div className="w-full md:w-1/2 space-y-8 relative">
                        {/* Huge background number watermark */}
                        <div className="absolute -top-16 -left-10 text-[180px] font-black text-primary/5 tracking-tighter leading-none pointer-events-none select-none font-display z-0">
                          0{index + 1}
                        </div>
                        
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-3 text-accent font-bold text-sm tracking-widest uppercase mb-4">
                            <span className="w-8 h-px bg-accent"></span>
                            0{index + 1}. {cluster.theme || "Focus Area"}
                          </div>
                          <h3 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight mb-6">{cluster.title}</h3>
                          <p className="text-xl text-muted font-medium text-balance leading-relaxed">{cluster.description}</p>
                          
                          <div className="space-y-4 mt-8">
                            {cluster.items.map((item, i) => (
                              <div key={i} className="focus-item p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.005] duration-300">
                                <h4 className="font-bold text-primary text-lg mb-2">{item.name}</h4>
                                <p className="text-base text-muted mb-4 leading-relaxed font-semibold">{item.desc}</p>
                                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  Output: {item.output}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {cluster.whoWeWorkWith && (
                            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 mt-6">
                              <p className="text-sm text-primary font-bold leading-relaxed">
                                {cluster.whoWeWorkWith}
                              </p>
                            </div>
                          )}
                          
                        </div>
                      </div>

                    </div>
                    </ScrollReveal>
                  ))}

                </div>
              </div>


                <MethodologyPipeline />

                {/* Who We Serve Section */}
                <div className="py-24 px-6 bg-white border-t border-border">
                  <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24 space-y-16">
                    <ScrollReveal>
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      <Eyebrow>Our Clients</Eyebrow>
                      {/* Reference-style pill divider */}
                      <div className="flex items-center justify-center gap-2 my-1">
                        <div className="h-px w-10 bg-primary/30"></div>
                        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></div>
                        <div className="h-1 w-20 rounded-full bg-gradient-to-l from-primary to-accent"></div>
                        <div className="h-px w-10 bg-accent/30"></div>
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary">Who We Serve</h2>
                      <p className="text-lg text-muted font-medium">Six core international stakeholder groups we tailor our socio-technical expertise for — from AI labs to humanitarian NGOs, and from government bodies to ambitious tech startups.</p>
                    </div>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                      {[
                        {
                          n: '01', title: 'Applied AI Research & Deployment Institutes',
                          tag: 'AI Research',
                          desc: 'For institutes scaling AI deployments in international and multilingual contexts, getting the social science right is as critical as the engineering. We provide India-side field validation, user trust auditing, bias and stereotype testing, and participatory research design. Our methodology ensures your AI systems are not just technically robust — but socially grounded, culturally aware, and community-vetted.',
                          icon: Sparkles, color: 'hsl(var(--primary))', image: '/serve_research_1781695063452.png'
                        },
                        {
                          n: '02', title: 'International Development & Humanitarian NGOs',
                          tag: 'Development',
                          desc: 'For NGOs deploying digital tools for vulnerable, marginalised, and multilingual populations, responsible AI integration demands a human-centred approach. We help you design AI-aware Theory of Change frameworks, conduct participatory stakeholder evaluations, and build MEL (Monitoring, Evaluation & Learning) systems that surface equity gaps before they become systemic failures.',
                          icon: Users, color: 'hsl(var(--accent))', image: '/serve_ngo_1781695076625.png'
                        },
                        {
                          n: '03', title: 'Boutique Digital & AI Consultancies',
                          tag: 'Consultancy',
                          desc: 'For consultancies bidding on and implementing complex digital projects that require deep socio-technical expertise, we plug in as your specialised India-based research and methodology partner. We strengthen your proposals with rigorous academic credibility, handle qualitative fieldwork, and deliver the kind of interdisciplinary analysis that differentiates your firm from pure-tech competitors.',
                          icon: Briefcase, color: '#b45309', image: '/serve_consultancy_1781695087497.png'
                        },
                        {
                          n: '04', title: 'Bilateral & Multilateral Development Agencies',
                          tag: 'Governance',
                          desc: 'For bilateral and multilateral donor agencies managing complex technical cooperation programmes, independent oversight is essential. We verify compliance with international responsible AI regulations, conduct third-party evaluations of technology-enabled programmes, assess social and environmental safeguards, and provide the evidence base needed for programme accountability and strategic course correction.',
                          icon: ShieldAlert, color: '#b91c1c', image: '/serve_agency_1781695144848.png'
                        },
                        {
                          n: '05', title: 'Independent Evaluation & AI Advisory Bodies',
                          tag: 'Evaluation',
                          desc: 'For evaluation bodies overseeing international programmes and assessing the real-world impact of AI interventions, we provide the methodological depth to modernise your evaluation toolkits. We integrate qualitative, quantitative, and AI literacy frameworks — ensuring evaluations capture community voice, institutional accountability, and systemic risks that standard logframes routinely miss.',
                          icon: GraduationCap, color: '#1d4ed8', image: '/serve_evaluation_1781695112218.png'
                        },
                        {
                          n: '06', title: 'AI & Tech Startups',
                          tag: 'Startups',
                          desc: 'For ambitious startups navigating complex AI regulations, international standards, and responsible deployment requirements, we offer strategic advisory and compliance mapping. We help you understand where your product intersects with societal risk, design early-stage bias audits, and build the responsible AI narrative that matters most when scaling to global markets, attracting ethical investors, and earning user trust.',
                          icon: Zap, color: '#047857', image: '/serve_startup_1781695125139.png'
                        }
                      ].map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <ScrollReveal key={item.n} delay={idx * 0.1}>
                          <Card className="p-4 flex flex-col h-full bg-white border border-slate-100 shadow-sm hover:shadow-card hover:-translate-y-1 rounded-[2rem] overflow-hidden group transition-all duration-300">
                            <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3] w-full shrink-0">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                              {/* Soft pastel category pill tag on image */}
                              <div className="absolute top-3 left-3 z-20">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider border shadow-sm ${
                                  idx % 2 === 0 
                                    ? 'bg-[#faf8ff]/95 text-[#6b21a8] border-purple-100' 
                                    : 'bg-[#fffbeb]/95 text-[#d97706] border-amber-100'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                                    idx % 2 === 0 ? 'bg-[#6b21a8]' : 'bg-[#d97706]'
                                  }`}></span>
                                  {item.tag}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3 h-10 w-10 rounded-xl flex items-center justify-center shadow-md border border-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-0.5 z-20" style={{ background: item.color }}>
                                <IconComp className="h-5 w-5 text-white" />
                              </div>
                              <div className="absolute bottom-3 left-3 z-20">
                                <span className="text-xs font-bold tracking-widest font-mono text-white bg-primary/45 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                                  {item.n}
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-30 mix-blend-multiply z-10" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                              <div>
                                <h4 className="font-display font-bold text-lg md:text-xl text-primary leading-tight mb-3 group-hover:text-accent transition-colors duration-300">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted leading-relaxed font-semibold">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </Card>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="relative w-full overflow-hidden bg-[#130524] py-24 px-6 border-t border-[#22073d]">
                  {/* Glowing background circles */}
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  {/* Tech Grid Backdrop */}
                  <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

                  <ScrollReveal direction="scale" className="w-full max-w-5xl mx-auto relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
                      {/* Decorative internal rings */}
                      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full border border-white/5 pointer-events-none"></div>
                      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border border-white/5 pointer-events-none"></div>

                      {/* Reference-style pill divider above CTA */}
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-white/20"></div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/90">Let's Work Together</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        </div>
                        <div className="h-px w-12 bg-white/20"></div>
                      </div>

                      <h2 className="text-white font-display font-black tracking-tight text-3xl md:text-5xl lg:text-6xl leading-tight">
                        Ready to bridge the gap between<br className="hidden md:inline" />science, society, and AI?
                      </h2>
                      
                      <p className="text-base md:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Partner with Circadian Connect to bring rigorous methodology, social awareness, and equity to your next big project.
                      </p>

                      <div className="pt-4">
                        <Button variant="teal" size="xl" onClick={() => setActiveTab('about')} className="shadow-lg hover:shadow-accent/30">
                          Meet The Team
                        </Button>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </motion.div>

          )}

{/* ════════════════════════════════════════ USE CASES INDIA ══ */}
          {activeTab === 'usecases_india' && (
            <motion.div
              key="usecases_india"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 md:py-20 px-6 md:px-10 lg:px-16"
            >
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-3xl mx-auto mb-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-6">
                    Use Case - India
                  </h1>
                  <p className="text-xl text-muted leading-relaxed">
                    A comprehensive overview of our deep-rooted projects, academic publications, and governance evaluations across core Indian themes.
                  </p>
                </div>

                <div className="space-y-12">
                  {indiaUseCases.map((uc, i) => (
                    <Card key={i} className="group glass-panel rounded-[2rem] overflow-hidden border border-white/50 shadow-xl shadow-primary/5 hover:shadow-2xl transition-all duration-500 w-full">
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-[45%] shrink-0 h-[250px] md:h-[450px] overflow-hidden relative">
                          <img
                            src={uc.image}
                            alt={uc.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80 mix-blend-multiply" />
                          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-white/20 shadow-lg">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">{uc.theme}</span>
                          </div>
                          {/* Decorative Glow */}
                          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/40 rounded-full blur-3xl group-hover:bg-accent/60 transition-colors"></div>
                        </div>
                        <div className="md:w-[55%] p-8 md:p-12 flex flex-col justify-start overflow-y-auto max-h-[450px] custom-scrollbar bg-white/40">
                          <h3 className="text-3xl font-display font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                            {uc.title}
                          </h3>
                          <p className="text-muted leading-relaxed font-medium mb-8 text-lg">
                            {uc.description}
                          </p>
                          <div className="bg-white/80 p-6 rounded-2xl border border-white shadow-sm mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-accent" /> Key Projects & Publications
                            </h4>
                            <ul className="space-y-4 relative z-10">
                              {uc.projects.map((proj, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-foreground font-medium bg-surface/50 p-3 rounded-xl border border-border">
                                  <div className="bg-primary/10 p-1.5 rounded text-primary shrink-0"><Check className="w-3.5 h-3.5" /></div>
                                  <span className="leading-relaxed">{proj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-auto pt-4 border-t border-border/50">
                            <Button
                              variant="outline"
                              onClick={() => window.open(uc.link, '_blank')}
                              className="group w-max"
                            >
                              Read More / Original Source
                              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex-1 w-full bg-[#f8fafc]"
            >
              {/* ── Header Banner (Agence-style About Us) ── */}
              <div className="relative w-full h-[250px] md:h-[320px] bg-gradient-to-r from-[#130524] to-[#2e0854] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
                <div className="relative z-10 text-center space-y-3 px-6">
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-black tracking-tight">About Us</h1>
                  <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] max-w-xl mx-auto">WHO WE ARE &amp; HOW WE DELIVER SOLUTIONS</p>
                </div>
              </div>

              <div className="w-full px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-20 space-y-24 md:space-y-32">
                
                {/* ── Section 1: Agence-style Introduction & Badge Row ── */}
                <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
                  
                  {/* Left Column: Intro text and Badge Pills */}
                  <div className="lg:col-span-6 space-y-6">
                    <Eyebrow>INTRODUCTION TO CIRCADIAN CONNECT</Eyebrow>
                    <h2 className="font-display text-4xl md:text-5xl text-primary font-black tracking-tight leading-tight">
                      Introduction to India's Premier <span className="font-serif italic text-accent">Socio-Technical</span> Research Agency!
                    </h2>
                    
                    <p className="text-muted leading-relaxed text-base font-medium">
                      Circadian Connect LLP is a for-profit research solutions provider committed to curating design and methodology at the interface of science, society, and AI. We believe that sustainable and inclusive solutions can only be achieved when social institutions and actors are considered in Science and Technology innovations.
                    </p>
                    <p className="text-muted leading-relaxed text-sm font-medium">
                      We strive for scientific excellence and social responsibility in all our endeavors, working closely with clients to achieve our shared goals — from responsible AI audits to governance evaluations.
                    </p>

                    {/* Badge Pills Row (Agence Vibe) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-accent shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-primary leading-tight">Google AI</div>
                          <div className="text-[10px] text-muted font-bold">1st Partner in India</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-primary shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-primary leading-tight">Ph.D. / LSE</div>
                          <div className="text-[10px] text-muted font-bold">Academic Rigour</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-primary shrink-0">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-primary leading-tight">5+ Countries</div>
                          <div className="text-[10px] text-muted font-bold">Global Footprint</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Clean Presentation Video Player Card */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                      <div className="rounded-[1.8rem] overflow-hidden aspect-video relative group video-hover">
                        <video 
                          src="/about_video.mp4" 
                          controls
                          playsInline 
                          className="w-full h-full object-cover aspect-video"
                        />
                      </div>
                      <div className="p-5 text-center">
                        <h4 className="font-display font-bold text-base text-primary">Circadian Connect Overview</h4>
                        <p className="text-xs text-muted mt-1">Introduction presentation video</p>
                      </div>
                    </div>
                  </div>

                </div>
                </ScrollReveal>

                {/* ── Section: Meet Our Founder Director (Separate Dedicated Section) ── */}
                <ScrollReveal>
                <div className="space-y-12">
                  <ScrollReveal>
                  <div className="py-12 border-y border-slate-100 bg-slate-50/20 backdrop-blur-sm rounded-[2.5rem] px-6 md:px-12 my-12 shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]">
                    <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">Institutional Credibility</span>
                      <h3 className="font-display text-lg font-extrabold text-primary">Collaborative &amp; Academic Footprint</h3>
                      <p className="text-muted text-xs font-semibold">Our founder and team have partnered and collaborated with leading global organizations.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
                      {/* Google LLC */}
                      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/80 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer w-full max-w-[160px]">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50/80 flex items-center justify-center border border-slate-100/50 group-hover:bg-white group-hover:border-slate-200 transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                          <GoogleIcon className="w-12 h-12" />
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wider">Google Research</span>
                      </div>

                      {/* LSE (London School of Economics) */}
                      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/80 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer w-full max-w-[160px]">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50/80 flex items-center justify-center border border-slate-100/50 group-hover:bg-[#e2231a] group-hover:border-transparent transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                          <span className="font-display font-black text-2xl text-slate-400 group-hover:text-white transition-colors tracking-tighter">LSE</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wider">LSE London</span>
                      </div>

                      {/* British Council */}
                      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/80 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer w-full max-w-[160px]">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50/80 flex items-center justify-center border border-slate-100/50 group-hover:bg-white group-hover:border-slate-200 transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                          <svg className="w-12 h-12 text-slate-400 group-hover:text-[#003078] transition-colors fill-current" viewBox="0 0 24 24">
                            <circle cx="6" cy="6" r="3" />
                            <circle cx="18" cy="6" r="3" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="18" r="3" />
                            <line x1="6" y1="9" x2="6" y2="15" stroke="currentColor" strokeWidth="2" />
                            <line x1="18" y1="9" x2="18" y2="15" stroke="currentColor" strokeWidth="2" />
                            <line x1="9" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="2" />
                            <line x1="9" y1="18" x2="15" y2="18" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wider">British Council</span>
                      </div>

                      {/* TISS Mumbai */}
                      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/80 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer w-full max-w-[160px]">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50/80 flex items-center justify-center border border-slate-100/50 group-hover:bg-[#006a4e] group-hover:border-transparent transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                          <span className="font-display font-black text-2xl text-slate-400 group-hover:text-white transition-colors tracking-tight">TISS</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wider">TISS Mumbai</span>
                      </div>

                      {/* ICSSR */}
                      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/80 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer w-full max-w-[160px] col-span-2 md:col-span-1">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50/80 flex items-center justify-center border border-slate-100/50 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-600 group-hover:border-transparent transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                          <span className="font-display font-black text-xl text-slate-400 group-hover:text-white transition-colors tracking-wider">ICSSR</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wider">ICSSR Govt of India</span>
                      </div>
                    </div>
                  </div>
                  </ScrollReveal>

                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>Leadership</Eyebrow>
                    <h2 className="font-display text-4xl font-black text-primary tracking-tight">
                      Meet Our Founder Director
                    </h2>
                    <p className="text-muted text-sm font-medium">A visionary leader bridging the gap between science, society, and policy.</p>
                  </div>


                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Column: Premium Portrait Card (No Overlay) */}
                    <div className="lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 bg-white flex flex-col justify-between h-full group">
                      <div className="flex-1 w-full bg-slate-50 relative overflow-hidden min-h-[360px]">
                        <img 
                          src="/jaya_goyal_new_transparent.png" 
                          alt="Dr. Jaya Goyal" 
                          className="absolute inset-0 w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      
                      {/* Name & Credentials below Image */}
                      <div className="p-8 flex flex-col shrink-0 gap-5 justify-center">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                            Founder Director
                          </span>
                          <h3 className="text-3xl font-display font-black leading-tight text-primary mt-2">Dr. Jaya Goyal</h3>
                          <p className="text-slate-500 text-xs font-semibold">Ph.D. in Social Sciences (TISS / LSE)</p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            17+ Years Experience
                          </span>
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            Google Research Partner
                          </span>
                        </div>

                        {/* Academic & Professional Portfolios */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Academic &amp; Professional Portfolios</div>
                          <div className="grid grid-cols-2 gap-3">
                            {/* LinkedIn (Spans both columns for visual balance) */}
                            <a 
                              href="https://www.linkedin.com/in/dr-jaya-goyal-8686361b/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="col-span-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-white transition-all duration-300 p-2.5 bg-slate-50/50 hover:bg-[#0a66c2] border border-slate-100 hover:border-[#0a66c2] rounded-xl group/ln shadow-[inset_0_1px_1px_rgba(0,0,0,0.01)] hover:shadow-md"
                            >
                              <LinkedInIcon className="w-4 h-4 text-[#0a66c2] group-hover/ln:text-white transition-colors" />
                              <span>Professional Profile on LinkedIn</span>
                            </a>

                            {/* Google Scholar */}
                            <a 
                              href="https://scholar.google.com/citations?user=fBRN_8oAAAAJ&hl=en" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#4285f4] transition-all duration-300 p-2.5 bg-slate-50/50 hover:bg-[#4285f4]/5 border border-slate-100 hover:border-[#4285f4]/20 rounded-xl hover:shadow-sm"
                            >
                              <GraduationCap className="w-4 h-4 text-[#4285f4]" />
                              <span>Google Scholar</span>
                            </a>

                            {/* Kolabtree */}
                            <a 
                              href="https://www.kolabtree.com/find-an-expert/jaya-goyal" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-accent transition-all duration-300 p-2.5 bg-slate-50/50 hover:bg-accent/5 border border-slate-100 hover:border-accent/20 rounded-xl hover:shadow-sm"
                            >
                              <Sparkles className="w-4 h-4 text-accent" />
                              <span>Kolabtree</span>
                            </a>

                            {/* Academia.edu */}
                            <a 
                              href="https://tiss.academia.edu/jayagoyal" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-all duration-300 p-2.5 bg-slate-50/50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 rounded-xl hover:shadow-sm"
                            >
                              <BookOpen className="w-4 h-4 text-primary" />
                              <span>Academia.edu</span>
                            </a>

                            {/* ResearchGate */}
                            <a 
                              href="https://www.researchgate.net/profile/Jaya-Goyal" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#00ccbb] transition-all duration-300 p-2.5 bg-slate-50/50 hover:bg-[#00ccbb]/5 border border-slate-100 hover:border-[#00ccbb]/20 rounded-xl hover:shadow-sm"
                            >
                              <FileText className="w-4 h-4 text-[#00ccbb]" />
                              <span>ResearchGate</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Detailed Bio & Highlights */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      
                      {/* Main Bio Card */}
                      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm space-y-6 flex-1">
                        <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                          <p>
                            Dr. Jaya Goyal is a specialist with 17 years of leadership experience in research solutions at the interface of science, society, and policy. She advocates that as technology rapidly advances, human qualities—such as critical thinking, empathy, and emotional intelligence—become increasingly essential in the future of work. She believes in creating synergy between cutting-edge innovation and human-centric approaches to build more inclusive and productive solutions.
                          </p>
                          <p>
                            After a 17-year career as a policy researcher and Science Diplomat, Jaya founded Circadian Connect to establish an interdisciplinary research enterprise. Previously, as the Head of Higher Education for the British Council India, she managed a £7 million portfolio, leading key bilateral programmes between India and the UK, including the Newton Bhabha Fund and UKIERI. During her tenure, she also served as a Science Advisor and Research Champion for South Asia.
                          </p>
                          <p>
                            In mid-2022, Circadian Connect became arguably the first social scientist-led company in India to partner with Google LLC USA on a 'Responsible AI' research project. Grounded in the perspective that understanding social context is vital to building safe technology, she co-created a copyrighted methodology with Google researchers to study social stereotypes across diverse regions and languages. Published in international journals, this methodology supported multi-million-dollar product development in 'Responsible AI' at Google Alphabet LLC.
                          </p>
                          <p>
                            Throughout her career—from facilitating the inclusion of Social Sciences in STEM-dominated funds to co-authoring six critical national policy reports impacting over a billion people—she has consistently demonstrated the value of collaboration and critical communication. She continues to lead Circadian Connect with a focus on bridging the gaps between scientific innovation, social responsibility, and policy.
                          </p>
                        </div>

                        {/* Credentials Info Grid */}
                        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-display font-bold text-primary flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-accent" /> Academic Credentials
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-500 font-medium">
                              <li>• <strong>Ph.D. in Social Sciences</strong> — TISS, Mumbai (funded by London School of Economics and Political Science, LSE, UK)</li>
                              <li>• <strong>M.Sc. (Human Ecology)</strong> — Delhi University</li>
                              <li>• <strong>Scholarships &amp; Grants</strong> — Over Rs. 1 Crore awarded from LSE, Hiroshima University, Edinburgh University, Michigan State University, and ISS The Hague.</li>
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-display font-bold text-primary flex items-center gap-2">
                              <Award className="w-5 h-5 text-accent" /> Highlights &amp; Advisory
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-500 font-medium">
                              <li>• <strong>Newton Bhabha Fund Partner</strong> — Instrumental in getting ICSSR partner for Ph.D. placement programme.</li>
                              <li>• <strong>TRANSSITION Project Advisory</strong> — Board of Advisors for Sheffield University Management School's international consortium.</li>
                              <li>• <strong>Visiting Faculty</strong> — TISS, Mumbai (teaching Public-Private Partnerships in Health &amp; Child Rights).</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                    </div>

                  </div>
                </div>
                </ScrollReveal>

                {/* ── Section 2: Unique Approach Bento-style Layout (Mavis Clinic Vibe) ── */}
                <ScrollReveal>
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>WHY CHOOSE CIRCADIAN CONNECT?</Eyebrow>
                    <h2 className="font-display text-4xl font-black text-primary tracking-tight">
                      Unique Approach To Your Research &amp; AI Evaluation Needs
                    </h2>
                    <p className="text-muted text-sm font-medium">Delivering grounded, evidence-driven, and socially responsible evaluations in complex contexts.</p>
                  </div>

                  {/* Symmetrical stats and fieldwork grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    
                    {/* Card 1: Orange Soft Stats Card */}
                    <div className="rounded-[2.5rem] bg-[#fff7ed] border border-orange-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-accent mb-4">
                          <Users className="w-6 h-6" />
                        </div>
                        <div className="text-4xl font-display font-black text-primary">25K+</div>
                        <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Google Collaboration</h4>
                        <p className="text-xs text-muted leading-relaxed font-medium">
                          Stereo Harm benchmarks co-designed with Google to identify and measure social stereotypes globally.
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Purple Soft Stats Card */}
                    <div className="rounded-[2.5rem] bg-[#faf5ff] border border-purple-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-primary mb-4">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="text-4xl font-display font-black text-primary">NeurIPS</div>
                        <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Academic Publications</h4>
                        <p className="text-xs text-muted leading-relaxed font-medium">
                          Publications in collaboration with Google Research, presenting cutting-edge Responsible AI methods.
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Fieldwork Image Card (No Overlays) */}
                    <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-2 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                      <div className="rounded-[2rem] overflow-hidden aspect-video relative flex-1">
                        <img src="/fieldwork_research_new.png" alt="Stakeholder Fieldwork" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-bold text-sm text-primary">Stakeholder Fieldwork</h4>
                        <p className="text-[10px] text-muted mt-1">Socio-technical surveys & community engagement</p>
                      </div>
                    </div>

                  </div>
                </div>
                </ScrollReveal>

                {/* ── Section 3: Offered Services / Three Pillars (Mavis Clinic Style Columns) ── */}
                <ScrollReveal>
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>OUR PRINCIPLES</Eyebrow>
                    <h2 className="font-display text-4xl font-black text-primary tracking-tight">Explore Our Foundational Research Pillars</h2>
                    <p className="text-muted text-sm font-medium">Three core disciplines combined to deliver balanced socio-technical insights.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    
                    {/* Pillar 1: Scientific Rigour */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-primary">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-xl text-primary">Scientific Rigour</h3>
                        <p className="text-muted text-xs leading-relaxed font-medium">
                          Every deliverable is grounded in peer-reviewed methodology, qualitative depth, and transparent evidence. We do not cut corners on academic standards.
                        </p>
                      </div>
                      <div className="space-y-2.5 pt-4 border-t border-slate-50 mt-auto">
                        {[
                          'Peer-reviewed methodologies',
                          'Real-world community data collection',
                          'Transparent evidence diagnostics'
                        ].map((b, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center text-primary shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="text-xs font-bold text-slate-600">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 2: Social Responsibility */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent"></div>
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-accent">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-xl text-primary">Social Responsibility</h3>
                        <p className="text-muted text-xs leading-relaxed font-medium">
                          We hold ourselves accountable to the communities our work impacts. Inclusive participation, equity-first design, and community-validated outcomes are non-negotiable.
                        </p>
                      </div>
                      <div className="space-y-2.5 pt-4 border-t border-slate-50 mt-auto">
                        {[
                          'Equity-first design frameworks',
                          'Inclusive community representation',
                          'Direct sponsor accountability'
                        ].map((b, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-orange-50 flex items-center justify-center text-accent shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="text-xs font-bold text-slate-600">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 3: Interdisciplinary Collaboration */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent"></div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-primary">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-xl text-primary">Interdisciplinary Collaboration</h3>
                        <p className="text-muted text-xs leading-relaxed font-medium">
                          The most complex challenges cannot be solved by any single discipline. We bring together social science, data science, policy, and technology.
                        </p>
                      </div>
                      <div className="space-y-2.5 pt-4 border-t border-slate-50 mt-auto">
                        {[
                          'Bridging qualitative & quantitative data',
                          'Social science & AI engineering integration',
                          'Policy & technology body dialogue'
                        ].map((b, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center text-primary shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="text-xs font-bold text-slate-600">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
                </ScrollReveal>

                {/* ── Section 4: Dynamic Team & Collaborators Grid (Agence / Mavis Vibe) ── */}
                <ScrollReveal>
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>OUR EXPERT NETWORK</Eyebrow>
                    <h2 className="font-display text-4xl font-black text-primary tracking-tight">
                      The Skilled Professionals Making A Difference
                    </h2>
                    <p className="text-muted text-sm font-medium">Working together with researchers, academics, and consultants across the globe.</p>
                    
                    {/* Category Filter Pills (Agence Style) */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                      {['All', 'Collaborators', 'Research Interns'].map((filterVal) => (
                        <button
                          key={filterVal}
                          onClick={() => setActiveTeamFilter(filterVal)}
                          className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 ${
                            activeTeamFilter === filterVal
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-white border border-purple-100/60 text-slate-600 hover:text-primary hover:bg-purple-50/50'
                          }`}
                        >
                          {filterVal}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamically Filtered Team List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {[
                      {
                        name: 'Dr. Shrikant Wad',
                        role: 'Education & Society Specialist',
                        category: 'Collaborators',
                        desc: "Researching 'Social disparities amongst undergraduate disciplines: a realist inquiry into choice and affirmative action in India'. Co-author on the International Higher Education Partnerships paper presented at BAICE (2022) and CESA (2023).",
                        image: '/photo_shrikant.png',
                        social: []
                      },
                      {
                        name: 'Dr. Nadira Khatun',
                        role: 'Associate Professor, XIM University',
                        category: 'Collaborators',
                        desc: "Researching digital culture, digital capitalism, Muslim identity, Indian cinema, and new media. Her book, Postcolonial Bollywood and Muslim Identity: Production, Representation, and Reception, is published by Oxford University Press.",
                        image: '/photo_nadira.jpg',
                        social: []
                      },
                      {
                        name: 'Dr. Laxmi Vadapalli',
                        role: 'Independent Consultant',
                        category: 'Collaborators',
                        desc: 'PhD in agricultural sociology and entrepreneurship. Expert in qualitative research and former faculty at the School of Habitat Studies, TISS Mumbai.',
                        image: '/photo_laxmi.jpg',
                        social: []
                      },
                      {
                        name: 'Aastha Singh',
                        role: 'Research Intern',
                        category: 'Research Interns',
                        desc: 'Graduate in Economics from SIES College of Arts, Science and Commerce, Mumbai.',
                        image: '/photo_aastha.jpg',
                        social: []
                      },
                      {
                        name: 'Steffi Devassy',
                        role: 'Research Intern',
                        category: 'Research Interns',
                        desc: 'M.A. Graduate in Political Science from the Department of Civics and Politics, University of Mumbai.',
                        image: '/photo_steffi.png',
                        social: []
                      },
                      {
                        name: 'Kaushal Sapkal',
                        role: 'M.Tech Graduate, Somaiya Vidyavihar University (SVU)',
                        category: 'Research Interns',
                        desc: 'Software Engineer with experience in backend development and data engineering. Skilled in Python, PySpark, Power BI, and cloud technologies. Completed his M.Tech from Somaiya Vidyavihar University (SVU) and has worked across multiple internships in software engineering and data analysis roles.',
                        image: '/kaushal_transparent.png',
                        social: []
                      },
                      {
                        name: 'Ganesh Patne',
                        role: 'Backend Developer Intern',
                        category: 'Research Interns',
                        desc: 'Data & Automation Enthusiast specializing in Python, Django, and MySQL. Graduate of Shah And Anchor Kutchhi Engineering College, Mumbai.',
                        image: '/ganesh_transparent.png',
                        social: []
                      },
                      {
                        name: 'Khushboo Gupta',
                        role: 'MSc Graduate in Big Data Analytics, Jai Hind College, Mumbai',
                        category: 'Research Interns',
                        desc: 'Skilled in data analysis, statistical modelling, and machine learning techniques. Brings a strong quantitative foundation to support research on AI evaluation and socio-technical data projects.',
                        image: '/khushboo_gupta.png',
                        social: []
                      },
                      {
                        name: 'Owais Chougle',
                        role: 'Data Analyst',
                        category: 'Research Interns',
                        desc: 'Graduate with expertise in data analytics and quantitative research. Experienced in translating complex datasets into actionable insights to support socio-technical and data projects.',
                        image: '/owais_chougle.png',
                        social: []
                      }
                    ].map((member, idx) => {
                      if (activeTeamFilter !== 'All' && member.category !== activeTeamFilter) return null;
                      return (
                        <div key={idx} className="bg-white rounded-[2rem] border border-purple-100/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full">
                          {/* Banner background header */}
                          <div className="h-24 w-full bg-gradient-to-r from-primary/5 to-accent/5 relative shrink-0">
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full border border-purple-100/40 shadow-sm z-10">
                              <span className="text-[9px] font-black text-primary uppercase tracking-widest">{member.category}</span>
                            </div>
                          </div>
                          
                          {/* Centered Circular Avatar */}
                          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto -mt-12 overflow-hidden bg-white shrink-0 relative z-20">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                            />
                          </div>
                          
                          {/* Info area */}
                          <div className="p-6 pt-4 flex flex-col flex-1 gap-3 items-center text-center">
                            <div>
                              <h3 className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors text-center">{member.name}</h3>
                              <p className="text-xs font-bold text-accent mt-1 leading-snug text-center">{member.role}</p>
                            </div>
                            <p className="text-xs text-muted leading-relaxed font-medium text-center">
                              {member.desc}
                            </p>
                            
                            {/* Social / Profiles (if any) */}
                            {member.social && member.social.length > 0 && (
                              <div className="pt-4 border-t border-purple-100/30 mt-auto flex gap-2 w-full justify-center">
                                {member.social.map((s, sIdx) => (
                                  <a 
                                    key={sIdx} 
                                    href={s.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[10px] font-bold text-primary hover:text-accent transition-colors bg-purple-50/40 hover:bg-primary/5 border border-purple-100/30 px-3 py-1.5 rounded-lg"
                                  >
                                    {s.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                </ScrollReveal>

                {/* ── Section 5: Endorsements / Testimonials (Mavis Vibe) ── */}
                <ScrollReveal>
                <div className="space-y-12 pt-8 border-t border-slate-100">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>ENDORSEMENTS</Eyebrow>
                    <h2 className="font-display text-4xl font-black text-primary tracking-tight">
                      What Our Partners Say
                    </h2>
                    <p className="text-muted text-sm font-medium">
                      Trusted by leading researchers, institutions, and global technology giants to provide rigorous methodological oversight.
                    </p>
                  </div>

                  {/* Testimonials Grid (Clean Symmetrical Layout) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Card 1: Bruce Tisler (Quantum Inquiry) */}
                    <div className="rounded-[2.5rem] bg-[#faf5ff] border border-purple-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/10 rounded-full blur-3xl pointer-events-none"></div>
                      {/* Prominent Partner Logo (Top Right) */}
                      <div className="absolute top-6 right-6 w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center border border-purple-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10">
                        <Globe className="w-7 h-7 text-[#ea580c]" />
                      </div>
                      
                      <div className="space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-primary">
                          <Quote className="w-6 h-6 fill-current" />
                        </div>
                        <div className="flex gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <blockquote className="font-serif italic text-base md:text-lg text-slate-800 leading-relaxed max-w-[85%]">
                          "Dr. Goyal demonstrated a capacity that is rare and difficult to find: she engaged with the work on its own terms. She followed the internal logic of the argument, identified precisely where claims were supported and where they outran the formal work."
                        </blockquote>
                      </div>
                      <div className="pt-6 border-t border-purple-100/60 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-primary text-sm">Bruce Tisler</div>
                          <div className="text-[10px] text-muted font-bold uppercase tracking-wider leading-none mt-1">Founder &amp; Principal Researcher, Quantum Inquiry</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open('https://drive.google.com/file/d/1csjP_4Ec-NBvr396cHZmfCrvMnq2TapP/view?ts=6a22a77d')}
                          className="bg-white hover:bg-primary hover:text-white border-purple-200 hover:border-transparent text-primary self-start sm:self-auto"
                        >
                          <FileText className="w-4 h-4 mr-2" /> Letter
                        </Button>
                      </div>
                    </div>

                    {/* Card 2: Staff Research Scientist (Google Research) */}
                    <div className="rounded-[2.5rem] bg-[#fdf8f6] border border-orange-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/10 rounded-full blur-3xl pointer-events-none"></div>
                      {/* Prominent Google Logo (Top Right) */}
                      <div className="absolute top-6 right-6 w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center border border-orange-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10">
                        <GoogleIcon className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-accent">
                          <Quote className="w-6 h-6 fill-current" />
                        </div>
                        <div className="text-slate-800 leading-relaxed font-serif italic text-base md:text-lg space-y-4 max-w-[85%]">
                          <p>
                            "Jaya co-designed the research methodology with Google researchers and collected primary data, contributing to the study's success... resulting in two co-authored journal articles presented at NeurIPS."
                          </p>
                          <p>
                            "Her interest in exploring how AI innovations can be tested and deployed in real societal contexts demonstrates a clear understanding of the importance of collaboration across disciplines."
                          </p>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-orange-100/60 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <div className="font-bold text-primary text-sm">Staff Research Scientist</div>
                            <div className="text-[10px] text-muted font-bold uppercase tracking-wider leading-none mt-1">Co-Lead, Technology, AI, Society, and Culture Team</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-accent bg-accent/15 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 border border-accent/25">
                            <GoogleIcon className="w-4.5 h-4.5" /> Google Research, CA
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => window.open('https://docs.google.com/document/d/1CTrL4lsPlHkIiEBCkxn3YkluRKYz5fUzFghBqGAk_tA/edit')}
                            className="bg-white hover:bg-primary hover:text-white border-orange-200 hover:border-transparent text-primary"
                          >
                            <FileText className="w-4 h-4 mr-2" /> Letter
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Google Research Scientist 1 (Short) */}
                    <div className="rounded-[2rem] bg-[#fff7ed] border border-orange-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      {/* Prominent Google Logo (Top Right) */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 rounded-2xl flex items-center justify-center border border-orange-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10">
                        <GoogleIcon className="w-7 h-7" />
                      </div>
                      
                      <div className="space-y-4">
                        <blockquote className="font-serif italic text-sm text-slate-800 leading-relaxed max-w-[85%]">
                          "We have been analyzing the data and are very excited by what it contains and the preliminary trends we see. Thank you so much for your effort towards collecting it!"
                        </blockquote>
                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-orange-100/60">
                          <div>
                            <div className="font-bold text-primary text-xs">Research Scientist</div>
                            <div className="text-[9px] text-muted font-semibold mt-0.5">Responsible AI & Human-Centered Technology</div>
                          </div>
                          <div className="text-[9px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100/80 px-3 py-1.5 rounded-md inline-flex items-center gap-2 shrink-0 border border-orange-200/50">
                            <GoogleIcon className="w-4 h-4" /> Google LLC
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Google Research Scientist 2 (Short) */}
                    <div className="rounded-[2rem] bg-[#faf5ff] border border-purple-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      {/* Prominent Google Logo (Top Right) */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 rounded-2xl flex items-center justify-center border border-purple-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10">
                        <GoogleIcon className="w-7 h-7" />
                      </div>
                      
                      <div className="space-y-4">
                        <blockquote className="font-serif italic text-sm text-slate-800 leading-relaxed max-w-[85%]">
                          "We are seeing a lot of complementary data in this collection... which speaks to the value-add of this research methodology that we co-created with you. Excited to eventually write the paper about this."
                        </blockquote>
                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-purple-100/60">
                          <div>
                            <div className="font-bold text-primary text-xs">Research Scientist</div>
                            <div className="text-[9px] text-muted font-semibold mt-0.5">Technology and Society Collective</div>
                          </div>
                          <div className="text-[9px] font-extrabold uppercase tracking-wider text-primary bg-purple-100/80 px-3 py-1.5 rounded-md inline-flex items-center gap-2 shrink-0 border border-purple-200/50">
                            <GoogleIcon className="w-4 h-4" /> Google LLC
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                </ScrollReveal>

                {/* ── Section 6: Contact Details & Ready to Collaborate ── */}
                <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                  {/* Left Column: Contact info cards */}
                  <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-accent" /> Contact &amp; Location
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <div className="text-[10px] font-bold text-accent uppercase tracking-widest">Registered Address</div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            10, Swastik Chambers Owners Society Ltd.,<br/>
                            CST Road or S.G Barve Marg, Off Sion-Trombay Road,<br/>
                            Chembur, Mumbai 400 071, INDIA.
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                            <Shield className="h-3.5 w-3.5" /> GSTIN: 27AARFC8885C1ZW
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Email</div>
                            <a href="mailto:jaya@circadianconnect.com" className="text-sm text-primary hover:text-accent font-bold flex items-center gap-2 transition-colors">
                              <Mail className="h-4 w-4 text-accent" /> jaya@circadianconnect.com
                            </a>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Phone</div>
                            <a href="tel:+919870238999" className="text-sm text-primary hover:text-accent font-bold flex items-center gap-2 transition-colors">
                              <Phone className="h-4 w-4 text-accent" /> +91-9870238999
                            </a>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Website</div>
                            <a href="https://www.circadianconnect.com" className="text-sm text-primary hover:text-accent font-bold flex items-center gap-2 transition-colors">
                              <Globe className="h-4 w-4 text-accent" /> circadianconnect.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: CTA card with premium purple-to-orange gradient */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-primary to-accent rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                    <div>
                      <Sparkles className="h-8 w-8 text-accent mb-4 animate-pulse" />
                      <h3 className="font-display font-bold text-2xl mb-3">Ready to Collaborate?</h3>
                      <p className="text-white/70 text-xs leading-relaxed font-medium">Partner with us to bring rigorous research, social awareness, and equity to your next project.</p>
                    </div>
                    <div className="mt-8 space-y-3">
                      <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-accent text-white font-bold text-sm py-3.5 px-5 rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0">
                        Get In Touch <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a href="mailto:jaya@circadianconnect.com" className="flex items-center justify-center gap-2 w-full bg-white/10 text-white font-bold text-sm py-3.5 px-5 rounded-xl hover:bg-white/20 transition-colors border border-white/10 hover:-translate-y-0.5 active:translate-y-0">
                        Send an Email <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                </ScrollReveal>

              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════ USE CASES ══ */}
          {activeTab === 'usecases' && (
            <motion.div
              key="usecases"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pt-24 pb-12"
            >
              <div className="w-full px-4 md:px-8 lg:px-12 space-y-24">
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl text-primary font-bold tracking-tight">Our Global Project Footprint</h2>
                    <p className="text-sm text-surface0 mt-2">A snapshot of our international research, consultancy, and methodology projects.</p>
                    <div className="mt-6">
                      <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer">
                        <Button variant="navy" size="lg">Contact Us</Button>
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-8 w-full">
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj1_real.png" alt="Building Stereotype Repositories with LLMs and Community Engagement for Scale and Depth (Projects SPICE and BiNDI) - Google Alphabet LLC, Google Research Labs (2022-23)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">USA</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Artificial Intelligence / Natural Language Processing (NLP)">Artificial Intelligence / Natural Language Processing (NLP)</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Building Stereotype Repositories with LLMs and Community Engagement for Scale and Depth (Projects SPICE and BiNDI) - Google Alphabet LLC, Google Research Labs (2022-23)">Building Stereotype Repositories with LLMs and Community Engagement for Scale and Depth (Projects SPICE and BiNDI) - Google Alphabet LLC, Google Research Labs (2022-23)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p><strong>C3NLP & NeurIPS 2023:</strong> We leveraged community engagement and generative models to build benchmarks targeting stereotyping harms across diverse intersectional identities, expanding evaluation resources for the Indian societal context to better calibrate LLMs.</p>
                          <p><strong>Impact:</strong> Our methodology grounded AI evaluation frameworks in nuanced socio-cultural realities, setting a new standard for responsible AI metrics.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:u-x6o8ySG0sC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-primary text-primary hover:bg-primary hover:text-white px-3 py-1.5">
                            C3NLP Citation <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:Tyk-4Ss8FVUC" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            NeurIPS Citation <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Technology Giant (Google Alphabet LLC)">Technology Giant (Google Alphabet LLC)</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj2_real.png" alt="Formalize Hybrid GeoAI Workflow as Constrained Optimization Model (2026) " className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">USA</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Geospatial AI / Data Science">Geospatial AI / Data Science</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Formalize Hybrid GeoAI Workflow as Constrained Optimization Model (2026) ">Formalize Hybrid GeoAI Workflow as Constrained Optimization Model (2026) </h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>We translated multi-layered geospatial data processes into a rigorous mathematical constrained optimization model, formalizing a complex hybrid GeoAI workflow.</p>
                          <p>This bridged traditional geospatial analysis with cutting-edge machine learning, establishing a scalable foundation that significantly improved algorithmic efficiency and spatial prediction reliability.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_ai-optimization-socialscience-activity-7459671299334856704-o4kk" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Researcher / Academic">Researcher / Academic</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj3_real.png" alt="Validate an Ethical AI Governance Framework Developed through Design Science Research Methodology (2026)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">UAE</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Responsible AI / AI Ethics / Governance">Responsible AI / AI Ethics / Governance</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Validate an Ethical AI Governance Framework Developed through Design Science Research Methodology (2026)">Validate an Ethical AI Governance Framework Developed through Design Science Research Methodology (2026)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>We provided independent validation for a proposed AI governance framework using the Design Science Research (DSR) methodology, reviewing its ethical dimensions, theoretical soundness, and practical applicability.</p>
                          <p>Through comprehensive impact assessments, we delivered a highly practical blueprint for responsible AI deployment in high-stakes environments, minimizing regulatory risks while maximizing societal benefit.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_aigovernance-uaetech-dataanalysis-activity-7439199460204789761-7eRK" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="University Researcher">University Researcher</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj4_real.png" alt="Statistical Consultant – EV Market Data Analysis (S&P Global Mobility Access) (2025)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">USA </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Automotive / EV / Data Analytics">Automotive / EV / Data Analytics</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Statistical Consultant – EV Market Data Analysis (S&P Global Mobility Access) (2025)">Statistical Consultant – EV Market Data Analysis (S&P Global Mobility Access) (2025)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>As lead statistical consultants, we analyzed comprehensive EV market datasets to uncover nuanced shifts in global adoption rates using advanced data modeling and trend forecasting.</p>
                          <p>Our rigorous statistical modeling empowered industry stakeholders to make data-driven decisions regarding market entry and infrastructure investment in the rapidly evolving automotive landscape.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_thrilled-to-share-that-i-have-successfully-activity-7396115832243884032-kuaA" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Corporate / Market Research Firm">Corporate / Market Research Firm</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj5_real.png" alt="Research and Provide Scholarly/Peer-Reviewed Sources for Healthcare Related Best Practice (2024)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">Canada</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Healthcare / Evidence-Based Medicine">Healthcare / Evidence-Based Medicine</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Research and Provide Scholarly/Peer-Reviewed Sources for Healthcare Related Best Practice (2024)">Research and Provide Scholarly/Peer-Reviewed Sources for Healthcare Related Best Practice (2024)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>We systematically identified and critically appraised high-quality scholarly literature concerning healthcare best practices, ensuring only the most robust evidence was integrated into our analysis.</p>
                          <p>This comprehensive evidence base informed clinical guidelines and public health AI development, successfully bridging the gap between academic research and practical healthcare delivery.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_thrilled-to-share-that-i-have-successfully-activity-7396115832243884032-kuaA" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Healthcare Professional / Practitioner of a Large Hospital">Healthcare Professional / Practitioner of a Large Hospital</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj6_real.png" alt="Have Digital Financial Products Helped Women to Have More Independence from Male Domination? (2024)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">India</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Gender Studies / Financial Inclusion / Development Economics">Gender Studies / Financial Inclusion / Development Economics</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Have Digital Financial Products Helped Women to Have More Independence from Male Domination? (2024)">Have Digital Financial Products Helped Women to Have More Independence from Male Domination? (2024)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>We investigated the socioeconomic impact of digital financial product adoption on women's autonomy through an extensive mixed-methods study integrating multi-disciplinary literature review with primary data analysis.</p>
                          <p>Our findings identified key structural barriers and culminated in a report framing actionable AI implications to drive meaningful gender mainstreaming in future development initiatives.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_thrilled-to-share-that-i-have-successfully-activity-7396115832243884032-kuaA" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="HR Training Firm">HR Training Firm</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj7_real.png" alt="Pre Peer Review Evaluation – Formal Framework for Reasoning Stability and Inquiry (AI / Epistemology) (2026)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">USA</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Responsible AI / Formal Methods / Philosophy of AI">Responsible AI / Formal Methods / Philosophy of AI</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Pre Peer Review Evaluation – Formal Framework for Reasoning Stability and Inquiry (AI / Epistemology) (2026)">Pre Peer Review Evaluation – Formal Framework for Reasoning Stability and Inquiry (AI / Epistemology) (2026)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>Our experts conducted an in-depth, pre-peer review evaluation of a highly interdisciplinary AI theory program spanning epistemology, cognitive science, and formal logic.</p>
                          <p>By providing structured academic feedback and methodological recommendations, we ensured the theoretical framework met the highest standards of excellence prior to submission at top-tier international journals.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View More <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Independent Researcher / Research Lab">Independent Researcher / Research Lab</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj8_network.png" alt="Social Network Analysis of Persons Associated with County Government (2025)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">USA</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Political Science / Governance / Network Analysis & AI App">Political Science / Governance / Network Analysis & AI App</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Social Network Analysis of Persons Associated with County Government (2025)">Social Network Analysis of Persons Associated with County Government (2025)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>Leveraging advanced Social Network Analysis (SNA), we mapped the complex relational structures among key individuals in county government to identify influential clusters and hidden influence patterns.</p>
                          <p>These insights revealed underlying governance dynamics, providing stakeholders with a data-driven understanding of communication flows and opportunities for structural reform.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://civic-map-maker-sicp.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            Launch Tool <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_sciencediplomacy-socialnetworkanalysis-datascience-activity-7449408266532528128-ujB_" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Researcher / Academic / Government Analyst">Researcher / Academic / Government Analyst</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj9_real.png" alt="Strategic International Relations Research (2025)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">Saudi Arabia</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="International Relations / AI / Healthcare-Adjacent">International Relations / AI / Healthcare-Adjacent</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Strategic International Relations Research (2025)">Strategic International Relations Research (2025)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>We executed a strategic research initiative analyzing cross-border institutional dynamics, geopolitical shifts, and emerging global macroeconomic trends within contemporary international relations and global AI landscapes.</p>
                          <p>The rigorous synthesis of these factors culminated in highly tailored recommendations, enabling the client to navigate complex diplomatic environments with confidence and foresight.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://www.linkedin.com/posts/dr-jaya-goyal-8686361b_thrilled-to-share-that-i-have-successfully-activity-7396115832243884032-kuaA" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View LinkedIn Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="NGO / Healthcare Organisation / AI Body">NGO / Healthcare Organisation / AI Body</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj10_real.png" alt="CryoCorp O2 LLP – Industrial Oxygen Plant Business Development & Market Strategy (2025)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">India (with East Africa market exploration)</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Cryogenic Technology / Industrial Gas / Green Energy">Cryogenic Technology / Industrial Gas / Green Energy</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="CryoCorp O2 LLP – Industrial Oxygen Plant Business Development & Market Strategy (2025)">CryoCorp O2 LLP – Industrial Oxygen Plant Business Development & Market Strategy (2025)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>In a co-founder capacity, we spearheaded foundational market research and business development for CryoCorp O2 LLP, navigating procurement strategies and leading intensive investor outreach.</p>
                          <p>We designed and executed an aggressive go-to-market strategy to deploy industrial oxygen plants across high-need markets in India and East Africa, securing vital early-stage partnerships.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://chatgpt.com/g/g-68650921e3b48191b61d8b06a7978505-cryogenic-solutions-assistant" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 px-3 py-1.5">
                            Cryogenic Solutions AI Assistant <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Private Sector / Co-Founder / LLP">Private Sector / Co-Founder / LLP</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj11_real.png" alt="MOOCs, AI & Education (2026)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">Oman</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="AI / Education / Learning Analytics / University">AI / Education / Learning Analytics / University</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="MOOCs, AI & Education (2026)">MOOCs, AI & Education (2026)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>We collaborated extensively with leading university researchers to investigate the transformative applications of Artificial Intelligence within Massive Open Online Courses (MOOCs) and broader higher-education environments.</p>
                          <p>Our contributions spanned complex data analysis, the interpretation of advanced learning analytics, and collaborative manuscript writing. The resulting academic publication provided critical insights into how AI-driven tools can enhance pedagogical strategies, personalize learning pathways, and dramatically improve global student engagement.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View More <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="Technology Giant / Academic Collaboration">Technology Giant / Academic Collaboration</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj12_real.png" alt="Public Health Research Protocol Review & Refinement (2024)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">South Africa</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Public Health / Healthcare">Public Health / Healthcare</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Public Health Research Protocol Review & Refinement (2024)">Public Health Research Protocol Review & Refinement (2024)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p>Our team was tasked with the comprehensive review and methodological refinement of a complex public health research protocol. We systematically strengthened the retrospective cross-sectional study design, optimized the STATA-based statistical analysis plan, and expanded the underlying literature review to include the latest epidemiological data.</p>
                          <p>By rigorously refining the study variables and producing a concise, high-impact academic executive summary, we significantly elevated the research protocol's clarity, rigor, and potential for securing rapid Institutional Review Board (IRB) approval.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View More <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="University Researcher">University Researcher</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow md:max-h-[400px]">
                      <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 overflow-hidden bg-border border-b md:border-b-0 md:border-r border-border">
                        <img src="/proj_governance_sna.png" alt="Governance SNA — Civic Map Maker for Local Institutions in India (2025)" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded shrink-0">India</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded text-right line-clamp-1" title="Social Network Analysis / Governance / Citizen Accountability">Social Network Analysis / Governance / Citizen Accountability</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-sm text-primary leading-snug line-clamp-3" title="Governance SNA — Civic Map Maker for Local Institutions in India (2025)">Governance SNA — Civic Map Maker for Local Institutions in India (2025)</h4>
                        
                        <div className="text-xs text-muted leading-relaxed space-y-3">
                          <p><strong>Make the Invisible Visible. Hold the State Accountable.</strong> Poor outcomes aren't just about a lack of funds — they are driven by information barriers, hidden hierarchies, and power misuse at the local level.</p>
                          <p>This Interactive Tool is the practical application of Dr. Jaya Goyal's academic research on Public Service Delivery. It turns complex sociological concepts into a visual tool any citizen can use to map the real network of influence in their local institutions.</p>
                          <p>By uploading a public committee list (like Gram Panchayat, Municipal Ward, or RKS Hospital), you can generate a Social Network Analysis (SNA) map. Identify the true "bridges" holding departments together, recognize unsung champions, and expose bottlenecks.</p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://civic-map-maker-sicp.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            Launch Tool <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://substack.com/home/post/p-193454164" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-primary truncate" title="In-House Research Product / Circadian Connect LLP">In-House Research Product / Circadian Connect LLP</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* ════════════════════════════════════════ RESEARCH WORK ══ */}
          {activeTab === 'research_work' && (
            <motion.div
              key="research_work"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-16 md:py-24 px-4 md:px-8 lg:px-12 flex-1"
            >
              <div className="max-w-6xl mx-auto space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">Use Cases Governance</h2>
                  <p className="text-lg text-muted leading-relaxed">
                    A comprehensive collection of our latest publications, journal articles, and strategic reports driving evidence-based governance across multiple domains.
                  </p>
                  <div className="pt-2">
                    <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer">
                      <Button variant="navy" size="lg">Contact Us</Button>
                    </a>
                  </div>
                </div>

                {/* Grid of Publications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {(() => {
                    return researchPublications.map((pub, idx) => {
                      const finalImage = pub.image || "/education_india_v2.png";
                      return (
                      <Card key={idx} className="p-0 flex flex-col h-full glass-panel rounded-[2rem] border border-white/60 shadow-xl shadow-primary/5 card-3d-tilt overflow-hidden group bg-white">
                        
                        {/* Top Image Section */}
                        <div className="h-[250px] md:h-[280px] w-full relative overflow-hidden">
                          <img 
                            src={finalImage} 
                            alt={pub.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Floating Category */}
                          <div className="absolute top-4 right-4 shadow-lg border border-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 bg-primary/90 rounded-2xl p-2 px-3">
                            <span className="text-white text-[10px] font-bold uppercase tracking-wider">{pub.category}</span>
                          </div>
                          
                          {/* Floating Type */}
                          <div className="absolute bottom-4 left-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-white bg-primary/45 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                              {pub.type}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Text Section */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-10 bg-white">
                          <div className="space-y-4 mb-6">
                            <h3 className="font-display font-bold text-xl md:text-2xl text-primary leading-tight group-hover:text-accent transition-colors duration-300">
                              {pub.title}
                            </h3>
                            <p className="text-base text-muted leading-relaxed font-medium">
                              {pub.desc}
                            </p>
                          </div>
                          
                          <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-3">
                            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="w-full md:w-auto hover:bg-primary hover:text-white transition-colors group/btn">
                                Read More <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </Button>
                            </a>
                            <Button variant="teal" size="sm" onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="w-full md:w-auto">
                              Enquire Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                    });
                  })()}
                </div>
              </div>
            </motion.div>
          )}


          {/* ════════════════════════════════════════ BOOK A DISCUSSION ══ */}
          {activeTab === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="flex-1 w-full"
            >
              {/* ── Hero Banner ── */}
              <div className="relative w-full bg-[#130524] overflow-hidden pt-32 pb-20 px-6">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-4">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-white/80">Schedule a Conversation</span>
                    </div>
                  </motion.div>
                  <motion.h1 initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                    className="text-4xl md:text-6xl font-display font-black text-white tracking-tight leading-tight">
                    Book a Discussion<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-400">with Circadian</span>
                  </motion.h1>
                  <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
                    className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                    Choose the conversation type that fits your needs. We keep it intentional, focused, and productive.
                  </motion.p>
                </div>
              </div>

              {/* ── Meeting Types Grid ── */}
              <div className="py-20 px-6 bg-transparent relative">
                <div className="max-w-screen-xl mx-auto">
                  <ScrollReveal>
                    <div className="text-center mb-14 space-y-3">
                      <Eyebrow>Choose Your Format</Eyebrow>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-primary tracking-tight">Four Ways to Connect</h2>
                      <p className="text-muted text-lg max-w-xl mx-auto">Each session type is designed for a specific stage of partnership — from first hello to deep collaboration.</p>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[
                      {
                        emoji: '👋', mins: '20 min', title: 'Introductory Conversation',
                        desc: 'A first meeting to learn about each other, share what Circadian does, and explore whether there is a meaningful area of alignment.',
                        tags: ['First Meeting', 'No Agenda Required'],
                        accent: 'from-purple-500 to-purple-700',
                        border: 'border-purple-100',
                        bg: 'bg-purple-50/50',
                      },
                      {
                        emoji: '🤝', mins: '30 min', title: 'Collaboration Exploration',
                        desc: "A focused discussion to explore shared areas of work, potential joint projects, or where Circadian's expertise can support your goals.",
                        tags: ['Partnership Focus', 'Specific Topic'],
                        accent: 'from-amber-500 to-orange-600',
                        border: 'border-amber-100',
                        bg: 'bg-amber-50/50',
                      },
                      {
                        emoji: '🎯', mins: '45 min', title: 'Strategic Discussion',
                        desc: 'A deeper conversation around advisory or consultancy scoping — for organisations ready to explore a structured engagement with Circadian.',
                        tags: ['Advisory', 'Consultancy Scoping'],
                        accent: 'from-purple-600 to-pink-700',
                        border: 'border-purple-100',
                        bg: 'bg-purple-50/50',
                      },
                      {
                        emoji: '🛠️', mins: '60 min', title: 'Innovation Workshop Discussion',
                        desc: 'A working session to co-design a workshop, research programme, or innovation sprint — for teams ready to move from ideas to action.',
                        tags: ['Workshop Design', 'Co-creation'],
                        accent: 'from-orange-500 to-amber-600',
                        border: 'border-orange-100',
                        bg: 'bg-orange-50/40',
                      },
                    ].map((type, i) => (
                      <ScrollReveal key={i} delay={i * 0.1}>
                        <div className={`bento-card card-glow h-full flex flex-col p-7 ${type.bg} ${type.border} border-2 group`}>
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.accent} flex items-center justify-center text-2xl mb-5 shadow-md`}>
                            {type.emoji}
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-white text-xs font-black uppercase tracking-wider text-primary mb-3 w-fit">
                            ⏱ {type.mins}
                          </div>
                          <h3 className="font-display font-bold text-xl text-primary leading-tight mb-3">{type.title}</h3>
                          <p className="text-sm text-muted leading-relaxed font-medium flex-1 mb-5">{type.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {type.tags.map(tag => (
                              <span key={tag} className="text-[0.65rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-white border border-border text-muted">{tag}</span>
                            ))}
                          </div>
                          <a
                            href="https://calendar.app.google/6BW693F9VsVsR8fV8"
                            target="_blank" rel="noopener noreferrer"
                            className={`group/btn inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-2xl bg-gradient-to-r ${type.accent} text-white text-sm font-bold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}
                          >
                            Book {type.mins} Session
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* ── Calendly Inline Embed ── */}
                  <ScrollReveal delay={0.2}>
                    <div className="mt-16 rounded-[2rem] overflow-hidden border-2 border-primary/10 shadow-2xl shadow-primary/10 bg-white">
                      <div className="text-center py-8 px-6 bg-gradient-to-r from-[#130524] to-[#1e0a3c] border-b border-white/10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-4">
                          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-white/80">Live Availability</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Book Your Meeting Directly</h3>
                        <p className="text-slate-400 text-sm">Pick a time that works for you — instant confirmation, no back-and-forth.</p>
                      </div>
                      <iframe
                        src="https://calendar.app.google/6BW693F9VsVsR8fV8"
                        width="100%"
                        height="700"
                        frameBorder="0"
                        title="Book a Meeting with Circadian Connect"
                        style={{ minWidth: '320px', display: 'block' }}
                      />
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* ── What to Expect Section ── */}
              <div className="py-20 px-6 bg-white border-t border-border">
                <div className="max-w-screen-xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal direction="left">
                      <div className="space-y-6">
                        <Eyebrow>What Happens Next</Eyebrow>
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-primary tracking-tight">A simple, intentional process</h2>
                        <p className="text-muted text-lg leading-relaxed">No lengthy forms. No complex onboarding. Just a focused conversation to explore whether Circadian is the right partner for your work.</p>
                        <div className="space-y-4">
                          {[
                            { step: '01', title: 'You book a session', desc: 'Choose the session type above and pick a time that works for you. You\'ll get a confirmation email with the meeting link and a short Circadian overview.' },
                            { step: '02', title: 'We prepare', desc: 'We review your booking details and prepare a focused agenda tailored to the session type and your area of interest.' },
                            { step: '03', title: 'We meet', desc: 'A focused, productive conversation — we listen more than we speak. No hard selling, no pitch decks, just honest dialogue.' },
                            { step: '04', title: 'We follow up', desc: 'Within 24 hours, you\'ll receive a follow-up email with any next steps, materials, or proposed pathways discussed in the meeting.' },
                          ].map((s, i) => (
                            <div key={i} className="flex gap-5 p-5 rounded-2xl bg-surface border border-border hover:shadow-md transition-all duration-300 group">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#2b084c] text-white font-black text-sm flex items-center justify-center shrink-0 font-mono shadow-sm">{s.step}</div>
                              <div>
                                <h4 className="font-bold text-primary text-base mb-1 group-hover:text-accent transition-colors">{s.title}</h4>
                                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Right: Questions asked before booking */}
                    <ScrollReveal direction="right">
                      <div className="bg-[#130524] rounded-[2rem] p-8 md:p-10 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/15 rounded-full blur-[60px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/70">When You Book</span>
                          </div>
                          <h3 className="text-white font-display font-bold text-2xl mb-2">We'll ask a few short questions</h3>
                          <p className="text-slate-400 text-sm mb-6">So we can make the most of our time together.</p>
                          <div className="space-y-3">
                            {[
                              'Your organisation and role',
                              'Your area of interest',
                              'The objective of this discussion',
                              'Preferred outcomes from the session',
                              'How you heard about Circadian',
                            ].map((q, i) => (
                              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/8">
                                <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="h-3 w-3 text-accent stroke-[3]" />
                                </div>
                                <span className="text-slate-300 text-sm font-medium">{q}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8">
                            <a
                              href="https://calendar.app.google/6BW693F9VsVsR8fV8"
                              target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 w-full justify-center py-4 px-6 rounded-2xl bg-gradient-to-r from-accent to-amber-500 text-white font-black text-sm shadow-xl hover:-translate-y-0.5 transition-all duration-300 group/cta"
                            >
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              Schedule on Google Calendar
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>

              {/* ── Why Meet With Us ── */}
              <div className="py-20 px-6 bg-surface border-t border-border">
                <div className="max-w-screen-xl mx-auto">
                  <ScrollReveal>
                    <div className="text-center mb-12 space-y-3">
                      <Eyebrow>Why Circadian</Eyebrow>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-primary tracking-tight">What makes our approach different</h2>
                    </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Shield, title: 'Rigorous & Independent', desc: 'Our work is methodologically rigorous and independent. We bring academic credibility and practitioner experience to every engagement.' },
                      { icon: Globe, title: 'Globally Connected', desc: 'We work across geographies — from India to the UK and beyond — with deep local knowledge and international networks.' },
                      { icon: Star, title: 'Human-Centred Always', desc: 'Every project we take on prioritises people over technology. We ensure AI systems are socially grounded, culturally aware, and community-vetted.' },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <ScrollReveal key={i} delay={i * 0.1}>
                          <div className="bento-card p-8 h-full flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary shadow-sm">
                              <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-primary">{item.title}</h3>
                            <p className="text-muted text-sm leading-relaxed font-medium flex-1">{item.desc}</p>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ════════════════════════════════════════ FAQ ══ */}
          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-16 md:py-24 px-4 md:px-8 lg:px-12 flex-1 bg-purple-50/20 min-h-screen"
            >
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <Eyebrow>Knowledge Base</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">Frequently Asked Questions</h2>
                  <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
                    Explore our approach to risk, strategy, responsible AI evaluation, and our diverse research methodologies.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: "What is Circadian Connect?",
                      a: "Circadian Connect bridges the gap between Science, Society, and AI. We curate design and methodology to empower sustainable, inclusive, and responsible solutions for a better tomorrow across various domains like healthcare, governance, and technology."
                    },
                    {
                      q: "What is the Responsible AI Integration Readiness (RAIR) Scorecard?",
                      a: "The RAIR Scorecard is our proprietary evaluation framework used to audit and assess Large Language Models (LLMs) and automated systems. It measures socio-technical maturity across governance, data equity, and human-centered impact."
                    },
                    {
                      q: "How does Circadian Connect approach AI governance?",
                      a: "We specialize in comprehensive Risk Assessments and mitigation strategies. Our approach ensures that governance protocols are not just theoretically robust but highly actionable in real-world environments, minimizing regulatory risks while maximizing societal benefit."
                    },
                    {
                      q: "What services do you offer in Public Health and Child Nutrition?",
                      a: "We are specialists in policy analysis, advocacy, and evaluation services. We consult on government policies, evaluate program effectiveness through data collection, and provide actionable policy recommendations, specifically focusing on Early Childhood Care and Nutrition."
                    },
                    {
                      q: "How does your Social Network Analysis (SNA) mapping tool work?",
                      a: "Our Civic Map Maker translates complex sociological concepts into an interactive tool. Citizens and stakeholders can upload public committee data to visualize local institutional networks, identify influence structures, and expose operational bottlenecks in public service delivery."
                    },
                    {
                      q: "Do you provide consulting for Environmental, Social, and Governance (ESG) frameworks?",
                      a: "Yes, we provide strategic consulting on ESG integration. By analyzing governance structures and conducting performance evaluations, we help organizations build responsible and compliant operational frameworks."
                    },
                    {
                      q: "What is your expertise in AI and Education?",
                      a: "We collaborate with academic institutions to research the application of Artificial Intelligence in Massive Open Online Courses (MOOCs) and higher education. We analyze learning analytics to enhance pedagogical strategies and improve global student engagement."
                    },
                    {
                      q: "Who can benefit from taking the RAIR Quiz?",
                      a: "Organizations deploying or building AI tools in high-stakes environments can use the RAIR Quiz to evaluate their readiness. It helps identify critical gaps in data bias, accountability mechanisms, and community impact before they become liabilities."
                    },
                    {
                      q: "Do you work with private sector startups and industries?",
                      a: "Absolutely. Our portfolio includes diverse industries, from healthcare and automotive data analytics to industrial oxygen plant development, helping them navigate market entry, risk mitigation, and business development strategies."
                    },
                    {
                      q: "How can I schedule a strategy session or consultation?",
                      a: "You can use our Enquire Now available across the site, or the 'Contact Us' button in our navigation. This brief 10-15 minute form helps us understand your context so we can jointly design the right study or consultancy for you."
                    }
                  ].map((item, idx) => (
                    <details key={idx} className="group bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-purple-50/40 transition-colors">
                        <h4 className="text-lg font-bold text-slate-800 pr-6">{item.q}</h4>
                        <span className="flex-shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-purple-100/40">
                        <p>{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>

                <div className="text-center pt-8">
                   <p className="text-slate-500 mb-6 font-medium">Still have questions?</p>
                   <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer">
                      <Button variant="navy" size="lg">Contact Our Team</Button>
                   </a>
                   <p className="text-xs text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
                     By submitting this Tally form, you agree that Circadian Connect may use the information provided to respond to your enquiry and communicate with you regarding your request. Please see our <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); setActiveTab('privacy_policy'); }} className="underline hover:text-slate-600 transition-colors">Privacy Policy</a> for more information.
                   </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'privacy_policy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <PrivacyPolicy />
            </motion.div>
          )}

          {activeTab === 'terms_of_use' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <TermsOfUse />
            </motion.div>
          )}

          <SeoExpertiseGlossary />

      </AnimatePresence>
      <Footer currentPath={currentPath} setPath={navigate} />
          {/* ── Consultation Modal ── */}
      <AnimatePresence>
        {consultationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(14,27,53,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setConsultationModalOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="rounded-2xl p-7 md:p-8 max-w-md w-full border border-border shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setConsultationModalOpen(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-border hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: NAVY }}
                >
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary font-display leading-snug">Enquire Now</h3>
                
                <div className="space-y-3 text-muted text-sm leading-relaxed">
                  <p className="font-semibold text-foreground">Thank you for connecting with us.</p>
                  <p>
                    To help us prepare for our first meeting and develop a tailored approach, please complete the brief questionnaire below. It takes about 10-15 minutes.
                  </p>
                  <p>
                    Your answers will help us understand your organisation's context, the service(s) you are considering, your objectives, timeline, budget and key parameters — so that our discussion is efficient and we can jointly design the right study or consultancy.
                  </p>
                  <p>
                    Once you submit your responses, we will review them and follow-up to schedule an introductory meeting to discuss next steps.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex gap-3 justify-end items-center">
                <button
                  type="button"
                  onClick={() => setConsultationModalOpen(false)}
                  className="px-5 py-2.5 border border-border hover:bg-surface text-sm font-semibold rounded-full text-surface0 transition-colors"
                >
                  Cancel
                </button>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setConsultationModalOpen(false)}
                  className="inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none active:scale-[0.97] select-none cursor-pointer px-6 py-3 text-sm rounded-full bg-accent hover:bg-accent text-white shadow-md shadow-accent/20"
                >
                  Open Questionnaire
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>
    </div>
  );
}


