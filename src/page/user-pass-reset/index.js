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
     data:{
        username : '',
        question :'',
        answer   :'',
        token    :''
     },
	 init: function(){
        this.onload();
        this.bindEvent();
    },
    onload: function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion;
                },function(msg){
                    formError.show(msg);
                });
            }else{
                formError.show('Please enter username');
            }
        });

        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = token;
                    _this.loadStepPassword;
                },function(msg){
                    formError.show(msg);
                });
            }else{
                formError.show('Please enter the answer');
            }
        });

         $('#submit-password').click(function(){
            var pass = $.trim($('#reset-pass').val());
            if(pass && pass.length >=6){
                _user.resetPassword({
                    username:_this.data.username,
                    newPassword:_this.data.question,
                    forgetToken:_this.data.token,
                },function(res){
                    window.location.href = './result.html?type=passwordreset';
                },function(msg){
                    formError.show(msg);
                });
            }else{
                formError.show('Please enter password');
            }
        });
    },
    
    loadStepUsername: function(){
        $('.step-username').show();
    },
    loadStepQuestion: function(){
        formError.hide();
        $('.step-username').hide().siblings('.step-question')
        .show().find('.question').text(this.data.question);
    },
    loadStepPassword: function(){
         formError.hide();
        $('.step-question').hide().siblings('.step-password').show()
    },
};
//Jquery ready的时候调用
$(function(){
    page.init();
});