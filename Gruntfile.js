var path = require("path");

var lessCreateConfig = function (context, block) {
  var cfg = {files: []},
    outfile = path.join(context.outDir, block.dest),
    filesDef = {};

  filesDef.dest = outfile;
  filesDef.src = [];

  context.inFiles.forEach(function (inFile) {
    filesDef.src.push(path.join(context.inDir, inFile));
  });

  cfg.files.push(filesDef);
  context.outFiles = [block.dest];
  return cfg;
};

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist',
        flow: {
          steps: {
            'js': ['concat'],
            'css': ['concat', 'cssmin'],
            'less': [
              {
                name: 'less',
                createConfig: lessCreateConfig
              }
            ]
          },
          post: {}
        }
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        blockReplacements: {
          less: function (block) {
            return '<link rel="stylesheet" href="' + block.dest + '">';
          }
        }
      }
    },
    copy: {
      index: {
        src: ['index.html'],
        dest: 'dist/'
      },
      manifest: {
        src: ['manifest.json'],
        dest: 'dist/'
      },
      maps: {
        expand: true,
        flatten: true,
        src: ['bower_components/angular/angular.min.js.map'],
        dest: 'dist/app/js/'
      },
      templates: {
        expand: true,
        src: ['app/features/**/*.html'],
        dest: 'dist/'
      },
      assets: {
        expand: true,
        src: ['app/assets/img/**/*.*'],
        dest: 'dist/'
      },
      flatui: {
        expand: true,
        flatten: true,
        src: ['bower_components/flat-ui/fonts/glyphicons/flat-ui-icons-regular.*'],
        dest: 'dist/app/fonts/glyphicons/'
      }
    }
  });


  grunt.registerTask('default', [
    'useminPrepare',
    'concat',
    'less',
    'cssmin',
    'copy',
    'usemin'
  ]);
}