require('./user-register.css');
var _mm = require('util/mm.js');

//报错requrie is not defined
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show: function(errMsg) {
		$('.error-item').show().find('.errorMsg').text(errMsg);
	},
	hide: function() {
		$('.error-item').hide().find('.errorMsg').text('');
	}
};

require('page/common/nav-simple/nav-simple.js');
var page = {
	//逻辑部分
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		//注册按钮的点击
		$('#submit').click(function() {
			_this.submit();
		});
		//回车提交
		$('.user-content').keyup(function(e) {
			//e.keycode==13表示回车
			if (e.keycode == 13) {
				_this.submit();
			}
		})
	},
	//提交表单
	submit: function() {

		var formDate = {
				username: $.trim($('#username').val()),
				password: $.trim($('#password').val()),
				passwordConfirm: $.trim($('#password-confirm').val()),
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				anwser: $.trim($('#anwser').val()),
			},
			//表单验证
			validateResult = this.formValidate(formDate);
		//验证成功
		if (validateResult.status) {
			//提交
			_user.register(formDate, function(res) {
				//回到来的地方，或为空就返回到首页
				window.location.href = './index.html';
			}, function(errMsg) {
				formError.show(errMsg);
			});
		}
		//验证失败
		else {
			//错误提示
			formError.show(validateResult.msg);

		}
	},
	//表单字段的验证
	formValidate: function(formDate) {
		var result = {
			status: false,
			msg: ''
		};
		if (!_mm.validate(formDate.username, 'require')) {
			result.msg = "用户名不能为空";
			return result;
		}
		if (!_mm.validate(formDate.password, 'require')) {
			result.msg = "密码不能为空";
			return result;
		}
		//判断两次密码是否一致
		if (formDate.password != formDate.passwordConfirm) {
			result.msg = "两次密码请保持一致";
			return result;
		}
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

}
$(function() {
	page.init();
});