with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_projects = False
for i, line in enumerate(lines):
    if 'Our Global Project Footprint' in line:
        in_projects = True
    if in_projects:
        if '<span className="text-[10px] font-bold uppercase tracking-wider text-primary' in line:
            try:
                tag = line.split('title="')[1].split('">')[0]
                print(f'\n--- Project ---')
                print(f'Tag: {tag}')
            except:
                pass
        if '<h4 className="font-bold' in line:
            try:
                title = line.split('title="')[1].split('">')[0]
                print(f'Title: {title}')
            except:
                pass
    if in_projects and 'id="methodology"' in line:
        break
