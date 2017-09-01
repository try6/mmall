require('./index.css');
var _mm = require('util/mm.js');
//alert();

//报错：require is not define，注释掉就没有了
var _user = require('service/user-service.js');

require('page/common/nav/nav.js');
require('page/common/header/header.js');
var navSide = require('page/common/nav-side/nav-side.js');
var templateIndex = require('./index.string');

var page = {
	init: function() {
		this.onLoad();
	},
	onLoad: function() {
		//初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
		//加载用户信息
		this.loadUerInfo();
	},
	//加载用户信息
	loadUerInfo: function() {
		var userHtml = ''
		_user.getUserInfo(function(res) {
			userHtml = _mm.renderHtml(templateIndexm, res)
			$('.panel-body').html(userHtml);
		}, function(errMsg) {
			_mm.errorTips(errMsg);
		});
	}
};
$(function() {
	page.init();
});