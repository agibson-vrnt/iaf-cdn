/*eslint-env browser*/
/*global iaf*/

// the namespace (under window.iaf) for your service
var ns = "yourService";

// a queue which will drain itself upon attaching a drain
import Drainable from "./Drainable";
var partialQueue = new Drainable();

// supply a bootstrapping method which allows us to enqueue partials to be rendered ASAP
iaf[ ns ].bootstrapPartial = function( partialName, containerSelector ) {

	partialQueue.enqueue( { partialName, containerSelector } );

};

// script.js module - small module loader
import scriptjs from "scriptjs";
// config should be loaded into the appropriate namespace before this script runs
var config = iaf[ ns ].config;

// load the iaf client script
scriptjs( config[ "iaf-url"], function() {

	// create a shortcut to the version of iaf you are using
	iaf[ ns ].iaf = iaf[ config[ "iaf-version" ] ];

	// load the partials this page needs
	scriptjs( config[ "partials-url" ], function() {

		// open the drain so that partials are rendered
		partialQueue.drain = function( { partialName, containerSelector } ) {

			var lib = iaf[ ns ].iaf;
			var partial = iaf[ ns ].partials[ partialName ];
			var container = document.querySelector( containerSelector );
			lib.ReactDOM.render( lib.React.createElement( partial ), container );

		};

	} );

} );
