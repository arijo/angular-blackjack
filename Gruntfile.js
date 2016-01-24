module.exports = function (grunt) {

  grunt.initConfig({

      'http-server': {

          'dev': {
              root: '',
              port: 8000,
              host: "0.0.0.0",
              ext: "html"
              //runInBackground: true
          }
      },

      sass: {

        dist: {
          options: {
            style: 'expanded',
            compass: true
          },
          files: {
            'styles/main.css': 'styles/main.scss'
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('server', ['http-server:dev']);
  grunt.registerTask('styles', ['sass']);
};
