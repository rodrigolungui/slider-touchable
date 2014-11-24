module.exports = function(grunt) {
  grunt.initConfig({
  
    pkg: grunt.file.readJSON('package.json'),
  
    jshint: {
      files: 'src/slider-touchable.js'
    },

    jasmine: {
      src: 'src/slider-touchable.js',
      options: {
        specs: 'test/spec.slider-touchable.js'
      }
    },

    uglify: {
      main: {
        options: {
          beautify: false,
          sourceMap: false
        },
        files: {
          'src/slider-touchable.min.js': ['src/slider-touchable.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('hint', ['jshint']);
};