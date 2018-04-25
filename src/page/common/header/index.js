require('./index.css');

var _zm = require('util/zm.js');


var header = {
	init : function(){
		this.onload();
		this.bindEvent();
	},
	onload: function(){
		var keyword = _zm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent: function(){
		var _this = this;
		  // 点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
		//回车键提交
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索提交
	searchSubmit: function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			//提交为空 go home page
			_zm.goHome();
		}
	}
}

header.init();