
require('./index.css');

var _zm = require('util/zm.js');

var _user   = require('service/user-service.js');

var _cart   = require('service/cart-service.js');

var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(msg){
                _zm.errorTips(msg);
            });
        });

        $('#signin-btn').click(function(){
            _zm.doLogin();
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('#notlogin').hide().siblings('#islogin').show()
                .find('.username').text(res.username);
        }, function(msg){
            // do nothing
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(msg){
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();