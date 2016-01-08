This is the **old** GovLab Academy website. It is now deprecated in favor of [govlab/academy-website](https://github.com/GovLab/academy-website).

# academy

## Installation

You'll need recent versions of `node`, `npm`, and Python 2.

On a Mac:

    brew install node

You'll need Python (preferably in a virtualenv) and node requirements.

    npm install
    virtualenv .env
    source .env/bin/activate
    pip install -r requirements.txt

## commands for building

This will build and upload to the `gh-pages` branch, so you'll need push
permissions.

    make

## Basic Folder Structure

- site        --*generated static site*
- templates   
  - static    
  - layout    --*base layout templates*


### Backup

I kept this as a backup in case we need it for reference
https://github.com/claudioccm/academy
