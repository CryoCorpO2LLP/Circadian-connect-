import re

def parse_all_tags(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    stack = []
    
    # We will find all tags like <Name...> and </Name>
    # Note: we ignore tags ending with /> and we ignore <!-- ... -->
    
    # strip comments first
    content = re.sub(r'\{?/\*.*?\*/\}?', '', content, flags=re.DOTALL)
    
    pattern = re.compile(r'</?([a-zA-Z0-9.]+)(?:[^>]*?)>')
    
    for match in pattern.finditer(content):
        tag_str = match.group(0)
        tag_name = match.group(1)
        line_num = content[:match.start()].count('\n') + 1
        
        # ignore self-closing tags
        if tag_str.endswith('/>'):
            continue
            
        # Ignore common self-closing html tags that might not have />
        if tag_name.lower() in ['br', 'img', 'input', 'hr', 'meta', 'link']:
            continue
            
        if tag_str.startswith('</'):
            if stack and stack[-1][0] == tag_name:
                stack.pop()
            else:
                print(f"Mismatch: trying to close </{tag_name}> at line {line_num}, but stack top is {stack[-1] if stack else 'empty'}")
                # We won't pop here to let it cascade or maybe we just print it
        else:
            stack.append((tag_name, line_num))

    print("Remaining unclosed tags:")
    for tag, line in stack:
        print(f"Unclosed <{tag}> at line {line}")

parse_all_tags('src/App.jsx')
