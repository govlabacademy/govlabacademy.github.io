import staticjinja
import os
import json

# We define constants for the deployment.
cwd = os.getcwd()
searchpath  = os.path.join(cwd, "templates")
outputpath  = os.path.join(cwd, "site")

# We load the data we want to use in the templates.
PEOPLE = json.load(open('data/cards.json'))

def loadAcademyData():
	return { 'people': PEOPLE,
					 'classes': "abcdef".split(),
					 'resources': None }

# We define some filters we want to use in the templates.
filters = {
	'byName':   lambda x: [p for p in PEOPLE if p.name == x],
}


site = staticjinja.make_site(
	searchpath=searchpath,
	outpath=outputpath,
	staticpaths=['static'],
	filters=filters,
	contexts=[(r'.*.html', loadAcademyData),]
	)
site.render(use_reloader=True)