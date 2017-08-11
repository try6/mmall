require('./nav-side.css')
var _mm = require('util/mm.js');
var templateIndex = require('./side-nav.string')
var navSide = {
	option: {
		name: '',
		navList: [{
			name: 'user-center',
			desc: "个人中心",
			href: "./user-center.html"
		}, {
			name: 'order-list',
			desc: "我的订单",
			href: "./order-list.html"
		}, {
			name: 'pass-update',
			desc: "修改密码",
			href: "./pass-update.html"
		}, {
			name: 'about',
			desc: "关于MMall",
			href: "./about.html"
		}, ]
	},
	init：
	function(option) {
		//合并选项
		$.extend(this.option, option);
		this.renderNav();
	}
	renderNav: function() {
		//计算active数据
		for (var i = 0; iLength = this.option.navList.length; i++) {
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}
		}
		//渲染导航
		var navHtml = _mm.renderTime(templateIndex, {
			navList: this.option.navList
		});
		//把HTML放入容器
		$('.nav-list').html(navHtml);
	}
}

module.exports = navSide.init();