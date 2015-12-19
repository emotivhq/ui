# GS Semantic UI App
| ![](http://www.semantic-ui.cn/images/logo.png) | ![](http://www.codingpedia.org/wp-content/uploads/2014/04/gulp-2x.png) |

## Semantic UI Development Workflow
This is the breakdown of common tasks in Gulp. For more info on [Gulp](http://gulpjs.com/), see [their docs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).
Gulp is used to help automate integrations between the the Gulp tasks in __Semantic_ and legacy tasks in __Angular_.

### Test Environment:
[ ![Codeship Status for giftstarter/ui](https://codeship.com/projects/ead28180-84f5-0133-8deb-3ac20bd54ece/status?branch=master)](https://codeship.com/projects/122143)

## Gulp UI Dev Workflow
The GiftStarter App now includes a semantic User Interface library. It is easy to work with, easy to build, and easy to release into an app (Angular web, for example).  If you find yourself working on updating the core UI stack running in an site or application, these tasks are for you.
Below are the dev tasks, first in order for build, then all of them. 
For a complete up-to-date list,see `./_ui/gulpfile.js`

### Config tasks
1. `$ gulp config` - Read user config to know what task is to load

### Watch tasks
1. `$ gulp watch` - Develop on the UI while watching the changes in a local test URL

### Build & Release tasks
1. `$ gulp build` - Soup to nuts clean, build, release SASS (new site code from `./sass`)
2. `$ gulp buildJS` - Clean & build dev JS (new site code from `./sass`)
3. `$ gulp buildCSS` - Clean & release built base CSS from lots of files into one compressed file (new site code from `./sass`)
4. `$ gulp buildAssets` - Clean & release built compiled app assets (original site code)

### Clean tasks
1. `$ gulp clean` - Clean the built SASS (all folders in `./_ui/dist/app-main/...`)
3. `$ gulp version` - Gets the version info so you know what you're cleaning

### Rtl tasks
1. `$ gulp buildRTL` - Build the `rtl` spec project (Right to Left)
3. `$ gulp watchRTL` - Starts the `watch` on rtl files during development

### Documentation tasks
1. `$ gulp serveDocs` - Serves the docs in a local URL
3. `$ gulp buildDocs` - Build doc files

More in the [_ui/gulpfile.js](gulp/gulpfile.js)


## Semantic UI Structure 
This documentation is a work in progress. 
To get started with the buid tools in this UI, refer to the [documentation online](http://semantic-ui.com/introduction/build-tools.html), or learn how to add [new recipes](http://semantic-ui.com/introduction/advanced-usage.html).
- `_Semantic`: The Semantic UI builder
  - `_app` - Our app's main UI framework, including all LESS & JS components, themes, layouts and builder
    - `definitions` - UI behaviors, collections, elements, globals, modules and views
    - `mobile` - The specific collection, element, global, module and view overrides for the `mobile` app UI
    - `site` - The default collection, element, global, module and view overrides for the `desktop` app UI
    - `themes` - An array of stylizations called *themes* that can be applied at the element, global, module or view level
    - `semantic.less` - The magic `less` config file where you can choose your build
    - `theme.config` - The magic `theming` config file where you can choose your theme for everything or just an individual element
    - `theme.less` - A file you shouldn't have to touch, but loads the theme's `less` based on the theme.config values
  - `_dist` - Built & packaged CSS, JS and components for distribution into an app
    - `components` - Individual components to add into your project
    - `themes` - Individual theme files to add into your project
    - `semantic.css` - All of the UI css into one file to add into your project
    - `semantic.js` - All of the UI scripts in one file to add into your project
    - `semantic.min.css` - All of the UI css into one file, minified, to add into your project
    - `semantic.min.js` - All of the UI scripts into one file, minified, to add into your project
- `node_modules` - Node dependencies, like Gulp & Semantic UI
- `tasks` - All of the workflow, builder and automation magic happens in here
  - `admin` - Admin related tasks
    - `components` - Manage components
    - `distributions` - Manage distributions
  - `build` - Build related tasks
  - `collections` - Collections of tasks that are imported together. See `./collections/README`
  - `config` - Lots of setup and config.
  - `docs` - Build related tasks for documentation
  - `rtl` - Build related tasks for building in Right To Left
- `gulpfile.js` - The master Gulp file that makes use of all those `tasks`
- `package.json` - The NPM config file for the GS Semantic UI project
- `semantic.json` - The Semantic UI library's CLI config file.

![](http://design.altervista.org/wp-content/uploads/2015/01/semantic-ui.jpg)

### Help & references for developing
- The UI glossary [can be found here](http://semantic-ui.com/introduction/glossary.html).
- Theming help [can be found here](http://semantic-ui.com/usage/theming.html#sitewide-defaults)
- Help with [Layouts](http://semantic-ui.com/usage/layout.html)
- [Global resets](http://semantic-ui.com/globals/reset.html)
- [Site globals](http://semantic-ui.com/globals/site.html)
- [Form validation](http://semantic-ui.com/behaviors/form.html)
- [Visibility](http://semantic-ui.com/behaviors/visibility.html)
- [API](http://semantic-ui.com/behaviors/api.html) and [more](http://semantic-ui.com/elements/button.html)
- [Where NOT to develop CSS or JS](#)

