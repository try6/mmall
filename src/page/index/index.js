require('./index.css');
/*var _mm = require('util/mm.js');*/
//alert();

require('page/common/nav-simple/index.js');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
var navSide = require('page/common/nav-side/nav-side.js');
navSide.init({
	name: 'user-center'
});