import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

offer_clusters_code = """
  const offerClusters = [
    {
      theme: "Module 1",
      title: "Responsible AI Evaluation Modules",
      description: "Frame these as concrete work packages, not abstract ethics.",
      items: [
        {
          name: "Dataset and model bias assessments for India",
          desc: "We audit datasets and model behaviour for socio‑cultural and linguistic bias in multilingual Indian contexts, and translate findings into practical mitigation options for your teams.",
          output: "Assessment report + workshop"
        },
        {
          name: "Responsible AI risk and impact mapping",
          desc: "We identify fairness, explainability, safety, and governance risks across the AI lifecycle, and co‑design risk registers and mitigation plans aligned with EU AI Act–style expectations, adapted to India and Global South deployments.",
          output: "Risk register + governance roadmap"
        },
        {
          name: "Human‑centred evaluation of AI products",
          desc: "We run mixed‑methods evaluations of AI‑driven tools in health, education, governance and climate projects, examining user behaviour, trust, and unintended consequences in the field.",
          output: "Evaluation report + field insights"
        }
      ]
    },
    {
      theme: "Module 2",
      title: "Socio-technical Evaluation and MEL Services",
      description: "Use language that MEL firms and evaluators recognise, then layer in your 'responsible AI' edge.",
      items: [
        {
          name: "Theory of Change and evaluation design with AI layer",
          desc: "We design ToC‑driven evaluation and MEL frameworks for digital and AI‑enabled programmes, integrating institutional analysis (e.g. Ostrom’s IAD), gender and inclusion, and responsible AI considerations.",
          output: "ToC + MEL Framework"
        },
        {
          name: "Governance and institutional diagnostics for digital projects",
          desc: "We map actors, incentives and institutional rules to understand how AI and data projects interact with public systems, frontline workers and communities in India.",
          output: "Diagnostic report + stakeholder map"
        },
        {
          name: "Embedded MEL modules in Indo‑German projects",
          desc: "We plug into existing German‑led projects as the India evaluation and learning partner, conducting fieldwork, participatory workshops and synthesis for reports and consortia.",
          output: "Fieldwork synthesis + consortium reporting"
        }
      ]
    },
    {
      theme: "Module 3",
      title: "Training, Facilitation and Capacity Building",
      description: "German agencies and Indian partners often have budget lines for capacity building and participatory processes.",
      items: [
        {
          name: "Responsible AI and socio‑technical evaluation workshops",
          desc: "We design and deliver short courses and workshops on responsible AI and socio‑technical evaluation for programme teams, evaluators and researchers, tailored to India and Global South contexts.",
          output: "Tailored workshop + training materials"
        },
        {
          name: "Participatory systems and governance design labs",
          desc: "We facilitate Dialogue‑Matters‑style multi‑stakeholder processes to co‑design governance reforms, digital strategies and evaluation frameworks with frontline workers and communities.",
          output: "Co-design lab + strategy document"
        },
        {
          name: "Evaluation and MEL training for AI‑enabled programmes",
          desc: "We train MEL and programme staff to integrate AI‑specific questions, indicators and ethical checks into existing logframes and evaluation plans.",
          output: "Training sessions + updated logframes"
        }
      ]
    },
    {
      theme: "Module 4",
      title: "Partnership Formats for German and Indian Clients",
      description: "Explicit entry routes for how we work together.",
      items: [
        {
          name: "Named expert in proposals",
          desc: "We join your project as a named expert (individual CV) providing a clearly defined responsible AI and socio‑technical evaluation module for India.",
          output: "Named expert + defined module"
        },
        {
          name: "Specialist work package or subcontract",
          desc: "We design and deliver a self‑contained work package (e.g. 'Socio‑technical evaluation of AI pilots in India') under your proposal or contract.",
          output: "Self-contained work package"
        },
        {
          name: "Joint research and publications",
          desc: "We co‑develop concept notes, case studies and papers on responsible AI and socio‑technical governance, building a pipeline from research to deployment and evaluation in India.",
          output: "Co-developed research + publications pipeline"
        }
      ],
      whoWeWorkWith: "Who we work with: Applied research institutes (Fraunhofer-type), AI governance research groups (HIIG-type), evaluation consultancies, and development implementers working in India."
    }
  ];

  const indiaUseCases = ["""

