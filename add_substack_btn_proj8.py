import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target_project_marker = 'Social Network Analysis of Persons Associated with County Government (2025)'

# Find the position of the target project
project_pos = content.find(target_project_marker)
if project_pos == -1:
    print("Could not find the target project.")
    exit(1)

button_block_start = content.find('<div className="pt-3 flex flex-wrap gap-2 items-center">', project_pos)
button_block_end = content.find('</div>', button_block_start) + 6

old_block = content[button_block_start:button_block_end]

if 'https://substack.com/home/post/p-193454164' in old_block:
    print("Substack button already exists in this block.")
    exit(0)

# The new button HTML to insert before the Enquire Now button
new_button = '''
                          <a href="https://substack.com/home/post/p-193454164" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden">
                            View Post <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>'''

# Insert the new button just before the Enquire Now button
enquire_now_pos = old_block.find('<button onClick=')
new_block = old_block[:enquire_now_pos] + new_button.strip('\n') + '\n                          ' + old_block[enquire_now_pos:]

content = content[:button_block_start] + new_block + content[button_block_end:]

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully added Substack button to the Social Network Analysis project.")
