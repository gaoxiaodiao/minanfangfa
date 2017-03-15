if(document.URL.substring(document.URL.length-1,document.URL.length)=="p"){
	
}else if(document.URL.substring(document.URL.length-1,document.URL.length)!=="l"){
location.href=document.URL.substring(document.URL.search('=')+1,document.URL.length)+".html";
}
ad();
function ad(){
	if(getCookies()==-1){
		setCookies("read","0","h12")
		document.write('为了我们能够更好的为您服务,您只需要再浏览5个页面,就能进入纯净模式。');
	}else if(getCookie()<5){
		setCookies("read",getCookie()+1,"h12")
		document.write('您已浏览'+getCookie()+'个页面,还需浏览再'+(5-getCookie())+"个页面,便能进入纯净模式");
	}else if(getCookie()==5){
		document.write('已进入纯净模式');
		setCookies("read",getCookie()+1,"h12")
	}else{
		setCookies("read",getCookie()+1,"h12")
	}
}
function getCookies(){
	var value = document.cookie.indexOf("read"+"=");
	return value
}

/*cookies*/
function getCookie(){
	var cookies=document.cookie;
	cookies2=cookies.substring(cookies.search('read='),cookies.length);
	cookies3=cookies2.substring(cookies2.search('=')+1,cookies2.length);
	return parseFloat(cookies3);
}

function setCookies(name,value,time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime()+strsec*1);
	document.cookie=name+"="+escape(value)+';expires='+exp.toGMTString();
}

function getsec(str){
	var str1=str.substring(1,str.length)*1;
	var str2 = str.substring(0,1);
	if(str2=="s"){
		return str1*1000;
	} else if(str2=="h"){
		return str1*60*60*1000;
	} else if(str2=="d"){
		return str1*24*60*60*1000;
	}
}



/*获取信息*/
function GetBackPage(){
	var url=document.URL;
	var this_page=parseFloat(url.substring(17,url.length-5));
	var Back_page=this_page-1;
	if ((this_page-1)==0){
		return "http://localhost";
	}else{
		return "http://localhost"/+Back_page+".html";
	}
}
function GetNextPage(){
	var url=document.URL;
	var this_page=parseFloat(url.substring(17,url.length-5));
	if ((this_page-1)==0){
		return "http://localhost";
	}else{
		return "http://localhost"/+(this_page + 1)+".html";
	}
}
/* 滚屏 */
var speed = 5;
var currentpos= 1;
var timer;
function setSpeed(MCspeed) {
	speed = parseInt(MCspeed);
	if (speed < 1 || speed > 10) {
		speed = 5;
		scrollspeed.value = 5;
	}
	writeCookie("MCspeed", MCspeed);
}
function stopScroll() {
	clearInterval(timer);
}

function beginScroll() {
	timer = setInterval("scrolling()", 200/speed);
}
function scrolling() {
	currentpos = document.documentElement.scrollTop;
	window.scroll(0, ++currentpos);
	if (currentpos != document.documentElement.scrollTop) clearInterval(timer);
}
function writeCookie(name, value) {
	var today = new Date();
	var expire = new Date();
	expire.setTime(today.getTime() + 3600000 * 24 * 365);
	document.cookie = name + '=' + escape(value) + ';path=/;expires=' + expire.toGMTString();
}
function readCookie(name) {
	var cookieValue = "";
	var search = name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}
function loadSet() {
	var tmpstr;
	tmpstr = readCookie("MCspeed");
	if (tmpstr != "") {
		speed = parseInt(tmpstr);
		SelectItemByValue("scrollspeed", tmpstr);
	}
}
function SelectItemByValue(objid, objItemText) {
	var objSelect = document.getElementById(objid);
	for (var i = 0; i < objSelect.options.length; i++) {
		if (objSelect.options[i].value == objItemText) {
			objSelect.options[i].selected = true;
			isExit = true;
			break;
		}
	}
}
loadSet();
document.onmousedown = stopScroll;
document.ondblclick = beginScroll;

/* 快捷翻页 */
document.onkeydown = function(evt){
	var e = window.event || evt; 
	if (e.keyCode == 37) location.href = back_page; 
	if (e.keyCode == 39) location.href = next_page; 
	if (e.keyCode == 13) location.href = "index.html";
}