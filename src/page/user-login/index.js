require('../common/index.js');
require('./index.css');
var _zm = require('util/zm.js');
var _user   = require('service/user-service.js');


// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.err-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.err-item').hide().find('.err-msg').text('');
    }
};

//逻辑部分
var page = {
	 init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _zm.getUrlParam('redirect') || './index.html';
            }, function(msg){
                formError.show(msg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_zm.validate(formData.username, 'require')){
            result.msg = 'username cant be empty';
            return result;
        }
        if(!_zm.validate(formData.password, 'require')){
            result.msg = 'password cant be empty';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = 'Success';
        return result;
    }
};
//Jquery ready的时候调用
$(function(){
    page.init();
});