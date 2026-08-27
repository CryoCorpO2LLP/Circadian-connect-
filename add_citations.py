import os

target = '''<div className="pt-2">
                          <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-accent hover:text-accent transition-colors">
                            View More <ArrowUpRight className="ml-1 h-4 w-4" />
                          </a>
                        </div>'''

replacement = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:u-x6o8ySG0sC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-primary text-primary hover:bg-primary hover:text-white px-3 py-1.5">
                            C3NLP Citation <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:Tyk-4Ss8FVUC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-accent text-accent hover:bg-accent hover:text-white px-3 py-1.5">
                            NeurIPS Citation <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-primary transition-colors ml-auto">
                            View Project <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>'''

for f in ['src/App.jsx', 'restore_projects.py', 'horizontal_projects.py', 'inject_projects_v2.py', 'inject_projects.py']:
    if os.path.exists(f):
        c = open(f, encoding='utf-8').read()
        if target in c:
            c = c.replace(target, replacement)
            open(f, 'w', encoding='utf-8').write(c)
            print(f'Replaced in {f}')
