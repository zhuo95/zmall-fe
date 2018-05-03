var _zm = require('util/zm.js');

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