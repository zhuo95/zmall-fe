webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	var _zm = __webpack_require__(14);
	var _product = __webpack_require__(106);
	var _user = __webpack_require__(24);
	var templateIndex = __webpack_require__(120);
	var Pagination = __webpack_require__(121);

	var page = {
		data:{
			listParam:{
				keyword:_zm.getUrlParam('keyword')||'',
				categoryId:_zm.getUrlParam('categoryId')||'',
				orderBy:_zm.getUrlParam('orderBy')||'',
				pageNum:_zm.getUrlParam('pageNum')|| 1,
				pageSize:_zm.getUrlParam('pageSize')|| 20
			}
		},
		init: function(){
			this.onload();
			this.bindEvent();
		},
		onload: function(){
			this.loadList();
		},
		bindEvent: function(){
			var _this = this;
			// 排序的点击事件
	         $('.sort-item').click(function(){
	            var $this = $(this);
	            _this.data.listParam.pageNum = 1;
	            // 点击默认排序
	            if($this.data('type') === 'default'){
	                // 已经是active样式
	                if($this.hasClass('active')) {
	                    return;
	                }
	                // 其他
	                else{
	                    $this.addClass('active').siblings('.sort-item')
	                        .removeClass('active asc desc');
	                    _this.data.listParam.orderBy = 'default';
	                }
	            }
	            // 点击价格排序
	            else if($this.data('type') === 'price'){
	                // active class 的处理
	                $this.addClass('active').siblings('.sort-item')
	                        .removeClass('active asc desc');
	                // 升序、降序的处理
	                if(!$this.hasClass('asc')){
	                    $this.addClass('asc').removeClass('desc');
	                    _this.data.listParam.orderBy = 'price_asc';
	                }else{
	                    $this.addClass('desc').removeClass('asc');
	                    _this.data.listParam.orderBy = 'price_desc';
	                }
	            }
	            // 重新加载列表
	            _this.loadList();
	        });
		},
		    // 加载list数据
	    loadList : function(){
	        var _this       = this,
	            listHtml    = '',
	            listParam   = this.data.listParam,
	            $pListCon   = $('.p-list-con');
	        $pListCon.html('<div class="loading"></div>');
	        // 删除参数中不必要的字段
	        listParam.categoryId 
	            ? (delete listParam.keyword) : (delete listParam.categoryId);
	        // 请求接口
	        _product.getProductList(listParam, function(res){
	            listHtml = _zm.renderHtml(templateIndex, {
	                list :  res.list
	            });
	            $pListCon.html(listHtml);
	            _this.loadPagination({
	                hasPreviousPage : res.hasPreviousPage,
	                prePage         : res.prePage,
	                hasNextPage     : res.hasNextPage,
	                nextPage        : res.nextPage,
	                pageNum         : res.pageNum,
	                pages           : res.pages
	            });
	        }, function(msg){
	            _zm.errorTips(msg);
	        });
	    },
	    // 加载分页信息
	    loadPagination : function(pageInfo){
	        var _this = this;
	        this.pagination ? '' : (this.pagination = new Pagination());
	        //对于空对象，先把pageinfo 放进去，再把后面放进去
	        this.pagination.render($.extend({}, pageInfo, {
	            container : $('.pagination'),
	            onSelectPage : function(pageNum){
	                _this.data.listParam.pageNum = pageNum;
	                _this.loadList();
	            }
	        }));
	    }
	};

	$(function(){
		page.init();
	})

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

	var _zm = __webpack_require__(14);

	var _product = {
	    // 获取商品列表
	    getProductList : function(listParam, resolve, reject){
	        _zm.request({
	            url     : _zm.getServerUrl('/product/list.do'),
	            data    : listParam,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    //获取商品详细信息
	    getProductDetail : function(productId,resolve,reject){
	        _zm.request({
	            url     : _zm.getServerUrl('/product/detail.do'),
	            data    : {
	                productId : productId
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	}

	module.exports = _product;

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

	module.exports = "{{#list}}\r\n\t<li class=\"p-item\">\r\n\t\t<div class=\"p-img-con\">\r\n\t\t\t<a class=\"link\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">\r\n\t\t\t\t<img class=\"p-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"/>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t\t<div class=\"p-price-con\">\r\n\t\t\t<span class=\"p-price\">${{price}}</span>\r\n\t\t</div>\r\n\t\t<div class=\"p-name-con\">\r\n\t\t\t<a class=\"p-name\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">{{name}}</a>\r\n\t\t</div>\r\n\t</li>\r\n\r\n{{/list}}\r\n{{^list}}\r\n\t<p class=\"err-tip\">cant find your items</p>\r\n{{/list}}\r\n\r\n";

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

	
	__webpack_require__(122);
	var _zm = __webpack_require__(14);
	var templatePagination  = __webpack_require__(124);

	var Pagination = function(){
	    var _this = this;
	    this.defaultOption = {
	        container       : null,
	        pageNum         : 1,
	        pageRange       : 3,
	        onSelectPage    : null
	    };
	    // 事件的处理
	    $(document).on('click', '.pg-item', function(){
	        var $this = $(this);
	        // 对于active和disabled按钮点击，不做处理
	        if($this.hasClass('active') || $this.hasClass('disabled')){
	            return;
	        }
	        typeof _this.option.onSelectPage === 'function' 
	            ? _this.option.onSelectPage($this.data('value')) : null;
	    });
	};
	// 渲染分页组件
	Pagination.prototype.render = function(userOption){
	    // 合并选项，先把default，放进去再把useroption放进去
	    this.option = $.extend({}, this.defaultOption, userOption);
	    // 判断容器是否为合法的jquery对象
	    if(!(this.option.container instanceof jQuery)){
	        return;
	    }
	    // 判断是否只有1页
	    if(this.option.pages <= 1){
	        return;
	    }
	    // 渲染分页内容
	    this.option.container.html(this.getPaginationHtml());
	};
	// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
	Pagination.prototype.getPaginationHtml = function(){
	    var html        = '',
	        option      = this.option,
	        pageArray   = [],
	        start       = option.pageNum - option.pageRange > 0 
	            ? option.pageNum - option.pageRange : 1,
	        end         = option.pageNum + option.pageRange < option.pages
	            ? option.pageNum + option.pageRange : option.pages;
	    // 上一页按钮的数据
	    pageArray.push({
	        name : 'previous',
	        value : this.option.prePage,
	        disabled : !this.option.hasPreviousPage
	    });
	    // 数字按钮的处理
	    for(var i = start; i <= end; i++){
	        pageArray.push({
	            name : i,
	            value : i,
	            active : (i === option.pageNum)
	        });
	    };
	    // 下一页按钮的数据
	    pageArray.push({
	        name : 'next',
	        value : this.option.nextPage,
	        disabled : !this.option.hasNextPage
	    });
	    html = _zm.renderHtml(templatePagination, {
	        pageArray   : pageArray,
	        pageNum     : option.pageNum,
	        pages       : option.pages
	    });
	    return html;
	};

	module.exports = Pagination;

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

	module.exports = "<div class=\"pg-content\">\r\n    {{#pageArray}}\r\n    {{#disabled}}\r\n        <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span>\r\n    {{/disabled}}\r\n    {{^disabled}}\r\n        {{#active}}\r\n            <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span>\r\n        {{/active}}\r\n        {{^active}}\r\n            <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span>\r\n        {{/active}}\r\n    {{/disabled}}\r\n    {{/pageArray}}\r\n    <span class=\"pg-total\">{{pageNum}} / {{pages}}</span>\r\n</div>";

/***/ })

});