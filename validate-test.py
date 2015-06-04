from json import load as json_load
from yaml import load as yaml_load
from jsonschema import validate

schema = json_load(open('data/people_schema.json'))
PEOPLE = yaml_load(open('data/people.yaml'))

validate(PEOPLE, schema)
