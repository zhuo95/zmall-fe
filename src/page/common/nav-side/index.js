require('./index.css');

var _zm = require('util/zm.js');
var templateIndex = require('./index.string');

var navSide = {
	option : {
		name:'',
		navList:[
			{name:'user-center',desc:'Account Center',href:'./user-center.html'},
			{name:'order-list',desc:'My Order',href:'./order-list.html'},
			{name:'pass-update',desc:'Change Password',href:'./pass-update.html'},
			{name:'about',desc:'About Zmall',href:'./about.html'}
		]
	},
	init : function(option){
		// 合并选项
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	 renderNav : function(){
        // 计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        // 渲染list数据
        var navHtml = _zm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;