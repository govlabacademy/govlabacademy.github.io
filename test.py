import yaml

PEOPLE    = yaml.load(open('data/people.yaml'))

for p in PEOPLE:
	print p['name']

print len(PEOPLE)