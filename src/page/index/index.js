require('./index.css');
require('util/slider/index.js');
var _zm = require('util/zm.js');
var templateBanner =  require('./index.string')

$(function() {
	var bannerHtml = _zm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    $('.banner').unslider({
    	dots:true
    });
});