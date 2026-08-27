import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# 1. We replace the navigation items mapping to handle the FAQ dropdown via CSS group hover
old_nav_mapping = """            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                  activeTab === item.id ? 'text-[#f97316]' : 'text-slate-600 hover:text-[#4c1d95]'
                }`}
              >
                {item.label}
              </button>
            ))}"""

new_nav_mapping = """            {navItems.map(item => {
              if (item.id === 'faq') {
                return (
                  <div key={item.id} className="relative group">
                    <button
                      className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                        ['faq', 'risk_strategy', 'rair_scorecard'].includes(activeTab) ? 'text-[#f97316]' : 'text-slate-600 group-hover:text-[#4c1d95]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white border border-slate-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 z-50">
                      <button onClick={() => setActiveTab('risk_strategy')} className="text-left px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#f97316] transition-colors border-b border-slate-100">
                        Risk & Strategy
                      </button>
                      <button onClick={() => setActiveTab('rair_scorecard')} className="text-left px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#f97316] transition-colors border-b border-slate-100">
                        RAIR Score Card
                      </button>
                      <button onClick={() => setConsultationModalOpen(true)} className="text-left px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#f97316] transition-colors">
                        Quiz / Questionnaire
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                    activeTab === item.id ? 'text-[#f97316]' : 'text-slate-600 hover:text-[#4c1d95]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}"""

content = content.replace(old_nav_mapping, new_nav_mapping)

# Update mobile menu
old_mobile_menu = """                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`text-left text-sm font-bold uppercase tracking-wide py-2 ${
                      activeTab === item.id ? 'text-[#f97316]' : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}"""

new_mobile_menu = """                {navItems.map(item => {
                  if (item.id === 'faq') {
                    return (
                      <div key={item.id} className="flex flex-col gap-2 py-2">
                        <span className="text-left text-sm font-bold uppercase tracking-wide text-slate-400">FAQ</span>
                        <div className="pl-4 flex flex-col gap-3 border-l-2 border-slate-100 mt-2">
                          <button onClick={() => { setActiveTab('risk_strategy'); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wide ${activeTab === 'risk_strategy' ? 'text-[#f97316]' : 'text-slate-600'}`}>Risk & Strategy</button>
                          <button onClick={() => { setActiveTab('rair_scorecard'); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wide ${activeTab === 'rair_scorecard' ? 'text-[#f97316]' : 'text-slate-600'}`}>RAIR Score Card</button>
                          <button onClick={() => { setConsultationModalOpen(true); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wide text-slate-600`}>Quiz</button>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                      className={`text-left text-sm font-bold uppercase tracking-wide py-2 ${
                        activeTab === item.id ? 'text-[#f97316]' : 'text-slate-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}"""
content = content.replace(old_mobile_menu, new_mobile_menu)

# 2. Find and remove the old FAQ tab content
pattern_old_faq = r"          \{activeTab === 'faq' && \([\s\S]*?className=\"pt-24 pb-12 min-h-screen\"[\s\S]*?<\/motion\.div>\s*\)\}"
content = re.sub(pattern_old_faq, "", content)

# 3. Inject the new pages for Risk & Strategy and RAIR Score Card right before `{activeTab === 'home'`
new_pages = """          {activeTab === 'risk_strategy' && (
            <motion.div
              key="risk_strategy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pt-24 pb-24 min-h-screen bg-slate-50"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-12">
                <div className="text-center space-y-4 mb-16">
                  <Eyebrow>FAQ & Insights</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4c1d95]">Risk & Strategy</h2>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">Evaluating governance structures and building resilient mitigation strategies.</p>
                </div>
                
                <Card className="p-8 md:p-12 bg-white">
                  <div className="prose prose-slate max-w-none space-y-6">
                    <p className="text-lg text-slate-700 leading-relaxed font-semibold">
                      Our track in Governance has included improving the delivery of public programmes by analyzing their governance structures, conducting performance and impact evaluations, and providing advisory on Public-Private Partnerships.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      We specialize in comprehensive <strong>Risk Assessments and mitigation strategies</strong>. By conducting thorough impact assessments and stakeholder analyses, we ensure that governance protocols are not only theoretically robust but highly actionable in real-world environments.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-8">
                      <h4 className="font-bold text-[#4c1d95] mb-3">Key Focus Areas:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Public-Private Partnership Advisory</li>
                        <li>Regulatory and Compliance Risk Assessment</li>
                        <li>Stakeholder Impact Evaluations</li>
                        <li>Strategic Roadmap Development</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'rair_scorecard' && (
            <motion.div
              key="rair_scorecard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pt-24 pb-24 min-h-screen bg-slate-50"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-12">
                <div className="text-center space-y-4 mb-16">
                  <Eyebrow>FAQ & Insights</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4c1d95]">RAIR Score Card</h2>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">Our proprietary framework for auditing Large Language Models and Responsible AI.</p>
                </div>
                
                <Card className="p-8 md:p-12 bg-white">
                  <div className="prose prose-slate max-w-none space-y-6">
                    <p className="text-lg text-slate-700 leading-relaxed font-semibold">
                      The <strong>RAIR (Responsible AI Research) Score Card</strong> is an evaluation framework used to audit and assess Large Language Models (LLMs) and automated systems.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      It focuses on evaluating societal biases, ensuring equitable technological deployment, and verifying operator semantics. The scorecard delivers a highly practical blueprint for responsible AI deployment in high-stakes environments, minimizing regulatory risks while maximizing societal benefit.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <h4 className="font-bold text-[#f97316] mb-2">Societal Bias Audits</h4>
                        <p className="text-sm text-slate-600">Testing AI behavior across multiple languages and cultural contexts.</p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-[#4c1d95] mb-2">Operator Semantics</h4>
                        <p className="text-sm text-slate-600">Verifying logical stability and deployment equity in LLM applications.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

"""

insert_pattern = r"(<AnimatePresence mode=\"wait\">\s*)({\s*activeTab === 'home' && \()"
content = re.sub(insert_pattern, r"\1" + new_pages + r"\2", content)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("FAQ dropdown and separate pages implemented successfully.")
