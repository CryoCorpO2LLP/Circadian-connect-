import re

f = 'src/App.jsx'
lines = open(f, encoding='utf-8').readlines()

# The wrong button block that was added to all cards - we need to replace it
WRONG_BLOCK = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
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

# Correct block for project 1 (Google/SPICE/BiNDI) - C3NLP + NeurIPS citations only
GOOGLE_PROJECT_BLOCK = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:u-x6o8ySG0sC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-primary text-primary hover:bg-primary hover:text-white px-3 py-1.5">
                            C3NLP Citation <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:Tyk-4Ss8FVUC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-accent text-accent hover:bg-accent hover:text-white px-3 py-1.5">
                            NeurIPS Citation <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>'''

# Correct block for CryoCorp project - ChatGPT assistant button only
CRYOCORP_BLOCK = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://chatgpt.com/g/g-68650921e3b48191b61d8b06a7978505-cryogenic-solutions-assistant" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 px-3 py-1.5">
                            Cryogenic Solutions AI Assistant <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>'''

# Correct block for all other projects - simple View More to Tally form
VIEW_MORE_BLOCK = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://tally.so/r/3ERZrN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-accent text-accent hover:bg-accent hover:text-white px-3 py-1.5">
                            View More <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>'''

content = open(f, encoding='utf-8').read()

# Split by the wrong block - there will be 12 occurrences
parts = content.split(WRONG_BLOCK)

if len(parts) != 13:  # 12 occurrences = 13 parts
    print(f"Found {len(parts)-1} occurrences of the wrong block. Expected 12.")
    # Try to count how many there are
    count = content.count(WRONG_BLOCK)
    print(f"Count: {count}")

# Rebuild: part[0] + google_block + part[1] + ... 
# Order: project 1 (google), proj2, proj3, proj4, proj5, proj6, proj7, proj8, proj9, proj10 (cryocorp), proj11, proj12
# Index 0 = first project (Google) -> GOOGLE_PROJECT_BLOCK
# Index 9 = CryoCorp -> CRYOCORP_BLOCK  
# All others -> VIEW_MORE_BLOCK

blocks = [GOOGLE_PROJECT_BLOCK]  # project 1
for i in range(1, len(parts)-1):
    if i == 9:  # CryoCorp is the 10th project (0-indexed = 9)
        blocks.append(CRYOCORP_BLOCK)
    else:
        blocks.append(VIEW_MORE_BLOCK)

# Join: parts[0] + blocks[0] + parts[1] + blocks[1] + ...
new_content = ''
for i, part in enumerate(parts):
    new_content += part
    if i < len(blocks):
        new_content += blocks[i]

open(f, 'w', encoding='utf-8').write(new_content)
print(f"Done! Applied {len(blocks)} button blocks.")
print(f"Project 1 (Google): C3NLP + NeurIPS citation buttons")
print(f"Project 10 (CryoCorp): ChatGPT Assistant button")
print(f"All others: View More -> Tally form")
