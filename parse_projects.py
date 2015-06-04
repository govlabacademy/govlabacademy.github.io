from csv import reader
from sys import stdin
from yaml import dump


def splitNstrip(string):
    return map(lambda x: x.strip(' '), string.split(','))


reader = reader(stdin)
projects = []

for row in reader:
    (name, title, team, trunonex, problem_statement, why_compelling, summary, tags, status, location, interests, skills, twitter, linkedin, facebook, other, webpage) = row

    if title == '':
        continue

    projects.append({
        '_id': title.lower().replace(' ', '-'),
        'name': name,
        'title': title,
        'team': team,
        'trunonex': trunonex,
        'problem_statement': problem_statement,
        'why_compelling': why_compelling,
        'summary': summary,
        'tag': splitNstrip(tags),
        'status': status,
        'location': location,
        'interests': splitNstrip(interests),
        'skills': splitNstrip(skills),
        'twitter': twitter,
        'linkedin': linkedin,
        'facebook': facebook,
        'other': other,
        'webpage': webpage})

print(dump(projects, default_flow_style=False).replace('!!python/str', ''))
