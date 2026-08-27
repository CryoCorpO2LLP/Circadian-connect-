import re

file_path = "c:\\Users\\Admin\\OneDrive\\Documents\\Circadian Website\\Landing page\\src\\App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Card Component
card_old = """const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white ${className}`} {...props}>{children}</div>
);"""
card_new = """const Card = ({ className = '', children, ...props }) => (
  <div className={`bento-card ${className}`} {...props}>{children}</div>
);"""
content = content.replace(card_old, card_new)

# 2. Update Button Component
button_old = """const Button = ({ className = '', variant = 'primary', size = 'md', ...props }) => {
  const base = 'inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] select-none cursor-pointer rounded-full';
  const sizes = {
    sm: 'text-[11px] px-4 py-2',
    md: 'text-xs px-5 py-2.5',
    lg: 'text-xs px-7 py-3.5',
    xl: 'text-sm px-8 py-4',
  };
  const variants = {
    primary: 'bg-[#6d28d9] text-white hover:bg-[#253a8e] shadow-sm',
    teal: 'bg-[#f97316] text-white hover:bg-[#ea580c] shadow-sm',
    navy: 'bg-[#4c1d95] text-white hover:bg-[#3b0764] shadow-sm',
    outline: 'border-2 border-[#4c1d95] text-[#4c1d95] bg-transparent hover:bg-[#4c1d95] hover:text-white',
    'outline-white': 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#6d28d9]',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`} {...props} />
  );
};"""
button_new = """const Button = ({ className = '', variant = 'primary', size = 'md', ...props }) => {
  const base = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] select-none cursor-pointer rounded-full';
  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-sm px-7 py-3.5',
    xl: 'text-base px-8 py-4',
  };
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20',
    teal: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/20',
    navy: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
    'outline-white': 'border border-white text-white bg-transparent hover:bg-white hover:text-primary',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`} {...props} />
  );
};"""
content = content.replace(button_old, button_new)

# 3. Update Eyebrow Component
eyebrow_old = """const Eyebrow = ({ children }) => (
  <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 mb-4">
    <Sparkles className="h-3.5 w-3.5 text-[#f97316]" />
    <span className="text-[10px] font-black uppercase tracking-wider text-[#ea580c]">{children}</span>
  </div>
);"""
eyebrow_new = """const Eyebrow = ({ children }) => (
  <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
    <Sparkles className="h-4 w-4 text-accent" />
    <span className="text-xs font-bold uppercase tracking-widest text-accent">{children}</span>
  </div>
);"""
content = content.replace(eyebrow_old, eyebrow_new)

# 4. Remove rigid Card borders and bgs (since bento-card handles it)
# We remove occurrences of: bg-white, border-t-4, border-[#4c1d95], etc from Cards
content = re.sub(r'bg-white\s*', '', content)
content = re.sub(r'border-t-4\s*', '', content)
content = re.sub(r'border-\[#[a-fA-F0-9]{6}\]\s*', '', content)

# 5. Global color replacements
# Purple/Navy to primary
content = re.sub(r'\[#4c1d95\]', 'primary', content)
content = re.sub(r'\[#6d28d9\]', 'primary', content)
content = re.sub(r'\[#3b0764\]', 'primary', content)

# Orange/Teal/Crimson to accent
content = re.sub(r'\[#f97316\]', 'accent', content)
content = re.sub(r'\[#ea580c\]', 'accent', content)

# Slates to surfaces and muteds
content = re.sub(r'slate-50', 'surface', content)
content = re.sub(r'slate-900', 'foreground', content)
content = re.sub(r'slate-800', 'foreground', content)
content = re.sub(r'slate-700', 'foreground', content)
content = re.sub(r'slate-600', 'muted', content)
content = re.sub(r'slate-500', 'muted', content)
content = re.sub(r'slate-200', 'border', content)
content = re.sub(r'slate-100', 'border', content)

# 6. Typography refinements (font-black to font-bold)
content = content.replace("font-black", "font-bold")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("App.jsx has been updated with the new design system!")
