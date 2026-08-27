import sys

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the RAIR button from the Hero section
hero_btn_to_remove = "                          <Button className=\"w-full sm:w-auto\" variant=\"teal\" size=\"xl\" onClick={() => setActiveTab('rair_scorecard')}>Responsible AI Integration Readiness (RAIR) Scorecard</Button>\n"
if hero_btn_to_remove in content:
    content = content.replace(hero_btn_to_remove, "")
    print("Successfully removed the RAIR button from Hero section.")
else:
    print("Could not find the RAIR button in Hero section to remove.")

# 2. Refine the RAIR section content
old_rair_content = """                        <ScrollReveal delay={0}>
                          <Eyebrow>Self-Assessment</Eyebrow>
                          <h2 className="display-bold text-4xl md:text-5xl text-primary mt-4">
                            Why Take the RAIR Scorecard?
                          </h2>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.1}>
                          <p className="prose-body text-lg max-w-xl text-slate-600">
                            The <strong>Responsible AI Integration Readiness (RAIR)</strong> scorecard helps organisations evaluate their maturity in deploying AI responsibly and safely.
                          </p>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.2}>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Assess AI Governance:</strong> Understand if you have the right frameworks to prevent harm to end-users and communities.</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Identify Data & Bias Risks:</strong> Check whether your tools are trained on representative data for diverse contexts.</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Ensure Accountability:</strong> Evaluate your grievance mechanisms and explainability to frontline workers and beneficiaries.</p>
                            </li>
                          </ul>
                        </ScrollReveal>"""

new_rair_content = """                        <ScrollReveal delay={0}>
                          <Eyebrow>Self-Assessment</Eyebrow>
                          <h2 className="display-bold text-4xl md:text-5xl text-primary mt-4">
                            Evaluate Your Responsible AI Integration Readiness (RAIR)
                          </h2>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.1}>
                          <p className="prose-body text-lg max-w-xl text-slate-600">
                            In an era of rapid AI adoption, checking a compliance box is no longer enough. The <strong>Responsible AI Integration Readiness (RAIR)</strong> scorecard empowers organisations to measure their socio-technical maturity across key dimensions—from data equity to community impact.
                          </p>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.2}>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Governance & Accountability:</strong> Discover if your organisational structure can effectively manage AI-induced risks and provide grievance mechanisms.</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Data & Algorithmic Equity:</strong> Determine whether your datasets reflect the nuances of the communities you serve, including multilingual and Global South contexts.</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                              <p className="text-slate-600 font-medium"><strong>Human-Centred Impact:</strong> Understand how your AI tools affect end-users and if your frontline workers are trained to use them responsibly.</p>
                            </li>
                          </ul>
                        </ScrollReveal>"""

if old_rair_content in content:
    content = content.replace(old_rair_content, new_rair_content)
    print("Successfully replaced the RAIR section content.")
else:
    print("Could not find the old RAIR section content.")

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)
