var _cart = requrie('util/mm.js');

var _cart = {
	//获取购物车数量
	getCartCount: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		});
	}

}

module.exports = _cart;