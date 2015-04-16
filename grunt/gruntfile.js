createSourceMaps = false;

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        remove: {
            fileList: ['../client/scripts/out/*.js']
        },
        ngtemplates: {
            GiftStarterApp: {
                options: {
                    prefix: '/'
                },
                cwd: '../client',
                src: 'scripts/**/*.html',
                dest: '../client/scripts/out/angular-template.js'
            }
        },
        sass: {
            // This doesn't work.  Bleh.
            // options: {
            //    sourceMap: createSourceMaps,
            //    sourceMapStyle: 'link'
            //},
            dist: {
                files: [{
                    expand: true,
                    cwd: '../client',
                    src: 'scripts/**/*.sass',
                    dest: '../client/scripts/out/css',
                    ext: '.css'
                }]
            }
        },
        concat: {
            build: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: [
                    '../client//bower_components/jquery/dist/jquery.min.js',
                    '../client//bower_components/jquery-ui/jquery-ui.min.js',
                    '../client//bower_components/angular/angular.min.js',
                    '../client//bower_components/angucomplete/angucomplete.js',
                    '../client//bower_components/angular-route/angular-route.min.js',
                    '../client//bower_components/angular-touch/angular-touch.min.js',
                    '../client//bower_components/angular-easyfb/angular-easyfb.min.js',
                    '../client//bower_components/angular-payments/lib/angular-payments.min.js',
                    '../client//bower_components/angular-cookies/angular-cookies.min.js',
                    '../client//bower_components/angular-sanitize/angular-sanitize.min.js',
                    '../client//bower_components/angular-resource/angular-resource.min.js',
                    '../client//bower_components/devicejs/lib/device.min.js',
                    '../client//bower_components/angular-ui-date/src/date.js',
                    '../client//scripts/utilities/ng-ab/ng-ab.module.js',
                    '../client//scripts/utilities/ng-ab/ng-ab.service.js',
                    '../client//scripts/utilities/ng-ab/ng-ab.factory.js',
                    '../client//scripts/utilities/ng-ab/ng-ab.config.js',
                    '../client//scripts/viewport-units-buggyfill.js',
                    '../client//scripts/app.module.js',
                    '../client//scripts/app.config.js',
                    '../client//scripts/app.run.js',
                    '../client/scripts/out/angular-template.js',
                    '../client//scripts/frame/gs-view.directive.js',
                    '../client//scripts/frame/gs-focus.directive.js',
                    '../client//scripts/menu/menu.directive.js',
                    '../client//scripts/home/scroll-play.directive.js',
                    '../client//scripts/static-pages/about/about.controller.js',
                    '../client//scripts/static-pages/faq/faq.controller.js',
                    '../client//scripts/static-pages/giftideas/giftideas.controller.js',
                    '../client//scripts/static-pages/concierge/concierge.controller.js',
                    '../client//scripts/static-pages/howitworks/howitworks.controller.js',
                    '../client//scripts/static-pages/oldbrowser/oldbrowser.controller.js',
                    '../client//scripts/static-pages/partners/partners.controller.js',
                    '../client//scripts/static-pages/press/press.controller.js',
                    '../client//scripts/static-pages/what-is-it/what-is-it.controller.js',
                    '../client//scripts/home/home.js',
                    '../client//scripts/giftstart/thanks/thanked-campaigns.directive.js',
                    '../client//scripts/giftstart/print/print.directive.js',
                    '../client//scripts/header/header.controller.js',
                    '../client//scripts/utilities/toast.service.js',
                    '../client//scripts/utilities/toast.directive.js',
                    '../client//scripts/utilities/analytics.service.js',
                    '../client//scripts/utilities/head.controller.js',
                    '../client//scripts/user/user.service.js',
                    '../client//scripts/user/profile.controller.js',
                    '../client//scripts/login/facebook.service.js',
                    '../client//scripts/login/twitter.service.js',
                    '../client//scripts/login/googleplus.service.js',
                    '../client//scripts/login/email.service.js',
                    '../client//scripts/login/login-or-create.controller.js',
                    '../client//scripts/giftstart/giftstart.service.js',
                    '../client//scripts/giftstart/giftstart.controller.js',
                    '../client//scripts/giftstart/thanks/thanks.directive.js',
                    '../client//scripts/giftstart/create/giftstart-create.controller.js',
                    '../client//scripts/product/product.service.js',
                    '../client//scripts/product/product.directive.js',
                    '../client//scripts/giftstart/overlay/overlay.directive.js',
                    '../client//scripts/popover/popover.service.js',
                    '../client//scripts/popover/popover.directive.js',
                    '../client//scripts/giftstart/funding-bar/funding-bar.directive.js',
                    '../client//scripts/popover/login/login-popover.controller.js',
                    '../client//scripts/popover/login/login-popover.directive.js',
                    '../client//scripts/popover/note/note-popover.controller.js',
                    '../client//scripts/popover/note/note-popover.directive.js',
                    '../client//scripts/popover/profile/profile-popover.controller.js',
                    '../client//scripts/popover/profile/profile-popover.directive.js',
                    '../client//scripts/popover/pay/pay-popover.controller.js',
                    '../client//scripts/popover/pay/pay-popover.directive.js',
                    '../client//scripts/popover/pay/card.service.js',
                    '../client//scripts/popover/thanks/thanks-popover.controller.js',
                    '../client//scripts/popover/thanks/thanks-popover.directive.js',
                    '../client//scripts/popover/email-share/email-share-popover.controller.js',
                    '../client//scripts/popover/email-share/email-share-popover.directive.js',
                    '../client//scripts/popover/sweepstakes/sweepstakes-popover.directive.js',
                    '../client//scripts/staffpicks/staffpicks.controller.js',
                    '../client//scripts/utilities/image-upload/image-upload.directive.js',
                    '../client//scripts/utilities/local-storage.service.js',
                    '../client//scripts/utilities/uservoice.js',
                    '../client//scripts/button/campaign-giftstart-it.directive.js',
                    '../client//scripts/header/giftstart-it-header.directive.js',
                    '../client//scripts/header/subscribe-header.directive.js',
                    '../client//scripts/header/subscribe-header.directive.js'
                ],
                dest: '../client/scripts/out/app.js'
            },
            build2: {
                src: '../client//bower_components/jquery/dist/jquery.min.map',
                dest: '../client/scripts/out/jquery.min.map'
            },
            css: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapName: '../client/stylesheets/compiled.css.map',
                    sourceMapStyle: 'link'
                },
                src: ['../client/assets/bootstrap.css', '../client/scripts/out/css/**/*.css', '../client/bower_components/angucomplete/angucomplete.css', '../client/bower_components/jquery-ui/themes/smoothness/jquery-ui.css'],
                dest: '../client/stylesheets/compiled.css'
            }
        },
        clean: {
            options: {
                force: true
            },
            src: ['../client/scripts/out/css','../client/stylesheets/**/*.map','../client/scripts/out/*.map']

        },
        uglify: {
            options: {
                mangle: false,
                compress: true
            },
            build: {
                src: '../client/scripts/out/app.js',
                dest: '../client/scripts/out/app.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '../client/stylesheets/compiled.css': '../client/stylesheets/compiled.css'
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Dev task.
    grunt.registerTask('default', ['remove', 'ngtemplates', 'sass', 'concat']);

};