var openNav = function (anchorname) {
	document.getElementById("myNav").style.width = "100%";
	$('#couponIMG').attr("src", "images/" +anchorname + "_1.PNG");
}
var closeNav = function () {
	document.getElementById("myNav").style.width = "0%";
}
$('.showFullScreenImageAnchor').click(function(){
	    //$("body").css("background-image","url('images/test.png')"); // Onclick of button the background image of body will be test here. Give the image path in url
	    openNav($(this).attr('name'));
	    console.log($(this).attr('name'));

});