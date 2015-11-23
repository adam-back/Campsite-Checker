var tasks = require( './tasks' );
var express = require( 'express' );
var app = express();

var runTests = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString() + "\n";

  fs.appendFile('runlog.txt', currentTime, function(error) {
    if ( error ) {
      console.error( error );
    }
  });

  child_process.exec( 'npm test' );
};

var server = app.listen(3000, function() {
  console.log( 'Listening on port %s...', server.address().port );
  // run tests every 6 hours
  // 1000 * 60 - one minute
  // * 60 - sixty minutes, one hour
  // * 6 - 6 hours
  setInterval(function() {
    tasks.runTests();
  }, ( 1000 * 60 * 60 * 6 ));

  // reset logs every week
  // 1000 * 60 - one minute
  // * 60 - sixty minutes, one hour
  // * 24 - 24 hours
  // * 7 - 7 days
  setInterval(function() {
    tasks.resetLog();
  }, ( 1000 * 60 * 60 * 24 * 7 ));
});

app.get( '*', function( req, res ) {
  res.sendFile( 'runlog.txt', { root: './' } );
});


