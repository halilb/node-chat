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
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['jshint', 'karma']);

  grunt.registerTask('default', ['watch']);

};