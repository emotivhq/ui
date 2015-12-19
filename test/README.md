# The Test Suite
This test suite uses built-in generators and scaffolding to help us quickly test new UI components, elements, views, and more - all before integrating into a main app.

Essentially, we have two sample, small scale apps available to run, one mobile and one for web. This way, when we make updates to the __Angular or __Semantic_ framework and want to see what the build would look like in a real app, these apps are for you!

## GyShiDo with Mcfly
To get shit done, here's a quick list of useful info. 

1. Check out the main [README](../README.md) 
    - Angular [README](../_Angular/README.md)
    - Semantic [README](../_Semantic/README.md)
2. [Typical workflow](#typical-workflow)
3. Overview of [client folder](#client-folder)
4. [Gulp tasks](#gulp-tasks)
1. [Generators](./test/docs/generators.md)
5. [Ionic](./test/docs/ionic.md)
6. [Browserify](./test/docs/browserify.md)

### Typical workflows
These are all available in the already provided test apps, or inside any new apps you build in here: `test/gs-app-name`. 

##### Apps:
```
1. gs-mobile-ui
2. gs-web-ui
```

#### New module
A typical new module workflow would look like this:
```bash
$ cd gs-web-ui
$ yo mcfly:module common
$ yo mcfly:controller common hello
- Add some content to client/index.html : <h2 ng-controller="gs-web-ui.common.hello as helloCtrl">{{helloCtrl.message}}</h2>
$ gulp browsersync
$ gulp watch
```

#### New controller, existing module
A typical new controller workflow would look like this:
```bash
$ cd gs-web-ui
$ yo mcfly:controller common hello
- Add some content to client/index.html : <h2 ng-controller="gs-web-ui.common.hello as helloCtrl">{{helloCtrl.message}}</h2>
$ gulp browsersync
$ gulp watch
```

> **NOTE:**      
> `gulp browsersync` accepts an option `--no-browser` if you do not want to automatically open a browser


> **NOTE:**      
> `gulp browsersync` accepts an option `--https` if you want to force an HTTPS connection   
> you can also control http vs https using in `gulp_taks/common/constants.js` -> `serve.https` boolean


## Client folder
The generator will ask you to provide the name of the folder containing the client source code, and it will save this value in `.yo-rc.json` file (`clientFolder` entry).   
If you rename the client folder, make sure you also modify the value stored in `.yo-rc.json`

## Gulp tasks
Here is a set of simple gulp tasks available:
```
gulp help           # List the main gulp tasks
gulp lint           # Run lint
gulp test           # Run lint, unit tests, and e2e tests
gulp unit           # Run lint and unit tests (karma for client + mocha for server)
gulp karma          # Run karma client unit tests
gulp mocha          # Run mocha server unit tests
gulp e2e            # Run protractor for end to end tests
gulp browserify     # Generate a distribution folder using browserify
gulp webpack:run    # Generate a distribution folder using webpack
gulp style          # Generate a main.css file
gulp browsersync    # Creates a browser-sync server, it will display its url, it watches for js / css / scss / html file changes and inject automatically the change in the browser
gulp dist           # Distribute the application
gulp cordova:image  # Generate the cordova icons and splashs
gulp cordova:run    # Run cordova run (accepts a --platform option)
```

The gulp tasks share a constant file located at `gulp/common/constants.js`. Feel free to modify it to your project needs.   
The constants are resolved against the `--target` option. The default value for `--target` is `app`.

To better understand the gulp task system have a look at the docs of [gulp-mux](https://github.com/mcfly-io/gulp-mux) 
