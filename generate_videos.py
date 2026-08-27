import os
from gtts import gTTS
from moviepy import *

scripts = [
    "Welcome to our Responsible AI Evaluation module. We test your AI systems for real world problems, ensuring safety and compliance at every step.",
    "Our socio-technical analysis maps your AI tools against complex institutional dynamics and power structures in the field.",
    "Through comprehensive bias audits, we ensure your AI training data is representative and ethical for all communities.",
    "Leverage our global partnerships to scale your responsible AI procurement pathways effectively."
]

for i in range(1, 5):
    text = scripts[i-1]
    img_path = f"public/service_graphic_{i}.png"
    audio_path = f"public/temp_audio_{i}.mp3"
    out_path = f"public/video_{i}.mp4"
    
    # Generate speech
    tts = gTTS(text=text, lang='en', tld='co.uk')
    tts.save(audio_path)
    
    # Create video
    audio_clip = AudioFileClip(audio_path)
    # The image might not exist if it was deleted, but let's assume it does since we created it previously.
    if not os.path.exists(img_path):
        # Create a dummy image if missing
        from PIL import Image
        img = Image.new('RGB', (1280, 720), color = (76, 29, 149))
        img.save(img_path)

    # Use ImageClip from moviepy
    image_clip = ImageClip(img_path).with_duration(audio_clip.duration)
    video = image_clip.with_audio(audio_clip)
    
    # Write to mp4
    video.write_videofile(out_path, fps=24, codec="libx264", audio_codec="aac")
    
    # Cleanup
    os.remove(audio_path)

print("All videos generated successfully!")
