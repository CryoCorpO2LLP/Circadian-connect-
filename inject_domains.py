import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Define the new focusDomains array
focus_domains_code = """
  const focusDomains = [
    {
      title: "Responsible AI Evaluation Modules",
      modules: [
        {
          name: "Dataset and model bias assessments for India",
          desc: "We audit datasets and model behaviour for socio‑cultural and linguistic bias in multilingual Indian contexts, and translate findings into practical mitigation options for your teams.",
          output: "Assessment report & mitigation framework"
        },
        {
          name: "Responsible AI risk and impact mapping",
          desc: "We identify fairness, explainability, safety, and governance risks across the AI lifecycle, and co‑design risk registers and mitigation plans aligned with EU AI Act–style expectations, adapted to India and Global South deployments.",
          output: "Risk register & governance roadmap"
        },
        {
          name: "Human‑centred evaluation of AI products",
          desc: "We run mixed‑methods evaluations of AI‑driven tools in health, education, governance and climate projects, examining user behaviour, trust, and unintended consequences in the field.",
          output: "Evaluation report & field insights"
        }
      ]
    },
    {
      title: "Socio‑technical Evaluation and MEL Services",
      modules: [
        {
          name: "Theory of Change and evaluation design with AI layer",
          desc: "We design ToC‑driven evaluation and MEL frameworks for digital and AI‑enabled programmes, integrating institutional analysis (e.g. Ostrom's IAD), gender and inclusion, and responsible AI considerations.",
          output: "ToC & evaluation framework"
        },
        {
          name: "Governance and institutional diagnostics for digital projects",
          desc: "We map actors, incentives and institutional rules to understand how AI and data projects interact with public systems, frontline workers and communities in India.",
          output: "Institutional diagnostic report"
        },
        {
          name: "Embedded MEL modules in Indo‑German projects",
          desc: "We plug into existing German‑led projects as the India evaluation and learning partner, conducting fieldwork, participatory workshops and synthesis for reports and consortia.",
          output: "Embedded MEL module execution"
        }
      ]
    },
    {
      title: "Training, Facilitation and Capacity Building",
      modules: [
        {
          name: "Responsible AI and socio‑technical evaluation workshops",
          desc: "We design and deliver short courses and workshops on responsible AI and socio‑technical evaluation for programme teams, evaluators and researchers, tailored to India and Global South contexts.",
          output: "Customized workshop delivery"
        },
        {
          name: "Participatory systems and governance design labs",
          desc: "We facilitate Dialogue‑Matters‑style multi‑stakeholder processes to co‑design governance reforms, digital strategies and evaluation frameworks with frontline workers and communities.",
          output: "Participatory design lab outcomes"
        },
        {
          name: "Evaluation and MEL training for AI‑enabled programmes",
          desc: "We train MEL and programme staff to integrate AI‑specific questions, indicators and ethical checks into existing logframes and evaluation plans.",
          output: "Capacity building & logframe integration"
        }
      ]
    },
    {
      title: "Partnership Formats for German and Indian Clients",
      modules: [
        {
          name: "Named expert in proposals",
          desc: "We join your project as a named expert (individual CV) providing a clearly defined responsible AI and socio‑technical evaluation module for India.",
          output: "Named expert module integration"
        },
        {
          name: "Specialist work package or subcontract",
          desc: "We design and deliver a self‑contained work package (e.g. 'Socio‑technical evaluation of AI pilots in India') under your proposal or contract.",
          output: "Delivered work package"
        },
        {
          name: "Joint research and publications",
          desc: "We co‑develop concept notes, case studies and papers on responsible AI and socio‑technical governance, building a pipeline from research to deployment and evaluation in India.",
          output: "Co-authored research publications"
        }
      ],
      extra: {
        title: "Who We Work With",
        items: [
          "Applied research institutes (Fraunhofer‑type)",
          "AI governance research groups (HIIG‑type)",
          "Evaluation consultancies",
          "Development implementers working in India"
        ]
      }
    }
  ];

  const navItems = [
"""

# Replace navItems with the new domains + navItems
content = content.replace("  const navItems = [", focus_domains_code)


# 2. Replace the Home page focus areas section map
old_map_start = r"\{indiaUseCases\.map\(\(useCase, index\) => \("
old_map_end_pattern = r"                    \)\)\}"

new_map_code = """{focusDomains.map((domain, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-12 lg:gap-16`}>
                      
                      {/* Video Side */}
                      <div className="w-full lg:w-[45%] relative group sticky top-32">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#f97316]/20 to-[#4c1d95]/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">
                          <video 
                            src={`/video_${index + 1}.mp4`} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-auto object-cover aspect-video"
                          />
                        </div>
                      </div>

                      {/* Text Side */}
                      <div className="w-full lg:w-[55%] space-y-8">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[#4c1d95] font-bold text-xs uppercase tracking-wider">
                          0{index + 1}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black text-[#1e293b] leading-tight tracking-tight">{domain.title}</h3>
                        
                        <div className="space-y-6">
                          {domain.modules.map((mod, modIdx) => (
                            <div key={modIdx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-[#f97316]/30 hover:shadow-md transition-all group/mod">
                              <h4 className="text-xl font-bold text-[#4c1d95] mb-3 group-hover/mod:text-[#f97316] transition-colors">{mod.name}</h4>
                              <p className="text-slate-600 leading-relaxed mb-4">{mod.desc}</p>
                              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                                <CheckSquare className="h-4 w-4 text-[#0d9488]" />
                                <span className="text-sm font-bold text-slate-700">Output: {mod.output}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {domain.extra && (
                          <div className="mt-8 p-6 bg-white border border-[#4c1d95]/10 rounded-2xl shadow-sm border-l-4 border-l-[#f97316]">
                            <h4 className="text-lg font-black text-[#4c1d95] mb-4">{domain.extra.title}</h4>
                            <div className="flex flex-wrap gap-3">
                              {domain.extra.items.map((item, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-full">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></div>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="pt-4 pb-12 border-b border-slate-100 lg:border-none">
                          <Button variant="outline" size="md" onClick={() => setConsultationModalOpen(true)}>
                            Discuss this package
                          </Button>
                        </div>
                      </div>

                    </div>
                  ))}"""

# Regex to replace the whole block from `{indiaUseCases.map(` to its closing `))}` inside Focus Areas
# This is inside `<div className="max-w-7xl mx-auto space-y-24">`
# We'll use re.sub with re.DOTALL
# But first, find the start and end indices to be safe.

start_idx = content.find("{indiaUseCases.map((useCase, index) => (")
if start_idx != -1:
    end_idx = content.find("))}  ", start_idx) # wait, it might end with `))}`
    if end_idx == -1:
        end_idx = content.find("))}\n", start_idx)
    if end_idx == -1:
        end_idx = content.find("))}\r\n", start_idx)
    
    # Actually, the original is:
    #                   ))}
    #
    #                 </div>
    #               </div>

    # Let's use regex
    pattern = r"\{indiaUseCases\.map\(\(useCase, index\) => \([\s\S]*?\}\)\)\}"
    content = re.sub(pattern, new_map_code, content, count=1)
else:
    print("Could not find indiaUseCases map loop.")

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected domains.")
