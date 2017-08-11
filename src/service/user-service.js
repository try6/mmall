var _mm = requrie('util/mm.js');

var _user = {
	//登出
	logout: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: "POST",
			success: resolve,
			error: reject
		});
	},
	checkLogin: function(resolve, reject) {
		//检查登录状态
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: "POST",
			success: resolve,
			error: reject
		});
	}
}

module.exports = _user;