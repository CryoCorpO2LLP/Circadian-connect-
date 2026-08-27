import re

css_file = "src/index.css"

new_css = """@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Lovable / Modern SaaS Palette */
    --purple:       262 83% 58%;
    --purple-dark:  262 80% 30%;
    --purple-light: 262 80% 96%;
    --orange:       24 100% 50%;
    --orange-dark:  24 100% 40%;
    --orange-light: 24 100% 96%;
    
    /* Legacy variables for compatibility */
    --navy:         262 80% 30%;
    --rai-navy:     262 80% 30%;
    --teal:         24 100% 40%;
    --teal-accent:  24 100% 50%;
    --crimson:      24 100% 50%;

    --background:   0 0% 100%;
    --foreground:   222.2 84% 4.9%;
    --muted:        215.4 16.3% 46.9%;
    --border:       214.3 31.8% 91.4%;
    
    --font-display: 'Plus Jakarta Sans', sans-serif;
    --font-body:    'Inter', sans-serif;

    /* Lovable Soft Shadows */
    --shadow-sm:    0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
    --shadow-card:  0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03);
    --shadow-hover: 0 20px 40px -10px rgba(76,29,149,0.1);
    --shadow-glow:  0 0 20px rgba(249,115,22,0.15);
  }
}

*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* ─── Typography ─── */
.display-bold {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: hsl(var(--rai-navy));
}
.section-heading {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: hsl(var(--rai-navy));
}
.eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: hsl(var(--crimson));
}

/* ─── Lovable Glassmorphism & Mesh ─── */
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: var(--shadow-card);
}

.glass-nav {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
}

.mesh-bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(at 0% 0%, rgba(249,115,22,0.1) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(76,29,149,0.1) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(249,115,22,0.05) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(76,29,149,0.05) 0px, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

/* ─── Cards & Bento Grid ─── */
.bento-card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}
.bento-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
  border-color: rgba(76,29,149,0.15);
}

/* ─── Animations ─── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }

/* Network BG fallback */
.network-bg {
  position: relative;
}
.dot-navy, .dot-crimson, .dot-teal, .dot-outline, .dot-outline-red {
  display: none; /* Disable old hardcoded dots for clean lovable style */
}
"""

with open(css_file, "w", encoding="utf-8") as f:
    f.write(new_css)

print("Updated index.css for Lovable style.")
