import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove services from navItems
nav_pattern = r"\{ id: 'services',\s*label: 'AI Evaluation' \},\n\s*"
content = re.sub(nav_pattern, '', content)

# 2. Extract Endorsements section
endorsements_start = content.find('{/* ── Testimonials Section on Home Page ── */}')
# Find the end of the endorsements div which is right before </motion.div> for the home tab
endorsements_end = content.find('              </div>\n\n            </motion.div>', endorsements_start)
if endorsements_end != -1:
    endorsements_end += len('              </div>\n')

endorsements_content = content[endorsements_start:endorsements_end]

# 3. Extract Services content
services_start = content.find('{/* ════════════════════════════════════════ SERVICES ══ */}')
services_end = content.find('{/* ════════════════════════════════════════ SCORECARD ══ */}')
services_content_block = content[services_start:services_end]

# Extract just the inner part of services to put in home
inner_services_start = services_content_block.find('<div className="max-w-6xl')
inner_services_end = services_content_block.rfind('</motion.div>')
if inner_services_start != -1 and inner_services_end != -1:
    inner_services_content = services_content_block[inner_services_start:inner_services_end]
else:
    inner_services_content = ''

# 4. Replace Endorsements in home with inner_services_content
content = content[:endorsements_start] + '{/* ── AI Evaluation Section on Home Page ── */}\n              ' + inner_services_content + '\n' + content[endorsements_end:]

# 5. Remove services block
# Find it again since indices changed
services_start_new = content.find('{/* ════════════════════════════════════════ SERVICES ══ */}')
services_end_new = content.find('{/* ════════════════════════════════════════ SCORECARD ══ */}')
content = content[:services_start_new] + content[services_end_new:]

# 6. Insert Endorsements in About Us below methodology video
# We need to find the end of the video div
video_end_str = '</div>\n                  </div>\n                </div>\n\n              </div>\n            </motion.div>'
about_end = content.find(video_end_str)
if about_end != -1:
    insert_pos = about_end + len('</div>\n                  </div>\n                </div>\n')
    content = content[:insert_pos] + '\n                ' + endorsements_content + '\n' + content[insert_pos:]

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
