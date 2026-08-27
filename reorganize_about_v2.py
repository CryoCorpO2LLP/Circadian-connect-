import sys
import re

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "{/* ════════════════════════════════════════ ABOUT ══ */}"
end_marker = "{/* ── Consultation Modal ── */}"

if start_marker not in content or end_marker not in content:
    print("Markers not found.")
    sys.exit(1)

before = content.split(start_marker)[0]
after_split = content.split(end_marker)

after = "      " + end_marker + after_split[1]
about_content = after_split[0]

# Extract "Who We Serve"
who_we_serve_match = re.search(r'(<div className="space-y-6">\s*<div className="text-center max-w-2xl mx-auto">\s*<h2 className="font-display text-3xl md:text-4xl text-\[#4c1d95\] font-bold tracking-tight">Who We Serve</h2>.*?</div>\s*</div>)', about_content, re.DOTALL)
if not who_we_serve_match:
    print("Could not find Who We Serve")
    sys.exit(1)
who_we_serve = who_we_serve_match.group(1)

# Extract "Our Global Project Footprint"
projects_match = re.search(r'(\{/\* Projects Portfolio.*?</div>\s*</div>)', about_content, re.DOTALL)
if not projects_match:
    print("Could not find Projects Portfolio")
    sys.exit(1)
projects_portfolio = projects_match.group(1)

# Extract Video player
video_match = re.search(r'(<div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white h-full flex items-center justify-center">\s*<video.*?</video>\s*</div>)', about_content, re.DOTALL)
if not video_match:
    print("Could not find Video player")
    sys.exit(1)
video_player = video_match.group(1)

