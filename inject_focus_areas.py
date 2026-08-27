import re

jsx_file = "src/App.jsx"

with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

focus_areas_jsx = """
              {/* Focus Areas (Videos) */}
              <div className="py-24 px-6 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto space-y-24">
                  <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
                    <Eyebrow>Our Focus Areas</Eyebrow>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4c1d95]">Detailed Domains of Impact</h2>
                    <p className="text-slate-600 text-lg">A closer look at how our methodologies translate to real-world outcomes across our four main practice areas.</p>
                  </div>

                  {indiaUseCases.map((useCase, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}>
                      
                      {/* Video Side */}
                      <div className="w-full md:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#f97316]/20 to-[#4c1d95]/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">
                          <video 
                            src={`/video_${index + 1}.mp4`} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-auto object-cover aspect-video"
                          />
                        </div>
                      </div>

                      {/* Text Side */}
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider">
                          0{index + 1} • {useCase.theme}
                        </div>
                        <h3 className="text-3xl font-bold text-[#1e293b] leading-tight">{useCase.title}</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                          {useCase.description}
                        </p>
                        <div className="pt-4">
                          <Button variant="outline" size="lg" onClick={() => setActiveTab('usecases_india')}>
                            Explore Projects
                          </Button>
                        </div>
                      </div>

                    </div>
                  ))}

                </div>
              </div>

"""

pattern = r'(\s*)({\/\* CTA Section \*\/})'

new_content = re.sub(pattern, focus_areas_jsx + r'\1\2', content, count=1)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully injected Focus Areas with 4 videos.")
