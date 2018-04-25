
require('./index.css');

var _zm = require('util/zm.js');

var search = function(){
	$('#search-nav').click(function(){
		this.searchSubmit();
	});
}

var searchSubmit= function(){
	var keyword = $.trim($('#search-nav-con').val());
	if(keyword){
		window.location.href = './list.html?keyword=' + keyword;
	}else{
		//提交为空 go home page
		_zm.goHome();
	}
}