import re

def check_divs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    div_stack = []
    sr_stack = []
    
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # very simple counting, ignoring comments/strings for a moment
        # actually, let's just count <div and </div
        # and <ScrollReveal and </ScrollReveal
        
        div_opens = len(re.findall(r'<div[\s>]', line))
        div_closes = len(re.findall(r'</div>', line))
        
        sr_opens = len(re.findall(r'<ScrollReveal[\s>]', line))
        sr_closes = len(re.findall(r'</ScrollReveal>', line))
        
        for _ in range(div_opens): div_stack.append(line_num)
        for _ in range(div_closes): 
            if div_stack: div_stack.pop()
            else: print(f"Extra </div> at line {line_num}")
            
        for _ in range(sr_opens): sr_stack.append(line_num)
        for _ in range(sr_closes):
            if sr_stack: sr_stack.pop()
            else: print(f"Extra </ScrollReveal> at line {line_num}")
            
    print("Unclosed divs opened at:", div_stack)
    print("Unclosed ScrollReveals opened at:", sr_stack)

check_divs('src/App.jsx')
