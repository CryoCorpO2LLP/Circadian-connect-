import re

def print_divs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    count = 0
    
    # We strip comments
    content = "".join(lines)
    content = re.sub(r'\{?/\*.*?\*/\}?', '', content, flags=re.DOTALL)
    
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        line_num = i + 1
        if line_num < 1219 or line_num > 1589:
            continue
            
        opens = len(re.findall(r'<div[\s>]', line))
        closes = len(re.findall(r'</div>', line))
        
        # ignore self closing <div />
        opens -= len(re.findall(r'<div[^>]*/>', line))
        
        if opens > 0 or closes > 0:
            count += opens - closes
            print(f"Line {line_num}: +{opens} -{closes} | Depth: {count} | {line.strip()[:60]}")

print_divs('src/App.jsx')
