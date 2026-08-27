import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const seoData = [
  {
    category: "Responsible AI & Evaluation Services",
    keywords: "Responsible AI evaluation, AI risk assessment, trustworthy AI solutions, AI model auditing, LLM evaluation metrics, generative AI risk mapping, responsible AI framework, algorithmic accountability, AI transparency audit, AI red teaming, machine learning fairness, responsible AI deployment, human-in-the-loop evaluation, socio-technical AI metrics, automated systems evaluation, safe AI integration, AI maturity assessment, AI readiness audit, responsible AI certification, reliable AI testing, LLM robustness, AI vulnerability assessment, comprehensive AI audit, ethical AI development, AI evaluation agency"
  },
  {
    category: "AI Governance & Ethics Consulting",
    keywords: "AI governance consulting, AI ethics advisory, AI policy development, corporate AI governance framework, responsible AI compliance, ethical AI guidelines, AI regulatory compliance, AI strategy consulting, AI risk management, data governance in AI, AI board advisory, responsible innovation policy, AI standard operating procedures, AI ethics committee setup, global AI regulations, EU AI act compliance preparation, NIST AI RMF implementation, ethical tech consulting, AI impact assessment, AI policy research, corporate AI responsibility, algorithmic governance, enterprise AI governance, AI ethics training, responsible AI leadership"
  },
  {
    category: "Socio-technical Audits & Bias Assessments",
    keywords: "Socio-technical AI audit, algorithmic bias assessment, dataset bias detection, fairness in machine learning, AI bias mitigation, intersectional fairness AI, gender bias in AI, racial bias in LLMs, linguistic bias assessment, representation in training data, stereotype detection in NLP, bias testing framework, socio-technical systems analysis, cultural context in AI, debiasing algorithms, equitable AI design, inclusive AI development, AI equity audit, bias risk mapping, socio-technical evaluation framework, demographic parity testing, equal opportunity AI, fairness-aware machine learning, bias reporting, societal impact of AI"
  },
  {
    category: "MEL Frameworks & Public Policy",
    keywords: "Monitoring Evaluation and Learning (MEL) frameworks, MEL for digital programs, theory of change design, digital public goods evaluation, public policy analysis, social impact assessment, evidence-based policy consulting, developmental evaluation, tech for good impact measurement, government program evaluation, AI in public sector evaluation, civic tech assessment, public service delivery analysis, policy-grade research, governance diagnostics, socio-economic impact tracking, digital transformation MEL, qualitative policy research, mixed-methods evaluation, public sector accountability, participatory evaluation, social return on investment (SROI), programmatic evaluation, institutional capacity building, policy advocacy"
  },
  {
    category: "Regional AI Focus: India & Global South",
    keywords: "Responsible AI India, AI evaluation India, AI bias assessment India, AI governance consulting India, AI policy consulting Mumbai, Google AI research partner India, responsible AI consulting Global South, AI ethics India, tech policy India, digital inclusion India, LLM bias India, AI for Bharat, vernacular AI evaluation, Indian languages AI bias, AI regulation India, responsible AI startup India, public sector AI India, AI in Indian healthcare, AI in Indian agriculture, AI in Indian education, social impact AI India, AI ethics Global South, algorithmic fairness Global South, localized AI evaluation, contextual AI governance"
  },
  {
    category: "Social Network Analysis & Community Engagement",
    keywords: "Social Network Analysis (SNA), community engagement AI, citizen accountability tools, Gram Panchayat accountability, mapping networks of influence, institutional network analysis, civic map maker, participatory AI design, community-centric evaluation, stakeholder mapping, power dynamics analysis, social capital assessment, local governance transparency, community feedback mechanisms, grassroots tech evaluation, social network visualization, relational data analysis, civic tech platforms, public participation in AI, inclusive stakeholder engagement, democratic AI governance, social cohesion tracking, community trust building, marginalized voices in tech, participatory action research"
  },
  {
    category: "Specialized Domains: Healthcare, Education & ESG",
    keywords: "Nutrition governance India, early childhood care evaluation, public health policy analysis, women in STEM India, higher education policy India, AI in MOOCs, learning analytics evaluation, pedagogical AI strategies, ESG consulting India, Environmental Social Governance framework, ESG integration strategy, responsible tech ESG, social sustainability metrics, corporate social responsibility (CSR) AI, AI for climate change, sustainable AI development, AI in social sector, health tech evaluation, edtech impact assessment, ESG performance evaluation, green AI, digital sustainability, inclusive education tech, public health informatics evaluation, ESG compliance advisory"
  }
];

export default function SeoExpertiseGlossary() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-surface border-t border-border py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Areas of Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Our Specialized Capabilities</h2>
          <p className="text-muted leading-relaxed max-w-2xl mx-auto">
            A comprehensive glossary of the specialized methodologies, frameworks, and domains we operate in to deliver human-centered and responsible solutions.
          </p>
        </div>

        <div className="space-y-4 mt-8">
          {seoData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-purple-300 shadow-md' : 'border-purple-100/60 shadow-sm'}`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-purple-50/40 transition-colors rounded-2xl focus:outline-none"
                >
                  <h4 className="text-lg font-bold text-slate-800 pr-6">{item.category}</h4>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? '-rotate-180 bg-purple-100 text-purple-600' : 'text-slate-400'}`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-purple-100/40 text-sm">
                    <p className="font-medium text-slate-500 mb-2">Core Competencies:</p>
                    <p className="leading-loose">
                      {item.keywords.split(', ').map((keyword, kIdx) => (
                        <span key={kIdx} className="inline-block bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-md m-1 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors">
                          {keyword}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
