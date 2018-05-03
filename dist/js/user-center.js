webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(128);
	var navSide = __webpack_require__(26);
	var _zm = __webpack_require__(14);
	var _user = __webpack_require__(24);
	var templateIndex = __webpack_require__(130);

	// page 逻辑部分
	var page = {
	    init: function(){
	        this.onLoad();
	    },
	    onLoad : function(){
	        // 初始化左侧菜单
	        navSide.init({
	            name: 'user-center'
	        });
	        // 加载用户信息
	        this.loadUserInfo();
	    },
	    // 加载用户信息
	    loadUserInfo : function(){
	        var userHtml = '';
	        _user.getUserInfo(function(res){
	            userHtml = _zm.renderHtml(templateIndex, res);
	            $('.panel-body').html(userHtml);
	        }, function(msg){
	            _zm.errorTips(msg);
	        });
	    }
	};
	$(function(){
	    page.init();
	});


/***/ }),

/***/ 128:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 130:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\">\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Username: </span>\r\n\t\t\t<span class=\"text\">{{username}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Phone: </span>\r\n\t\t\t<span class=\"text\">{{phone}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Email: </span>\r\n\t\t\t<span class=\"text\">{{email}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Question: </span>\r\n\t\t\t<span class=\"text\">{{question}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Answer: </span>\r\n\t\t\t<span class=\"text\">{{answer}}</span>\r\n\t\t</div>\r\n\t\t<a class=\"btn btn-danger\" href=\"./user-center-update.html\">Edit</a>\r\n</div>";

/***/ })

});