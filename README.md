## UI SDK Development Workflow
This is the breakdown of common tasks in Grunt & Gulp. Both __Semantic__ and __Angular__, respectively, have their own detailed workflow outlined in the README files contained in each folder.
 
### Test Environment:
[ ![Codeship Status for giftstarter/giftstarter](https://codeship.com/projects/ca27d580-3295-0133-88e5-7e5270587528/status?branch=dev)](https://codeship.com/projects/99954)

## Semantic Build & Dev Tasks
These are all the current development tasks done at build time. See the [`README`](./_Semantic/REAMDE.md) in __Semantic_. 
Uses `gulp`.

## Angular Build & Dev Tasks
These are all the current development tasks done at build time. See the [`README`](./_Angular/REAMDE.md) in __Angular_. 
Uses `grunt`.

## Testing the UI
Two test apps are included for testing the UI builds, [`gs-mobile-ui`](./gs-mobile-ui) & [`gs-web-ui`](./gs-web-ui). See the [`README`](./test/README.md) in _test_. 
Uses `gulp`.

## UI SDK Structure 
This documentation is a work in progress. 

- `_Angular`: The Angular UI builder
  - `_app` - Angular app's main UI framework, including all LESS & JS components, themes, layouts and builder
    - `fonts` - Duh, thus is WIP
    - `sass` - An array of sass components, etc
    - `scripts` - JS components, etc
  - `_dist` - Built & packaged CSS, JS and components for distribution into an app
    - `ui.angular.min.css` - All of the UI css into one file to add into your project
    - `components.min.js` - All of the UI scripts in one file to add into your project
    - `components.min.css` - All of the UI css into one file, minified, to add into your project
    - `[theme].min.js` - All of the theme scripts into one file, minified, to add into your project
- `_Semantic`: The Semantic UI builder
  - `_app` - Semantic's main UI framework, including all LESS & JS components, themes, layouts and builder
    - `ui` - The default collection, element, global, module and view overrides for the `desktop` app UI
    - `components` - An array of stylizations called *themes* that can be applied at the element, global, module or view level
    - `themes` - Individual theme files to add into your project
  - `_dist` - Built & packaged CSS, JS and components for distribution into an app
    - `ui.semantic.min.css` - All of the UI css into one file to add into your project
    - `components.min.js` - All of the UI scripts in one file to add into your project
    - `components.min.css` - All of the UI css into one file, minified, to add into your project
    - `[theme].min.js` - All of the theme scripts into one file, minified, to add into your project
- `gs-mobile-ui` - A boilerplate `--mobile` Angular app to test the mobile UI SDK
  - `client` - See the [Mcfly Generator](https://github.com/giftstarter/generator-mcfly/blob/master/README.md) docs to see what and how this app is generated
    - `module_ui_module` - A test module including controllers, directives, services, providers, values, and views
- `gs-web-ui` - A boilerplate web Angular app to test the mobile UI SDK
  - `client` - See the [Mcfly Generator](https://github.com/giftstarter/generator-mcfly/blob/master/README.md) docs to see what and how this app is generated
    - `module_ui_module` - A test module including controllers, directives, services, providers, values, and views
- `node_modules` - Node dependencies, like Gulp & Semantic UI
- `.codio` - The master Codio config file
- `.gitattributes` - The Git attributes file
- `.gitignore` - The Git ignore file
- `.jshintrc` - The Jshint config file
- `package.json` - The NPM config file for the GS UI SDK project

### Help & references for developing
- The UI documentation [can be found here](https://github.com/giftstarter/giftstarter/wiki).
- The App Generator [Using Yeoman & Gulp](https://github.com/giftstarter/generator-mcfly/blob/master/README.md)

## GS UI SDK
| ![](http://findicons.com/files/icons/2773/pictonic_free/128/angularjs.png) | ![](http://www.semantic-ui.cn/images/logo.png) | ![](https://wordimpress.com/assets/icon-grunt.png) | ![](http://www.codingpedia.org/wp-content/uploads/2014/04/gulp-2x.png) |
