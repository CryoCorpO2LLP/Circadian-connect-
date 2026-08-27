import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer = ({ currentPath, setPath }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1120] text-slate-300 border-t border-white/10 mt-auto w-full font-sans">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & CTA (Takes up 5 columns on desktop) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start">
            <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="inline-block mb-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl">
              <img src="/circadian_logo.png" alt="Circadian Connect Logo" className="h-10 w-auto" />
            </a>
            <div className="space-y-4 mb-8">
              <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                Have a question or an idea to explore?
              </h2>
              <p className="text-slate-400 text-base">Let's start a conversation.</p>
            </div>
            <a
              href="https://calendar.app.google/6BW693F9VsVsR8fV8"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center font-bold tracking-wide focus-visible:outline-none select-none cursor-pointer rounded-full transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-md hover:shadow-xl bg-gradient-to-r from-[#6b21a8] to-[#4c1d95] text-white border border-white/10 px-6 py-3 text-sm whitespace-nowrap"
            >
              Book a Meeting
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Spacer on large screens */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Grid (Takes up 6 columns on desktop) */}
          <div className="md:col-span-12 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Explore */}
            <div>
              <h3 className="text-white font-semibold mb-5 tracking-wide uppercase text-xs opacity-90">Explore</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">Home</a>
                </li>
                <li>
                  <a href="/research_work" onClick={(e) => handleLinkClick(e, '/research_work')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">Responsible AI</a>
                </li>
                <li>
                  <a href="/usecases" onClick={(e) => handleLinkClick(e, '/usecases')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">Governance</a>
                </li>
                <li>
                  <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/faq" onClick={(e) => handleLinkClick(e, '/faq')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-5 tracking-wide uppercase text-xs opacity-90">Legal</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, '/privacy-policy')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-of-use" onClick={(e) => handleLinkClick(e, '/terms-of-use')} className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors">Terms of Use</a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white font-semibold mb-5 tracking-wide uppercase text-xs opacity-90">Connect</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="mailto:support@circadianconnect.com" className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors break-words">
                    support@circadianconnect.com
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@CircadianConnect" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-[#c084fc] transition-colors inline-flex items-center gap-1 group">
                    YouTube
                    <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {currentYear} Circadian Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
