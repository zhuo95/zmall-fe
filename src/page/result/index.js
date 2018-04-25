require('./index.css');
var _zm = require('util/zm.js');
require('page/common/nav-simple/index.js');

$(function(){
	var type = _zm.getUrlParam('type') || 'default',
		$element = $('.'+type+'-success').show();
})