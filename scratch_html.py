import urllib.request
import re

try:
    with urllib.request.urlopen('https://www.circadianconnect.com/collaborators') as response:
        html = response.read().decode('utf-8')
    
    parts = re.split(r'<img[^>]+src="([^"]+)"[^>]*>', html)
    
    for i in range(1, len(parts), 2):
        src = parts[i]
        if 'static.wixstatic.com' in src:
            text_after = re.sub(r'<[^>]+>', ' ', parts[i+1])[:200]
            print('IMG:', src)
            print('TEXT AFTER:', text_after.strip().replace('\n', ' '))
            print('-'*40)
except Exception as e:
    print('Error:', e)
