#!/bin/bash
rm -rf ./dist
npm run build
git add -A
git commit -m "Bug fixing for sprint 3.3"
git push origin master
git push heroku master

