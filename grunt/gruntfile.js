module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        src: ['../client/scripts/app.config.min.js'],
        dest: '../client/scripts/giftstarter.min.js'
      }
    }
    uglify: {
      build: {
        src: '../client/scripts/app.*.js',
        dest: '../client/scripts/app.*.min.js'
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['concat']);

};