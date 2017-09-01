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
		//初始化左侧菜单,没有生效~
		navSide.init({
			name: 'user-center'
		});
		//加载用户信息
		this.loadUerInfo();
	},
	bindEvent: function() {
		var _this = this;
		$(document).on('click', '.submit-btn', function() {
			var userInfo = {
					phone: $.trim($('#pnone').val()),
					email: $.trim($('#email').val()),
					question: $.trim($('#question').val()),
					answer: $.trim($('#answer').val())
				},
				validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				_user.updateUserInfo(userInfo, function(res) {
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				})
			} else {
				_mm.errorTips(validateResult.msg);
			}
		})

	},

	//加载用户信息
	loadUerInfo: function() {
		var userHtml = ''
		_user.getUserInfo(function(res) {
			userHtml = _mm.renderHtml(templateIndexm, res)
			$('.panel-body').html(userHtml);
		}, function(errMsg) {
			_mm.errorTips(errMsg);
		})
	},
	//验证字段
	validateForm: function(formDate) {
		var result = {
			status: false,
			msg: ''
		};

		//判断手机格式
		if (!_mm.validate(formDate.phone, 'phone')) {
			result.msg = "请输入正确的手机号";
			return result;
		}
		//判断邮箱格式
		if (!_mm.validate(formDate.email, 'email')) {
			result.msg = "请输入正确的邮箱";
			return result;
		}
		//验证密码问题不能为空
		if (!_mm.validate(formDate.question, 'require')) {
			result.msg = "密码问题不能为空";
			return result;
		}
		//验证密码答案不能为空
		if (!_mm.validate(formDate.anwser, 'require')) {
			result.msg = "密码答案不能为空";
			return result;
		}
		//通过验证
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function() {
	page.init();
});