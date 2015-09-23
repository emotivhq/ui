createSourceMaps = false;

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        remove: {
            fileList: ['../client/scripts/out/*.js', '../client/scripts/out/css'] 		// @TODO: we need to clean out more than this - JS 09/16 
        },
        ngtemplates: {
            GiftStarterApp: {
                options: {
                    prefix: '/'
                },
                cwd: '../client',
                src: [
						'views/**/*.html',
						'scripts/**/*.html'
					],
                dest: '../client/scripts/out/angular-template.js'
            }
        },
        sass: {
            options: {
            	sourceMap: createSourceMaps,
            	sourceMapStyle: 'link'
            },
            trashy: {
                files: [{
                    expand: true,
                    cwd: '../client',
                    /* Undoing this and including manually to start taking out the trash 
					 * @todo: @fedora 09/21/15
					*/
					// src: 'scripts/**/*.sass',
					src: [
						'scripts/brandbar/**/*.sass',
						'scripts/butter/**/*.sass',
						'scripts/button/**/*.sass',
						'scripts/frame/**/*.sass',
						'scripts/giftideas/**/*.sass',
						'scripts/giftgivenbar/**/*.sass',
						'scripts/giftstart/**/*.sass',
						'scripts/header/**/*.sass',
						'scripts/home/**/*.sass',
						'scripts/inspirationalexamples/**/*.sass',
						'scripts/login/**/*.sass',
						'scripts/marketingbanner/**/*.sass',
						'scripts/menu/**/*.sass',
						'scripts/partnerportal/**/*.sass',
						'scripts/pay/**/*.sass',
						'scripts/popover/**/*.sass',
						'scripts/product/**/*.sass',
						'scripts/share/**/*.sass',
						'scripts/shopify/**/*.sass',
						'scripts/staffpicks/**/*.sass',
						'scripts/static-pages/**/*.sass',
						'scripts/user/**/*.sass',
						'scripts/utilities/**/*.sass',
						'scripts/*.sass'
					],
                    dest: '../client/stylesheets/trashy',
                    ext: '.css'
                }]
            },
            sassy: {
                files: [{
                    expand: true,
                    cwd: '../client',
                    src: ['sass/*.{scss,sass}', 'sass/css/*.css'],
                    dest: '../client/stylesheets/app-main',
                    ext: '.css'
                }]
            }
        },
        concat: {
		/* THIS {trash:} IS CURRENTLY BROKEN, TURNING OFF FOR NOW
		 * @TODO: JS 09/17
		 */
			trash: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: [
                    '../client/bower_components/jquery/dist/jquery.min.js',
                    '../client/bower_components/jquery-ui/jquery-ui.min.js',
                    '../client/bower_components/angular/angular.min.js',
                    '../client/bower_components/angucomplete/angucomplete.js',
                    '../client/bower_components/angular-route/angular-route.min.js',
                    '../client/bower_components/angular-touch/angular-touch.min.js',
                    '../client/bower_components/angular-easyfb/angular-easyfb.min.js',
                    '../client/bower_components/angular-payments/lib/angular-payments.min.js',
                    '../client/bower_components/angular-cookies/angular-cookies.min.js',
                    '../client/bower_components/angular-sanitize/angular-sanitize.min.js',
                    '../client/bower_components/angular-resource/angular-resource.min.js',
                    '../client/bower_components/devicejs/lib/device.min.js',
                    '../client/bower_components/angular-ui-date/src/date.js',
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

			vendor: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: [
                    '../client/bower_components/jquery/dist/jquery.min.js',
					'../client/scripts/vendor/jquery.ui.js',
					'../client/scripts/vendor/jquery.validation.js',
					'../client/bower_components/pace/pace.min.js',
                    //'../client/bower_components/jquery-ui/jquery-ui.min.js',
					//'../client/bower_components/excanvas/excanvas.js',
					//'../client/bower_components/Respond/dest/respond.min.js',
					'../client/bower_components/chosen/chosen.jquery.min.js', 
					'../client/bower_components/bootstrap/dist/js/bootstrap.min.js',
					'../client/bower_components/uikit/js/uikit.min.js',
                    '../client/bower_components/devicejs/lib/device.min.js',
                    '../client/bower_components/OwlCarousel2/dist/owl.carousel.min.js',
					'../client/bower_components/flexslider/jquery.flexslider-min.js',
                    '../client/bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                    '../client/bower_components/masonry/dist/masonry.pkgd.min.js',
                    '../client/bower_components/sequencejs/scripts/sequence.min.js',
					'../client/scripts/vendor/sequence-theme.modern-slide-in.min.js'
					 ],
                dest: '../client/scripts/webapp/vendor.js'
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
                    '../client/bower_components/devicejs/lib/device.min.js',
                    '../client/bower_components/angular-ui-date/src/date.js',
                    '../client/bower_components/angulartics/dist/angulartics.min.js',
                    '../client/bower_components/angulartics/dist/angulartics-gtm.min.js',
                    '../client/bower_components/angulartics/dist/angulartics-inspectlet.min.js',
                    '../client/bower_components/angulartics-segment/dist/angulartics-segment.min.js',
					'../client/bower_components/angular-chosen-localytics/chosen.js',
					'../client/bower_components/angular-flexslider/angular-flexslider.js',
					'../client/bower_components/angular-boostrap/angular-bootstrap.min.js'
				],
                dest: '../client/scripts/webapp/angular.js'
            },			
			app: {
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
                dest: '../client/scripts/webapp/app.js'
            },
			combine: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapStyle: 'link'
                },
                src: ['../client/scripts/webapp/vendor.js', '../client/scripts/webapp/angular.js', '../client/scripts/webapp/app.js'],
				dest: '../client/scripts/webapp/core.js'
			},
            build2: {
                src: '../client/bower_components/jquery/dist/jquery.min.map',
                dest: '../client/scripts/out/jquery.min.map'
            },
            trashy: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapName: '../client/stylesheets/compiled.css.map',
                    sourceMapStyle: 'link'
                },
                src: ['../client/stylesheets/trashy/**/*.css', '../client/bower_components/angucomplete/angucomplete.css'],
                dest: '../client/stylesheets/compiled.css'
            },
            sassyvendor: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapName: '../client/stylesheets/vendor.css.map',
                    sourceMapStyle: 'link'
                },
                src: [
					'../client/bower_components/OwlCarousel2/assets/owl.carousel.min.css', 
					'../client/bower_components/OwlCarousel2/assets/owl.theme.default.min.css', 
					'../client/bower_components/flexslider/flexslider.css', 
					'../client/bower_components/chosen/chosen.css'
					],
                dest: '../client/stylesheets/app-main/vendor.css'
            },
            sassy: {
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
                src: [
					'gruntfile.js', 
					'../client/scripts/{,*/}*.js', 
					'!../client/out/**/*.js', 
					'!../client/vendor/**/*.js'
				]
            }
        },
    	jslint: { 													 
    	    client: {
    	        src: [
					'../client/scripts/**/*.js'
				],
    	        directives: {
    	            browser: true,
    	            predef: ['jQuery']
    	        },
    	        options: {
    	            junit: 'out/client-junit.xml'
    	        }
    	    }
    	},	
		// Empties folders & files to start fresh
		clean: {
  			options: {
                force: true
            },
			sassy: {
				src: ['../client/stylesheets/app-main']
  			},
			sassycss: {
				src: ['../client/stylesheets/app-main.css']
  			},
			trashy: {
				dot: true,
				src: ['../client/stylesheets/trashy']
			},
			trashycss: {
				dot: true,
				src: ['../client/stylesheets/compiled.css']
			},
			out: {
				dot: true,
				src: ['../client/scripts/out/css','../client/scripts/out/**/*.map','../client/scripts/out/*.js']
			},
			webapp: {
				dot: true,
				src: ['../client/scripts/webapp/**/*.js']
			},
			cssmin: {
				dot: true,
				src: ['../client/stylesheets/*min.css']
			}
		},
        uglify: {
            options: {
                mangle: false,
                compress: true
            },
            build: {
                src: '../client/scripts/webapp/app.js',
                dest: '../client/scripts/webapp/app.js'
            },
            vendor: {
                src: '../client/scripts/webapp/vendor.js',
                dest: '../client/scripts/webapp/vendor.js'
            },
            angular: {
                src: '../client/scripts/webapp/angular.js',
                dest: '../client/scripts/webapp/angular.js'
            },
            core: {
                src: '../client/scripts/webapp/core.js',
                dest: '../client/scripts/webapp/core.js'
            }
        },
		cssmin: {
            options: {
                shorthandCompacting: true,
                //roundingPrecision: -1
            },
			target: {
    			files: [{
      				expand: true,
					cwd: '../client/stylesheets',
      				src: ['app-main.css', 'compiled.css', 'vendor.css', '!*.min.css'],
      				dest: '../client/stylesheets',
      				ext: '.min.css'
    			}]
  			}
		},
		bump: {
            options: {
                files: ['package.json', '../client/bower.json', '../app.yaml'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Build & release v%VERSION%',
                commitFiles: ['package.json', '../client/bower.json', '../app.yaml'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false, // True if you want to auto deploy while doing $ grunt beep, etc
                pushTo: 'github',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
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
	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-bump');

    // Build tasks.
    grunt.registerTask('default', ['remove', 'ngtemplates', 'sass', 'sassy', 'concat']);	// the default task build the old app
	grunt.registerTask('dev', ['remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify']);
	grunt.registerTask('debug', ['remove', 'ngtemplates', 'trashy', 'sassy', 'jshint', 'jslint']); // Build with jshint, catch errors with jslint, fix, code better
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('build', ['remove', 'ngtemplates', 'trashy', 'sassy', 'concat', 'cssmin', 'uglify']); // Build the app ready to test
	
	
	/* 
	 *** SASS tasks, I call it sassy *** 
	*/
	grunt.registerTask('sassy', ['build-sassy', 'rel-sassy', 'cssmin']);	// soup to nuts clean, build, release SASS
    // Individual sassy tasks
	grunt.registerTask('build-sassy', ['clean-sassy', 'sass:sassy']);		// clean & build dev SASS
    grunt.registerTask('rel-sassy', ['clean-sassycss', 'concat:sassyvendor', 'concat:sassy']); 	// clean & release built base app SASS
	grunt.registerTask('clean-sassy', ['clean:sassy']); 					// clean only build SASS
	grunt.registerTask('clean-sassycss', ['clean:sassycss']); 				// clean only released SASS

	/* 
	 *** OLD sass tasks, I call it trashy *** 
	*/
	grunt.registerTask('trashy', ['build-trashy', 'rel-trashy', 'cssmin']);	// soup to nuts clean, build, release trashy sass
    // Individual trashy tasks
	grunt.registerTask('build-trashy', ['clean-trashy', 'sass:trashy']);	// clean & build dev trashy sass
    grunt.registerTask('rel-trashy', ['clean-trashycss', 'concat:trashy']); // clean & release built compiled trashy sass
	grunt.registerTask('clean-trashy', ['clean:trashy']); 					// clean only compiled trashy sass
	grunt.registerTask('clean-trashycss', ['clean:trashycss']); 			// clean only released trashy sass

	/* 
	 *** Javascript tasks ***
	*/
	grunt.registerTask('scripts', ['build-scripts', 'rel-scripts']);		// soup to nuts clean, build, release scripts
    // Individual js tasks
	grunt.registerTask('build-scripts', ['build-clean', 'sass:sassy']);		// clean & build dev js
    grunt.registerTask('rel-scripts', ['rel-clean', 'concat:vendor', 'concat:angular', 'concat:app']); 		// clean & release built base app js
    grunt.registerTask('comp-scripts', ['comp-clean', 'concat:trash']); 	// clean & release built compiled app js
	grunt.registerTask('build-clean', ['clean:build']); 					// clean only build js
	grunt.registerTask('rel-clean', ['clean:release']); 					// clean only release js
	grunt.registerTask('comp-clean', ['clean:compiled']); 					// clean only compiled app js
	
	// Built in versioning, Archer style (https://www.youtube.com/watch?v=C6NRA69SdoM)
	grunt.registerTask('beep', ['bump:patch']);
	grunt.registerTask('boop', ['bump:minor']);
	grunt.registerTask('bop', ['bump:major']); // you better be sure you know what you're doing here. 00 bops given
	grunt.registerTask('prebeep', ['bump:prepatch']);
	grunt.registerTask('preboop', ['bump:preminor']);
	grunt.registerTask('prebop', ['bump:premajor']);
	grunt.registerTask('prerelease', ['bump:prerelease']);
	// for a full list of bump commands, see https://www.npmjs.com/package/grunt-bump


};