import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://www.circadianconnect.com/#about"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    text = soup.get_text(separator=' ', strip=True)
    # Find sentences mentioning Jaya or Goyal
    sentences = re.split(r'(?<=[.!?])\s+', text)
    jaya_sentences = [s for s in sentences if "Jaya" in s or "Goyal" in s or "Founder" in s]
    print("Found text:", " ".join(jaya_sentences))
except Exception as e:
    print("Error:", e)
