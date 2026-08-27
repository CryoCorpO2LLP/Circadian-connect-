import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Remove style={{ maxHeight: 'calc(100vh - 72px)' }}
c = re.sub(r"style=\{\{ maxHeight: 'calc\(100vh - 72px\)'(?:,\s*background:\s*'[^']+')?\s*\}\}", "", c)
c = re.sub(r"style=\{\{ maxHeight: 'calc\(100vh - 72px\)' \}\}", "", c)

# For the ones that had background, we need to preserve the background
# Let's just do a simpler replace since regex might miss some
c = c.replace("style={{ maxHeight: 'calc(100vh - 72px)', background: '#faf5ff' }}", "style={{ background: '#faf5ff' }}")
c = c.replace("style={{ maxHeight: 'calc(100vh - 72px)' }}", "")

# 2. Remove overflow-y-auto from flex-1 flex flex-col wrappers
c = c.replace('className="flex-1 flex flex-col overflow-y-auto bg-white"', 'className="flex-1 w-full bg-white"')
c = c.replace('className="flex-1 overflow-y-auto"', 'className="flex-1 w-full"')
c = c.replace('className="flex-1 overflow-y-auto bg-[#f5f6f8]"', 'className="flex-1 w-full bg-[#f5f6f8]"')

# 3. Fix the Hero section minHeight
c = c.replace(
    '<div className="flex flex-col md:flex-row shrink-0 overflow-hidden" style={{ minHeight: \'calc(100vh - 72px - 72px)\' }}>',
    '<div className="flex flex-col md:flex-row w-full overflow-hidden min-h-[85vh]">'
)

# 4. Also fix the `<Section>` component if it's there
c = c.replace(
    '<div className={`flex-1 overflow-y-auto w-full ${className}`} style={{ maxHeight: \'calc(100vh - 72px)\' }}>',
    '<div className={`w-full ${className}`}>'
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated App.jsx UX layout restrictions.')
