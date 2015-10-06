# GiftStarter SASS Development Workflow
This is the breakdown of common stylesheet tasks in Grunt. For more info on [Grunt](http://gruntjs.com), see [their docs](http://gruntjs.com/getting-started).

### Test Environment:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

## SASS Structure
This documentation is a work in progress. Joel Serino, Sept 15, 2015

- `client/scripts/**/*.{.scss|.sass}`: Library of app specific styles ordered by feature name. Used for **Development**
- `client/stylesheets/**/*.css`: Built & compiled styles used in the app for runtime. Used for **Release**
- `ui/ui.min.css` - The built & released `Semantic UI` for the app.

> To learn more about how Semantic UI gets built and released for use, check out [./_ui/README.md](./_ui/README.md)

## Build & Dev SASS Tasks - Grunt
We call the new SASS structure `styles`. Below are the dev tasks, first in order for build, then all of them. For a a complete up-to-date list,see `./grunt/gruntfile.js`

### Build & Release tasks
1. `$ grunt styles` - Soup to nuts clean, build, release SASS (site code from `./clent/scripts/**/*.{sass|scss}`)
2. `$ grunt build-styles` - Clean & build dev SASS (old site code from `./clent/scripts/**/*.{sass|scss}`)
3. `$ grunt rel-styles` - Clean & release built base app SASS from lots of files into one compressed file (new site code from `./sass`)

### Clean tasks
1. `$ grunt clean-styles` - Clean built app styles (original site code)
2. `$ grunt clean-stylescss` - Clean release / compiled app styles (original site code)

### From [grunt/gruntfile.js](grunt/gruntfile.js)

```
	/* 
	 *** OLD sass tasks, I call it trashy *** 
	*/
	grunt.registerTask('styles', ['build-trashy', 'rel-trashy', 'cssmin']);	// soup to nuts clean, build, release trashy sass
	grunt.registerTask('trashy', ['build-trashy', 'rel-trashy', 'cssmin']);	// soup to nuts clean, build, release trashy sass
    // Individual trashy tasks
	grunt.registerTask('build-styles', ['clean-trashy', 'sass:trashy']);	// clean & build dev trashy sass
	grunt.registerTask('build-trashy', ['clean-trashy', 'sass:trashy']);	// clean & build dev trashy sass
    grunt.registerTask('rel-styles', ['clean-trashycss', 'concat:trashy']); // clean & release built compiled trashy sass
    grunt.registerTask('rel-trashy', ['clean-trashycss', 'concat:trashy']); // clean & release built compiled trashy sass
	grunt.registerTask('clean-ctyles', ['clean:trashy']); 					// clean only compiled trashy sass
	grunt.registerTask('clean-trashy', ['clean:trashy']); 					// clean only compiled trashy sass
	grunt.registerTask('clean-stylescss', ['clean:trashycss']); 			// clean only released trashy sass
	grunt.registerTask('clean-trashycss', ['clean:trashycss']); 			// clean only released trashy sass
```





---

---





## SASSY Structure (ARCHIVED)
This documentation is a work in progress. Joel Serino, Sept 15, 2015

- `_folder`: Depicts a library
  - `_bootstrap` - Bootstrap's core SASS
  - `_bourbon` - Bourbon's core SASS
  - `_semantic` - Semantic's core SASS
- `colors` - Available color style guides
- `css` - Straight up CSS to build into project (special grunt rules will apply)
  - `custom.css` - CSS overrides, hacks, and customizations outside the scope of SASS builds (only stuff needing to avoid build process should be in here)
  - `animate.css` - Animation hacks - should be rewritten in SASS as a `plugin`
- `global` - Globally available variables & styles
- `images`: Supporting images (assets) for SASS
- `layouts`: Basic layouts globally available
- `mixins`: SASS mixins
- `plugins`: 3rd party & custom built plugins
- `theme`: Dropin theme styles based on `<_framework>`
- `ui`: UI components & images
  - `components`: UI components
  - `images`: Supporting UI SASS images (icons, etcs)
- `bootstrap.scss` - Loads bootstrap
- `global.scss` - Loads global styles
- `layout.scss` - Loads the current layout to use
- `theme.scss` - Loads the theme to use
- `ui.scss` - Loads the UI & its components




### SASSY Clean tasks (ARCHIVED)
1. `$ grunt build-clean` - Clean the built SASS (all folders in `./stylesheets/app-main/...`)
2. `$ grunt rel-clean` - Clean only release SASS (the `./stylesheets/app-main.css` file)
3. `$ grunt comp-clean` - Clean only compiled app SASS (the `./stylesheets/compiled.css` file)
