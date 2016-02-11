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
	ns.bootstrapPartial = function( partialName, containerSelector ) {

		partialQueue.enqueue( { partialName, containerSelector } );

	};

	// load the iaf client script
	scriptjs( config.url, function() {

		// create a shortcut to the version of iaf you are using
		ns.iaf = iaf[ config.iaf.version ];

		// load the partials this page needs
		scriptjs( config.partials.url, function() {

			// open the drain so that partials are rendered
			partialQueue.drain = function( { partialName, containerSelector } ) {

				var lib = ns.iaf;
				var partial = ns.partials[ partialName ];
				var container = document.querySelector( containerSelector );
				lib.ReactDOM.render( lib.React.createElement( partial ), container );

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
