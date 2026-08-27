import fitz
import os
import asyncio
import edge_tts
from moviepy import ImageClip, AudioFileClip, concatenate_videoclips

VOICE = "en-IN-NeerjaNeural"

async def generate_audio(text, output_path):
    if not text.strip():
        # If no text, generate 2 seconds of silence
        text = "This slide has no text."
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)

async def main():
    pdf_path = "public/about_ppt.pdf"
    output_mp4 = "public/about_video.mp4"
    doc = fitz.open(pdf_path)
    
    clips = []
    temp_files = []
    
    print(f"Processing {len(doc)} slides...")
    
    for i in range(len(doc)):
        page = doc.load_page(i)
        
        # Extract Image
        pix = page.get_pixmap(dpi=150)
        img_path = f"public/slide_{i}.png"
        pix.save(img_path)
        temp_files.append(img_path)
        
        # Extract Text
        text = page.get_text()
        text = text.replace('\n', ' ').strip()
        text = text.replace('\ufb01', 'fi').replace('\ufb02', 'fl').replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"')
        
        # Fallback text if slide is empty or just a number
        if not text or len(text) < 5:
            text = f"Slide {i+1}."
        
        # Generate Audio
        audio_path = f"public/audio_{i}.mp3"
        await generate_audio(text, audio_path)
        temp_files.append(audio_path)
        
        # Combine Image and Audio
        audio_clip = AudioFileClip(audio_path)
        # Give a small padding to the video duration
        duration = audio_clip.duration + 0.5 
        
        image_clip = ImageClip(img_path).with_duration(duration)
        image_clip = image_clip.with_audio(audio_clip)
        
        clips.append(image_clip)
        
    print("Concatenating video clips...")
    final_video = concatenate_videoclips(clips, method="compose")
    
    print("Writing final video...")
    final_video.write_videofile(output_mp4, fps=2, codec="libx264", audio_codec="aac")
    final_video.close()
    
    print("Cleaning up temporary files...")
    for f in temp_files:
        try:
            os.remove(f)
        except:
            pass
            
    print("Done! Voiceover video generated successfully.")

if __name__ == "__main__":
    asyncio.run(main())
