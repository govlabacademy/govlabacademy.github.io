import csv
import os
import sys
import yaml
import json

data = json.load(open('data/library.json'))

def processDict(d):
	res = {}
	for k,v in d.items():
		res[k.encode('utf-8')] = v
	return res

data = [ processDict(s) for s in data]

print yaml.dump(data).replace('!!python/unicode ', '')