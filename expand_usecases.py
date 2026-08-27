import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update navigation label
content = content.replace("{ id: 'usecases',  label: 'Use Cases' }", "{ id: 'usecases',  label: 'Use Cases - Responsible AI' }")

# 2. Find the usecases block to update max-widths
start_idx = content.find("          {/* ════════════════════════════════════════ USE CASES ══ */}")
if start_idx != -1:
    end_idx = content.find("          {/* ── Consultation Modal ── */}", start_idx)
    usecases_block = content[start_idx:end_idx]
    
    # Replace within the block
    new_block = usecases_block.replace(
        'className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 space-y-24"',
        'className="w-full px-4 md:px-8 lg:px-12 space-y-24"'
    ).replace(
        'className="grid grid-cols-1 gap-8 max-w-4xl mx-auto"',
        'className="grid grid-cols-1 gap-8 w-full"'
    )
    
    content = content[:start_idx] + new_block + content[end_idx:]
    
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated successfully.')
else:
    print('Could not find Use Cases block.')
