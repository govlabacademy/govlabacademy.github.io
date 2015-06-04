from yaml import load

PEOPLE = load(open('data/people.yaml'))

for p in PEOPLE:
    print(p['name'])

print(len(PEOPLE))
