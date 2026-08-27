import re

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find all 4 Cards in the Solutions tab. They have a specific structure:
# <Card className="flex flex-col">
#   <div className="p-6 flex flex-col flex-1 space-y-5">
#      ...
#      {/* Graphic Visual: ... */}
#      <div className="mt-auto rounded-xl overflow-hidden border border-slate-200">
#        <video ... />
#      </div>
#   </div>
# </Card>

# Let's use a regex that matches the whole Card block and rearranges it.
# The regex needs to capture the Header+Body (Group 1) and the Video Block (Group 2).
# It's safer to do this specifically for the four videos.

def swap_card_content(video_file, content):
    # Regex to match the Card content
    pattern = r'(<Card className="flex flex-col">)\s*(<div className="p-6 flex flex-col flex-1 space-y-5">)\s*(.*?)(?:\{/\* Graphic Visual.*? \*/\}\s*)?(<div className="mt-auto[^>]*>\s*<video[^>]*src="/' + video_file + r'"[^>]*/>\s*</div>)\s*(</div>\s*</Card>)'
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"Could not find match for {video_file}")
        return content

    card_tag = match.group(1)
    p6_div_open = match.group(2)
    header_and_body = match.group(3)
    video_div = match.group(4)
    end_tags = match.group(5)

    # Let's modify the video_div slightly to look better at the top. 
    # Remove "mt-auto rounded-xl border border-slate-200" and replace with "w-full bg-slate-100 border-b border-slate-100"
    new_video_div = re.sub(r'className="mt-auto[^"]*"', 'className="w-full bg-slate-100 border-b border-slate-100"', video_div)
    # also remove inline style if any: style={{ minHeight: '180px' }} -> we can keep it or remove it. Let's keep it but maybe it's fine.
    
    # We also change card_tag to <Card className="flex flex-col overflow-hidden">
    new_card_tag = '<Card className="flex flex-col overflow-hidden">'

    replacement = f"{new_card_tag}\n                    {new_video_div}\n                    {p6_div_open}\n                      {header_and_body.strip()}\n                    {end_tags}"
    return content.replace(match.group(0), replacement)

new_content = content
for i in range(1, 5):
    new_content = swap_card_content(f"video_{i}.mp4", new_content)

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully swapped video and text for all 4 cards.")
