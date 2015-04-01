# academy

## install the latest version of staticjinja
```
pip install git+git://github.com/Ceasar/staticjinja#egg=staticjinja
```
## check that dev version is installed
python -c "import jinja2; print jinja2.__version__"

## if not installed
git clone git://github.com/mitsuhiko/jinja2.git
pip install -e ../../git-stuff/jinja2

## commands for building
```
mkdir -p site
ptyhon build.pys
(cd site; python -m SimpleHTTPServer &)
```

## Basic Folder Structure
- site        --*generated static site*
- templates   
  - static    
  - layout    --*base layout templates*


### Backup
I kept this as a backup in case we need it for reference
https://github.com/claudioccm/academy
