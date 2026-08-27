import re

jsx_file = "src/App.jsx"

with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# Add FAQ to navItems
nav_pattern = r"(const navItems = \[\s*\{ id: 'home',      label: 'Home' \},\s*\{ id: 'usecases',  label: 'Use Cases - Responsible AI' \},\s*\{ id: 'research_work', label: 'Research Work' \},\s*\{ id: 'about',     label: 'About Us' \})(\s*\];)"
nav_replacement = r"\1,\n    { id: 'faq',       label: 'FAQ' }\2"

content = re.sub(nav_pattern, nav_replacement, content)

faq_tab_content = """          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pt-24 pb-12 min-h-screen"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 space-y-12">
                
                <div className="text-center space-y-4 mb-16">
                  <Eyebrow>Inquiries</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4c1d95]">Frequently Asked Questions</h2>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">Explore our approach to risk, strategy, and responsible AI evaluation.</p>
                </div>

                <div className="space-y-6">
                  
                  {/* Dropdown 1: Risk and Strategy */}
                  <details className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                      <h3 className="text-xl font-bold text-[#1e293b]">Risk & Strategy</h3>
                      <span className="ml-4 flex-shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                      <p className="mb-4">
                        Our track in Governance has included improving the delivery of public programmes by analyzing their governance structures, conducting performance and impact evaluations, and providing advisory on Public-Private Partnerships.
                      </p>
                      <p>
                        We specialize in comprehensive <strong>Risk Assessments and mitigation strategies</strong>. We conduct thorough impact assessments and stakeholder analyses to ensure that governance protocols are not only theoretically robust but highly actionable in real-world environments.
                      </p>
                    </div>
                  </details>

                  {/* Dropdown 2: RAIR Score Card */}
                  <details className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                      <h3 className="text-xl font-bold text-[#1e293b]">RAIR Score Card</h3>
                      <span className="ml-4 flex-shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                      <p className="mb-4">
                        The <strong>RAIR (Responsible AI Research) Score Card</strong> is our proprietary evaluation framework used to audit and assess Large Language Models (LLMs) and automated systems.
                      </p>
                      <p>
                        It focuses on evaluating societal biases, ensuring equitable technological deployment, and verifying operator semantics. The scorecard delivers a highly practical blueprint for responsible AI deployment in high-stakes environments, minimizing regulatory risks while maximizing societal benefit.
                      </p>
                    </div>
                  </details>

                </div>

              </div>
            </motion.div>
          )}

"""

# Insert right after `<AnimatePresence mode="wait">\n`
# If that is not found, we insert right before `{activeTab === 'home' && (`
insert_pattern = r"(<AnimatePresence mode=\"wait\">\s*)({\s*activeTab === 'home' && \()"
insert_replacement = r"\1" + faq_tab_content + r"\2"

content = re.sub(insert_pattern, insert_replacement, content)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("FAQ tab added successfully.")
