import csv
import json

csv_file = "public/about_us_content.csv"
jsx_file = "src/App.jsx"

projects = []
with open(csv_file, newline='', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        projects.append({
            'sr': row['Sr. No.'],
            'title': row['Project Title'],
            'theme': row['Theme of the Project'],
            'domain': row['Domain / Sector'],
            'country': row['Country of Client'],
            'clientType': row['Type of Client'],
            'contribution': row['Our Contribution'],
            'link': row['Link 1 '] if row['Link 1 '] else ''
        })

# Generate JSX string for projects
projects_jsx = """{/* 2. Global Project Footprint */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl text-[#4c1d95] font-bold tracking-tight">Our Global Project Footprint</h2>
                    <p className="text-sm text-slate-500 mt-2">A snapshot of our international research, consultancy, and methodology projects.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
"""

for p in projects:
    title = p['title'].replace('"', '&quot;')
    theme = p['theme'].replace('"', '&quot;')
    domain = p['domain'].replace('"', '&quot;')
    country = p['country'].replace('"', '&quot;')
    clientType = p['clientType'].replace('"', '&quot;')
    contribution = p['contribution'].replace('"', '&quot;')
    sr_no = p['sr'].strip()
    
    image_src = f"/project_{sr_no}.png"

    if sr_no == '1':
        # Custom block for Project 1 (Horizontal)
        projects_jsx += f"""
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full md:w-2/5 h-48 md:h-auto shrink-0 overflow-hidden bg-slate-100 border-b md:border-b-0 md:border-r border-slate-100">
                        <img src="{image_src}" alt="Building Stereotype Repositories" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-4 bg-white">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#f97316]/10 px-2 py-1 rounded shrink-0">USA</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6d28d9] bg-[#6d28d9]/10 px-2 py-1 rounded text-right line-clamp-1" title="Artificial Intelligence / Natural Language Processing (NLP)">Artificial Intelligence / NLP</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-base text-[#4c1d95] leading-snug">Building Stereotype Repositories with LLMs and Community Engagement for Scale and Depth (Projects SPICE and BiNDI) - Google Alphabet LLC, Google Research Labs (2022-23)</h4>
                        <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                          <p><strong>C3NLP 2023:</strong> Measurements of fairness in NLP often perpetuate a Western narrative. To address this, we leverage community engagement and generative models to build a benchmark targeting stereotyping harms across diverse and intersectional identities.</p>
                          <p><strong>NeurIPS 2023:</strong> Current evaluation paradigms underrepresent local socio-cultural perspectives. We demonstrate a socio-culturally aware expansion of evaluation resources in the Indian societal context, generating over 1000 stereotypes across unique identities to better calibrate LLM evaluations.</p>
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client: Technology Giant (Google Alphabet LLC)</div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:Tyk-4Ss8FVUC" target="_blank" rel="noreferrer" className="text-[#f97316] text-[11px] font-bold hover:underline flex items-center gap-1 w-max">
                              View C3NLP Paper <ArrowUpRight className="h-3 w-3" />
                            </a>
                            <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=fBRN_8oAAAAJ&citation_for_view=fBRN_8oAAAAJ:u-x6o8ySG0sC" target="_blank" rel="noreferrer" className="text-[#f97316] text-[11px] font-bold hover:underline flex items-center gap-1 w-max">
                              View NeurIPS Paper <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Card>
"""
    else:
        # Standard block (Horizontal)
        projects_jsx += f"""
                    <Card className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full md:w-2/5 h-48 md:h-auto shrink-0 overflow-hidden bg-slate-100 border-b md:border-b-0 md:border-r border-slate-100">
                        <img src="{image_src}" alt="{title}" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 space-y-4 bg-white">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c] bg-[#f97316]/10 px-2 py-1 rounded shrink-0">{country}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6d28d9] bg-[#6d28d9]/10 px-2 py-1 rounded text-right line-clamp-1" title="{domain}">{domain}</span>
                        </div>
                        <h4 className="font-bold text-sm md:text-base text-[#4c1d95] leading-snug line-clamp-3" title="{title}">{title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-4" title="{contribution}">{contribution}</p>
                        
                        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-1">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Client</div>
                          <div className="text-xs font-bold text-[#4c1d95] truncate" title="{clientType}">{clientType}</div>
                        </div>
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

start_marker = "{/* 2. Global Project Footprint */}"
end_marker = "{/* 3. Who We Serve */}"

if start_marker in app_content and end_marker in app_content:
    before = app_content.split(start_marker)[0]
    after = app_content.split(end_marker)[1]
    
    new_content = before + projects_jsx + "                " + end_marker + after
    with open(jsx_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced projects in App.jsx to horizontal layout")
else:
    print("Could not find markers in App.jsx")
