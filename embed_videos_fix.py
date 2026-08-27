import re

file_path = r'c:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the exact wrapper div and iframe block
pattern = r'<div className=\"relative w-full overflow-hidden\" style=\{\{\s*paddingBottom:\s*\'56\.25\%\',\s*height:\s*0\s*\}\}\>.*?<\/iframe>\s*<\/div>'

def replace_with_video(match):
    global counter
    counter += 1
    return f'''<video 
                          src="/video_{counter}.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          controls
                          className="w-full h-auto object-cover" 
                          style={{{{ minHeight: '180px' }}}}
                        />'''

counter = 0
content = re.sub(pattern, replace_with_video, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Replaced {counter} iframes with video tags.")
