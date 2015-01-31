import staticjinja
import os
import json
import yaml
import sys
from slugify import slugify
from dateutil.parser import parse

# We define constants for the deployment.
cwd = os.getcwd()
searchpath  = os.path.join(cwd, "templates")
outputpath  = os.path.join(cwd, "site")

# We load the data we want to use in the templates.
#PEOPLE = json.load(open('data/cards.json'))
PEOPLE    = yaml.load(open('data/people.yaml'))
WORKSHOPS = yaml.load(open('data/workshops.yaml'))
CLINICS   = yaml.load(open('data/clinics.yaml'))
COACHING  = yaml.load(open('data/coaching.yaml'))
PROJECTS  = yaml.load(open('data/project-schema.yaml'))

for person in PEOPLE:
	person['fullName'] = "%s %s" % (person['name']['first'], person['name']['last'])
PEOPLE = sorted(PEOPLE, key=lambda x:x['name']['last'])

for item in COACHING:
	item['start_date'] = str(parse(item['date']['start']))

TAGS = set()
for item in PROJECTS:
	for tag in item['tags']:
		TAGS.add(tag)

print PEOPLE[0]

def loadAcademyData():
	return { 'people': PEOPLE,
					 'workshops': WORKSHOPS,
					 'clinics': CLINICS,
					 'projects': PROJECTS,
					 'coaching': COACHING,
					 'projectTags': sorted(list(TAGS)),
					 'resources': None }

# We define some filters we want to use in the templates.
def containsTag(x, y):
	if x['tags'] is None:
		return None
	return x if y in x['tags'] else None

def debug(text):
  print text
  sys.stdout.flush()
  return ''

def isEmpty(seq):
	return len([k for k in seq]) == 0

def nameTest(name, value):
	return "%s %s" % (name['first'], name['last']) == value

filters = {
	'byName':   lambda x: [p for p in PEOPLE if p.name == x],
	'containsTag': containsTag,
	'debug': debug,
	'isEmpty': isEmpty,
	'slug': lambda x: slugify(x, to_lower=True),
	'nameTest': nameTest,
}

# We generate a bunch of template pages; dirty hack for now.
coaching_class_detail_template = open('%s/coaching-detail-page.html' % searchpath).read()
for index, coaching_class in enumerate(COACHING):
	filename = slugify(coaching_class['name'], to_lower=True)
	f = open("templates/%s-detail.html" % filename, 'w+')
	page_template = coaching_class_detail_template.replace('coaching[0]', 'coaching[%d]' % index)
	f.write(page_template)
	f.close()

site = staticjinja.make_site(
	searchpath=searchpath,
	outpath=outputpath,
	staticpaths=['static', '../data'],
	filters=filters,
	contexts=[(r'.*.html', loadAcademyData),]
	)
site.render(use_reloader=True)