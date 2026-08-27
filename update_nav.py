import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace Button component
old_button = r"""const Button = \(\{ className = '', variant = 'primary', size = 'md', \.\.\.props \}\) => \{[\s\S]*?\}\);
\};"""

new_button = """const Button = ({ className = '', variant = 'primary', size = 'md', ...props }) => {
  const base = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-full';
  const sizes = {
    sm: 'text-[11px] px-4 py-2',
    md: 'text-xs px-6 py-2.5',
    lg: 'text-sm px-8 py-3.5',
    xl: 'text-sm px-10 py-4',
  };
  const variants = {
    primary: 'bg-gradient-to-r from-[#6d28d9] to-[#4c1d95] text-white shadow-md hover:shadow-lg hover:shadow-[#6d28d9]/30',
    teal: 'bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white shadow-md hover:shadow-lg hover:shadow-[#f97316]/30',
    navy: 'bg-[#1e293b] text-white hover:bg-[#0f172a] shadow-md hover:shadow-lg',
    outline: 'border border-slate-200 bg-white/50 text-[#4c1d95] hover:bg-white hover:border-[#4c1d95]/30 hover:shadow-md backdrop-blur-sm',
    'outline-white': 'border border-white/50 text-white bg-white/5 hover:bg-white hover:text-[#6d28d9] backdrop-blur-sm',
  };
  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`} 
      {...props} 
    />
  );
};"""
content = re.sub(old_button, new_button, content)

# 2. Replace Nav component & background mesh
old_nav_start = r"""    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-\[\#f97316\]/20 selection:text-\[\#4c1d95\] flex flex-col relative">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">"""

new_nav_start = """    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#f97316]/20 selection:text-[#4c1d95] flex flex-col relative">
      <div className="mesh-bg"></div>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl glass-nav rounded-full px-4 md:px-6 transition-all duration-300">
        <div className="h-16 flex items-center justify-between">"""
content = re.sub(old_nav_start, new_nav_start, content)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated Nav and Buttons.")
