from rembg import remove
from PIL import Image

# First image: Ganesh
in1 = r'C:\Users\Admin\.gemini\antigravity-ide\brain\543db227-e71c-4022-ae16-fb31409b578f\media__1781860114575.png'
out1 = r'C:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\public\ganesh_transparent.png'

# Second image: Kaushal
in2 = r'C:\Users\Admin\.gemini\antigravity-ide\brain\543db227-e71c-4022-ae16-fb31409b578f\media__1781860169406.png'
out2 = r'C:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\public\kaushal_transparent.png'

try:
    img1 = Image.open(in1)
    remove(img1).save(out1)
    print("Ganesh done.")
except Exception as e:
    print("Error 1:", e)

try:
    img2 = Image.open(in2)
    remove(img2).save(out2)
    print("Kaushal done.")
except Exception as e:
    print("Error 2:", e)
