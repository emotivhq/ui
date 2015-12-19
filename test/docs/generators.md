## Generators

Available generators:

* [mcfly:module](#module)
* [mcfly:controller](#controller)
* [mcfly:directive](#directive)
* [mcfly:filter](#filter)
* [mcfly:service](#service)
* [mcfly:value](#value)
* [mcfly:constant](#constant)
* [mcfly:require](#require)
* [mcfly](#app) (aka [mcfly:app](#app))
* [mcfly:target](#target)


> **Note:** Generators are to be run from the `root directory` of the *correct* app.

## Most Common 
Here are the most common tasks you will use in Angular 1.x.

### Module
Generates a new module.
The first thing you need to do after executing `yo mcfly` is create a module.

Example:
```
yo mcfly:module modulename
```

If you don't mention a modulename, yeoman will ask you to provide one.

Produces: 
* `client/scripts/modulename/index.js` 
* `client/scripts/modulename/view/home.html`


If you do not want any route for the module, you can use the option `--skip-route`   
Example:
```
yo mcfly:module modulename --skip-route
```

In this case this will only produce:
* `client/scripts/modulename/index.js`

### Controller
Generates a new controller.

Example:
```
yo mcfly:controller modulename controllername
```

You need at least a module in order to scaffold a controller.   

If you don't specify arguments, yeoman will display the list of existing modules and let you choose one.   

Produces: 
* `client/scripts/modulename/controllers/controllername.js`
* `client/scripts/modulename/controllers/controllername.test.js`
* `client/scripts/modulename/controllers/index.js`


### Filter
Generates a new filter.

Example:
```
yo mcfly:controller modulename filtername
```

You need at least a module in order to scaffold a filter.   
If you don't specify arguments, yeoman will display the list of existing modules and let you choose one.   

Produces: 
* `client/scripts/modulename/fiters/filtername.js`
* `client/scripts/modulename/fiters/filtername.test.js`
* `client/scripts/modulename/filters/index.js`


### Value
Generates a new value.

Example:
```
yo mcfly:value modulename valuename
```

You need at least a module in order to scaffold a value.   
If you don't specify arguments, yeoman will display the list of existing modules and let you choose one.   

Produces: 
* `client/scripts/modulename/values/valuename.js`
* `client/scripts/modulename/values/valuename.test.js`
* `client/scripts/modulename/values/index.js`


### Constant
Generates a new constant.

Example:
```
yo mcfly:value modulename constantname
```

You need at least a module in order to scaffold a constant.   
If you don't specify arguments, yeoman will display the list of existing modules and let you choose one.   

Produces: 
* `client/scripts/modulename/constants/constantname.js`
* `client/scripts/modulename/constants/constantname.test.js`
* `client/scripts/modulename/constants/index.js`

### Service
Generates a new service.
You can use the `--servicetype` option to specify if you want a service, a factory, or a provider.
Default `servicetype` is factory.

Example:
```
yo mcfly:service modulename servicename
yo mcfly:service modulename servicename --servicetype=service
yo mcfly:service modulename servicename --servicetype=provider
```

You need at least a module in order to scaffold a service.   
If you don't specify arguments, yeoman will display the list of existing modules and let you choose one.   

Produces: 
* `client/scripts/modulename/services/servicename.js`
* `client/scripts/modulename/services/servicename.test.js`
* `client/scripts/modulename/services/index.js`

### Directive
Generates a new directive.
You can use the `--compile` option to specify if you want compile, pre and post link function (true), or just a simple link function (false).
Default `compile` is true.

Example:
```
yo mcfly:directive modulename myDirective
yo mcfly:directive modulename myDirective --compile=false
```

You need at least a module in order to scaffold a directive.   
If you don't specify arguments, yeoman will display the list of existing modules and let you choose one.   

Produces: 
* `client/scripts/modulename/directives/myDirective.html`
* `client/scripts/modulename/directives/myDirective.js`
* `client/scripts/modulename/directives/myDirective.test.js`
* `client/scripts/modulename/directives/index.js`


### Require
This generator will not scaffold any files.   
Instead it inspects the existing `client` folder and will refresh the needed injected require statements in every file where it is relevant.   

Example:
```
yo mcfly:require
```

## Adding a third party bower package
You should always prefer an npm package instead of a bower package. Most of client side libraries nowadays exist as both npm and bower packages.
But sometimes it is not the case and you have to deal with a bower package.

If you want to include a third party bower package do the following:

* `bower install --save yourpackage`
* modify `package.json` `browser` section to include a path to the global minified javascript file of the package
* adjust the **font** gulp constants (`gulp/common/constants.js`) to include the relevant fonts of the package (if applicable)
* if the package exposes a global `.scss` file import it into `client/styles/main.scss` and ajdust eventually the variable for the path font (should be `../fonts`)
* if the package only exposes a `.css` file adjust the **css** file constants (`gulp/common/constants.js`) to include it
* if the package relies on other libraries
  * Either add a browser-shim section (but this will only work with browserify, not webpack)
  * Or make sure you require the dependencies in your code just before you require the package.

## Creating New Apps

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also installs additional AngularJS modules, such as 
* angular-mocks
* angular-animate
* angular-sanitize
* angular-ui-router

The main application is called `main`.


Example:
```
yo mcfly
```

You can choose to scaffold a mobile (cordova) app using the option --mobile
Example:
```
yo mcfly --mobile
```
This will scaffold a config.xml file (suffixed with the app name), and hooks expected by cordova.    
In addition the `dist` folder will conform to cordova expectation (`www` sub folder).

### Target
Generate a new target application.   
This is usefull if you want to share code between several applications (gs-mobile-ui, gs-web-ui, etc...).

Example:
```
yo mcfly:target gs-web-ui
```

Produces: 
* `client/index-gs-web-ui.html`
* `client/scripts/main-gs-web-ui.js`
* `client/styles/main-gs-web-ui.scss`

> **NOTE:**    
> By default the app generate a default application with no suffix. This is equivalent to running the `target` generator with argument `app`

You can choose to scaffold a mobile (cordova) app using the option --mobile
Example:
```
yo mcfly:target gs-mobile-ui --mobile
```
This will scaffold a config.xml file (suffixed with the app name), and hooks expected by cordova.    
In addition the `dist` folder will conform to cordova expectation (`www` sub folder).


