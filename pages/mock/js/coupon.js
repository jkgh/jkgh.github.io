var couponNameGlobal;
var openNav = function () {
	document.getElementById("myNav").style.width = "100%";
	$('#couponIMG').attr("src", "images/" + couponNameGlobal + "_1.PNG");
}
var closeNav = function () {
	document.getElementById("myNav").style.width = "0%";
}
var nextNav = function(el){
	console.log($(el).parent().find("img").attr("src"));
	var currentImgSrc = $(el).parent().find("img").attr("src"); //images/big_mac_1.PNG
	var tempCurrImgSrc = currentImgSrc;
	tempCurrImgSrc = tempCurrImgSrc.replace("images/"+couponNameGlobal,'');
	tempCurrImgSrc = tempCurrImgSrc.replace("_", "");
	tempCurrImgSrc = tempCurrImgSrc.replace(".PNG", "");
	console.log("tempCurrImgSrc: "+ tempCurrImgSrc);
	if (tempCurrImgSrc == "1"){
		$(el).parent().find("img").attr("src", "images/" + couponNameGlobal + "_2.PNG");
	}else if (tempCurrImgSrc == "2"){
		$(el).parent().find("img").attr("src", "images/" + couponNameGlobal + "_3.PNG");
	}else if (tempCurrImgSrc == "3"){
		//$(el).parent().find("img").attr("src", "images/" + couponNameGlobal + "_3.PNG");
		//hide maybe?
	}
};

var prevNav = function (el){
	console.log($(el).parent().find("img").attr("src"));
	var currentImgSrc = $(el).parent().find("img").attr("src"); //images/big_mac_1.PNG
	var tempCurrImgSrc = currentImgSrc;
	tempCurrImgSrc = tempCurrImgSrc.replace("images/"+couponNameGlobal,'');
	tempCurrImgSrc = tempCurrImgSrc.replace("_", "");
	tempCurrImgSrc = tempCurrImgSrc.replace(".PNG", "");
	console.log("tempCurrImgSrc: "+ tempCurrImgSrc);
	if (tempCurrImgSrc == "1"){
		//$(el).parent().find("img").attr("src", "images/" + couponNameGlobal + "_1.PNG");
		//hide maybe?
	}else if (tempCurrImgSrc == "2"){
		$(el).parent().find("img").attr("src", "images/" + couponNameGlobal + "_1.PNG");
	}else if (tempCurrImgSrc == "3"){
		$(el).parent().find("img").attr("src", "images/" + couponNameGlobal + "_2.PNG");
	}
};
$('.showFullScreenImageAnchor').click(function(){
	    //$("body").css("background-image","url('images/test.png')"); // Onclick of button the background image of body will be test here. Give the image path in url
	    couponNameGlobal = $(this).attr('name');
	    openNav();
	    console.log($(this).attr('name'));

});