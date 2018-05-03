webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	var _zm = __webpack_require__(14);
	var _product = __webpack_require__(106);
	var _user = __webpack_require__(24);
	var _cart = __webpack_require__(25);
	var templateIndex = __webpack_require__(107);


	var page = {
		data:{
			productId : _zm.getUrlParam('productId') || ''
		},
		init: function(){
			this.onload();
			this.bindEvent();
		},
		onload: function(){
			if(!this.data.productId){
				_zm.goHome();
			}
			this.loadDetail();
		},
		bindEvent:function(){
			var _this = this;
			//图片预览
			$(document).on('mouseenter','.p-img-item',function(){
				var  imageUrl = $(this).find('.p-img').attr('src');
				$('.main-img').attr('src',imageUrl);
			});
			//count操作
			$(document).on('click','.p-count-btn',function(){
				var type = $(this).hasClass('plus') ? 'plus':'minus',
					$pCount = $('.p-count'),
					currCount = parseInt($pCount.val()),
					minCount = 1,
					maxCount = _this.data.detailInfo.stock||1;
				if(type  === 'plus'){
					$pCount.val(currCount<maxCount? currCount+1:maxCount);
				}else if(type==='minus'){
					$pCount.val(currCount>minCount?currCount-1:minCount);
				}
			});
			//加入购物车
			$(document).on('click','.cart-add',function(){
				_cart.addToCart({
					productId : _this.data.productId,
					count : $('.p-count').val()
				},function(res){
					window.location.href= './result.html?type=cart-add';
				},function(msg){
					_zm.errorTips(msg);
				});
			})

		},
		loadDetail:function(){
			var _this= this,
				html = '',
				$pageWrap = $('.page-wrap');
				//loading
				$pageWrap.html('<div class="loading"></div>');
				//请求detail
			_product.getProductDetail(this.data.productId,function(res){
				_this.filter(res);
				//缓存detail 数据
				_this.data.detailInfo = res;
				html  = _zm.renderHtml(templateIndex,res);
				$('.page-wrap').html(html);
			},function(msg){
				$('.page-warp').html('<p class="err-tip">Cant find this item</p>');
			})
		},
		//数据匹配
		filter:function(data){
			data.subImages = data.subImages.split(',');
		}

	}

	$(function(){
		page.init();
	});

/***/ }),

/***/ 104:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

	var _zm = __webpack_require__(14);

	var _product = {
	    // 获取商品列表
	    getProductList : function(listParam, resolve, reject){
	        _zm.request({
	            url     : _zm.getServerUrl('/product/list.do'),
	            data    : listParam,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    //获取商品详细信息
	    getProductDetail : function(productId,resolve,reject){
	        _zm.request({
	            url     : _zm.getServerUrl('/product/detail.do'),
	            data    : {
	                productId : productId
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	}

	module.exports = _product;

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

	module.exports = "<div class=\"intro-wrap\">\r\n\t<div class=\"p-img-con\">\r\n\t\t<div class=\"main-img-con\">\r\n\t\t\t<img class=\"main-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\">\r\n\t\t</div>\r\n\t\t<ul class=\"p-img-list\">\r\n\t\t\t{{#subImages}}\r\n\t\t\t<li class=\"p-img-item\"><img class=\"p-img\" src=\"{{imageHost}}{{.}}\" alt=\"{{name}}\"></li>\r\n\t\t\t{{/subImages}}\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class=\"p-info-con\">\r\n\t\t<h1 class=\"p-name\">{{name}}</h1>\r\n\t\t<p class=\"p-subtitle\">{{subtitle}}</p>\r\n\t\t<div class=\"p-info-item p-price-con\">\r\n\t\t\t<span class=\"label\">Price</span>\r\n\t\t\t<span class=\"info\">{{price}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"p-info-item\">\r\n\t\t\t<span class=\"label\">Stock</span>\r\n\t\t\t<span class=\"info\">{{stock}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"p-info-item p-count-con\">\r\n\t\t\t<span class=\"label\">Number</span>\r\n\t\t\t<input type=\"\" name=\"\" class=\"p-count\" value=\"1\" readonly=\"\">\r\n\t\t\t<span class=\"p-count-btn plus\">+</span>\r\n\t\t\t<span class=\"p-count-btn minus\">-</span>\r\n\t\t</div>\r\n\t\t<div class=\"p-info-item\">\r\n\t\t\t<a class=\"btn btn-danger cart-add\">Add into cart</a>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</div>\r\n\r\n<div class=\"detail-wrap\">\r\n\t<div class=\"detail-tab-con\">\r\n\t\t<ul class=\"tab-list\">\r\n\t\t\t<li class=\"tab-item active\">detail</li>\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class=\"detail-con\">\r\n\t\t{{{detail}}}\r\n\t</div>\r\n</div>";

/***/ })

});