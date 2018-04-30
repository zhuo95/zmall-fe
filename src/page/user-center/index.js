require('./index.css');
var navSide = require('page/common/nav-side/index.js');
var _zm = require('util/zm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

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
