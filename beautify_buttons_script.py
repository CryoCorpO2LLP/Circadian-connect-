import sys
import re

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the generic Button component
old_button = """const Button = ({ className = '', variant = 'primary', size = 'md', ...props }) => {
  const base = 'inline-flex items-center justify-center font-bold tracking-wide focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer rounded-full';
  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-sm px-7 py-3.5',
    xl: 'text-sm px-8 py-4',
  };
  const variants = {
    primary: 'bg-primary text-primary-foreground btn-3d hover:bg-primary/90',
    teal: 'bg-accent text-accent-foreground btn-3d-teal hover:bg-accent/90',
    navy: 'bg-primary text-primary-foreground btn-3d hover:bg-primary/90',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300',
    'outline-white': 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary transition-all duration-300',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`} {...props} />
  );
};"""

new_button = """const Button = ({ className = '', variant = 'primary', size = 'md', ...props }) => {
  const base = 'group inline-flex items-center justify-center font-bold tracking-wide focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer rounded-full transition-all duration-500 hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-sm hover:shadow-xl overflow-hidden relative z-10';
  const sizes = {
    sm: 'text-xs px-5 py-2.5',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
    xl: 'text-lg px-10 py-5',
  };
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-[#0a3161] text-white shadow-primary/30 border border-white/10 hover:shadow-primary/40',
    teal: 'bg-gradient-to-r from-accent to-emerald-400 text-white shadow-accent/30 border border-white/20 hover:shadow-accent/40',
    navy: 'bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white shadow-slate-900/30 border border-white/10 hover:shadow-slate-900/40',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent hover:shadow-primary/20',
    'outline-white': 'bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-primary backdrop-blur-sm hover:shadow-white/20',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`} {...props}>
      <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      {props.children}
    </button>
  );
};"""

if old_button in content:
    content = content.replace(old_button, new_button)
    print("Replaced Button component.")
else:
    print("Could not find old Button component.")


# 2. Update the hardcoded "Enquire Now" and "RAIR Quiz" buttons
# From: className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-3 py-1.5 z-20 relative"
# Or: className="inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-300 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-3 py-1.5"

ugly_button_pattern = r'className="inline-flex items-center justify-center text-\[11px\] font-bold tracking-wide transition-all duration-300 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-3 py-1\.5(?: z-20 relative)?"'

beautiful_teal_class = 'className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border border-white/20 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white shadow-md shadow-[#14b8a6]/30 hover:shadow-xl hover:shadow-[#14b8a6]/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden"'

content, count = re.subn(ugly_button_pattern, beautiful_teal_class, content)
print(f"Replaced {count} hardcoded teal buttons.")


# 3. There is an ugly "View More" button in usecases
ugly_view_more = r'className="inline-flex items-center justify-center text-\[11px\] font-bold tracking-wide transition-all duration-300 rounded-full border border-accent text-accent hover:bg-accent hover:text-white px-3 py-1\.5"'
beautiful_view_more = 'className="group inline-flex items-center justify-center text-[11px] font-bold tracking-wide transition-all duration-500 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 px-4 py-2 z-20 relative overflow-hidden"'

content, count2 = re.subn(ugly_view_more, beautiful_view_more, content)
print(f"Replaced {count2} View More buttons.")


with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)
