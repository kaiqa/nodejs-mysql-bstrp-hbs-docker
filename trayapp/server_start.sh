#!/bin/bash
cd /Users/kai/Development/kaiqa-github/nodejs-mysql-bstrp-hbs-docker/
pm2 start app.js --watch --name webapp
pm2 log