module.exports = function() {
  var cmds = [
              "node tools/r.js -o tools/build.js",
              "uglifyjs --output dist/gladius-2d.min.js dist/gladius-2d.js"
              ];
  var callback = function() {
  };
  var opts = {
      stdout: true,
      stderr: true,
      breakOnError: false
  };

  jake.exec( cmds, callback, opts );
};
