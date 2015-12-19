## Ionic.io platform

![](http://ionic.io/img/iologo.png)

This gs gulp system  includes some basic tasks for ensuring that any of our ionic projects in `dist/` are able to make use of the [apps.ionic.io](https://apps.ionic.io/) platform. These are found in `gulp_tasks/tasks/ionic.js`. To use the ionic.io platform services, we will need to scaffold a mobile target (with `yo mcfly --mobile` or `yo mcfly:target --mobile`) and then create a project on [apps.ionic.io](https://apps.ionic.io/). 

Next make sure your target has the correct properties from the ionic project; most importantly the [`app_id`, `api_key`, and `name` from apps.ionic.io](http://docs.ionic.io/docs/io-api-keys). Someone should fill these in inside `gulp_tasks/common/constants.js` file, in the `ionic` section for our target. If you plan to use `Ionic Push`, make sure to also include the `dev_push: true` property, so our app will know to register for the correct push notifications. 

>If you don't see an entry in `constants.ionic` for our target, simply copy and fill in the one for the `app` target. Make sure you end up with a `constants.ionic` that looks like this:

```js
        ionic: {
            ionicPlatform: { ... },
            app: { ... },
            <yourtargetname>: {  // fill this object with our ionic.io details
                app_id: '123abcd',
                api_key: '0123456789abcdefghij0123456789abcdefghij012345',
                name: 'GS Ionic App',
                dev_push: true
            }
        }
    ```

After your save the constants you need, run

```sh
gulp ionic:platformcopy --target=<targetname>
```

to copy over the [`ionic-platform-web-client`](https://github.com/driftyco/ionic-platform-web-client) bundle into your client folder, injecting your project's `ionic.io` data into it along the way.

Next, uncomment the line that says `require('./ionic.io.bundle.min-<yourtargetname>');` at [`client/scripts/main<targetsuffix>.js:14`](https://github.com/giftstarter/generator-mcfly/blob/master/templates/target/scripts/main.js#L14) as well as the module dependency for `'ionic.service.core'` that follows it. Finally comment out the script include of `cordova.js` in [`client/index<targetsuffix>.html:22`](https://github.com/giftstarter/generator-mcfly/blob/master/templates/target/index.html#L22), since the `ionic.io.bundle.min.js` will automatically load the correct instance of the `cordova.js` script for you.

Currently `'ionic:deploy'` is the only entry-point task, and it runs a `'dist'` and then handles the uploading and optional deployment of a project update to the ionic deploy server. You need to specify a target with a `--target=<targetname>` and then which mode you're using (usually `prod`) with `--mode=<dev|prod>`. After that you can add the `--note` and `--deploy` flags as specified by the [`ionic deploy` cli](http://docs.ionic.io/docs/deploy-deploying-updates).

More tasks to integrate with other ionic.io services are coming soon, but in the meantime, if you write your own, feel free to make a PR to [`giftstarter/generator-mcfly`](https://github.com/giftstarter/generator-mcfly). The file to edit is [`templates/gulps/tasks/ionic.js`](https://github.com/mcfly-io/generator-sublime/tree/master/templates/gulps/tasks/ionic.js). You should refer to the [apps.ionic.io docs](http://docs.ionic.io/) for inspiration, and then look at [`ionic-app-lib`](https://github.com/driftyco/ionic-app-lib) (the library that powers [`ionic-cli`](https://github.com/driftyco/ionic-cli)) to see how you can hook into the ionic system under the hood.
