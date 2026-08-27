import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target_project_marker = 'Validate an Ethical AI Governance Framework Developed through Design Science Research Methodology (2026)'

# Find the position of the target project
project_pos = content.find(target_project_marker)
if project_pos == -1:
    print("Could not find the target project.")
    exit(1)

button_block_start = content.find('<div className="pt-3 flex flex-wrap gap-2 items-center">', project_pos)
button_block_end = content.find('</div>', button_block_start) + 6

old_block = content[button_block_start:button_block_end]

# The exact new button block (Launch Tool, View Post, Enquire Now)
new_block = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://civic-map-maker-sicp.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            Launch Tool <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://substack.com/home/post/p-193454164" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>'''

content = content[:button_block_start] + new_block + content[button_block_end:]

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully replaced View More with Launch Tool on Project 3.")
