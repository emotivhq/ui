# GiftStarter View Development Workflow
To add new views the app, this doc helps us undrstand what's involved. It also includes helpful tips on workflow. 

### Test Environment:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

## Build & Dev View/Template Tasks
This is the breakdown of common view & template tasks in Grunt. For more info on [Grunt](http://gruntjs.com), see [their docs](http://gruntjs.com/getting-started).
These are all the current development tasks done at build time for view & template work. 

- **`grunt views`** - soup to nuts clean, build, release views into javascript templates using ngtemplate
  - *Runs 'clean-views', ngtemplates', 'scripts'*
- **`grunt clean-views`** - removes angular view template script at `./client/scripts/out/angular-template.js`
  - *Runs 'clean:views'*


Here they are straight from `./grunt/gruntfile.js`.
```
	/* 
	 *** View & template tasks ***
	*/
	grunt.registerTask('views', ['ngtemplates', 'scripts']);		
	grunt.registerTask('clean-views', ['clean:views']); 	
	```
