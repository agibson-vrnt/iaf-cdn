/*eslint-env browser*/

// a queue which will drain itself upon attaching a drain
import Drainable from "./Drainable";
const partialQueue = new Drainable();

// script.js module - small module loader
import scriptjs from "scriptjs";

( function loader( namespace, config ) {

	var iaf = window.iaf = window.iaf || {};
	var ns = iaf[ namespace ] = iaf[ namespace ] || {};

	// supply a bootstrapping method which allows us to enqueue partials to be rendered ASAP
	ns.bootstrapPartial = function( partialName, partialModel, containerSelector ) {

		partialQueue.enqueue( { partialName, partialModel, containerSelector } );

	};

	function required( value, description ) {

		if( value !== false && !value ) { throw new Error( "Missing value: " + description ); }
		return value;

	}
	// load the iaf client script
	scriptjs( required( config.iaf.url, "iaf.url - the URL of the iaf client script" ), function() {

		// create a shortcut to the version of iaf you are using
		ns.iaf = iaf[ required( config.iaf.version, "iaf.version - the version of the iaf client to use" ) ];

		// load the partials this page needs
		scriptjs( required( config.partials.url, "partials.url - the URL to load partials from" ), function() {

			// open the drain so that partials are rendered
			partialQueue.drain = function( { partialName, partialModel, containerSelector } ) {

				var lib = ns.iaf;
				var partial = ns.partials[ partialName ];
				var container = document.querySelector( containerSelector );
				lib.ReactDOM.render( lib.React.createElement( partial, partialModel ), container );

			};

		} );

	} );

}( "{{{namespace}}}", {

	iaf: {

		url: "{{{iaf-url}}}",
		version: "{{{iaf-version}}}"

	},
	partials: {

		url: "{{{partials-url}}}"

	}

} ) );
