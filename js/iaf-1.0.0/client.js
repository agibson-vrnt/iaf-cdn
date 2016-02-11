/*eslint-env browser*/
import base from "./base";
import ReactDOM from "react-dom";
var iaf = ( window.iaf = window.iaf || {} );
var ret = iaf[ "1.0.0" ] = {

	...base,
	ReactDOM: ReactDOM

};
export default ret;
