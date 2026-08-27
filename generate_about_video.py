import fitz
import os
from moviepy import *

def pdf_to_video(pdf_path, output_mp4):
    doc = fitz.open(pdf_path)
    image_paths = []
    
    # Extract images
    for i in range(len(doc)):
        page = doc.load_page(i)
        pix = page.get_pixmap(dpi=150)
        img_path = f"public/slide_{i}.png"
        pix.save(img_path)
        image_paths.append(img_path)
        
    print(f"Extracted {len(image_paths)} images from PDF.")
    
    # Create video
    clips = []
    # Display each slide for 4 seconds
    duration_per_slide = 4
    for img_path in image_paths:
        c = ImageClip(img_path).with_duration(duration_per_slide)
        clips.append(c)
        
    final_video = concatenate_videoclips(clips, method="compose")
    
    print(f"Writing Video...")
    # Render with low fps since it's just slides
    final_video.write_videofile(output_mp4, fps=2, codec="libx264")
    final_video.close()
    
    # Cleanup images
    for img_path in image_paths:
        os.remove(img_path)
        
    print("Video generation completed!")

pdf_to_video("public/about_ppt.pdf", "public/about_video.mp4")
