with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# ── 1. Below video: simplify to always "Get in Touch" ──
old_video_link = (
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
    '                        </div>'
)
new_video_link = (
    '                        {/* Get in Touch link below focus area video */}\n'
    '                        <div className="mt-4 flex justify-center">\n'
    '                          <button\n'
    '                            onClick={() => window.open("https://tally.so/r/3ERZrN", "_blank")}\n'
    '                            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors duration-200 group"\n'
    '                          >\n'
    '                            <span className="underline underline-offset-4 decoration-accent/50 group-hover:decoration-primary/80 transition-colors">Get in Touch</span>\n'
    '                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />\n'
    '                          </button>\n'
    '                        </div>'
)
if old_video_link in content:
    content = content.replace(old_video_link, new_video_link)
    print('Video link: simplified to always Get in Touch')
else:
    print('Video link: NOT FOUND')

# ── 2. Text column: remove the entire button block at the bottom ──
old_text_btn = (
    '                          <div className="pt-8">\n'
    '                            {cluster.title.toLowerCase().includes(\'socio\') ? (\n'
    '                              <Button\n'
    '                                onClick={() => setActiveTab(\'rair_scorecard\')}\n'
    '                                variant="outline"\n'
    '                                className="group"\n'
    '                              >\n'
    '                                Take Initial Questionnaire <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />\n'
    '                              </Button>\n'
    '                            ) : (\n'
    '                              <Button\n'
    '                                onClick={() => window.open("https://tally.so/r/3ERZrN", "_blank")}\n'
    '                                variant="teal"\n'
    '                                className="group"\n'
    '                              >\n'
    '                                Get in Touch <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />\n'
    '                              </Button>\n'
    '                            )}\n'
    '                          </div>\n'
)
if old_text_btn in content:
    content = content.replace(old_text_btn, '')
    print('Text column buttons: REMOVED')
else:
    print('Text column buttons: NOT FOUND')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done.')
