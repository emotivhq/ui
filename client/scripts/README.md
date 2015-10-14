# GiftStarter Javascript Development Workflow
This is the breakdown of common javascript tasks in Grunt. For more info on [Grunt](http://gruntjs.com), see [their docs](http://gruntjs.com/getting-started).

### Test Environment:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

## Build & Dev Javascript Tasks
These are all the current development tasks done at build time for javascript work. 

- **`grunt scripts`** - soup to nuts clean, build, release scripts
  - *Runs 'build-scripts', 'rel-scripts'*
- **`grunt build-scripts`** - clean & build dev js
  - *Runs ['clean-app', 'clean-trash', 'concat:trash', 'concat:vendor', 'concat:angular', 'concat:app'*
- **`grunt rel-scripts`** - uglifies newly built scripts (runs `uglify`)
- **`grunt clean-app `**- removes built script in `./client/scripts/webapp/`
  - *Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'*
- **`grunt clean-trash`** - removes built scripts in `./client/scripts/out/`
  - *Runs 'remove', 'ngtemplates', 'sass', 'sassy', 'concat'*
- **`grunt jshint`** -runs [jshint](https://www.npmjs.com/package/grunt-contrib-jshint) on all custom scripts  in the build
- **`grunt jlint`** -runs [jslint](https://www.npmjs.com/package/grunt-jslint) on all custom scripts  in the build


Here they are straight from `./grunt/gruntfile.js`.
```
	/* 
	 *** Javascript tasks ***
	*/
	grunt.registerTask('scripts', ['build-scripts']);		// soup to nuts clean, build, release scripts
	grunt.registerTask('js', ['build-scripts', 'rel-scripts']);		// soup to nuts clean, build, release scripts
    // Individual js tasks
	grunt.registerTask('build-scripts', ['clean-app', 'clean-scripts', 'ngtemplates', 'concat:scripts', 'concat:vendor', 'concat:angular', 'concat:app', 'concat:controllers', 'concat:components', 'concat:services', 'concat:core']);		// clean & build dev js
    grunt.registerTask('rel-scripts', ['uglify']); 		// clean & release built base app js
	grunt.registerTask('clean-app', ['clean:webapp']); 					// clean only build js
	grunt.registerTask('clean-scripts', ['clean:out']); 					// clean only release js
	grunt.registerTask('comp-clean', ['clean:compiled']); 					// clean only compiled app js
	
	```
