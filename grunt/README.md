# GiftStarter App Development Workflow
![](https://wordimpress.com/assets/icon-grunt.png)
This is the breakdown of common tasks in Grunt. For more info on [Grunt](http://gruntjs.com), see [their docs](http://gruntjs.com/getting-started).

### Dev:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

### Build & Release tasks
We call the new release structure `beep-boop-bop`. Below are the dev tasks, in order for patch, minor, major and prereleases. For a a complete up-to-date list,see `./grunt/gruntfile.js`

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