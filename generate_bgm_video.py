import fitz
import os
import urllib.request
import math
from moviepy import *

def pdf_to_video_with_bgm(pdf_path, output_mp4, bgm_path):
    # Download a default BGM if not exists
    if not os.path.exists(bgm_path):
        print("BGM not found. Downloading a royalty-free instrumental track...")
        # Free corporate/ambient track from pixabay
        url = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-corporate-114275.mp3"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(bgm_path, 'wb') as out_file:
            out_file.write(response.read())
        print("Downloaded bgm.mp3")

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
    
    # Create video clips
    clips = []
    duration_per_slide = 5 # 5 seconds per slide
    for img_path in image_paths:
        c = ImageClip(img_path).with_duration(duration_per_slide)
        clips.append(c)
        
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Add Audio
    print("Adding Background Music...")
    audio = AudioFileClip(bgm_path)
    
    # Loop audio if it's shorter than video, or trim if longer
    if audio.duration < final_video.duration:
        loops = math.ceil(final_video.duration / audio.duration)
        audio = concatenate_audioclips([audio] * loops)
        
    audio = audio.subclipped(0, final_video.duration)
    
    # Add fade out at the end
    # audio = audio.audio_fadeout(2) # Deprecated in some versions, ignoring for safety
    
    final_video = final_video.with_audio(audio)
    
    print(f"Writing Video...")
    final_video.write_videofile(output_mp4, fps=24, codec="libx264", audio_codec="aac", ffmpeg_params=["-pix_fmt", "yuv420p"])
    final_video.close()
    
    # Cleanup images
    for img_path in image_paths:
        os.remove(img_path)
        
    print("Video generation completed with BGM!")

if __name__ == "__main__":
    pdf_to_video_with_bgm("public/about_ppt.pdf", "public/about_video.mp4", "public/bgm.mp3")
