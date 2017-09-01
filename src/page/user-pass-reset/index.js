require('./index.css');
require('page/common/nav-simple/nav-simple.js');


var _mm = require('util/mm.js');
//报错：require is not define，注释掉就没有了。注册界面同
//var _user = require('service/user-service.js');
//表单里的错误提示
var formError = {
	show: function(errMsg) {
		$('.error-item').show().find('.errorMsg').text(errMsg);
	},
	hide: function() {
		$('.error-item').hide().find('.errorMsg').text('');
	}
};

var page = {
	//逻辑部分
	date: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},

	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this = this;
		//输入用户名后下一步按钮的点击
		$('#submit-username').click(function() {
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username, function(res) {
						_this.data.username = username;
						_this.data.question = res;
						_this.loadStepQuestion();
					},
					//todo 这里未知错误
					function(errMsg) {
						formError.show(errMsg);
					});
			}
			// 用户名不存在
			else {
				formError.show('请输入用户名');
			}

		});
		//输入密码提示问题答案后下一步按钮的点击
		$('#submit-qustion').click(function() {
			var answer = $.trim($('#answer').val());
			//答案正确
			if (answer) {
				_user.CheckAnswer({
						username: _this.date.username,
						question: _this.date.question,
						answer: answer

					},
					function(res) {
						_this.date.answer = answer;
						_this.date.token = res;
						_this.loadStepPassword();
					},
					function(errMsg) {
						formError.show(errMsg);
					});
			} else {
				formError.show('请输入正确的答案');
			};

		});

		//输入新密码后下一步按钮的点击
		$('#submit-password').click(function() {
			var password = $.trim($('#password').val());
			//密码正确
			if (password && password.length >= 6) {
				_user.resetPassword({
						username: _this.date.username,
						passwordNew: password,
						forgetToken: _this.date.token

					},
					function(res) {

						window.location.href = './result.html?type=pass-reset';
					},
					function(errMsg) {
						formError.show(errMsg);
					});
			} else {
				formError.show('请输入不少于6位的新密码');
			};

		});



	},
	//加载输入用户名的一步
	loadStepUsername: function() {
		$('.step-username').show();
	},
	//加载密码提示问题的一步
	loadStepQuestion: function() {
		//错误提示
		formError.hide();
		//切换容器
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.date.question);
	},
	//加载输入密码的一步
	loadStepPassword: function() {
		//错误提示
		formError.hide();
		//切换容器
		$('.step-question').hide()
			.siblings('.password').show();
	}


};
$(function() {
	page.init();
});