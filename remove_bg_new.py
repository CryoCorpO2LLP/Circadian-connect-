from rembg import remove
from PIL import Image

input_path = r'C:\Users\Admin\.gemini\antigravity-ide\brain\543db227-e71c-4022-ae16-fb31409b578f\media__1781859815961.png'
output_path = r'C:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page\public\jaya_goyal_new_transparent.png'

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
print("Background removed successfully from the new image.")
