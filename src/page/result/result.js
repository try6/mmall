require('./result.css');
var _mm = require('util/mm.js');
//alert();

require('page/common/nav-simple/index.js');
require('page/common/nav/nav.js');
require('page/common/header/header.js');

$(function() {
	var type = _mm.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success').show();
})