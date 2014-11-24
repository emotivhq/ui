module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    remove: {
      fileList: ['../client/scripts/out/*.js']
    },
    concat: {
      build: {
        src: [
          '../client/bower_components/angular/*.min.js',
          '../client/bower_components/**/*.js',
          '../client/scripts/utilities/ngAB/*.js',
          '../client/scripts/app.module.js',
          '../client/scripts/app.config.js',
          '../client/scripts/app.run.js',
          '../client/scripts/**/*.js'
        ],
        dest: '../client/scripts/out/app.js'
      }
    },
    uglify: {
      build: {
        src: '../client/scripts/out/app.js',
        dest: '../client/scripts/out/app.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-remove');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['remove', 'concat']);

};