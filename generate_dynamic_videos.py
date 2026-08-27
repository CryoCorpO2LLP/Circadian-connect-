import os
from gtts import gTTS
from moviepy import *

scripts = [
    # Video 1
    "Welcome to the Responsible AI Evaluation module. As artificial intelligence systems become increasingly integrated into our daily lives and critical infrastructure, the need to rigorously test and evaluate them has never been more urgent. At Circadian Connect, our interdisciplinary team goes beyond standard compliance checklists. We actively stress-test your AI systems against real-world scenarios, examining how they behave under edge cases and unexpected conditions. We evaluate the models for safety, transparency, and accountability, ensuring they align with human values and global regulatory standards. By identifying vulnerabilities early in the development lifecycle, we help organizations deploy AI with confidence. Our comprehensive evaluation frameworks are designed to build trust with your users and stakeholders, ensuring that the technology you bring to market is not only powerful, but fundamentally safe and beneficial for society.",

    # Video 2
    "Welcome to our Socio-Technical Systems analysis module. Technology does not exist in a vacuum; it operates within complex human environments governed by historical contexts, cultural nuances, and intricate power dynamics. Our approach recognizes that an algorithm's impact is determined just as much by the society it interacts with as by the code itself. We map your digital tools against these real-world institutional structures to identify hidden friction points and systemic vulnerabilities. By bringing together experts from sociology, anthropology, and computer science, we conduct deep-dive field research to understand how different communities will actually experience your technology. This holistic, ground-level analysis ensures that your AI deployments are equitable and inclusive. We help you foresee unintended consequences and design mitigation strategies, ensuring your technology empowers communities rather than disenfranchising them.",

    # Video 3
    "Welcome to the Bias Auditing module. One of the most significant challenges in modern AI is the amplification of historical biases present in training data. If left unchecked, these biases can lead to discriminatory outcomes in hiring, lending, healthcare, and beyond. At Circadian Connect, we conduct rigorous, end-to-end bias audits on your machine learning models. Our experts scrutinize both your training datasets and your algorithmic outputs to identify skews related to race, gender, geography, and socio-economic status. We employ advanced statistical techniques alongside qualitative socio-cultural analysis to uncover hidden correlations and proxy variables that drive unfairness. By partnering with us, you receive actionable recommendations to clean your data pipelines, adjust model weights, and implement fairness constraints. We empower you to build AI systems that are genuinely representative, ethical, and fair for all communities.",

    # Video 4
    "Welcome to our Global Partnerships and Capacity Building module. Developing responsible AI is a global imperative that requires collaboration across borders and disciplines. At Circadian Connect, we help organizations scale their responsible AI footprint by connecting them with a worldwide network of researchers, policymakers, and industry leaders. We facilitate strategic dialogues and knowledge-sharing initiatives that align your procurement pathways with international best practices. Whether you are a small enterprise or a multinational corporation, we offer tailored capacity-building workshops to train your internal teams on the latest AI governance frameworks. By leveraging our extensive academic and institutional partnerships, you gain access to cutting-edge research and policy insights. Together, we can build a collaborative ecosystem that champions ethical AI development on a global scale, driving sustainable innovation for the future."
]

def create_video(video_index, text):
    print(f"Starting Video {video_index} generation...")
    audio_path = f"public/temp_audio_{video_index}.mp3"
    out_path = f"public/video_{video_index}.mp4"
    
    # 1. Generate Voiceover
    print(f"Generating TTS for Video {video_index}...")
    tts = gTTS(text=text, lang='en', tld='co.uk')
    tts.save(audio_path)
    
    # 2. Load Audio
    audio_clip = AudioFileClip(audio_path)
    audio_duration = audio_clip.duration
    
    import glob
    brain_dir = r"c:\Users\Admin\.gemini\antigravity-ide\brain\6a97bd05-9b98-406a-a5ee-9da24233444d"
    
    images = []
    for img_idx in range(1, 4):
        search_pattern = os.path.join(brain_dir, f"vid{video_index}_img{img_idx}_*.png")
        files = glob.glob(search_pattern)
        if files:
            latest_file = max(files, key=os.path.getctime)
            images.append(latest_file)
        else:
            print(f"Warning: Could not find image vid{video_index}_img{img_idx}")

    if len(images) == 0:
        print("No images found! Falling back.")
        return

    clip_duration = audio_duration / len(images)
    
    clips = []
    for i, img_path in enumerate(images):
        # We add 1 second for a basic overlap crossfade using moviepy v2 syntax
        # Using crossfadein on ImageClip is possible, but we'll stick to compose for simplicity
        c = ImageClip(img_path).with_duration(clip_duration)
        clips.append(c)
    
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.with_audio(audio_clip)
    
    print(f"Writing Video {video_index}...")
    # Render with 1 fps to save massive amount of time!
    final_video.write_videofile(out_path, fps=1, codec="libx264", audio_codec="aac")
    
    audio_clip.close()
    final_video.close()
    os.remove(audio_path)
    print(f"Video {video_index} finished!")

for i in range(1, 5):
    create_video(i, scripts[i-1])

print("All 4 dynamic videos generated successfully!")
