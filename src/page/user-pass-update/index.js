require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _zm             = require('util/zm.js');
var _user           = require('service/user-service.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '#user-pass-update-submit', function(){
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    oldPassword : userInfo.password,
                    newPassword : userInfo.passwordNew
                }, function(res, msg){
                    _zm.successTips(msg);
                }, function(msg){
                    _zm.errorTips(msg);
                });
            }
            else{
                _zm.errorTips(validateResult.msg);
            }
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_zm.validate(formData.password, 'require')){
            result.msg = 'Old password cant be empty';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = 'password length must be longer than 6';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = 'two passwords are not same';
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