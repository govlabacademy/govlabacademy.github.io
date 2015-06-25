#!/bin/bash -e

python build.py
cp CNAME site/
node build.js
