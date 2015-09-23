# GiftStarter App Development Workflow
![](https://wordimpress.com/assets/icon-grunt.png)
This is the breakdown of common tasks in Grunt. For more info on [Grunt](http://gruntjs.com), see [their docs](http://gruntjs.com/getting-started).

### Test Environment:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

## Build & Dev Tasks
These are all the current development tasks done at build time.

<<<<<<< HEAD
- **`dev`** - the main dev task that builds the whole code stack to view locally
  - Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'
- **`debug`** - Build & check with `jshint`, catch errors with `jslint`, fix, code better
  - Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'jshint', 'jslint'
- **`test`** - Runs client side tests
- **`build `**- Builds the entire app - ready to test or deploy
  - Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'
- **`default`** - the default task that builds the original code stack. Done for legacy support.
  - Runs 'remove', 'ngtemplates', 'sass', 'sassy', 'concat'
=======
- **`grunt dev`** - the main dev task that builds the whole code stack to view locally
  - *Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'*
- **`grunt debug`** - Build & check with `jshint`, catch errors with `jslint`, fix, code better
  - *Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'jshint', 'jslint'*
- **`grunt test`** - Runs client side tests
- **`grunt build `**- Builds the entire app - ready to test or deploy
  - *Runs 'remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify'*
- **`grunt`** - the default task that builds the original code stack. Done for legacy support.
  - *Runs 'remove', 'ngtemplates', 'sass', 'sassy', 'concat'*
>>>>>>> 9d404981a05e18c1b50d9d1336a6c9ad1e64432c

Here they are straight from `./grunt/gruntfile.js`.
```
    // Build tasks.
<<<<<<< HEAD
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
=======
	grunt.registerTask('dev', ['remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify']);
	grunt.registerTask('debug', ['remove', 'ngtemplates', 'trashy', 'sassy', 'jshint']); 
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('build', ['remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify']); 
    grunt.registerTask('default', ['remove', 'ngtemplates', 'sass', 'sassy', 'concat']);	
```

## Client App Dev tasks (SASS & Javascript)
These rae the individual tasks that make up the dev build & release workflow.
They are broken out into three main areas, `sass`, `scripts`, and `views`. Each area has it's own readme 
file where the tasks are organized. The main **Build & Dev Tasks** use these individual task sets to build the project.

#### SASS
- See the `sass` [README](https://github.com/giftstarter/giftstarter/blob/platform-update/client/sass/README.md) in `./client/sass/README.md`

#### Javascript
- See the `scripts` [README](https://github.com/giftstarter/giftstarter/blob/platform-update/client/scripts/README.md) in `./client/scripts/README.md`

#### Templates & Views
- See the `views` [README](https://github.com/giftstarter/giftstarter/blob/platform-update/client/views/README.md) in `./client/views/README.md`

## Release tasks
We call the new release structure `beep-boop-bop`. Below are the release tasks, in order for patch, minor, major and prereleases. 
For a a complete up-to-date list,see `./grunt/gruntfile.js`. [We use Semantic Versioning](http://semver.org/).

> Built in versioning, [Archer style](https://www.youtube.com/watch?v=C6NRA69SdoM)

- **`grunt beep`** - Releases a Patch version (ie - `1.0.1`)
- **`grunt boop`** - Releases a Minor version (ie - `1.2.0`)
- **`grunt bop`** - Releases a Major version (ie - `2.0.0`)
- **`grunt prebeep`** - Releases a pre-release Patch version (ie - `1.0.1-alpha.1`)
- **`grunt preboop`** - Releases a pre-release Minor version (ie - `1.2-alpha-1.0`)
- **`grunt prebop`** - Releases a pre-release Major version (ie - `2-alpha-1.0.1`)
- **`grunt prerelease`** - Releases a pre-release Major version (ie - `2.0.0-alpha`)
>>>>>>> 9d404981a05e18c1b50d9d1336a6c9ad1e64432c

```
	grunt.registerTask('beep', ['bump:patch']);
	grunt.registerTask('boop', ['bump:minor']);
	grunt.registerTask('bop', ['bump:major']); 
	grunt.registerTask('prebeep', ['bump:prepatch']);
	grunt.registerTask('preboop', ['bump:preminor']);
	grunt.registerTask('prebop', ['bump:premajor']);
	grunt.registerTask('prerelease', ['bump:prerelease']);
	// for a full list of bump commands, see https://www.npmjs.com/package/grunt-bump
```