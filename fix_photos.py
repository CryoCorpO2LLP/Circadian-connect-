from rembg import remove
from PIL import Image

# New Kaushal photo - remove background
input_kaushal = r'C:\Users\Admin\.gemini\antigravity-ide\brain\543db227-e71c-4022-ae16-fb31409b578f\media__1781861419317.png'
output_kaushal = r'C:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\public\kaushal_transparent.png'

# Old Ganesh photo (was at media__1781860114575.png - the man in yellow shirt with sunglasses)
input_ganesh = r'C:\Users\Admin\.gemini\antigravity-ide\brain\543db227-e71c-4022-ae16-fb31409b578f\media__1781860114575.png'
output_ganesh = r'C:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\public\ganesh_transparent.png'

try:
    img = Image.open(input_kaushal)
    remove(img).save(output_kaushal)
    print("Kaushal done.")
except Exception as e:
    print("Kaushal error:", e)

try:
    img = Image.open(input_ganesh)
    remove(img).save(output_ganesh)
    print("Ganesh done.")
except Exception as e:
    print("Ganesh error:", e)
