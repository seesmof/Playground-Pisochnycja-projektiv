'''
Створити регулярний вираз для опрацювання речення, яке серед ряду слів містить всередині слово, яке може включати як варіанти monk, mock, meowk. Відділити весь текст, який йде в реченні до цього слова та після нього, а тоді засобами бібліотеки nltk виділити з цього тексту всі слова.
'''

import re 
import nltk 

t='Some written text monk goes to the monastery and a word mock is not a good one and a cat usually does meowk.'
p=r'(monk|mock|meowk)'
pattern=re.compile(p)
r=pattern.search(t)
if not r: print("Not found")
while r:
    s,e=r.start(),r.end()
    t=f'{t[:s-1]}{t[e:]}'
    r=pattern.search(t,s+1)
words=nltk.word_tokenize(t)
print(t)
print(words)