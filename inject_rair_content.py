import sys

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

target = """                </div>

                {/* Impact by the Numbers */}"""

replacement = """                </div>

                {/* RAIR Quiz Section */}
                <div className="py-24 relative bg-white border-t border-slate-100 overflow-hidden">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  
                  <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div className="space-y-6">
                        <ScrollReveal delay={0}>
                          <Eyebrow>Self-Assessment</Eyebrow>
                          <h2 className="display-bold text-4xl md:text-5xl text-primary mt-4">
                            Why Take the RAIR Scorecard?
                          </h2>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.1}>
                          <p className="prose-body text-lg max-w-xl text-slate-600">
                            The <strong>Responsible AI Integration Readiness (RAIR)</strong> scorecard helps organisations evaluate their maturity in deploying AI responsibly and safely.
                          </p>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.2}>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Assess AI Governance:</strong> Understand if you have the right frameworks to prevent harm to end-users and communities.</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Identify Data & Bias Risks:</strong> Check whether your tools are trained on representative data for diverse contexts.</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Ensure Accountability:</strong> Evaluate your grievance mechanisms and explainability to frontline workers and beneficiaries.</p>
                            </li>
                          </ul>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.3}>
                          <div className="pt-6">
                            <Button variant="teal" size="xl" onClick={() => setActiveTab('rair_scorecard')}>
                              Take the RAIR Quiz <ArrowUpRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                        </ScrollReveal>
                      </div>
                      
                      <ScrollReveal delay={0.2} direction="left">
                        <div className="relative">
                           <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 aspect-square md:aspect-[4/3] flex flex-col items-center justify-center p-8 text-center relative z-10">
                             <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                               <Target className="h-10 w-10 text-accent" />
                             </div>
                             <h3 className="text-2xl font-bold text-primary mb-3">Where does your organisation stand?</h3>
                             <p className="text-muted mb-8 max-w-sm">From 'Critical Risk Zone' to 'Responsible AI Leader', discover your score and actionable next steps.</p>
                             
                             <div className="w-full space-y-3">
                               <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                 <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-[#0d9488] w-[75%] rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                                 </div>
                               </div>
                               <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wide">
                                 <span>High Risk</span>
                                 <span>Mature</span>
                               </div>
                             </div>
                           </div>
                           <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-primary/5 border border-primary/10"></div>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>

                {/* Impact by the Numbers */}"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(jsx_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced.")
else:
    print("Target not found.")
