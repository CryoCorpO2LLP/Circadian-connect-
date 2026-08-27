from rembg import remove
from PIL import Image

# Ganesh = dark curly hair, striped shirt
input_ganesh = r'C:\Users\Admin\.gemini\antigravity-ide\brain\543db227-e71c-4022-ae16-fb31409b578f\media__1781860169406.png'
output_ganesh = r'C:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\public\ganesh_transparent.png'

try:
    img = Image.open(input_ganesh)
    remove(img).save(output_ganesh)
    print("Ganesh fixed.")
except Exception as e:
    print("Error:", e)
