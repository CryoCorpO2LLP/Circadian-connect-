import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the navigation items
nav_replacement = '''    { id: 'risks',     label: 'Risks & Strategy' },
    { id: 'usecases',  label: 'Use Cases' },
    { id: 'about',     label: 'About Us' }'''
content = re.sub(r"    \{ id: 'risks',\s+label: 'Risks & Strategy' \},\n\s+\{ id: 'about',\s+label: 'About Us' \}", nav_replacement, content)

# 2. Extract the Global Project Footprint section
pattern = re.compile(r'(                \{\/\* 2\. Global Project Footprint \*\/\}[\s\S]*?)(                \{\/\* 3\. Who We Serve \*\/})', re.MULTILINE)
match = pattern.search(content)

if match:
    footprint_content = match.group(1)
    # Remove from about section
    content = content[:match.start()] + match.group(2) + content[match.end():]
    
    # 3. Create the new tab and insert it before the Consultation Modal
    new_tab = f'''          {{/* ════════════════════════════════════════ USE CASES ══ */}}
          {{activeTab === 'usecases' && (
            <motion.div
              key="usecases"
              initial={{{{ opacity: 0, y: 10 }}}}
              animate={{{{ opacity: 1, y: 0 }}}}
              exit={{{{ opacity: 0, y: -10 }}}}
              transition={{{{ duration: 0.4 }}}}
              className="pt-24 pb-12"
            >
              <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 space-y-24">
{footprint_content.rstrip()}
              </div>
            </motion.div>
          )}}

'''
    
    # Insert new_tab right before the Consultation modal comment
    modal_comment = '          {/* ── Consultation Modal ── */}'
    content = content.replace(modal_comment, new_tab + modal_comment)
    
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Extraction and reinsertion successful.')
else:
    print('Could not find Global Project Footprint block.')
