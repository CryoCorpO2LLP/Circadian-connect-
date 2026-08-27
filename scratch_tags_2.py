import re

def parse_jsx_tags(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We will use a simple regex to find all <div and </div, <ScrollReveal and </ScrollReveal
    # We will track line numbers by counting newlines before the match
    
    div_stack = []
    
    # We need to find all tags, preserving order.
    # We can search for <div...>, </div>, <ScrollReveal...>, </ScrollReveal>
    # Note: we must avoid self-closing divs if they exist <div />
    
    pattern = re.compile(r'(<div(?:\s[^>]*)?>|</div>|<ScrollReveal(?:\s[^>]*)?>|</ScrollReveal>)')
    
    for match in pattern.finditer(content):
        tag = match.group(1)
        line_num = content[:match.start()].count('\n') + 1
        
        if tag.startswith('<div') and not tag.endswith('/>'):
            div_stack.append(('div', line_num))
        elif tag == '</div>':
            if div_stack and div_stack[-1][0] == 'div':
                div_stack.pop()
            else:
                print(f"Orphan </div> at line {line_num}")
                
        elif tag.startswith('<ScrollReveal') and not tag.endswith('/>'):
            div_stack.append(('ScrollReveal', line_num))
        elif tag == '</ScrollReveal>':
            if div_stack and div_stack[-1][0] == 'ScrollReveal':
                div_stack.pop()
            else:
                print(f"Orphan </ScrollReveal> at line {line_num}. Top of stack is {div_stack[-1] if div_stack else 'empty'}")

    print("Unclosed tags:")
    for tag, line in div_stack:
        if line >= 1210 and line <= 1600:
            print(f"Unclosed {tag} at line {line}")

parse_jsx_tags('src/App.jsx')