# Insert offerClusters before indiaUseCases
if "const offerClusters" not in content:
    content = content.replace("  const indiaUseCases = [", offer_clusters_code)

# Replace the specific mapping section for the home tab
old_mapping = r"""                  \{indiaUseCases\.map\(\(useCase, index\) => \(
                    <div key=\{index\} className=\{`flex flex-col \$\{index % 2 === 1 \? 'md:flex-row-reverse' : 'md:flex-row'\} items-center gap-12 lg:gap-20`\}>
                      
                      \{\/\* Video Side \*\/\}
                      <div className="w-full md:w-1\/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-\[\#f97316\]\/20 to-\[\#4c1d95\]\/20 rounded-\[2rem\] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"><\/div>
                        <div className="relative glass-panel rounded-3xl overflow-hidden border border-white\/20 shadow-2xl shadow-\[\#4c1d95\]\/5 p-2">
                          <video 
                            src=\{`/video_\$\{index \+ 1\}\.mp4`\} 
                            controls
                            playsInline 
                            className="w-full h-auto object-cover aspect-video bg-black rounded-2xl"
                          \/>
                        <\/div>
                      <\/div>

                      \{\/\* Text Side \*\/\}
                      <div className="w-full md:w-1\/2 space-y-6">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1\.5 rounded-full bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider">
                          0\{index \+ 1\} • \{useCase\.theme\}
                        <\/div>
                        <h3 className="text-3xl font-bold text-\[\#1e293b\] leading-tight">\{useCase\.title\}<\/h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                          \{useCase\.description\}
                        <\/p>
                        <div className="pt-4">
                          <Button variant="outline" size="lg" onClick=\{\(\) => setActiveTab\('usecases_india'\)\}>
                            Explore Projects
                          <\/Button>
                        <\/div>
                      <\/div>

                    <\/div>
                  \)\}\}"""

new_mapping = """                  {offerClusters.map((cluster, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}>
                      
                      {/* Video Side */}
                      <div className="w-full md:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#f97316]/20 to-[#4c1d95]/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-[#4c1d95]/5 p-2">
                          <video 
                            src={`/video_${index + 1}.mp4`} 
                            controls
                            playsInline 
                            className="w-full h-auto object-cover aspect-video bg-black rounded-2xl"
                          />
                        </div>
                      </div>

                      {/* Text Side */}
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider">
                          0{index + 1} • {cluster.theme}
                        </div>
                        <h3 className="text-3xl font-bold text-[#1e293b] leading-tight">{cluster.title}</h3>
                        
                        <div className="space-y-4 mt-6 h-96 overflow-y-auto custom-scrollbar pr-2">
                          {cluster.items.map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#4c1d95]/20 hover:shadow-md transition-all">
                              <h4 className="font-bold text-[#4c1d95] text-[15px] mb-2">{item.name}</h4>
                              <p className="text-sm text-slate-600 mb-3 leading-relaxed">{item.desc}</p>
                              <div className="inline-block bg-[#f97316]/10 text-[#ea580c] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                Output: {item.output}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {cluster.whoWeWorkWith && (
                          <div className="p-4 rounded-xl bg-[#4c1d95]/5 border border-[#4c1d95]/10 mt-4">
                            <p className="text-sm text-[#4c1d95] font-medium leading-relaxed">
                              {cluster.whoWeWorkWith}
                            </p>
                          </div>
                        )}
                        
                        <div className="pt-4">
                          <Button variant="outline" size="lg" onClick={() => setActiveTab('usecases')}>
                            Explore Full Module <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                    </div>
                  ))}"""

# Do regex replacement
new_content = re.sub(old_mapping, new_mapping, content)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated mapping successfully!")
