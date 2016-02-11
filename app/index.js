/*eslint-env node*/

var express = require( "express" );
var PORT = 8081;
var app = express();
app.use( "/public", express.static( __dirname + "/public" ) );
app.use( ( req, res, next ) => {

	console.log( req.method, req.url );
	next();

} );
app.listen( PORT, () => {

	console.log( "Listening on", PORT );

} );
