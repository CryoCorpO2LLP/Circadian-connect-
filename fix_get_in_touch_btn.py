with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = (
    '                        {/* Get in Touch link below focus area video */}\n'
    '                        <div className="mt-4 flex justify-center">\n'
    '                          <button\n'
    '                            onClick={() => window.open("https://tally.so/r/3ERZrN", "_blank")}\n'
    '                            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors duration-200 group"\n'
    '                          >\n'
    '                            <span className="underline underline-offset-4 decoration-accent/50 group-hover:decoration-primary/80 transition-colors">Get in Touch</span>\n'
    '                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />\n'
    '                          </button>\n'
    '                        </div>'
)

new = (
    '                        {/* Get in Touch button below focus area video */}\n'
    '                        <div className="mt-5 flex justify-center">\n'
    '                          <Button variant="teal" size="xl" onClick={() => window.open("https://tally.so/r/3ERZrN", "_blank")} className="group">\n'
    '                            Get in Touch <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />\n'
    '                          </Button>\n'
    '                        </div>'
)

if old in content:
    content = content.replace(old, new)
    print('Get in Touch: upgraded to full Button')
else:
    print('NOT FOUND')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done.')
