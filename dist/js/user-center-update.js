webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(131);
	var navSide = __webpack_require__(26);
	var _zm = __webpack_require__(14);
	var _user = __webpack_require__(24);
	var templateIndex = __webpack_require__(133);

	// page 逻辑部分
	var page = {
	    init: function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        // 初始化左侧菜单
	        navSide.init({
	            name: 'user-center'
	        });
	        // 加载用户信息
	        this.loadUserInfo();
	    },
	    bindEvent: function(){
	        var _this = this;
	        $(document).on('click','#edit-account-center',function(){
	            var userInfo = {
	                phone: $.trim($('#phone').val()),
	                email: $.trim($('#email').val()),
	                question: $.trim($('#question').val()),
	                answer: $.trim($('#answer').val())
	            },
	            validateResult = _this.validateForm(userInfo);
	            if(validateResult.status){
	                _user.updateUserInfo(userInfo,function(res,msg){
	                    _zm.successTips(msg);
	                    window.location.href = './user-center.html';
	                },function(msg){
	                    _zm.errorTips(validateResult.msg);
	                });
	            }else{
	                _zm.errorTips(validateResult.msg);
	            }
	        });
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
	    },
	    validateForm: function(formData){
	        var result = {
	            status  : false,
	            msg     : ''
	        };
	        // 验证邮箱格式
	        if(!_zm.validate(formData.email, 'email')){
	            result.msg = 'email is not right';
	            return result;
	        }
	        // 验证密码提示问题是否为空
	        if(!_zm.validate(formData.question, 'require')){
	            result.msg = 'quetion cant be empty';
	            return result;
	        }
	        // 验证密码提示问题答案是否为空
	        if(!_zm.validate(formData.answer, 'require')){
	            result.msg = 'answer cant be empty';
	            return result;
	        }
	        // 通过验证，返回正确提示
	        result.status   = true;
	        result.msg      = 'success';
	        return result;
	    }
	};
	$(function(){
	    page.init();
	});


/***/ }),

/***/ 131:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\">\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Username: </span>\r\n\t\t\t<span class=\"text\">{{username}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Phone: </span>\r\n\t\t\t<input type=\"text\" calss=\"input\" id=\"phone\" autocomplete=\"off\" value=\"{{phone}}\">\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Email: </span>\r\n\t\t\t<input type=\"text\" calss=\"input\" id=\"email\" autocomplete=\"off\" value=\"{{email}}\">\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Question: </span>\r\n\t\t\t<input type=\"text\" calss=\"input\" id=\"question\" autocomplete=\"off\" value=\"{{question}}\">\r\n\t\t</div>\r\n\t\t<div class=\"form-line\">\r\n\t\t\t<span class=\"text\">Answer: </span>\r\n\t\t\t<input type=\"text\" calss=\"input\" id=\"answer\" autocomplete=\"off\" value=\"{{answer}}\">\r\n\t\t</div>\r\n\t\t<a class=\"btn btn-danger\" id=\"edit-account-center\">Submit</a>\r\n</div>";

/***/ })

});