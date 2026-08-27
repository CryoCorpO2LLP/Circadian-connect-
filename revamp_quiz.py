import re
import sys

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject state
if "const [currentQuizStep, setCurrentQuizStep] = useState(0);" not in content:
    content = content.replace(
        'const [openEndedAnswer, setOpenEndedAnswer] = useState("");',
        'const [openEndedAnswer, setOpenEndedAnswer] = useState("");\n  const [currentQuizStep, setCurrentQuizStep] = useState(0);'
    )

# 2. Extract and replace the rair_scorecard section
start_marker = "{activeTab === 'rair_scorecard' && ("
end_marker = "{activeTab === 'home' && ("

if start_marker not in content or end_marker not in content:
    print("Markers not found")
    sys.exit(1)

parts = content.split(start_marker)
before = parts[0]
after_split = parts[1].split(end_marker)
if len(after_split) < 2:
    print("End marker not found properly")
    sys.exit(1)
    
after = "{activeTab === 'home' && (" + after_split[1]

# New scorecard component
new_scorecard = """{activeTab === 'rair_scorecard' && (() => {
            const quizQuestions = [
              { q: `Q1. How would you describe your organisation's current understanding of "responsible AI"?`, opts: [
                { p: 1, text: `a) We have not discussed it yet — our focus is on functionality and delivery.` },
                { p: 2, text: `b) We treat it as a compliance checkbox; we follow whatever regulations apply.` },
                { p: 3, text: `c) We discuss it informally but have no structured approach or policy.` },
                { p: 4, text: `d) We have a documented responsible AI framework guiding our project decisions.` }
              ]},
              { q: `Q2. When your project deploys AI or a data-driven digital tool, who is responsible for ensuring it does not cause harm to end users or communities?`, opts: [
                { p: 1, text: `a) The technology vendor or platform provider — it's their product.` },
                { p: 2, text: `b) No one has formally been assigned this responsibility.` },
                { p: 3, text: `c) Our project manager or team lead handles it on a case-by-case basis.` },
                { p: 4, text: `d) A designated responsible AI lead or ethics review process is in place.` }
              ]},
              { q: `Q3. Has your organisation reviewed whether the AI tools you are using were trained on data representative of the communities you serve (e.g. multilingual, Global South, gender-diverse data)?`, opts: [
                { p: 1, text: `a) No — we assumed the tool works well enough for our context.` },
                { p: 2, text: `b) We raised the question but received no satisfactory answer from the provider.` },
                { p: 3, text: `c) We reviewed it partially but have no documented findings.` },
                { p: 4, text: `d) Yes — we conducted a bias audit and have mitigation measures in place.` }
              ]},
              { q: `Q4. How does your project currently handle personal or sensitive data collected from field communities, beneficiaries, or research participants?`, opts: [
                { p: 1, text: `a) We collect data as needed; data governance has not been a priority.` },
                { p: 2, text: `b) We rely on GDPR or national regulations but have not checked if they apply to AI-specific risks.` },
                { p: 3, text: `c) We have a data management plan but it does not yet address AI processing risks.` },
                { p: 4, text: `d) We have a robust data governance protocol covering consent, anonymisation, and AI-specific data risks.` }
              ]},
              { q: `Q5. Are the communities or end users your AI tools affect able to understand, question, or appeal decisions made by those tools?`, opts: [
                { p: 1, text: `a) No — the system operates as a black box; users have no recourse.` },
                { p: 2, text: `b) Users can contact us with complaints, but there is no structured process.` },
                { p: 3, text: `c) We have a grievance mechanism, but it is not specifically designed for AI-related harms.` },
                { p: 4, text: `d) We have an explainability and appeals mechanism built into our AI deployment process.` }
              ]},
              { q: `Q6. Has your organisation mapped how AI or digital tools interact with existing institutional rules, power dynamics, or frontline worker practices in the communities where they are deployed?`, opts: [
                { p: 1, text: `a) No — we focus on the technical deployment and assume adoption will follow.` },
                { p: 2, text: `b) We did a stakeholder analysis but did not specifically examine institutional or power dynamics.` },
                { p: 3, text: `c) We conducted a socio-technical review informally during pilot phase.` },
                { p: 4, text: `d) Yes — we used a structured institutional analysis (e.g. actor mapping, IAD framework) to guide deployment.` }
              ]},
              { q: `Q7. Does your organisation's Theory of Change (ToC) or monitoring, evaluation, and learning (MEL) framework specifically account for risks and unintended consequences of AI tools?`, opts: [
                { p: 1, text: `a) We do not have a ToC or MEL framework.` },
                { p: 2, text: `b) Our ToC exists but does not mention AI risks or digital tool failures.` },
                { p: 3, text: `c) Our MEL framework monitors outputs and outcomes, but AI-specific risks are not flagged.` },
                { p: 4, text: `d) Our ToC and MEL framework explicitly address AI risks, including fairness, safety, and unintended consequences.` }
              ]},
              { q: `Q8. When selecting an AI vendor or digital platform for your project, how does your organisation assess compliance with responsible AI standards (e.g. EU AI Act, OECD AI Principles)?`, opts: [
                { p: 1, text: `a) We select based on cost, ease of use, and donor preference only.` },
                { p: 2, text: `b) We are aware of standards but do not formally check vendor compliance.` },
                { p: 3, text: `c) We ask vendors informally but have no procurement checklist for responsible AI.` },
                { p: 4, text: `d) We have a responsible AI procurement checklist and require vendors to demonstrate compliance.` }
              ]},
              { q: `Q9. Does your organisation have a process for identifying and managing the risk of your AI project reinforcing gender, caste, ethnicity, or socioeconomic biases among the populations you serve?`, opts: [
                { p: 1, text: `a) We have not considered this — the tool is designed to be neutral.` },
                { p: 2, text: `b) We are aware this could be an issue but have not taken specific action.` },
                { p: 3, text: `c) We have raised it in team discussions but have no formal bias-assessment process.` },
                { p: 4, text: `d) We have a formal inclusion and bias review embedded in our AI deployment lifecycle.` }
              ]},
              { q: `Q10. How prepared is your organisation to meet EU AI Act requirements if your project receives EU funding or operates in the European regulatory environment?`, opts: [
                { p: 1, text: `a) We are unaware of the EU AI Act and its relevance to our work.` },
                { p: 2, text: `b) We know it exists but have not assessed how it applies to our project.` },
                { p: 3, text: `c) We have a basic understanding and are in the process of mapping requirements.` },
                { p: 4, text: `d) We have conducted a full EU AI Act risk classification and are actively working toward compliance.` }
              ]},
              { q: `Q11. How does your organisation currently build staff capacity to understand and manage AI-related risks in digital projects?`, opts: [
                { p: 1, text: `a) We do not invest in this — we assume staff will learn as they go.` },
                { p: 2, text: `b) We share articles or news informally but have no structured training.` },
                { p: 3, text: `c) We attended one-off webinars or conferences on AI and ethics.` },
                { p: 4, text: `d) We have a formal and ongoing responsible AI training programme for our team.` }
              ]},
              { q: `Q12. When your digital or AI project produces unexpected or harmful outcomes in the field, what is your organisation's typical response?`, opts: [
                { p: 1, text: `a) We wait to see if the problem resolves itself or gets reported by the implementing team.` },
                { p: 2, text: `b) We address it reactively when it comes to our attention, without a documented process.` },
                { p: 3, text: `c) We have an incident reporting system but it is not specifically designed for AI-related harms.` },
                { p: 4, text: `d) We have a proactive AI harm monitoring system with defined protocols for response and learning.` }
              ]},
              { q: `Q13. Does your organisation meaningfully involve affected communities in the design, testing, and evaluation of AI tools used in their contexts?`, opts: [
                { p: 1, text: `a) No — communities are the end beneficiaries but not design participants.` },
                { p: 2, text: `b) We consult communities after decisions are made to validate the approach.` },
                { p: 3, text: `c) We involve community representatives at key stages but not systematically.` },
                { p: 4, text: `d) We have participatory co-design processes with community members embedded throughout the AI lifecycle.` }
              ]},
              { q: `Q14. How confident is your organisation that your AI project, if scrutinised by your funder (BMZ, DFG, EU), a journalist, or a community rights group, would demonstrate responsible and ethical practice?`, opts: [
                { p: 1, text: `a) Not at all confident — we would struggle to justify our current practices.` },
                { p: 2, text: `b) Slightly confident — we have good intentions but lack documented evidence.` },
                { p: 3, text: `c) Moderately confident — we have some documentation but significant gaps remain.` },
                { p: 4, text: `d) Very confident — we have documentation, processes, and evidence to substantiate responsible AI practice at every stage.` }
              ]}
            ];

            const handleNext = () => {
              if (currentQuizStep < quizQuestions.length) {
                if (currentQuizStep < 14 && !quizAnswers[currentQuizStep + 1]) return; // require answer
                setCurrentQuizStep(prev => prev + 1);
              } else {
                setQuizSubmitted(true);
              }
            };

            const handlePrev = () => {
              if (currentQuizStep > 0) setCurrentQuizStep(prev => prev - 1);
            };

            const totalScore = calculateScore();
            const percentage = Math.round((totalScore / 56) * 100);

            return (
            <motion.div
              key="rair_scorecard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pt-20 pb-10 min-h-[90vh] bg-surface"
            >
              <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-6">
                <div className="text-center space-y-3 mb-6">
                  <Eyebrow>Diagnostic</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase">Responsible AI Readiness Scorecard</h2>
                  <p className="text-accent text-xl font-bold">How AI-Ready Is Your Digital Project?</p>
                </div>
                
                <Card className="p-6 md:p-8 relative overflow-hidden">
                  {!quizSubmitted ? (
                    <div className="space-y-6">
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                        <motion.div 
                          className="h-full bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuizStep) / (quizQuestions.length + 1)) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Step {currentQuizStep + 1} of {quizQuestions.length + 1}</p>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentQuizStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="min-h-[220px]"
                        >
                          {currentQuizStep < quizQuestions.length ? (
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-5 leading-relaxed">
                                {quizQuestions[currentQuizStep].q}
                              </h3>
                              <div className="space-y-3">
                                {quizQuestions[currentQuizStep].opts.map((opt, oIdx) => {
                                  const isSelected = quizAnswers[currentQuizStep + 1] === opt.p;
                                  return (
                                    <label key={oIdx} className={`group relative flex items-start gap-4 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${isSelected ? 'bg-orange-50 border-accent shadow-md shadow-accent/10 transform -translate-y-0.5' : 'border-slate-200 hover:border-accent/40 hover:bg-slate-50'}`}>
                                      {isSelected && <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-accent"></div>}
                                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-accent bg-accent/10' : 'border-slate-300 group-hover:border-accent/50'}`}>
                                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>}
                                      </div>
                                      <input type="radio" name={`q${currentQuizStep+1}`} value={opt.p} onChange={() => handleQuizChange(currentQuizStep+1, opt.p)} checked={isSelected} className="sr-only" />
                                      <span className={`text-sm leading-relaxed ${isSelected ? 'text-accent font-bold' : 'text-slate-700 font-medium'}`}>{opt.text}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-4 leading-relaxed">
                                Q15 (OPEN ENDED). Reflecting on your answers, describe in your own words:
                              </h3>
                              <p className="text-sm text-slate-500 mb-6">What is the single biggest responsible AI gap in your current digital project, and what would it mean for your organisation, your funders, and the communities you serve if that gap were left unaddressed?</p>
                              <textarea 
                                rows="6" 
                                className="w-full rounded-xl border-2 border-slate-200 p-5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all "
                                placeholder="Type your reflection here..."
                                value={openEndedAnswer}
                                onChange={(e) => setOpenEndedAnswer(e.target.value)}
                              ></textarea>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-5">
                        <Button variant="outline" onClick={handlePrev} disabled={currentQuizStep === 0}>
                          Previous
                        </Button>
                        <Button 
                          variant="teal" 
                          onClick={handleNext} 
                          disabled={currentQuizStep < 14 && !quizAnswers[currentQuizStep + 1]}
                        >
                          {currentQuizStep === quizQuestions.length ? "See My Results" : "Next Question"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-10"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-3xl font-display font-bold text-primary">Your Diagnostic Report</h3>
                        <p className="text-slate-500">Based on your 15-point assessment</p>
                      </div>

                      {/* Animated Gauge Result */}
                      <div className={`p-10 rounded-3xl border-2 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden ${getScoreMessage(totalScore).border} ${getScoreMessage(totalScore).bg}`}>
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-current to-transparent pointer-events-none"></div>
                        <div className="relative">
                          {/* Circular progress equivalent (CSS representation) */}
                          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/30" />
                            <motion.circle 
                              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                              className={getScoreMessage(totalScore).color}
                              initial={{ strokeDasharray: "0, 300" }}
                              animate={{ strokeDasharray: `${(percentage / 100) * 283}, 300` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-5xl font-black ${getScoreMessage(totalScore).color}`}>{percentage}%</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Score</span>
                          </div>
                        </div>

                        <div className="space-y-3 z-10">
                          <h3 className={`text-xl font-bold ${getScoreMessage(totalScore).color}`}>{getScoreMessage(totalScore).title}</h3>
                          <p className="text-lg text-slate-700 font-medium max-w-xl mx-auto">{getScoreMessage(totalScore).desc}</p>
                          <p className="text-sm font-bold text-slate-500 mt-2">Raw Score: {totalScore} / 56 points</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 border border-slate-200">
                          <h4 className="font-bold text-primary flex items-center gap-2 mb-3"><FileText className="w-5 h-5 text-accent" /> Your Reflection</h4>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 italic text-slate-600 text-sm shadow-inner">
                            "{openEndedAnswer || 'No specific gap was documented.'}"
                          </div>
                        </Card>
                        <Card className="p-6 border border-slate-200">
                          <h4 className="font-bold text-primary flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-accent" /> Next Steps</h4>
                          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                            Regardless of your score, Responsible AI is a continuous journey. We can help you close these gaps, build robust frameworks, and confidently navigate the intersection of society, policy, and AI.
                          </p>
                          <div className="flex flex-col gap-3">
                            <Button onClick={() => setConsultationModalOpen(true)} variant="navy" className="w-full">Schedule a Strategy Session</Button>
                            <Button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setOpenEndedAnswer(""); setCurrentQuizStep(0); }} variant="outline" className="w-full">Retake Assessment</Button>
                          </div>
                        </Card>
                      </div>

                    </motion.div>
                  )}
                </Card>
              </div>
            </motion.div>
            );
          })()}
          
          """

new_content = before + new_scorecard + after

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Scorecard revamped successfully!")
