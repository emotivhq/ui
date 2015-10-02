## SASS Structure
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

## SASS Dev Workflow - Grunt
We call the new SASS structure `sassy`. Below are the dev tasks, first in order for build, then all of them. For a a complete up-to-date list,see `./grunt/gruntfile.js`

### Build & Release tasks
1. `$ grunt sassy` - Soup to nuts clean, build, release SASS (new site code from `./sass`)
2. `$ grunt build-sass` - Clean & build dev SASS (new site code from `./sass`)
3. `$ grunt rel-sass` - Clean & release built base app SASS from lots of files into one compressed file (new site code from `./sass`)
4. `$ grunt comp-sass` - Clean & release built compiled app SASS (original site code)


### Clean tasks
1. `$ grunt build-clean` - Clean the built SASS (all folders in `./stylesheets/app-main/...`)
2. `$ grunt rel-clean` - Clean only release SASS (the `./stylesheets/app-main.css` file)
3. `$ grunt comp-clean` - Clean only compiled app SASS (the `./stylesheets/compiled.css` file)

### From [grunt/gruntfile.js](grunt/gruntfile.js)

```
	grunt.registerTask('sassy', ['build-sass', 'rel-sass']);			// soup to nuts clean, build, release SASS
    grunt.registerTask('build-sass', ['build-clean', 'sass:build']);	// clean & build dev SASS
    grunt.registerTask('rel-sass', ['rel-clean', 'concat:appcss']); 	// clean & release built base app SASS
    grunt.registerTask('comp-sass', ['comp-clean', 'concat:css']); 		// clean & release built compiled app SASS
	grunt.registerTask('build-clean', ['clean:build']); 				// clean only build SASS
	grunt.registerTask('rel-clean', ['clean:release']); 				// clean only release SASS
	grunt.registerTask('comp-clean', ['clean:compiled']); 				// clean only compiled app SASS
