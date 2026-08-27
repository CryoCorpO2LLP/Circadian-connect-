import csv
import json

csv_file = "public/about_us_content.csv"
jsx_file = "src/App.jsx"

projects = []
with open(csv_file, newline='', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        projects.append({
            'title': row['Project Title'],
            'theme': row['Theme of the Project'],
            'domain': row['Domain / Sector'],
            'country': row['Country of Client'],
            'clientType': row['Type of Client'],
            'contribution': row['Our Contribution'],
            'link': row['Link 1 '] if row['Link 1 '] else ''
        })

# Generate JSX string for projects
projects_jsx = """
                {/* Projects Portfolio (from Google Sheet) */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl text-[#4c1d95] font-bold tracking-tight">Our Global Project Footprint</h2>
                    <p className="text-sm text-slate-500 mt-2">A snapshot of our international research, consultancy, and methodology projects.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
"""

for p in projects:
    title = p['title'].replace('"', '&quot;')
    theme = p['theme'].replace('"', '&quot;')
    domain = p['domain'].replace('"', '&quot;')
    country = p['country'].replace('"', '&quot;')
    clientType = p['clientType'].replace('"', '&quot;')
    contribution = p['contribution'].replace('"', '&quot;')
    link = p['link'].strip()
    
    link_jsx = ""
    if link and link.startswith('http'):
        link_jsx = f'<a href="{link}" target="_blank" rel="noreferrer" className="text-[#f97316] text-xs font-bold hover:underline flex items-center gap-1 mt-3">View Project <ArrowUpRight className="h-3 w-3" /></a>'

    projects_jsx += f"""
                    <Card className="p-6 flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#f97316]/10 px-2 py-1 rounded">{country}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6d28d9] bg-[#6d28d9]/10 px-2 py-1 rounded text-right">{domain}</span>
                      </div>
                      <h4 className="font-bold text-base text-[#4c1d95] leading-snug">{title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3" title="{contribution}">{contribution}</p>
                      
                      <div className="mt-auto pt-2 border-t border-slate-100 flex justify-between items-center">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client: {clientType}</div>
                        {link_jsx}
                      </div>
                    </Card>
"""

projects_jsx += """
                  </div>
                </div>
"""

# Read App.jsx
with open(jsx_file, 'r', encoding='utf-8') as f:
    app_content = f.read()

# I will insert this right after "Who We Serve" block in the about tab.
# We will replace the closing of "Who We Serve"
target = """                  </div>
                </div>

                {/* Founder Details & PPT Video */}"""

if target in app_content:
    new_content = app_content.replace(target, "                  </div>\n                </div>\n\n" + projects_jsx + "\n\n                {/* Founder Details & PPT Video */}")
    with open(jsx_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully injected projects into App.jsx")
else:
    print("Could not find target insertion point in App.jsx")
