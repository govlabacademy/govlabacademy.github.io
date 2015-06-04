from yaml import dump
from json import load


def processDict(d):
    res = {}

    for k, v in d.items():
        res[k.encode('utf-8')] = v

    return res


data = [processDict(s) for s in load(open('data/library.json'))]

print(dump(data).replace('!!python/unicode ', ''))
