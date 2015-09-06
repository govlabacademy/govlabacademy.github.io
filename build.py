from os import path, getcwd
from sys import stdout
from yaml import load
from slugify import slugify
from datetime import date
from staticjinja import make_site
from dateutil.parser import parse


# We define constants for the deployment.
searchpath = path.join(getcwd(), 'templates')
outputpath = path.join(getcwd(), 'site')

# We load the data we want to use in the templates.
PEOPLE = load(open('data/people.yaml'))
CLINICS = load(open('data/clinics.yaml'))
LIBRARY = load(open('data/library.yaml'))
COACHING = load(open('data/coaching.yaml'))
PROJECTS = load(open('data/project-schema.yaml'))
WORKSHOPS = load(open('data/workshops.yaml'))

for p in PEOPLE:
    p['fullName'] = '%s %s' % (p['name']['first'], p['name']['last'])

PEOPLE = sorted(PEOPLE, key=lambda x: x['name']['last'])

for item in COACHING:
    item['start_date'] = parse(item['date']['start']).date()
    item['outdated'] = item['start_date'] < date.today()

COACHING = sorted(COACHING, key=lambda x: x['start_date'])

TAGS = set()

for item in PROJECTS:
    for tag in item['tags']:
        TAGS.add(tag)

LIBRARY_TAGS = set()

for item in LIBRARY:
    for tag in item['slugTags']:
        LIBRARY_TAGS.add(tag)


def loadAcademyData():
    return {
        'people': PEOPLE,
        'clinics': CLINICS,
        'library': LIBRARY,
        'projects': PROJECTS,
        'coaching': COACHING,
        'resources': None,
        'workshops': WORKSHOPS,
        'libraryTags': LIBRARY_TAGS,
        'projectTags': sorted(list(TAGS))
    }


# We define some filters we want to use in the templates.
def containsTag(x, y):
    if x['tags'] is None:
        return None

    return x if y in x['tags'] else None


def debug(text):
    print('text')

    stdout.flush()

    return ''


def isEmpty(seq):
    return len([k for k in seq]) == 0


def nameTest(name, value):
    return '%s %s' % (name['first'], name['last']) == value


filters = {
    'slug': lambda x: slugify(x.lower()),
    'debug': debug,
    'byName': lambda x: [p for p in PEOPLE if p.name == x],
    'isEmpty': isEmpty,
    'nameTest': nameTest,
    'containsTag': containsTag,
}

# We generate a bunch of template pages; dirty hack for now.
coaching_detail_page = open('%s/coaching-detail-page.html' % searchpath).read()

for index, coaching_class in enumerate(COACHING):
    filename = slugify(coaching_class['name'].lower())
    page = coaching_detail_page.replace('coaching[0]', 'coaching[%d]' % index)
    f = open('templates/%s-detail.html' % filename, 'w+')

    f.write(page)
    f.close()

site = make_site(
    filters=filters,
    outpath=outputpath,
    contexts=[(r'.*.html', loadAcademyData)],
    searchpath=searchpath,
    staticpaths=['static', '../data'],
)

# site.render()
site.render(use_reloader=True)
