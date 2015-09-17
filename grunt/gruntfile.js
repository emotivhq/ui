createSourceMaps = false;

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        remove: {
            fileList: ['../client/scripts/out/*.js'] 		// @TODO: we need to clean out more than this - JS 09/16 
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
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '../client',
                    src: 'sass/**/*.{scss,sass}',
                    dest: '../client/stylesheets/app-main',
                    ext: '.css'
                }]
            }
        },
        concat: {
            vendor: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: [
					'../client/bower_components/excanvas/excanvas.js',
					'../client/bower_components/Respond/dest/respond.min.js',
                    '../client/bower_components/jquery/dist/jquery.min.js',
                    '../client/bower_components/jquery-ui/jquery-ui.min.js',
					'../client/bower_components/pace/pace.min.js',
					'../client/bower_components/chosen/chosen.jquery.min.js', 
					'../client/bower_components/bootstrap/dist/bootstrap.min.js',
                    '../client/bower_components/devicejs/lib/device.min.js',
                    '../client/bower_components/sequencejs/scripts/sequence.min.js',
					'../client/bower_components/flexslider/jquery.flexslider-min.js',
                    '../client/bower_components/OwlCarousel2/dist/owl.carousel.min.js'
					 ],
                dest: '../client/scripts/out/vendor.js'
            },
            angular: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: [
					'../client/bower_components/angular/angular.min.js',
                    '../client/bower_components/angucomplete/angucomplete.js',
                    '../client/bower_components/angular-route/angular-route.min.js',
                    '../client/bower_components/angular-touch/angular-touch.min.js',
                    '../client/bower_components/angular-easyfb/angular-easyfb.min.js',
                    '../client/bower_components/angular-payments/lib/angular-payments.min.js',
                    '../client/bower_components/angular-cookies/angular-cookies.min.js',
                    '../client/bower_components/angular-sanitize/angular-sanitize.min.js',
                    '../client/bower_components/angular-resource/angular-resource.min.js',
                    '../client/bower_components/angular-ui-date/src/date.js',
                    '../client/bower_components/angulartics/dist/angulartics.min.js',
                    '../client/bower_components/angulartics/dist/angulartics-gtm.min.js',
                    '../client/bower_components/angulartics/dist/angulartics-inspectlet.min.js',
                    '../client/bower_components/angulartics-segment/dist/angulartics-segment.min.js',
					'../client/bower_components/angular-chosen-localytics/chosen.js',
					'../client/bower_components/angular-flexslider/angular-flexslider.js',
					'../client/bower_components/angular-boostrap/angular-bootstrap.min.js'
					 ],
                dest: '../client/scripts/out/angular.js'
            },			
			build: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: [
                    '../client/scripts/utilities/angulartics.module.js',
                    '../client/scripts/utilities/ng-ab/ng-ab.module.js',
                    '../client/scripts/utilities/ng-ab/ng-ab.service.js',
                    '../client/scripts/utilities/ng-ab/ng-ab.factory.js',
                    '../client/scripts/utilities/ng-ab/ng-ab.config.js',
                    '../client/scripts/viewport-units-buggyfill.js',
                    '../client/scripts/app.module.js',
                    '../client/scripts/app.config.js',
                    '../client/scripts/app.run.js',
                    '../client/scripts/out/angular-template.js',
                    '../client/scripts/frame/gs-view.directive.js',
                    '../client/scripts/frame/gs-focus.directive.js',
                    '../client/scripts/menu/menu.directive.js',
                    '../client/scripts/home/scroll-play.directive.js',
                    '../client/scripts/static-pages/about/about.controller.js',
                    '../client/scripts/static-pages/faq/faq.controller.js',
                    '../client/scripts/static-pages/giftideas/giftideas.controller.js',
                    '../client/scripts/static-pages/concierge/concierge.controller.js',
                    '../client/scripts/static-pages/howitworks/howitworks.controller.js',
                    '../client/scripts/static-pages/oldbrowser/oldbrowser.controller.js',
                    '../client/scripts/static-pages/partnerportal/partnerportal.controller.js',
                    '../client/scripts/partnerportal/partnerportal.controller.js',
                    '../client/scripts/static-pages/partners/partners.controller.js',
                    '../client/scripts/static-pages/press/press.controller.js',
                    '../client/scripts/static-pages/what-is-it/what-is-it.controller.js',
                    '../client/scripts/home/home.js',
                    '../client/scripts/giftsgivenbar/giftsgivenbar.controller.js',
                    '../client/scripts/giftstart/thanks/thanked-campaigns.directive.js',
                    '../client/scripts/giftstart/print/print.directive.js',
                    '../client/scripts/header/header.controller.js',
                    '../client/scripts/utilities/toast.service.js',
                    '../client/scripts/utilities/toast.directive.js',
                    '../client/scripts/utilities/analytics.service.js',
                    '../client/scripts/utilities/head.controller.js',
                    '../client/scripts/user/user.service.js',
                    '../client/scripts/user/profile.controller.js',
                    '../client/scripts/user/user_profile.controller.js',
                    '../client/scripts/user/user_profile.directive.js',
                    '../client/scripts/inspirationalexamples/inspirationalexamples.controller.js',
                    '../client/scripts/login/facebook.service.js',
                    '../client/scripts/login/twitter.service.js',
                    '../client/scripts/login/googleplus.service.js',
                    '../client/scripts/login/linkedin.service.js',
                    '../client/scripts/login/email.service.js',
                    '../client/scripts/login/login-or-create.controller.js',
                    '../client/scripts/giftstart/giftstart.service.js',
                    '../client/scripts/giftstart/giftstart.controller.js',
                    '../client/scripts/giftstart/giftstart.directive.js',
                    '../client/scripts/giftstart/thanks/thanks.directive.js',
                    '../client/scripts/giftstart/create/giftstart-create.controller.js',
                    '../client/scripts/share/share.controller.js',
                    '../client/scripts/product/product.service.js',
                    '../client/scripts/product/product.directive.js',
                    '../client/scripts/giftstart/overlay/overlay.directive.js',
                    '../client/scripts/popover/popover.service.js',
                    '../client/scripts/popover/popover.directive.js',
                    '../client/scripts/giftstart/funding-bar/funding-bar.directive.js',
                    '../client/scripts/popover/login/login-popover.controller.js',
                    '../client/scripts/popover/login/login-popover.directive.js',
                    '../client/scripts/popover/note/note-popover.controller.js',
                    '../client/scripts/popover/note/note-popover.directive.js',
                    '../client/scripts/popover/profile/profile-popover.controller.js',
                    '../client/scripts/popover/profile/profile-popover.directive.js',
                    '../client/scripts/popover/pay/pay-popover.controller.js',
                    '../client/scripts/popover/pay/pay-popover.directive.js',
                    '../client/scripts/popover/pay/card.service.js',
                    '../client/scripts/popover/thanks/thanks-popover.controller.js',
                    '../client/scripts/popover/thanks/thanks-popover.directive.js',
                    '../client/scripts/popover/email-share/email-share-popover.controller.js',
                    '../client/scripts/popover/email-share/email-share-popover.directive.js',
                    '../client/scripts/popover/sweepstakes/sweepstakes-popover.directive.js',
                    '../client/scripts/staffpicks/staffpicks.controller.js',
                    '../client/scripts/utilities/image-upload/image-upload.directive.js',
                    '../client/scripts/utilities/local-storage.service.js',
                    '../client/scripts/utilities/uservoice.js',
                    '../client/scripts/utilities/ng-clamp.js',
                    '../client/scripts/button/campaign-giftstart-it.directive.js',
                    '../client/scripts/header/giftstart-it-header.directive.js',
                    '../client/scripts/header/subscribe-header.directive.js',
                    '../client/scripts/header/subscribe-header.directive.js'
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
            },
            appcss: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapName: '../client/stylesheets/app-main.css.map',
                    sourceMapStyle: 'link'
                },
                src: ['../client/stylesheets/app-main/**/*.css'],
                dest: '../client/stylesheets/app-main.css'
            }
        },
		// Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['gruntfile.js', '../client/scripts/{,*/}*.js']
            }
        },
		// Empties folders & files to start fresh
		clean: {
  			options: {
                force: true
            },
			build: {
				src: ['../client/stylesheets/app-main']
  			},
  			release: {
   				dot: true,
				src: ['../client/stylesheets/app-main.css']
  			},
			compiled: {
				dot: true,
				src: ['../client/scripts/out/css','../client/stylesheets/**/*.map','../client/scripts/out/*.map']
			}
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
    			files: [{
      				cwd: '../client/stylesheets',
      				src: ['*.css', '!*.min.css'],
      				dest: '../client/stylesheets',
      				ext: '.min.css'
    			}]
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
	grunt.loadNpmTasks('grunt-contrib-jshint');

    // Build tasks.
    grunt.registerTask('default', ['remove', 'ngtemplates', 'sass', 'concat']);	// the default task build the whole app
    grunt.registerTask('jshint', ['jshint']);							// Run jshint, catch errors, fix, code better
	
	// New SASS tasks, I call it sassy
	grunt.registerTask('sassy', ['build-sass', 'rel-sass']);			// soup to nuts clean, build, release SASS
    grunt.registerTask('build-sass', ['build-clean', 'sass:build']);	// clean & build dev SASS
    grunt.registerTask('rel-sass', ['rel-clean', 'concat:appcss']); 	// clean & release built base app SASS
    grunt.registerTask('comp-sass', ['comp-clean', 'concat:css']); 		// clean & release built compiled app SASS
	grunt.registerTask('build-clean', ['clean:build']); 				// clean only build SASS
	grunt.registerTask('rel-clean', ['clean:release']); 				// clean only release SASS
	grunt.registerTask('comp-clean', ['clean:compiled']); 				// clean only compiled app SASS


};