# Construct the new about tab
new_about_tab = f"""
          {{activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex-1 overflow-y-auto bg-[#f5f6f8]"
              style={{ maxHeight: 'calc(100vh - 72px)' }}
            >
              <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 pb-20 space-y-20">

                {{/* 1. Hero / Mission Statement */}}
                <div className="text-center max-w-4xl mx-auto space-y-6">
                  <Eyebrow>Our Mission</Eyebrow>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#4c1d95] font-black tracking-tight leading-tight">
                    Bridging Science, Society, <br />
                    <span style={{ color: TEAL }}>and Policy</span>
                  </h1>
                  <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-light">
                    Circadian Connect LLP is a for-profit research solutions provider committed to curating design and methodology at the interface of science, society, and policy. We believe that sustainable and inclusive solutions can only be achieved when social institutions and actors are considered in Science and Technology innovations. We strive for scientific excellence and social responsibility in all of our endeavors, working closely with clients to achieve our shared goals.
                  </p>
                </div>

                {{/* 2. Global Project Footprint */}}
                {projects_portfolio}

                {{/* 3. Who We Serve */}}
                {who_we_serve}

                {{/* 4. Leadership / Founder Profile */}}
                <div className="space-y-10 pt-10 border-t border-slate-200">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>Leadership</Eyebrow>
                    <h2 className="font-display text-3xl md:text-4xl text-[#4c1d95] font-bold tracking-tight">Meet Our Founder Director</h2>
                    <p className="text-sm text-slate-500">A visionary leader with 17+ years of experience curating research solutions.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {{/* Column 1: Core Bio & Mission */}}
                    <Card className="p-8 lg:col-span-2 space-y-6 border-t-4 border-t-[#ea580c] bg-white">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-display font-bold text-[#4c1d95]">Dr. Jaya Goyal</h3>
                        <p className="text-[#ea580c] font-semibold text-sm uppercase tracking-wider">Ph.D. (TISS / LSE) • 17+ Yrs Leadership</p>
                      </div>
                      
                      <div className="text-slate-600 text-sm leading-relaxed space-y-4">
                        <p>After 17 years as a passionate policy researcher and Science Diplomat, Dr. Goyal resigned from her role as Head of Higher Education (National role) at the British Council India in March 2022. There, she managed a £7 million portfolio, leading key bilateral programmes between the Indian and UK Governments—including UKIERI, The Newton Bhabha Fund, and Going Global.</p>
                        <p>Driven to set up an interdisciplinary research enterprise, she founded Circadian Connect LLP. In mid-2022, Circadian arguably became the first social scientist-led company in India to partner with Google LLC USA on a 'Responsible AI' research project. The methodology she co-created with Google researchers—studying social stereotypes across languages and contexts—is now a copyrighted method published in major journals, opening up multi-million dollar product development pathways.</p>
                        <p>Her interdisciplinary interests span social policy, the IAD Framework, decolonial lenses in higher education, international partnerships, nutrition governance, qualitative methodology, and the political economy of health.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-[#0d9488] shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-[#4c1d95] text-sm">Extensive Publications</h4>
                            <p className="text-xs text-slate-500 mt-1">Authored over 20 publications (including the EPW) and co-authored 6 critical national policy reports on Nutrition Governance, OBC Reservations, Narmada Dam, and PPPs in Health impacting over a billion people.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-[#0d9488] shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-[#4c1d95] text-sm">Global Scholarships</h4>
                            <p className="text-xs text-slate-500 mt-1">Awarded over ₹1 Crore in research scholarships from world-class universities including LSE (UK), Hiroshima Univ (Japan), Edinburgh Univ, Michigan State Univ, and ISS The Hague.</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {{/* Column 2: Stats & Highlights */}}
                    <div className="space-y-6">
                      <Card className="p-6 bg-gradient-to-br from-[#4c1d95] to-[#6d28d9] text-white">
                        <h4 className="font-display font-bold text-xl mb-4 text-white">Career Highlights</h4>
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                            <p className="text-xs text-white/90 leading-snug">Managed research portfolios worth crores at National Higher Education Mission RUSA and millions of pounds at British Council India.</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                            <p className="text-xs text-white/90 leading-snug">Instrumental in partnering ICSSR with the Newton Bhabha Fund for Ph.D. placements.</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                            <p className="text-xs text-white/90 leading-snug">Invited to speak at 20+ prestigious platforms including IIT Bombay, NCBS Bangalore, DST, and Google HQ.</p>
                          </li>
                        </ul>
                      </Card>

                      <Card className="p-6 bg-white">
                         <h4 className="font-bold text-sm text-[#ea580c] uppercase tracking-wider mb-3">Academic Excellence</h4>
                         <p className="text-xs text-slate-600 mb-2"><strong>Ph.D. in Social Sciences</strong> <br/>TISS, Mumbai (funded by LSE, UK)</p>
                         <p className="text-xs text-slate-600 mb-4"><strong>M.Sc (Human Ecology)</strong> <br/>Delhi University</p>
                         
                         <h4 className="font-bold text-sm text-[#ea580c] uppercase tracking-wider mb-3">Teaching & Advisory</h4>
                         <p className="text-xs text-slate-600 mb-2">Visiting faculty at TISS for PPPs in Health & Child Rights. Advisory Board for the international TRANSSITION Project.</p>
                      </Card>
                    </div>
                  </div>
                </div>

                {{/* 5. Our Approach / Methodology Video */}}
                <div className="space-y-8 pt-10 border-t border-slate-200">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <Eyebrow>Methodology</Eyebrow>
                    <h2 className="font-display text-3xl md:text-4xl text-[#4c1d95] font-bold tracking-tight">Our Approach in Action</h2>
                    <p className="text-sm text-slate-500">Discover how we bridge the gap between science, society, and policy.</p>
                  </div>
                  <div className="max-w-4xl mx-auto">
                    {video_player}
                  </div>
                </div>

              </div>
            </motion.div>
          )}}
        </AnimatePresence>
      </div>
"""

new_content = before + start_marker + "\n" + new_about_tab + "\n" + after

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully replaced the About tab.")
