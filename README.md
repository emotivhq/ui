# GiftStarter
The main repo for GiftStarter, the most awesome group-gifting experience.

### Platform Update:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=platform-update)](https://codeship.com/projects/99954)

### Dev:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

### Master:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=master)](https://codeship.com/projects/99954)

## Setup
1. Clone GiftStarter git repo
2. Install prerequisites if you don’t have them
  1. node
  2. bower
  3. pip
3. Install app engine python SDK
4. Install grunt dependencies
  1. ```cd grunt; npm install; cd ..```
5. Install pip dependencies locally
  1. ```sudo pip install -r requirements.txt -t ./```
6. Install bower dependencies
  1. ```cd client; bower update; cd ..```
  2. Choose angular 1.3.0
7. Execute SASS compile
  1. ```cd client; mkdir stylesheets; sass scripts/compiled.sass stylesheets/compiled.css; cd ..```
  2. Be sure to set up a file watcher for SASS compilation in IntelliJ/PyCharm/WebStorm!
8. Run Grunt tasks
  1. ```cd grunt; grunt; cd ..```
  2. Be sure to set up a file watcher for Grunt compilation in IntelliJ/PyCharm/WebStorm!
9. Run dev_appserver.py ./ to run the app server locally on port 8080
  1. Go to http://localhost:8080
