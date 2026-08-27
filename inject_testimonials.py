import re
import sys

jsx_file = "src/App.jsx"
with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update lucide-react imports
if "Quote" not in content[:1500]: # check near the top
    content = re.sub(r'(import \{[\s\S]*?)(\} from \'lucide-react\';)', r'\1, Quote \2', content, count=1)

# 2. Update navItems
if "id: 'testimonials'" not in content:
    content = re.sub(
        r"({ id: 'about',     label: 'About Us' }\s*)]",
        r"\1,\n    { id: 'testimonials', label: 'Testimonials' }\n  ]",
        content
    )

# 3. Inject Testimonials Tab
testimonials_jsx = """
          {/* ════════════════════════════════════════ TESTIMONIALS ══ */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex-1 overflow-y-auto bg-[#f5f6f8]"
              style={{ maxHeight: 'calc(100vh - 72px)' }}
            >
              <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 pb-20 space-y-12">
                <div className="text-center space-y-4">
                  <Eyebrow>Endorsements</Eyebrow>
                  <h1 className="font-display text-4xl md:text-5xl text-[#4c1d95] font-black tracking-tight">
                    What Our Partners Say
                  </h1>
                  <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
                    Trusted by leading researchers, institutions, and global technology giants to provide rigorous methodological oversight and independent academic review.
                  </p>
                </div>

                <div className="space-y-10">
                  
                  {/* Google - Short */}
                  <Card className="p-8 md:p-10 bg-white border-t-4 border-[#4c1d95]">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-4">
                        <Quote className="h-8 w-8 text-[#ea580c] opacity-50" />
                        <p className="text-slate-700 leading-relaxed font-serif text-lg italic">
                          "We have been processing and analyzing the data for which we contracted Circadian Connect LLP, and are very excited by what it contains and the preliminary trends we see. Thank you so much for all your effort towards collecting it over the different rounds."
                        </p>
                      </div>
                      <div className="md:w-64 shrink-0 flex flex-col justify-center border-l-2 border-slate-100 pl-6">
                        <h4 className="font-bold text-[#4c1d95]">Research Scientist</h4>
                        <p className="text-xs text-slate-500 mt-1">Responsible AI & Human-Centered Technology</p>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 rounded inline-block w-max">
                          Google Alphabet LLC, USA
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Vinodkumar - Medium/Long */}
                  <Card className="p-8 md:p-10 bg-white border-t-4 border-[#0d9488]">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-4">
                        <Quote className="h-8 w-8 text-[#ea580c] opacity-50" />
                        <div className="text-slate-700 leading-relaxed font-serif text-[15px] space-y-4">
                          <p>I am writing to strongly recommend Dr. Jaya Goyal for the U.S.-India AI Fellowship Program 2024-2025. In my capacity as a Staff Research Scientist and a lead of the Technology, Society, AI and Culture team at Google Research, I have worked closely with Dr. Jaya Goyal and her company, Circadian Connect LLP in 2022-23.</p>
                          <p>Jaya co-designed the research methodology with Google researchers and collected primary data, contributing to the study's success. Jaya is a co-author in two journal articles with me and my colleagues, both of which were presented at international top-tier AI conferences, such as NeurIPS.</p>
                          <p>Jaya’s vision for the fellowship... aligns with the fellowship's core objectives. Her interest in exploring how AI innovations can be tested and deployed in real societal contexts demonstrates a clear understanding of the importance of convening and collaboration across disciplines.</p>
                          <p>I have no doubt that she will not only contribute significantly to the fellowship program but also leverage this opportunity to make meaningful advancements in AI policy and governance that will benefit both India and the global community.</p>
                        </div>
                        <a href="https://docs.google.com/document/d/1CTrL4lsPlHkIiEBCkxn3YkluRKYz5fUzFghBqGAk_tA/edit" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0d9488] hover:underline mt-2">
                          <FileText className="h-4 w-4" /> View Full Recommendation Letter
                        </a>
                      </div>
                      <div className="md:w-64 shrink-0 flex flex-col justify-center border-l-2 border-slate-100 pl-6">
                        <h4 className="font-bold text-[#4c1d95]">Dr. Vinodkumar Prabhakaran</h4>
                        <p className="text-xs text-slate-500 mt-1">Staff Research Scientist and Manager<br/>Co-Lead, Technology, AI, Society, and Culture Team</p>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 rounded inline-block w-max">
                          Google Research, CA
                        </div>
                        <a href="https://cs.stanford.edu/~vinod" target="_blank" rel="noreferrer" className="text-xs text-[#0d9488] hover:underline mt-2 flex items-center gap-1">
                          <Globe className="h-3 w-3" /> cs.stanford.edu/~vinod
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Bruce Tisler - Long */}
                  <Card className="p-8 md:p-10 bg-white border-t-4 border-[#ea580c]">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-4">
                        <Quote className="h-8 w-8 text-[#ea580c] opacity-50" />
                        <h3 className="font-bold text-[#4c1d95] text-lg mb-2">Professional Testimonial For Dr. Jaya Goyal</h3>
                        <div className="text-slate-700 leading-relaxed font-serif text-[15px] space-y-4">
                          <p>I engaged Dr. Jaya Goyal to provide independent academic review of work produced through my research institution, Quantum Inquiry. The material under review was formally abstract, interdisciplinary, and technically demanding: a multi-paper research program spanning PDE stability theory, formal logic, operator algebras, quantum cognition, and preregistered empirical design.</p>
                          <p>In both reviews, Dr. Goyal demonstrated a capacity that is rare and difficult to find: she engaged with the work on its own terms. She did not reduce the framework to a familiar category or dismiss what was unfamiliar. She followed the internal logic of the argument, identified precisely where claims were supported and where they outran the formal work, and distinguished clearly between what had been proved, what had been structurally argued, and what remained proposed.</p>
                          <p>Her assessments were direct and substantive... Where the work overreached, she named the overreach precisely and without hedging. Where it underreached, she identified the gap and described what would be needed to close it.</p>
                          <p>What I value most is that Dr. Goyal treated the review as a genuine intellectual engagement rather than a gatekeeping exercise... I recommend Dr. Goyal without reservation for academic review, formal assessment, or intellectual consultation on complex theoretical work. She is precise, honest, and willing to meet difficult material where it stands.</p>
                        </div>
                        <a href="https://drive.google.com/file/d/1csjP_4Ec-NBvr396cHZmfCrvMnq2TapP/view?ts=6a22a77d" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ea580c] hover:underline mt-2">
                          <FileText className="h-4 w-4" /> View Original Testimonial PDF
                        </a>
                      </div>
                      <div className="md:w-64 shrink-0 flex flex-col justify-center border-l-2 border-slate-100 pl-6">
                        <h4 className="font-bold text-[#4c1d95]">Bruce Tisler</h4>
                        <p className="text-xs text-slate-500 mt-1">Founder & Principal Researcher</p>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 rounded inline-block w-max">
                          Quantum Inquiry
                        </div>
                        <a href="https://quantuminquiry.org" target="_blank" rel="noreferrer" className="text-xs text-[#0d9488] hover:underline mt-3 flex items-center gap-1">
                          <Globe className="h-3 w-3" /> quantuminquiry.org
                        </a>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <span className="font-bold">ORCID:</span> 0009-0009-6344-5334
                        </p>
                      </div>
                    </div>
                  </Card>

                </div>
              </div>
            </motion.div>
          )}

"""

if "activeTab === 'testimonials'" not in content:
    content = content.replace("{/* ── Consultation Modal ── */}", testimonials_jsx + "      {/* ── Consultation Modal ── */}")

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Testimonials tab added successfully.")
