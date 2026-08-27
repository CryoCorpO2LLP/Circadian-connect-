import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the video tag with dangerouslySetInnerHTML
old_video = r"""<div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">
                          <video 
                            src={`/video_${index \+ 1}\.mp4`} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-auto object-cover aspect-video"
                          />
                        </div>"""

new_video = r"""<div 
                          className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50"
                          dangerouslySetInnerHTML={{
                            __html: `<video src="/video_${index + 1}.mp4" autoplay loop muted playsinline class="w-full h-auto object-cover aspect-video"></video>`
                          }}
                        />"""

content = re.sub(old_video, new_video, content)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed video playback.")
