import re

jsx_file = "src/App.jsx"
with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove testimonials from navItems
content = re.sub(r",\s*\{\s*id:\s*'testimonials',\s*label:\s*'Testimonials'\s*\}", "", content)

# 2. Remove the old Testimonials tab block entirely
old_testimonials_pattern = r'\{/\* ════════════════════════════════════════ TESTIMONIALS ══ \*/\}(.*?)\{/\* ── Consultation Modal ── \*/\}'
content = re.sub(old_testimonials_pattern, r'{/* ── Consultation Modal ── */}', content, flags=re.DOTALL)

# 3. Change Home tab to be scrollable
content = content.replace(
    'className="flex-1 flex flex-col overflow-hidden"\n              style={{ maxHeight: \'calc(100vh - 72px)\' }}',
    'className="flex-1 flex flex-col overflow-y-auto bg-white"\n              style={{ maxHeight: \'calc(100vh - 72px)\' }}'
)

# Make the hero section maintain a minimum height so it doesn't collapse
content = content.replace(
    '<div className="flex flex-col md:flex-row flex-1 overflow-hidden">',
    '<div className="flex flex-col md:flex-row shrink-0 overflow-hidden" style={{ minHeight: \'calc(100vh - 72px - 72px)\' }}>'
)

# 4. Create the new stunning Testimonials Section JSX
new_testimonials_jsx = """
              {/* ── Testimonials Section on Home Page ── */}
              <div className="py-20 px-6 md:px-14 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <p className="text-[#f97316] text-[10px] font-black uppercase tracking-[0.18em]">Endorsements</p>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#4c1d95]">
                      Trusted By Global Leaders
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base">
                      Independent academic reviews and methodological endorsements from top technology giants and research institutions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Google LLC */}
                    <Card className="p-8 bg-gradient-to-br from-[#4c1d95] to-[#3b0764] text-white shadow-xl lg:col-span-1 transform hover:-translate-y-1 transition-all duration-300">
                      <Quote className="h-8 w-8 text-[#f97316] opacity-80 mb-6" />
                      <p className="text-white/90 font-serif italic text-lg leading-relaxed mb-8">
                        "We have been processing and analyzing the data for which we contracted Circadian Connect LLP, and are very excited by what it contains and the preliminary trends we see. Thank you so much for all your effort towards collecting it over the different rounds."
                      </p>
                      <div className="pt-6 border-t border-white/20">
                        <p className="font-bold text-white text-sm">Research Scientist</p>
                        <p className="text-white/60 text-xs mt-1">Responsible AI & Human-Centered Tech</p>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#4c1d95] bg-white px-2 py-1 rounded inline-block">
                          Google Alphabet LLC
                        </div>
                      </div>
                    </Card>

                    {/* Vinodkumar */}
                    <Card className="p-8 bg-[#f5f6f8] border border-slate-200 lg:col-span-1 shadow-sm hover:shadow-md transition-all duration-300">
                      <Quote className="h-6 w-6 text-[#0d9488] mb-6" />
                      <div className="text-slate-700 font-serif text-sm leading-relaxed space-y-3 mb-6 line-clamp-6">
                        <p>I am writing to strongly recommend Dr. Jaya Goyal for the U.S.-India AI Fellowship Program 2024-2025. In my capacity as a Staff Research Scientist and a lead of the Technology, Society, AI and Culture team at Google Research, I have worked closely with Dr. Jaya Goyal and her company, Circadian Connect LLP in 2022-23.</p>
                        <p>Jaya co-designed the research methodology with Google researchers and collected primary data, contributing to the study's success. Jaya is a co-author in two journal articles with me and my colleagues, both of which were presented at international top-tier AI conferences, such as NeurIPS.</p>
                      </div>
                      <a href="https://docs.google.com/document/d/1CTrL4lsPlHkIiEBCkxn3YkluRKYz5fUzFghBqGAk_tA/edit" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#0d9488] hover:underline mb-8">
                        Read Full Letter <ArrowUpRight className="h-3 w-3" />
                      </a>
                      <div className="pt-6 border-t border-slate-200">
                        <p className="font-bold text-[#4c1d95] text-sm">Dr. Vinodkumar Prabhakaran</p>
                        <p className="text-slate-500 text-xs mt-1">Staff Research Scientist and Manager<br/>Co-Lead, Tech, AI, Society, & Culture</p>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#0d9488] bg-[#0d9488]/10 px-2 py-1 rounded inline-block">
                          Google Research
                        </div>
                      </div>
                    </Card>

                    {/* Bruce Tisler */}
                    <Card className="p-8 bg-[#f5f6f8] border border-slate-200 lg:col-span-1 shadow-sm hover:shadow-md transition-all duration-300">
                      <Quote className="h-6 w-6 text-[#ea580c] mb-6" />
                      <div className="text-slate-700 font-serif text-sm leading-relaxed space-y-3 mb-6 line-clamp-6">
                        <p>I engaged Dr. Jaya Goyal to provide independent academic review of work produced through my research institution, Quantum Inquiry. The material under review was formally abstract, interdisciplinary, and technically demanding: a multi-paper research program spanning PDE stability theory, formal logic, operator algebras, quantum cognition, and preregistered empirical design.</p>
                        <p>In both reviews, Dr. Goyal demonstrated a capacity that is rare and difficult to find: she engaged with the work on its own terms. She did not reduce the framework to a familiar category or dismiss what was unfamiliar.</p>
                      </div>
                      <a href="https://drive.google.com/file/d/1csjP_4Ec-NBvr396cHZmfCrvMnq2TapP/view?ts=6a22a77d" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#ea580c] hover:underline mb-8">
                        Read Full Review <ArrowUpRight className="h-3 w-3" />
                      </a>
                      <div className="pt-6 border-t border-slate-200">
                        <p className="font-bold text-[#4c1d95] text-sm">Bruce Tisler</p>
                        <p className="text-slate-500 text-xs mt-1">Founder & Principal Researcher</p>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 rounded inline-block">
                          Quantum Inquiry
                        </div>
                      </div>
                    </Card>

                  </div>
                </div>
              </div>
"""

# Inject the new section before the closing </motion.div> of the Home tab
content = content.replace(
    '</motion.div>\n          )}\n\n          {/* ════════════════════════════════════════ SERVICES ══ */}',
    new_testimonials_jsx + '\n            </motion.div>\n          )}\n\n          {/* ════════════════════════════════════════ SERVICES ══ */}'
)

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Moved and redesigned testimonials for the Home page.")
