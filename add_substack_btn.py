with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://civic-map-maker-sicp.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            Launch Tool <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>'''

new_block = '''<div className="pt-3 flex flex-wrap gap-2 items-center">
                          <a href="https://civic-map-maker-sicp.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            Launch Tool <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <a href="https://substack.com/home/post/p-193454164" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                          <button onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLScBdElMufZqEeEGE6HuvwEfKq2HOu30-KKKXnKFcjBLTBHXHw/viewform', '_blank'); }} className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">Enquire Now</button>
                        </div>'''

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully added Substack button next to Launch Tool.")
else:
    print("Could not find the target block.")
