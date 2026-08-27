import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

const TermsOfUse = () => {
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
    { id: 'section-1', label: '01. About Circadian Connect' },
    { id: 'section-2', label: '02. Use of the Website' },
    { id: 'section-3', label: '03. Website Content' },
    { id: 'section-4', label: '04. Accuracy of Information' },
    { id: 'section-5', label: '05. Professional Information & No Guarantee' },
    { id: 'section-6', label: '06. Third-Party Websites & Services' },
    { id: 'section-7', label: '07. Meeting Bookings' },
    { id: 'section-8', label: '08. Intellectual Property' },
    { id: 'section-9', label: '09. Privacy' },
    { id: 'section-10', label: '10. Disclaimer of Warranties' },
    { id: 'section-11', label: '11. Limitation of Liability' },
    { id: 'section-12', label: '12. Changes to the Website & Terms' },
    { id: 'section-13', label: '13. Governing Law' },
    { id: 'section-14', label: '14. Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 text-foreground">
      <Helmet>
        <title>Terms of Use | Circadian Connect</title>
        <meta name="description" content="Read the Circadian Connect Terms of Use governing access to and use of the Circadian Connect website." />
      </Helmet>
      
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Page Header */}
        <div className="max-w-[780px] mb-16 md:mb-24 lg:ml-[300px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-primary">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Terms of Use
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 font-medium">
            The terms governing your access to and use of the Circadian Connect website.
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
              <p>Welcome to Circadian Connect.</p>
              <p>
                These Terms of Use govern your access to and use of <a href="https://circadianconnect.com/" target="_blank" rel="noopener noreferrer">https://circadianconnect.com/</a> (the "Website"). By accessing or using the Website, you agree to these Terms of Use.
              </p>
              <p>If you do not agree with these terms, please do not use the Website.</p>
            </div>

            {/* Sections */}
            <section id="section-1" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">01</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">About Circadian Connect</h2>
              </div>
              <div className="space-y-4">
                <p>
                  Circadian Connect provides information about its work, areas of expertise, services, discussions, advisory activities, governance-related work, responsible AI initiatives, and related offerings through this Website.
                </p>
                <p>
                  The content presented on the Website is intended for general informational purposes unless expressly stated otherwise.
                </p>
              </div>
            </section>

            <section id="section-2" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">02</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Use of the Website</h2>
              </div>
              <div className="space-y-4">
                <p>You agree to use the Website only for lawful purposes and in a manner that does not:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>Violate any applicable law or regulation</li>
                  <li>Infringe the rights of Circadian Connect or any third party</li>
                  <li>Attempt to gain unauthorised access to the Website or its systems</li>
                  <li>Introduce malicious code, viruses, or other harmful material</li>
                  <li>Interfere with the security, availability, or operation of the Website</li>
                  <li>Use automated systems to improperly access, scrape, copy, or collect Website content where such activity is prohibited</li>
                </ul>
                <p>
                  We reserve the right to restrict or terminate access to the Website where reasonably necessary to protect the Website, our users, our systems, or our rights.
                </p>
              </div>
            </section>

            <section id="section-3" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">03</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Website Content</h2>
              </div>
              <div className="space-y-4">
                <p>
                  The information, text, graphics, images, designs, branding, logos, videos, and other materials displayed on the Website are owned by or licensed to Circadian Connect unless otherwise stated.
                </p>
                <p>
                  You may view and use Website content for your personal or legitimate business information purposes.
                </p>
                <p>
                  You may not reproduce, modify, distribute, republish, sell, or commercially exploit Website content without prior written permission from Circadian Connect, except where permitted by applicable law.
                </p>
              </div>
            </section>

            <section id="section-4" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">04</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Accuracy of Information</h2>
              </div>
              <div className="space-y-4">
                <p>
                  We make reasonable efforts to provide useful and accurate information on the Website.
                </p>
                <p>
                  However, we do not guarantee that all information is complete, current, accurate, or free from errors or omissions.
                </p>
                <p>
                  Website content may be updated, changed, or removed without prior notice.
                </p>
                <p>
                  You should not rely solely on information on the Website where a specific professional, legal, technical, financial, or other expert assessment is required.
                </p>
              </div>
            </section>

            <section id="section-5" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">05</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Professional Information & No Guarantee</h2>
              </div>
              <div className="space-y-4">
                <p>
                  Information presented on the Website does not necessarily constitute professional, legal, financial, technical, regulatory, or other specialised advice.
                </p>
                <p>
                  Any discussion, advisory engagement, workshop, consultation, or other service provided by Circadian Connect may be subject to separate terms, agreements, statements of work, or engagement documents.
                </p>
                <p>
                  The Website itself does not create a client, advisory, consulting, partnership, employment, or other formal relationship between you and Circadian Connect.
                </p>
              </div>
            </section>

            <section id="section-6" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">06</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Third-Party Websites and Services</h2>
              </div>
              <div className="space-y-4">
                <p>
                  The Website may contain links to third-party websites or services, including meeting scheduling services such as Google Calendar and other external platforms.
                </p>
                <p>These third-party websites operate independently from Circadian Connect.</p>
                <p>
                  We do not control and are not responsible for the availability, content, security, privacy practices, or terms of third-party websites.
                </p>
                <p>
                  Your use of third-party services may be subject to their own terms and policies.
                </p>
              </div>
            </section>

            <section id="section-7" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">07</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Meeting Bookings</h2>
              </div>
              <div className="space-y-4">
                <p>
                  Circadian Connect may provide links through the Website that allow you to schedule meetings or conversations.
                </p>
                <p>Meeting scheduling may be facilitated through <strong>Google Calendar</strong>.</p>
                <p>
                  Submitting a booking request does not necessarily guarantee that Circadian Connect will enter into a formal engagement with you.
                </p>
                <p>
                  Any formal engagement may be subject to separate discussions, agreements, terms, or documentation.
                </p>
              </div>
            </section>

            <section id="section-8" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">08</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Intellectual Property</h2>
              </div>
              <div className="space-y-4">
                <p>
                  All intellectual property rights in the Website and its original content, including branding, design, text, graphics, and other materials, belong to Circadian Connect or the relevant rights holder unless otherwise stated.
                </p>
                <p>
                  Nothing in these Terms grants you ownership of any intellectual property belonging to Circadian Connect.
                </p>
              </div>
            </section>

            <section id="section-9" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">09</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Privacy</h2>
              </div>
              <div className="space-y-4">
                <p>Your use of the Website is also subject to our Privacy Policy.</p>
                <p>Our Privacy Policy explains how we collect, use, store, and protect personal information.</p>
                <p>
                  You can review it here:{' '}
                  <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); window.location.href = '/privacy-policy'; }} className="text-primary hover:text-primary/80 transition-colors font-medium underline">
                    /privacy-policy
                  </a>
                </p>
              </div>
            </section>

            <section id="section-10" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">10</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Disclaimer of Warranties</h2>
              </div>
              <div className="space-y-4">
                <p>
                  To the maximum extent permitted by applicable law, the Website and its content are provided on an "as is" and "as available" basis.
                </p>
                <p>Circadian Connect does not guarantee that:</p>
                <ul className="list-disc pl-6 space-y-1 mb-6 text-slate-600 marker:text-slate-300">
                  <li>The Website will always be available or uninterrupted</li>
                  <li>The Website will be free from errors</li>
                  <li>The Website will be free from harmful components</li>
                  <li>Information on the Website will always be complete, current, or accurate</li>
                  <li>The Website will meet every user's specific requirements</li>
                </ul>
              </div>
            </section>

            <section id="section-11" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">11</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Limitation of Liability</h2>
              </div>
              <div className="space-y-4">
                <p>
                  To the maximum extent permitted by applicable law, Circadian Connect will not be liable for losses or damages arising from your use of, or inability to use, the Website or reliance on information presented on the Website.
                </p>
                <p>
                  This limitation does not exclude liability that cannot legally be excluded or limited under applicable law.
                </p>
              </div>
            </section>

            <section id="section-12" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">12</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Changes to the Website and These Terms</h2>
              </div>
              <div className="space-y-4">
                <p>We may modify, update, suspend, or discontinue any part of the Website at any time.</p>
                <p>We may also update these Terms of Use from time to time.</p>
                <p>When we update these Terms, we will update the Effective Date shown at the beginning of the page.</p>
                <p>
                  Your continued use of the Website after changes are published constitutes acceptance of the updated Terms, to the extent permitted by applicable law.
                </p>
              </div>
            </section>

            <section id="section-13" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">13</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Governing Law</h2>
              </div>
              <div className="space-y-4">
                <p>These Terms of Use shall be interpreted in accordance with applicable laws.</p>
                <p>
                  Any specific governing law or jurisdiction applicable to a formal engagement with Circadian Connect may be established separately through the relevant agreement or engagement documentation.
                </p>
              </div>
            </section>

            <section id="section-14" className="pt-8 border-t border-border/50">
              <div className="mb-6 flex flex-col items-start">
                <span className="text-sm font-bold text-primary mb-1 tracking-widest opacity-80">14</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-wide">Contact Us</h2>
              </div>
              <div className="space-y-4">
                <p>If you have questions regarding these Terms of Use, please contact:</p>
                <p className="font-semibold text-slate-900 mt-4">Circadian Connect</p>
                <p>
                  Email: <a href="mailto:support@circadianconnect.com" className="text-primary hover:text-primary/80 transition-colors font-medium">support@circadianconnect.com</a><br/>
                  Website: <a href="https://circadianconnect.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-medium">https://circadianconnect.com/</a>
                </p>
              </div>
            </section>

            {/* Legal Disclaimer */}
            <div className="mt-20 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Legal Disclaimer</h4>
              <p className="text-sm text-slate-500 m-0 leading-relaxed">
                These Terms of Use are intended as a general website terms document and should be reviewed by appropriate legal counsel and customised according to Circadian Connect's legal structure, jurisdiction, services, contractual arrangements, and applicable laws before publication.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
