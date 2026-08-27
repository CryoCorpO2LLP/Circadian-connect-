import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_home_content = """<div className="w-full bg-white text-slate-800">
                {/* Hero Section */}
                <div className="relative w-full min-h-[90vh] flex items-center bg-[#f9fafb] overflow-hidden">
                  {/* Network Background Particles */}
                  <div className="absolute inset-0 network-bg opacity-40">
                    <div className="dot-navy w-4 h-4" style={{ top: '15%', left: '10%' }} />
                    <div className="dot-crimson w-6 h-6" style={{ top: '25%', right: '20%' }} />
                    <div className="dot-teal w-3 h-3" style={{ bottom: '20%', left: '30%' }} />
                    <div className="dot-outline w-8 h-8" style={{ top: '40%', right: '10%' }} />
                    <div className="dot-outline-red w-5 h-5" style={{ bottom: '30%', right: '40%' }} />
                  </div>
                  
                  <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      {/* Left: Typography */}
                      <div className="space-y-8">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="eyebrow"
                        >
                          Research Solutions Provider
                        </motion.div>
                        
                        <motion.h1 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="display-bold text-5xl md:text-6xl lg:text-7xl"
                        >
                          Bridging <span className="text-crimson">Science,</span> <br />Society & Policy
                        </motion.h1>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="prose-body text-lg md:text-xl max-w-xl"
                        >
                          Curating design and methodology at the interface of science, society, and policy. We empower sustainable, inclusive solutions for a better tomorrow.
                        </motion.p>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-wrap gap-4 pt-6"
                        >
                          <Button variant="navy" size="xl" onClick={() => setActiveTab('usecases')}>Explore Our Projects</Button>
                          <Button variant="outline" size="xl" onClick={() => setActiveTab('about')}>Discover Who We Are</Button>
                        </motion.div>
                      </div>

                      {/* Right: Clean Image Frame */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="hidden lg:block relative"
                      >
                        <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-card aspect-[4/3] bg-white">
                           <img src="/hero_professional.png" alt="Professional Research" className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-[#4c1d95] mix-blend-color opacity-10" />
                        </div>
                        {/* Decorative floating card */}
                        <div className="absolute -bottom-10 -left-10 card-clean p-6 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center">
                            <ShieldAlert className="h-6 w-6 text-[#4c1d95]" />
                          </div>
                          <div>
                            <p className="font-bold text-[#4c1d95]">Pioneering AI Equity</p>
                            <p className="text-sm text-slate-500">Partnering with global leaders</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Impact by the Numbers */}
                <div className="py-20 bg-white border-b border-slate-100">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <div className="pt-8 md:pt-0">
                        <p className="display-bold text-5xl mb-2 text-[#4c1d95]">17+</p>
                        <p className="eyebrow text-slate-500">Years Experience</p>
                      </div>
                      <div className="pt-8 md:pt-0">
                        <p className="display-bold text-5xl mb-2 text-[#f97316]">Global</p>
                        <p className="eyebrow text-slate-500">Research Footprint</p>
                      </div>
                      <div className="pt-8 md:pt-0">
                        <p className="display-bold text-5xl mb-2 text-[#4c1d95]">100%</p>
                        <p className="eyebrow text-slate-500">Commitment to Equity</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Pillars Section */}
                <div className="py-24 px-6 bg-[#f9fafb]">
                  <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      <div className="section-divider-center"></div>
                      <h2 className="section-heading text-4xl md:text-5xl">Our Expertise</h2>
                      <p className="prose-body text-lg">Specialized domains where we deliver the most impact through rigorous methodology.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { icon: ShieldAlert, title: "Responsible AI", desc: "Evaluating LLMs for societal biases and ensuring equitable technological deployment.", color: "text-[#f97316]", bg: "bg-[#fff7ed]" },
                        { icon: Globe, title: "Environment & Governance", desc: "Risk assessments, impact evaluations, and analyzing governance structures.", color: "text-[#4c1d95]", bg: "bg-[#f5f3ff]" },
                        { icon: BookOpen, title: "International Higher Ed", desc: "Strategy development and partnership evaluation using the IAD framework.", color: "text-[#4c1d95]", bg: "bg-[#f5f3ff]" }
                      ].map((pillar, idx) => (
                        <div key={idx} className="card-clean p-10 flex flex-col items-start group cursor-pointer" onClick={() => setActiveTab('usecases')}>
                          <div className={`w-14 h-14 rounded-lg ${pillar.bg} flex items-center justify-center mb-6`}>
                            <pillar.icon className={`h-7 w-7 ${pillar.color}`} />
                          </div>
                          <h3 className="text-xl font-bold text-[#1e293b] mb-4 group-hover:text-[#2ea3f2] transition-colors">{pillar.title}</h3>
                          <p className="prose-body flex-1">{pillar.desc}</p>
                          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#2ea3f2]">
                            Learn More <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="section-dark py-24 relative overflow-hidden">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  
                  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
                    <h2 className="display-bold-white text-4xl md:text-5xl">Ready to bridge the gap?</h2>
                    <p className="text-xl text-[#f5f3ff] font-light max-w-2xl mx-auto">
                      Partner with Circadian Connect to bring rigorous methodology, social awareness, and equity to your next big project.
                    </p>
                    <div className="pt-6">
                      <Button variant="outline-white" size="xl" onClick={() => setActiveTab('about')}>
                        Meet The Team
                      </Button>
                    </div>
                  </div>
                </div>
              </div>"""

# Replace between {activeTab === 'home' && (\n            <motion.div\n              key="home"\n              initial={{ opacity: 0, y: 16 }}\n              animate={{ opacity: 1, y: 0 }}\n              exit={{ opacity: 0, y: -16 }}\n              className="flex-1 w-full"\n            >
# and </motion.div> right before {/* ════════════════════════════════════════ USE CASES INDIA ══ */}

pattern = re.compile(r'<div className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-center">.*?</div>\s*</div>\s*</motion\.div>', re.DOTALL)
content = pattern.sub(new_home_content + '\n            </motion.div>', content, count=1)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Home page completely redesigned to babl.ai vibe!")
