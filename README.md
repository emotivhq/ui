# GiftStarter
The main repo for GiftStarter, the most awesome group-gifting experience.

## Setup
1. Clone GiftStarter git repo
2. Install prerequisites if you don’t have them
  1. node
  2. bower
  3. pip
3. Install app engine python SDK
4. Install grunt dependencies
  1. ```cd grunt; npm install```
5. Install pip dependencies locally
  1. ```sudo pip install -r requirements.txt -t ./```
6. Install bower dependencies
  1. ```cd client; bower update```
  2. Choose angular 1.3.0
7. Execute SASS compile
  1. ```cd client; mkdir stylesheets; sass scripts/compiled.sass stylesheets/compiled.css```
  2. Be sure to set up a file watcher for SASS compilation in IntelliJ/PyCharm/WebStorm!
8. Update grunt dependencies
  1. ```cd grunt; node install```
9. Run grunt tasks
  1. ```cd grunt; grunt```
10. Run dev_appserver.py ./ to run the app server locally on port 8080
  1. Go to http://localhost:8080
