import re

file_path = r'c:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for i in range(1, 5):
    pattern = r'<img\s+src=\"/service_graphic_' + str(i) + r'\.png\"[^>]+/>'
    video_html = f'''<video 
                          src="/video_{i}.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          controls
                          className="w-full h-auto object-cover" 
                          style={{{{ minHeight: '180px' }}}}
                        />'''
    content = re.sub(pattern, video_html, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated App.jsx with video tags.')
