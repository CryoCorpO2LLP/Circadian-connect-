import re, urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

links = set(re.findall(r'link:\s*\"([^\"]+)\"', content))

to_replace = []
for link in links:
    try:
        req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, context=ctx, timeout=10)
        status = res.getcode()
        if status == 404:
            print(f'404 found: {link}')
            to_replace.append(link)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print(f'404 found: {link}')
            to_replace.append(link)
    except Exception as e:
        print(f'Error for {link}: {e}')

for link in to_replace:
    print(f'Replacing {link} with Tally')
    content = content.replace(link, 'https://tally.so/r/3ERZrN')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
