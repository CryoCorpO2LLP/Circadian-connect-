import sys
import re

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add 'FAQ' to navItems
nav_pattern = r"(\{ id: 'about',\s*label: 'About Us' \},)"
nav_replacement = r"\1\n    { id: 'faq',       label: 'FAQ' },"

if "id: 'faq'" not in content:
    content = re.sub(nav_pattern, nav_replacement, content)
    print("Added FAQ to navItems.")
else:
    print("FAQ already in navItems.")

# 2. Add the FAQ Tab Content
faq_tab_content = """
          {/* ════════════════════════════════════════ FAQ ══ */}
          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-16 md:py-24 px-4 md:px-8 lg:px-12 flex-1 bg-slate-50 min-h-screen"
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
                      a: "You can use our Initial Inquiry Questionnaire available across the site, or the 'Contact Us' button in our navigation. This brief 10-15 minute form helps us understand your context so we can jointly design the right study or consultancy for you."
                    }
                  ].map((item, idx) => (
                    <details key={idx} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                        <h4 className="text-lg font-bold text-slate-800 pr-6">{item.q}</h4>
                        <span className="flex-shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
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
                </div>
              </div>
            </motion.div>
          )}
"""

# Insert the FAQ tab content right before </AnimatePresence> that wraps the tabs
insert_pattern = r"(</AnimatePresence>\s*\{/\*\s*── Consultation Modal ──\s*\*/\})"
if "activeTab === 'faq'" not in content:
    content = re.sub(insert_pattern, faq_tab_content + r"\n      \1", content)
    print("Injected FAQ tab content.")
else:
    print("FAQ tab content already exists.")


with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)
