import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('section-1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id^="section-"]');
      let current = 'section-1';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'section-1', label: '01. Information We Collect' },
    { id: 'section-2', label: '02. How We Collect Information' },
    { id: 'section-3', label: '03. How We Use Your Information' },
    { id: 'section-4', label: '04. Sharing of Personal Information' },
    { id: 'section-5', label: '05. Third-Party Services and Links' },
    { id: 'section-6', label: '06. Cookies and Similar Technologies' },
    { id: 'section-7', label: '07. Data Retention' },
    { id: 'section-8', label: '08. Data Security' },
    { id: 'section-9', label: '09. Your Privacy Rights' },
    { id: 'section-10', label: '10. Children\'s Privacy' },
    { id: 'section-11', label: '11. International Data Processing' },
    { id: 'section-12', label: '12. Changes to This Privacy Policy' },
    { id: 'section-13', label: '13. Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 text-foreground">
      <Helmet>
        <title>Privacy Policy | Circadian Connect</title>
        <meta name="description" content="Read the Circadian Connect Privacy Policy to understand how we collect, use, protect and manage personal information." />
      </Helmet>
      
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Page Header */}
        <div className="max-w-[780px] mb-16 md:mb-24 lg:ml-[300px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-primary">Legal & Privacy</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 font-medium">
            How Circadian Connect collects, uses, and protects information when you interact with our website and services.
          </p>
          <div className="text-sm font-semibold tracking-wide uppercase text-slate-400">
            Effective 26 August 2026
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">
          
          {/* Mobile Navigation */}
          <div className="lg:hidden w-full sticky top-20 z-40 bg-surface/95 backdrop-blur-md pb-4 pt-4 border-b border-border/50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between bg-white border border-border px-5 py-3.5 rounded-xl font-medium text-slate-700 shadow-sm"
            >
              <span>On this page</span>
              {mobileMenuOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg p-2 max-h-[60vh] overflow-y-auto">
                {navItems.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`block px-4 py-3 text-sm rounded-lg transition-colors ${activeSection === item.id ? 'bg-primary/5 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation (Sticky) */}
          <div className="hidden lg:block w-[220px] shrink-0 sticky top-32">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">On this page</h3>
            <nav className="flex flex-col gap-1 border-l border-border/60">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`py-2 pl-4 pr-2 text-sm transition-all duration-200 border-l-2 -ml-[1px] ${
                    activeSection === item.id 
                      ? 'border-primary text-primary font-bold bg-primary/[0.03]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="w-full max-w-[780px] text-[16px] md:text-[18px] text-slate-700 leading-relaxed space-y-16">
            
            <div className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-[#4c1d95] prose-a:no-underline hover:prose-a:underline prose-li:my-1">
              <p>
                Circadian Connect respects your privacy and is committed to protecting the personal information you share with us.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, and protect information when you visit or interact with <a href="https://circadianconnect.com/" target="_blank" rel="noopener noreferrer">https://circadianconnect.com/</a> (the "Website"), contact us through our forms, or schedule a meeting with us.
              </p>
              <p>
                By using our Website or voluntarily providing your information, you acknowledge the practices described in this Privacy Policy.
              </p>
            </div>

            {/* Sections */}
            <section id="section-1" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">01</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Information We Collect</h2>
              </div>
              <div className="space-y-4">
                <p>We may collect personal information that you voluntarily provide to us through the Website.</p>
                <p>Depending on how you interact with Circadian Connect, this may include:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>First name</li>
                  <li>Last name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Information you provide in enquiry or contact forms</li>
                  <li>Information you provide when requesting or scheduling a meeting</li>
                  <li>Any other information you choose to include in communications with us</li>
                </ul>
                <p>We only request information that is reasonably necessary for the purpose for which it is collected.</p>
                
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Information collected when booking a meeting</h3>
                <p>
                  When you schedule a meeting with Circadian Connect, you may be asked to provide information such as your name, email address, meeting details, availability, and other information required to arrange the meeting.
                </p>
                <p>
                  Meeting scheduling is facilitated through <strong>Google Calendar</strong>. Information submitted through the Google Calendar booking process may be processed by Google Calendar in accordance with its own privacy policy and terms.
                </p>
              </div>
            </section>

            <section id="section-2" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">02</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">How We Collect Information</h2>
              </div>
              <div className="space-y-4">
                <p>We may collect information through:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>Contact and enquiry forms on our Website</li>
                  <li>Meeting or consultation booking forms</li>
                  <li>Direct communications with Circadian Connect</li>
                  <li>Third-party services used to provide specific Website functionality, such as Tally and Google Calendar</li>
                </ul>
                <p>
                  Our contact form is provided through <strong>Tally</strong>, a third-party form service. Information submitted through the form may be processed by Tally on our behalf and may also be subject to Tally's privacy practices.
                </p>
              </div>
            </section>

            <section id="section-3" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">03</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">How We Use Your Information</h2>
              </div>
              <div className="space-y-4">
                <p>We may use the information you provide to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>Respond to your enquiries and requests</li>
                  <li>Contact you regarding a request you have submitted</li>
                  <li>Schedule and manage meetings or consultations</li>
                  <li>Understand your requirements and prepare for discussions</li>
                  <li>Provide information about Circadian Connect and its services</li>
                  <li>Communicate with you regarding an ongoing engagement or enquiry</li>
                  <li>Improve our Website, services, and user experience</li>
                  <li>Maintain the security and functionality of the Website</li>
                  <li>Comply with applicable legal and regulatory obligations</li>
                </ul>
                <p>
                  We will not use your personal information for purposes that are incompatible with the purpose for which it was collected unless permitted or required by applicable law.
                </p>
              </div>
            </section>

            <section id="section-4" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">04</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Sharing of Personal Information</h2>
              </div>
              <div className="space-y-4">
                <p>We do not sell or rent your personal information.</p>
                <p>We may share personal information where reasonably necessary with:</p>
                
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Service providers</h3>
                <p>We may use trusted third-party service providers to operate parts of our Website and business. These may include:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li><strong>Tally Form</strong>, which provides forms used to collect enquiries and contact information.</li>
                  <li><strong>Google Calendar</strong>, which provides meeting scheduling functionality.</li>
                </ul>
                <p>
                  These providers may process information according to their own privacy policies and applicable contractual arrangements.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Legal and regulatory requirements</h3>
                <p>
                  We may disclose information where required to do so by applicable law, regulation, legal process, court order, or governmental authority.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Business protection</h3>
                <p>
                  We may also disclose information where reasonably necessary to protect our rights, property, security, users, or the integrity of our Website and services.
                </p>
              </div>
            </section>

            <section id="section-5" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">05</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Third-Party Services and Links</h2>
              </div>
              <div className="space-y-4">
                <p>Our Website may contain links to third-party websites or services.</p>
                <p>For example, our meeting-booking functionality may direct you to Google Calendar.</p>
                <p>
                  Once you leave the Circadian Connect Website or interact directly with a third-party service, that third party's privacy policy and terms may apply.
                </p>
                <p>
                  We are not responsible for the privacy practices, security, or content of third-party websites or services.
                </p>
                <p>
                  We encourage you to review the privacy policies of third-party services before providing them with personal information.
                </p>
              </div>
            </section>

            <section id="section-6" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">06</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Cookies and Similar Technologies</h2>
              </div>
              <div className="space-y-4">
                <p>
                  Our Website may use cookies or similar technologies that are necessary for the Website to function properly.
                </p>
                <p>
                  Third-party services integrated into the Website may also use cookies or similar technologies for functionality, security, analytics, or other purposes.
                </p>
                <p>
                  The specific cookies used may depend on the services and technologies active on the Website at any given time.
                </p>
                <p>
                  You can manage or restrict cookies through your browser settings. Disabling certain cookies may affect the functionality of parts of the Website.
                </p>
              </div>
            </section>

            <section id="section-7" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">07</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Data Retention</h2>
              </div>
              <div className="space-y-4">
                <p>We retain personal information only for as long as reasonably necessary to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>Fulfil the purpose for which it was collected</li>
                  <li>Respond to or manage your enquiry</li>
                  <li>Maintain records of business communications and engagements</li>
                  <li>Meet legal, regulatory, accounting, or reporting requirements</li>
                  <li>Resolve disputes or enforce our agreements</li>
                </ul>
                <p>
                  The specific retention period may vary depending on the nature of the information and the purpose for which it was collected.
                </p>
              </div>
            </section>

            <section id="section-8" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">08</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Data Security</h2>
              </div>
              <div className="space-y-4">
                <p>
                  We take reasonable administrative, technical, and organisational measures to protect personal information against unauthorised access, alteration, disclosure, loss, or misuse.
                </p>
                <p>
                  However, no method of transmitting or storing information electronically can be guaranteed to be completely secure.
                </p>
                <p>
                  You should therefore avoid submitting highly sensitive or confidential information through ordinary website forms unless specifically requested by Circadian Connect through an appropriate secure channel.
                </p>
              </div>
            </section>

            <section id="section-9" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">09</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Your Privacy Rights</h2>
              </div>
              <div className="space-y-4">
                <p>Depending on applicable law and your location, you may have rights concerning your personal information.</p>
                <p>These may include the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>Request access to personal information we hold about you</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of personal information where legally applicable</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Request information about how your personal information is being processed</li>
                  <li>Raise a concern or complaint regarding the handling of your personal information</li>
                </ul>
                <p>To exercise an applicable privacy right, please contact us using the details provided below.</p>
                <p>We may need to verify your identity before processing certain requests.</p>
              </div>
            </section>

            <section id="section-10" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">10</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Children's Privacy</h2>
              </div>
              <div className="space-y-4">
                <p>Our Website is intended for a general audience and is not specifically directed at children.</p>
                <p>We do not knowingly seek to collect personal information from children where such collection is prohibited by applicable law.</p>
                <p>If you believe that a child has provided personal information to us without appropriate consent, please contact us so that we can take appropriate action.</p>
              </div>
            </section>

            <section id="section-11" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">11</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">International Data Processing</h2>
              </div>
              <div className="space-y-4">
                <p>Some of our third-party service providers may process or store information in countries other than the country in which you are located.</p>
                <p>Where applicable, such processing may be subject to the privacy laws, contractual safeguards, and security measures of the relevant service provider.</p>
                <p>By using our Website and voluntarily submitting information, you acknowledge that your information may be processed by our service providers in accordance with applicable law.</p>
              </div>
            </section>

            <section id="section-12" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">12</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Changes to This Privacy Policy</h2>
              </div>
              <div className="space-y-4">
                <p>We may update this Privacy Policy from time to time to reflect changes in our Website, services, technology, legal requirements, or privacy practices.</p>
                <p>When we make changes, we will update the Effective Date at the beginning of this policy.</p>
                <p>We encourage you to review this page periodically to remain informed about how we handle personal information.</p>
              </div>
            </section>

            <section id="section-13" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">13</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Contact Us</h2>
              </div>
              <div className="space-y-4">
                <p>If you have questions about this Privacy Policy, want to exercise an applicable privacy right, or have a concern about how your information is handled, please contact:</p>
                <p className="font-semibold text-slate-900 mt-4">Circadian Connect</p>
                <p>
                  Email: <a href="mailto:support@circadianconnect.com" className="text-primary hover:text-primary/80 transition-colors font-medium">support@circadianconnect.com</a><br/>
                  Website: <a href="https://circadianconnect.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-medium">https://circadianconnect.com/</a>
                </p>
              </div>
            </section>

            {/* Privacy Contact Card */}
            <div className="mt-20 p-8 md:p-10 bg-white border border-border/60 rounded-3xl shadow-sm text-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Questions about your privacy?</h3>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                If you have questions about this Privacy Policy or how your information is handled, we're happy to help.
              </p>
              <a 
                href="https://tally.so/r/3ERZrN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold tracking-wide focus-visible:outline-none transition-all duration-300 hover:-translate-y-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-md px-6 py-3"
              >
                Contact Circadian Connect
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Legal Disclaimer</h4>
              <p className="text-sm text-slate-500 m-0 leading-relaxed">
                This Privacy Policy is intended to explain Circadian Connect's general privacy practices. It should be reviewed and customised based on the Website's actual technology, third-party services, data-processing practices, business structure, and applicable laws before publication.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
