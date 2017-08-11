require('./nav.css');
/*var _mm = require('util/mm.js');
var _service = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//导航
var nav = {
	init：
	function() {
		this.bindEvent();
		this.loadCartCount();
		this.loadUserInfo();
		return this;
	}
	bindEvent: function() {
			//登录点击事件
			$('.js-login').click(function() {
					_mm.dologin();
				})
				//注册点击事件
			$('.js-register').click(function() {
					window.location.href = './register.html'
				})
				//退出点击事件
			$('.js-logout').click(function() {
				_user.logout(function(res) {
						window.location.reload();
					}

					function(errMsg) {
						_mm.errorTips(errMsg)
					});
				window.location.href = './register.html'
			})

		}
		//加载用户信息
	loadUserInfo: function() {
			_user.checkLogin(function(res) {
					$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
				}

				function(errMsg) {
					//_mm.errorTips(errMsg)
				});
		}
		//加载购物车数量
	loadCartCount: function() {
		cart.getCartCount(function(res) {
				$('.nav .cart-Count').text(res || 0);
			}

			function(errMsg) {
				$('.nav .cart-Count').text(0);
			});
	}
}
module.exports = nav.init();*/