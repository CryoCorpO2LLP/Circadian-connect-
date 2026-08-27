import sys
import re

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove from navItems
content = re.sub(r"\s*\{\s*id:\s*'faq',\s*label:\s*'FAQ'\s*\},\n", "\n", content)

# 2. Remove desktop dropdown logic
desktop_pattern = r"\s*if\s*\(\s*item\.id\s*===\s*'faq'\s*\)\s*\{\s*return\s*\(\s*<div.*?</div>\s*\);\s*\}"
content = re.sub(desktop_pattern, "", content, flags=re.DOTALL)

# 3. Remove mobile dropdown logic
mobile_pattern = r"\s*if\s*\(\s*item\.id\s*===\s*'faq'\s*\)\s*\{\s*return\s*\(\s*<div.*?</div>\s*\);\s*\}"
content = re.sub(mobile_pattern, "", content, flags=re.DOTALL)

# 4. Insert FAQ section into rair_scorecard
# The rair_scorecard tab ends with something like:
#           </div>
#         </motion.div>
#       )}

faq_jsx = """
                {/* RAIR FAQ Section */}
                <div className="mt-16 bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-sm">
                  <div className="text-center space-y-4 mb-10">
                    <Eyebrow>Inquiries</Eyebrow>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight text-primary">Frequently Asked Questions</h3>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">Explore our approach to risk, strategy, and responsible AI evaluation.</p>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    <details className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-100 transition-colors">
                        <h4 className="text-lg font-bold text-slate-800">Risk & Strategy</h4>
                        <span className="ml-4 flex-shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-200/50">
                        <p className="mb-3">
                          Our track in Governance has included improving the delivery of public programmes by analyzing their governance structures, conducting performance and impact evaluations, and providing advisory on Public-Private Partnerships.
                        </p>
                        <p>
                          We specialize in comprehensive <strong>Risk Assessments and mitigation strategies</strong>. We conduct thorough impact assessments and stakeholder analyses to ensure that governance protocols are not only theoretically robust but highly actionable in real-world environments.
                        </p>
                      </div>
                    </details>

                    <details className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-100 transition-colors">
                        <h4 className="text-lg font-bold text-slate-800">RAIR Score Card</h4>
                        <span className="ml-4 flex-shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-200/50">
                        <p className="mb-3">
                          The <strong>RAIR (Responsible AI Integration Readiness) Score Card</strong> is our proprietary evaluation framework used to audit and assess Large Language Models (LLMs) and automated systems.
                        </p>
                        <p>
                          It focuses on evaluating societal biases, ensuring equitable technological deployment, and verifying operator semantics. The scorecard delivers a highly practical blueprint for responsible AI deployment in high-stakes environments, minimizing regulatory risks while maximizing societal benefit.
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
"""

# The rair_scorecard section has a submit/results part:
#               {quizSubmitted && (
# ...
#               )}
#             </div>
#           </motion.div>
#         )}

# We'll inject the FAQ right before the closing </div> of the main wrapper in the rair_scorecard tab.
# Let's find: <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 space-y-12">
# Or just before `</motion.div>\n          )}` but only for the rair_scorecard tab.

rair_end_pattern = r"(                \}\)}\s*</div>\s*</div>\s*\)\}\s*)(</div>\s*</motion\.div>\s*)\}"
# Wait, let's just use string replacement if we can find a unique marker.
# "score)}`)}>Take the Quiz Again</Button>\n                    </div>\n                  </div>\n                </div>\n              )}\n            </div>\n          </motion.div>\n        )}"
# Let's match the "Take the Quiz Again" button.
target = "</Button>\n                    </div>\n                  </div>\n                </div>\n              )}\n"
replacement = "</Button>\n                    </div>\n                  </div>\n                </div>\n              )}\n" + faq_jsx

if target in content:
    content = content.replace(target, replacement)
    print("Successfully injected FAQ into RAIR Scorecard tab.")
else:
    print("Failed to find injection point for FAQ in RAIR Scorecard tab.")

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)
