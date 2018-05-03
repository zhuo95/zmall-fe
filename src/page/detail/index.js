require('./index.css');
var _zm = require('util/zm.js');
var _product = require('service/product-service.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');


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