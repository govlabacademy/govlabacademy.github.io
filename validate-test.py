from jsonschema import validate
import json
import yaml

schema = json.load(open('data/people_schema.json'))
PEOPLE = yaml.load(open('data/people.yaml'))

validate(PEOPLE, schema)