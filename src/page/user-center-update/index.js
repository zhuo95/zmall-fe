require('./index.css');
var navSide = require('page/common/nav-side/index.js');
var _zm = require('util/zm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

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
