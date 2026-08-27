import sys
import re

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update research_work (Use Cases Governance)
research_target = """                          <div className="mt-auto pt-6 border-t border-border/50">
                            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="w-full md:w-auto hover:bg-primary hover:text-white transition-colors group/btn">
                                Read More <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </Button>
                            </a>
                          </div>"""

research_replacement = """                          <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-3">
                            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="w-full md:w-auto hover:bg-primary hover:text-white transition-colors group/btn">
                                Read More <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </Button>
                            </a>
                            <Button variant="teal" size="sm" onClick={(e) => { e.preventDefault(); setConsultationModalOpen(true); }} className="w-full md:w-auto">
                              Initial Inquiry Questionnaire
                            </Button>
                          </div>"""

if research_target in content:
    content = content.replace(research_target, research_replacement)
    print("Successfully updated research_work buttons.")
else:
    print("Failed to find research_work buttons.")


# 2. Update usecases (Use Cases - Responsible AI)
# We need to find all blocks like:
# <div className="pt-3 flex flex-wrap gap-2 items-center">
#   <a ...>...</a>
# </div>
# And replace with:
# <div className="pt-3 flex flex-wrap gap-2 items-center">
#   <a ...>...</a>
#   <button onClick={() => setConsultationModalOpen(true)} className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-3 py-1.5">Initial Inquiry Questionnaire</button>
# </div>

usecase_pattern = re.compile(r'(<div className="pt-3 flex flex-wrap gap-2 items-center">\s*<a.*?>.*?</a>\s*)(</div>)', re.DOTALL)

def replace_usecase(match):
    return match.group(1) + '  <button onClick={(e) => { e.preventDefault(); setConsultationModalOpen(true); }} className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-3 py-1.5">Initial Inquiry</button>\n                        ' + match.group(2)

content, count = usecase_pattern.subn(replace_usecase, content)
print(f"Successfully updated {count} usecases buttons.")


with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)
