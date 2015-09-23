# GiftStarter App Development Workflow
![](https://wordimpress.com/assets/icon-grunt.png)
This is the breakdown of common tasks in Grunt. For more info on [Grunt](http://gruntjs.com), see [their docs](http://gruntjs.com/getting-started).

### Test Environment:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

## Build & Dev Tasks
These are all the current development tasks done at build time.

- **`dev`** - the main dev task that builds the whole code stack to view locally
  - Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'
- **`debug`** - Build & check with `jshint`, catch errors with `jslint`, fix, code better
  - Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'jshint', 'jslint'
- **`test`** - Runs client side tests
- **`build `**- Builds the entire app - ready to test or deploy
  - Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'
- **`default`** - the default task that builds the original code stack. Done for legacy support.
  - Runs 'remove', 'ngtemplates', 'sass', 'sassy', 'concat'

Here they are straight from `./grunt/gruntfile.js`.
```
    // Build tasks.
    grunt.registerTask('default', ['remove', 'ngtemplates', 'sass', 'sassy', 'concat']);	// the default task build the old app
	grunt.registerTask('dev', ['remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify']);
	grunt.registerTask('debug', ['remove', 'ngtemplates', 'trashy', 'sassy', 'jshint']); // Build with jshint, catch errors, fix, code better
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('build', ['remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify']); // Build the app ready to test
	
    grunt.registerTask('jshint', ['jshint']);								// Run jshint, catch errors, fix, code better
```

### Release tasks
We call the new release structure `beep-boop-bop`. Below are the release tasks, in order for patch, minor, major and prereleases. 
For a a complete up-to-date list,see `./grunt/gruntfile.js`

Built in versioning, Archer style (https://www.youtube.com/watch?v=C6NRA69SdoM)
```
	grunt.registerTask('beep', ['bump:patch']);
	grunt.registerTask('boop', ['bump:minor']);
	grunt.registerTask('bop', ['bump:major']); // you better be sure you know what you're doing here. 00 bops given
	grunt.registerTask('prebeep', ['bump:prepatch']);
	grunt.registerTask('preboop', ['bump:preminor']);
	grunt.registerTask('prebop', ['bump:premajor']);
	grunt.registerTask('prerelease', ['bump:prerelease']);
	// for a full list of bump commands, see https://www.npmjs.com/package/grunt-bump
```