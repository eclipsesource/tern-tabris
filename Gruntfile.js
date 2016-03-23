/*global module:false*/
module.exports = function(grunt) {

  var currentTimestamp = Date.now();

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["dist"],
    concat: {
      js: {
        src: [
          "node_modules/codemirror/lib/codemirror.js",
          "node_modules/codemirror/addon/hint/show-hint.js",
          "node_modules/codemirror/addon/edit/closetag.js",
          "node_modules/codemirror/addon/edit/closebrackets.js",
          "node_modules/codemirror/addon/edit/matchbrackets.js",
          "node_modules/codemirror/addon/selection/active-line.js",
          "node_modules/codemirror/addon/runmode/runmode.js",
          "node_modules/codemirror/addon/tern/tern.js",
          "node_modules/codemirror/mode/javascript/javascript.js",
          "node_modules/acorn/dist/acorn.js",
          "node_modules/acorn/dist/acorn_loose.js",
          "node_modules/acorn/dist/walk.js",
          "node_modules/tern/lib/signal.js",
          "node_modules/tern/lib/tern.js",
          "node_modules/tern/lib/def.js",
          "node_modules/tern/lib/comment.js",
          "node_modules/tern/lib/infer.js",
          "node_modules/codemirror-extension/addon/hint/templates-hint.js",
          "node_modules/codemirror-extension/addon/hover/text-hover.js",
          "node_modules/codemirror-javascript/addon/hint/tern/tern-extension.js",
          "node_modules/codemirror-javascript/demo/defs/ecma5.json.js",
          "node_modules/codemirror-javascript/addon/hint/javascript/javascript-templates.js",
          "node_modules/codemirror-javascript/addon/hint/tern/tern-hover.js",
          "codemirror/addon/hint/javascript/tabris-templates.js",
          "codemirror/addon/hint/context-autocomplete-hint.js",
          "tabris.js"
        ],
        dest: "dist/<%= pkg.name %>-connect-" + currentTimestamp + ".js"
      },
      css: {
        src: [
          "node_modules/codemirror/lib/codemirror.css",
          "node_modules/codemirror/theme/eclipse.css",
          "node_modules/codemirror-javascript/addon/hint/tern/tern-extension.css",
          "node_modules/codemirror-extension/addon/hint/show-hint-eclipse.css",
          "node_modules/codemirror-extension/addon/hint/show-context-info.css",
          "node_modules/codemirror-extension/addon/hint/templates-hint.css",
          "node_modules/codemirror-extension/addon/hover/text-hover.css"
        ],
        dest: "dist/<%= pkg.name %>-connect-" + currentTimestamp + ".css"
      }
    },
    uglify: {
      js: {
        src: "<%= concat.js.dest %>",
        dest: "dist/<%= pkg.name %>-connect-" + currentTimestamp + ".min.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask("build", ["clean", "concat", "uglify"]);
};
