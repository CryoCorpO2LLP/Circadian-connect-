import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_home_content = """<div className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-center">
                {/* Dynamic Background Elements */}
                <div className="absolute inset-0">
                  <img src="/hero_professional.png" className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt="Hero Background" />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#4c1d95]/80 to-slate-900/90" />
                  
                  {/* Decorative Orbs */}
                  <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#f97316] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
                  <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#6d28d9] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000" />
                  <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-[#4c1d95] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl"
                      >
                        <Sparkles className="h-4 w-4 text-[#f97316]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Premium Research Solutions</span>
                      </motion.div>
                      
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
                      >
                        Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">Science,</span> <br />Society & Policy
                      </motion.h1>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl font-light"
                      >
                        Curating design and methodology at the interface of science, society, and policy. We empower sustainable, inclusive solutions for a better tomorrow.
                      </motion.p>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-4 pt-4"
                      >
                        <Button variant="teal" size="xl" onClick={() => setActiveTab('usecases')} className="shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]">
                          Explore Our Projects
                        </Button>
                        <Button variant="outline-white" size="xl" onClick={() => setActiveTab('about')} className="backdrop-blur-sm">
                          Discover Who We Are
                        </Button>
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="hidden lg:block relative"
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/50 backdrop-blur-xl aspect-square max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                         <img src="/hero_ai_india.png" alt="AI India Concept" className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                         <div className="absolute bottom-8 left-8 right-8">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                               <p className="text-white font-bold text-lg mb-1">Pioneering Responsible AI</p>
                               <p className="text-slate-300 text-sm">Partnering with global tech giants.</p>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="relative -mt-20 z-20 px-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="text-center px-4">
                      <p className="text-5xl font-black text-[#4c1d95] mb-2 tracking-tighter">17+</p>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Years Experience</p>
                    </div>
                    <div className="text-center px-4 pt-8 md:pt-0">
                      <p className="text-5xl font-black text-[#f97316] mb-2 tracking-tighter">Global</p>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Research Footprint</p>
                    </div>
                    <div className="text-center px-4 pt-8 md:pt-0">
                      <p className="text-5xl font-black text-[#6d28d9] mb-2 tracking-tighter">100%</p>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Commitment to Equity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Pillars Section */}
              <div className="py-32 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto space-y-16">
                  <div className="text-center max-w-2xl mx-auto space-y-4">
                    <Eyebrow>Our Expertise</Eyebrow>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4c1d95]">Core Research Pillars</h2>
                    <p className="text-slate-600 text-lg">Specialized domains where we deliver the most impact through rigorous methodology.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { icon: ShieldAlert, title: "Responsible AI", desc: "Evaluating LLMs for societal biases and ensuring equitable technological deployment.", color: "text-[#f97316]", bg: "bg-[#f97316]/10" },
                      { icon: Globe, title: "Environment & Governance", desc: "Risk assessments, impact evaluations, and analyzing governance structures.", color: "text-[#4c1d95]", bg: "bg-[#4c1d95]/10" },
                      { icon: BookOpen, title: "International Higher Ed", desc: "Strategy development and partnership evaluation using the IAD framework.", color: "text-[#6d28d9]", bg: "bg-[#6d28d9]/10" }
                    ].map((pillar, idx) => (
                      <Card key={idx} className="p-10 hover:-translate-y-2 transition-transform duration-300 border-transparent hover:border-[#4c1d95]/20 hover:shadow-2xl bg-white group">
                        <div className={`w-16 h-16 rounded-2xl ${pillar.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <pillar.icon className={`h-8 w-8 ${pillar.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">{pillar.desc}</p>
                        <button onClick={() => setActiveTab('usecases')} className="flex items-center gap-2 text-sm font-bold text-[#f97316] group-hover:gap-4 transition-all">
                          Learn More <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative py-24 bg-[#4c1d95] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6d28d9] rounded-full mix-blend-screen filter blur-[100px] opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ready to bridge the gap?</h2>
                  <p className="text-xl text-[#a78bfa] font-light max-w-2xl mx-auto">
                    Partner with Circadian Connect to bring rigorous methodology, social awareness, and equity to your next big project.
                  </p>
                  <div className="pt-4">
                    <Button variant="teal" size="xl" onClick={() => setActiveTab('about')} className="shadow-2xl shadow-[#f97316]/20">
                      Meet The Team
                    </Button>
                  </div>
                </div>
              </div>"""

pattern = re.compile(r'<div className="relative w-full bg-slate-900 overflow-hidden">.*?</div>\s*</div>\s*</motion\.div>', re.DOTALL)
content = pattern.sub(new_home_content + '\n            </motion.div>', content, count=1)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Home page completely redesigned!")
