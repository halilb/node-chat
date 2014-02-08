'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/javascripts/*.js', 'test/**/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    },
    watch: {
      jsfiles: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      changables: {
        files: ['public/**', '!public/lib/**'],
        options: {
          livereload: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['watch']);

};