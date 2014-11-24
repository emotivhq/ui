module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: '../client/scripts/app.config.js',
        dest: '../client/scripts/app.config.min.js'
      }
    concat: {
      build: {
        src: ['../client/scripts/app.config.min.js'],
        dest: '../client/scripts/giftstarter.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['concat']);

};