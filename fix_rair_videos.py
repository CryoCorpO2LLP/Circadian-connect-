with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# ──────────────────────────────────────────────
# 1. RAIR: Upgrade small link below image → full orange Button
# ──────────────────────────────────────────────
old_link = (
    '                          {/* Link below RAIR image */}\n'
    '                          <div className="mt-5 flex justify-center">\n'
    '                            <button\n'
    '                              onClick={() => setActiveTab(\'rair_scorecard\')}\n'
    '                              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors duration-200 group"\n'
    '                            >\n'
    '                              <span className="underline underline-offset-4 decoration-accent/50 group-hover:decoration-primary/80 transition-colors">Take the RAIR Quiz</span>\n'
    '                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />\n'
    '                            </button>\n'
    '                          </div>'
)
new_link = (
    '                          {/* Button below RAIR image */}\n'
    '                          <div className="mt-5 flex justify-center">\n'
    '                            <Button variant="teal" size="xl" onClick={() => setActiveTab(\'rair_scorecard\')} className="group">\n'
    '                              Take the RAIR Quiz <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />\n'
    '                            </Button>\n'
    '                          </div>'
)
if old_link in content:
    content = content.replace(old_link, new_link)
    print('RAIR image button: UPGRADED to full Button')
else:
    print('RAIR image button: NOT FOUND - check spacing')

# ──────────────────────────────────────────────
# 2. RAIR: Remove duplicate Button from text column
# ──────────────────────────────────────────────
old_btn_col = (
    '                        <ScrollReveal delay={0.3}>\n'
    '                          <div className="pt-6">\n'
    '                            <Button variant="teal" size="xl" onClick={() => setActiveTab(\'rair_scorecard\')} className="group">\n'
    '                              Take the RAIR Quiz <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />\n'
    '                            </Button>\n'
    '                          </div>\n'
    '                        </ScrollReveal>\n'
)
if old_btn_col in content:
    content = content.replace(old_btn_col, '')
    print('RAIR text column button: REMOVED')
else:
    print('RAIR text column button: NOT FOUND - check spacing')

# ──────────────────────────────────────────────
# 3. Focus Area Videos: Add a link directly below each video player
#    The video is inside: <div className="relative rounded-[2rem] overflow-hidden cinematic-player ...">
# ──────────────────────────────────────────────
old_video_block = (
    '                        <div className="relative rounded-[2rem] overflow-hidden cinematic-player shadow-2xl p-2 video-hover">\n'
    '                          <video \n'
    '                            src={`/video_${index + 1}.mp4`} \n'
    '                            controls\n'
    '                            playsInline \n'
    '                            className="w-full h-auto object-cover aspect-[4/5] bg-slate-950 rounded-2xl"\n'
    '                          />\n'
    '                        </div>\n'
    '                      </div>'
)
new_video_block = (
    '                        <div className="relative rounded-[2rem] overflow-hidden cinematic-player shadow-2xl p-2 video-hover">\n'
    '                          <video \n'
    '                            src={`/video_${index + 1}.mp4`} \n'
    '                            controls\n'
    '                            playsInline \n'
    '                            className="w-full h-auto object-cover aspect-[4/5] bg-slate-950 rounded-2xl"\n'
    '                          />\n'
    '                        </div>\n'
    '                        {/* Link below focus area video */}\n'
    '                        <div className="mt-4 flex justify-center">\n'
    '                          <button\n'
    '                            onClick={() => {\n'
    '                              if (cluster.title.toLowerCase().includes(\'socio\')) {\n'
    '                                setActiveTab(\'rair_scorecard\');\n'
    '                              } else {\n'
    '                                window.open("https://tally.so/r/3ERZrN", "_blank");\n'
    '                              }\n'
    '                            }}\n'
    '                            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors duration-200 group"\n'
    '                          >\n'
    '                            <span className="underline underline-offset-4 decoration-accent/50 group-hover:decoration-primary/80 transition-colors">\n'
    '                              {cluster.title.toLowerCase().includes(\'socio\') ? \'Take the RAIR Quiz\' : \'Get in Touch\'}\n'
    '                            </span>\n'
    '                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />\n'
    '                          </button>\n'
    '                        </div>\n'
    '                      </div>'
)
if old_video_block in content:
    content = content.replace(old_video_block, new_video_block)
    print('Focus Area video links: ADDED below all videos')
else:
    print('Focus Area video block: NOT FOUND - check spacing')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('All done.')
