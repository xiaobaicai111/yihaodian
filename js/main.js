$(function(){
	
	$("#imgli li").eq(0).show();
	$("#bannerul li").mouseover(function(){
	    $(this).addClass('cur').siblings().removeClass("cur");
	    var index = $(this).index();
	    i = index;
	    $("#imgli li").eq(index).show().siblings().hide();
	    $("#imgli li").eq(index).fadeIn(500).siblings().fadeOut(500);
	});
	
	var i=0;
	var timer=setInterval(play,2000);
	//向右切换
	var play=function(){
	    i++;
	    i = i > 2 ? 0 : i ;
	    $("#bannerul li").eq(i).addClass("cur").siblings().removeClass("cur");
	    $("#imgli li").eq(i).fadeIn(500).siblings().fadeOut(500);
	}

	var playLeft=function(){
        i--;
        i = i < 0 ? 2 : i ;
        $("#bannerul li").eq(i).addClass("cur").siblings().removeClass("cur");
        $("#imgli li").eq(i).fadeIn(500).siblings().fadeOut(500);
    }
	
	//鼠标移入移出效果
    $(".bannermove").hover(function() {
        clearInterval(timer);
    }, function() {
        timer=setInterval(play,2000);
    });
    //左右点击切换
    $("#move_left").click(function(){
        playLeft();
    })
    $("#move_right").click(function(){
        play();
    })
    
    //抢购
	$.get("http://h6.duchengjiu.top/shop/api_goods.php",function(data){
//			console.log(data);
  			var remen = data.data;
  			var str1 = "";
  			for(var i = 0;i < 9;i++){
  				str1 += `<li>
							<span></span>
							<div class="pro_detail">
								<p class="pro_name">${remen[i].goods_name}</p>
								<p class="pro_price">￥${remen[i].price}</p>
								<p class="pro_cankao">参考价：￥${remen[i].price}</p>
							</div>
							<img src="${remen[i].goods_thumb}"/>
						</li>`
  			}
  			$("#qianggouul").append(str1);
  		})
    	//抢购
    	var curIndex = 0;
    	$("#right_slide").click(function(){
    		curIndex++;
        	changeTo(curIndex);
    		if(curIndex >= 3){
    			$("#qianggouul").stop();
    		}
    	});
    	$("#left_slide").click(function(){
    		curIndex--;
    		changeTo(curIndex);
    		if(curIndex <= 0){
    			$("#qianggouul").stop();
    		}
    	});
    	function changeTo(num){ 
	        var goLeft = num * 1023;
	        $("#qianggouul").animate({
	        	left: "-" + goLeft + "px"
	        },300);
	    }
    	
    	//闪购排行榜
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
//		console.log(data);
  		var a = data.data;
//		console.log(a);
  		var str2 = "";
  		str2 = `<li>
				<a href="#" style="color:#ff4040;border-bottom:1px solid #ff4040;">${a[0].cat_name}</a>
				<ul id="ranklistcontent">
				
				</ul>
			</li>
			<li>
				<a href="#">${a[1].cat_name}</a>
			</li>
			<li>
				<a href="#">${a[2].cat_name}</a>
			</li>
			<li>
				<a href="#">${a[3].cat_name}</a>
			</li>
			<li>
				<a href="#">${a[4].cat_name}</a>
			</li>`
  			
  			$("#ranklist").append(str2);
  			$.get("http://h6.duchengjiu.top/shop/api_goods.php",function(ab){
//				console.log(ab);
	  			var b = ab.data;
//	  			console.log(b);
	  			var str3 = "";
	  			for(var i = 0;i < 6;i++){
	  				str3 += `<li><a href="#">
	  				<img src="${b[i].goods_thumb}"/>
						<span>${b[i].goods_name}
						</span>
						</a>
						</li>`
	  			}
	  			$("#ranklistcontent").html("").append(str3);
  			})
  	})
    	
    //商品列表页
    var pagenumber = 1;
	
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
		for(var i = 0;i < 10;i++){
			
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"],page:pagenumber},function(abc){
	  			var p = abc.data;
//	  			console.log(p);
	  			var str4 = "";
	  			for(var i = 0;i < p.length;i++){
	  				str4 += `<div class="shoplist">
							<a  href="detail.html?good_id=${p[i].goods_id}">
								<dl>
									<dt>
										<img src="${p[i].goods_thumb}"/>
									</dt>
									<dd>${p[i].goods_name}</dd>
									<dd style="color: red;">￥${p[i].price}</dd>
								</dl>
								<span>立即购买</span>
							</a>
						</div>`
	  			}
	  			$("#jingxuancontent").append(str4);
			})
		}
	})
	
	$("#down").click(function(){
		pagenumber++;
		if(pagenumber > 10){
			pagenumber = 10;
		}else{
		$("#pagenum b").html(pagenumber);
		$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
//			console.log(pagenumber);
			for(var i = 0;i < 10;i++){
			
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"],page:pagenumber},function(abc){
	  			var p = abc.data;
//	  			console.log(p);
	  			var str4 = "";
	  			for(var i = 0;i < p.length;i++){
	  				str4 += `<div class="shoplist">
							<a href="detail.html">
								<dl>
									<dt>
										<img src="${p[i].goods_thumb}"/>
									</dt>
									<dd>${p[i].goods_name}</dd>
									<dd style="color: red;">￥${p[i].price}</dd>
								</dl>
								<span>立即购买</span>
							</a>
						</div>`
	  			}
	  			$("#jingxuancontent").html("").append(str4);
			})
			}
		})
		}
	})
	
	$("#up").click(function(){
		pagenumber--;
		
		if(pagenumber < 1){
			pagenumber = 1;
		}else{
		$("#pagenum b").html(pagenumber);
		$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(a){
			console.log(pagenumber)
			for(var i = 0;i < 10;i++){
			
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:a.data[i]["cat_id"],page:pagenumber},function(abc){
	  			var p = abc.data;
//	  			console.log(p);
	  			var str4 = "";
	  			for(var i = 0;i < p.length;i++){
	  				str4 += `<div class="shoplist">
							<a href="detail.html">
								<dl>
									<dt>
										<img src="${p[i].goods_thumb}"/>
									</dt>
									<dd>${p[i].goods_name}</dd>
									<dd style="color: red;">￥${p[i].price}</dd>
								</dl>
								<span>立即购买</span>
							</a>
						</div>`
	  			}
	  			$("#jingxuancontent").html("").append(str4);
			})
			
			}
		
		
		})
		}
	})
	
    $.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
//			console.log(data.data);
  				$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:92},function(b){
//					console.log(b);
  					var str = "";
  					for(var j = 0;j < 4;j++){
  						str += `<li>
								<a href="#">
									<h4>
									${b.data[j].goods_name}
									</h4>
									<span>￥
									${b.data[j].price}
									</span>
									<img src="${b.data[j].goods_thumb}"/>
								</a>
							</li>`
  					}
  					$("#morelingshi").html("").append(str);
  				})
  				
  				$.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:92,page:2},function(c){
//					console.log(c);
  					var str1 = "";
  					for(var m = 0;m < 3;m++){
  						str1 += `<li>
								<a href="#">
									<h4>
									${c.data[m].goods_name}
									</h4>
									<span>￥
									${c.data[m].price}
									</span>
									<img src="${c.data[m].goods_thumb}"/>
								</a>
							</li>`
  					}
  					$("#lingshibox").html("").append(str1);
  				})
  			
  		})
    
    //商品详情页
    var detailshop = "";
    var shop_id = location.href;
    shop_id = shop_id.split("=");
//  console.log(shop_id);
    $.get("http://h6.duchengjiu.top/shop/api_goods.php",{goods_id:shop_id[1]},function(p){
//  	console.log(p);
    	$("#addbtn").click(function(){
	    	setCookie(shop_id[1],detailshopnum,7);
	    	location.href = "shopcart.html";
	    })
    	detailshop = `<div class="detailimg">
					<div class="probox">
				        <img src="${p.data[0].goods_thumb}" alt="">
				        <div class="hoverbox"></div>
				    </div>
				    <div class="showbox">
				        <img src="${p.data[0].goods_thumb}" alt="">
				    </div>
				</div>
				<div class="addshop">
					<div class="addshoptit">
						<h3><span>自营</span>${p.data[0].goods_name}</h3>
						<span class="gouwujie"><img src="img/addshopimg.png"/></span>
						<p><span>价格</span>￥${p.data[0].price}</p>
						<span class="youhuiquan"><a href="#">领取优惠券</a></span>
					</div>
				</div>`
    	$("#detailcontent").html("").append(detailshop);
    	
    })
    var detailshopnum = Number($("#addshopnum").val());
    $("#addnum").click(function(){
    	var oAdd = document.getElementById("addshopnum");    
    	detailshopnum = detailshopnum + 1;
    	oAdd.value = detailshopnum;
//  	console.log(detailshopnum);
    	if(detailshopnum == 99){
    		$("#addnum").attr({"disabled":"disabled"});
    		$("#addnum").css("background","#CCCCCC");
    	}
    });
    $("#reduce").click(function(){
    	var oAdd = document.getElementById("addshopnum");    
    	detailshopnum = detailshopnum - 1;
    	oAdd.value = detailshopnum;
//  	console.log(detailshopnum);
    	if(detailshopnum <= 0){
    		detailshopnum = 1;
    	}else{
    		$("#reduce").removeAttr("disabled");
    	}
    });
//  $("#addbtn").click(function(){
//  	setCookie("shopNum",detailshopnum,7);
//  	location.href = "shopcart.html?good_id=${p[i].goods_id}";
//  })
//	console.log(document.cookie);
	var shopcookie = document.cookie;
	shopcookie = shopcookie.split(";");
//	console.log(shopcookie);
	var cookiename = [];
	var cookievalue = [];
	var money = 0;
	var jianshu = 0;
	var gwc = "";
	for(let w = 0;w < shopcookie.length;w++){
		cookiename.push(shopcookie[w].split("=")[0]);
		cookievalue.push(shopcookie[w].split("=")[1]);
		if(Boolean(Number(cookiename[w]))){
//			console.log(cookiename[w],cookievalue[w]);
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{goods_id:cookiename[w]},function(cz){
//				console.log(cz.data[0]);
				//购物车
				var xiaoji = (cz.data[0].price)*cookievalue[w];
				console.log(xiaoji);
				gwc += `<div class="shopbox">
				<div class="selectbox">
					<input type="checkbox" name="selectshop" id="selectshop" value="" checked="checked"/>
				</div>
				<div class="shopitem">
					<img src="${cz.data[0].goods_thumb}"/>
					<p>${cz.data[0].goods_name}</p>
				</div>
				<div class="shopnnumact">
					<span class="jianshao">-</span>
					<input type="text" name="shopnumactive" class="shopnumactive" value="${cookievalue[w]}" />
					<span class="zengjia">+</span>
				</div>
				<span class="shoppricenum">￥${xiaoji}</span>
				<span class="delectbtn">×</span>
				</div>`
				$("#shopwrap").html("").append(gwc);
				money += xiaoji;
				$("#paynum").html(money);
				jianshu += Number(cookievalue[w]);
				$("#shopselectnum").html(jianshu);
				var shopjianshu = $(".shopnumactive").val();
				$(".zengjia").click(function(){
					shopjianshu = shopjianshu + 1;
    				shopjianshu.value = shopjianshu;
				})
			});
		}
	}
//	console.log(cookiename,cookievalue);
	
	
	
	
	
	//详情页放大镜
function Zoom(detailimg, hoverbox, l, t, x, y, h_w, h_h, showbox) {
    var moveX = x - l - (h_w / 2);
    //鼠标区域距离
    var moveY = y - t - (h_h / 2);
    //鼠标区域距离
    if (moveX < 0) {
        moveX = 0
    }
    if (moveY < 0) {
        moveY = 0
    }
    if (moveX > detailimg.width() - h_w) {
        moveX = detailimg.width() - h_w
    }
    if (moveY > detailimg.height() - h_h) {
        moveY = detailimg.height() - h_h
    }
    //判断鼠标使其不跑出图片框
    var zoomX = showbox.width() / detailimg.width()
    //求图片比例
    var zoomY = showbox.height() / detailimg.height()

    showbox.css({
        left: -(moveX * zoomX),
        top: -(moveY * zoomY)
    })
    hoverbox.css({
        left: moveX,
        top: moveY
    })
    //确定位置

}
var detailimg = $(".detailimg");
function Zoomhover(detailimg, hoverbox, showbox) {
    var l = detailimg.offset().left;
    var t = detailimg.offset().top;
    var w = hoverbox.width();
    var h = hoverbox.height();
    var time;
    $(".probox img,.hoverbox").mouseover(function(e) {
        var x = e.pageX;
        var y = e.pageY;
        $(".hoverbox,.showbox").show();
        hoverbox.css("opacity", "0.3")
        time = setTimeout(function() {
            Zoom(detailimg, hoverbox, l, t, x, y, w, h, showbox)
        }, 1)
    }).mousemove(function(e) {
        var x = e.pageX;
        var y = e.pageY;
        time = setTimeout(function() {
            Zoom(detailimg, hoverbox, l, t, x, y, w, h, showbox)
        }, 1)
    }).mouseout(function() {
        showbox.parent().hide()
        hoverbox.hide();
    })
}
	$(function() {
	    Zoomhover($(".probox img"), $(".hoverbox"), $(".showbox img"));
	})
	
	//注册
	var oRgname = document.getElementById("rgstname");
	var oRgphone = document.getElementById("rgstphone");
	var oRgpsw = document.getElementById("rgstpsw");
	var oRepeatpsw = document.getElementById("repeatpsw");
	var oRgbtn = document.getElementById("registerbtn");
	
	$("#rgstname").keyup(function(){
		if(oRgname.value == ""){
			$(".registername .tips").css("display","block");
			$("#registerbtn").attr({"disabled":"disabled"});
		}
		var reg = /^[a-zA-Z0-9_-]{3,20}$/;
		if(!reg.test(oRgname.value)){
			$(".registername .tips").css("display","block");
			$("#registerbtn").attr({"disabled":"disabled"});
		}else{
			$(".registername .tips").css("display","none");
			$(".registername .danger").css("display","none");
			$("#registerbtn").removeAttr("disabled");
		}
	});
	
	$("#rgstphone").keyup(function(){
		if(oRgphone.value == ""){
			$(".registerphone .tips").css("display","block");
		}
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if(!reg.test(oRgphone.value)){
			$(".registerphone .tips").css("display","block");
		}else{
			$(".registerphone .tips").css("display","none");
			$(".registerphone .danger").css("display","none");
		}
	});
	
	$("#rgstpsw").keyup(function(){
		if(oRgphone.value == ""){
			$(".registerpsw .tips").css("display","block");
			$("#registerbtn").attr({"disabled":"disabled"});
		}
		var reg = /^[a-zA-Z0-9_-]{6,20}$/;
		if(!reg.test(oRgpsw.value)){
			$(".registerpsw .tips").css("display","block");
			$("#registerbtn").attr({"disabled":"disabled"});
		}else{
			$(".registerpsw .tips").css("display","none");
			$(".registerpsw .danger").css("display","none");
			$("#registerbtn").removeAttr("disabled");
		}
	});
	
	$("#repeatpsw").keyup(function(){
		if(oRepeatpsw.value == oRgpsw.value){
			$(".repeatpassword .danger").css("display","none");
			$(".repeatpassword .tips").css("display","none");
		}else{
			$(".repeatpassword .tips").css("display","block");
		}
	});
	
	
	$("#rgstname").focus(function(){
		$(".registername").css("border-color","red");
		$(".registername .tips").css("display","block");
		$(".labelname").animate({left:"-70px"},500);
	})
	$("#rgstname").blur(function(){
		$(".registername").css("border-color","#999999");
		$(".registername .tips").css("display","none");
		if(oRgname.value == ""){
			$(".registername .danger").css("display","block");
		}
		var reg = /^[a-zA-Z0-9_-]{3,20}$/;
		if(!reg.test(oRgname.value)){
			$(".registername .tips").css("display","block");
		}else{
			$(".registername .tips").css("display","none");
			$(".registername .danger").css("display","none");
		}
	})
	
	$("#rgstphone").focus(function(){
		$(".registerphone").css("border-color","red");
		$(".registerphone .tips").css("display","block");
		$(".labelphone").animate({left:"-70px"},500);
	})
	$("#rgstphone").blur(function(){
		$(".registerphone").css("border-color","#999999");
		$(".registerphone .tips").css("display","none");
		if(oRgphone.value == ""){
			$(".registerphone .danger").css("display","block");
		}else{
			$(".registerphone .danger").css("display","none");
		}
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if(!reg.test(oRgphone.value)){
			$(".registerphone .tips").css("display","block");
		}else{
			$(".registerphone .tips").css("display","none");
			$(".registerphone .danger").css("display","none");
		}
	})
	
	$("#rgstpsw").focus(function(){
		$(".registerpsw").css("border-color","red");
		$(".registerpsw .tips").css("display","block");
		$(".labelpsw").animate({left:"-80px"},500);
		$("#rgstpsw").animate({left:"-15px"},100);
	})
	$("#rgstpsw").blur(function(){
		$(".registerpsw").css("border-color","#999999");
		$(".registerpsw .tips").css("display","none");
		if(oRgpsw.value == ""){
			$(".registerpsw .danger").css("display","block");
		}else{
			$(".registerpsw .danger").css("display","none");
		}
	})
	
	$("#repeatpsw").focus(function(){
		$(".repeatpassword").css("border-color","red");
		$(".repeatpassword .tips").css("display","block");
		$(".labelrep").animate({left:"-80px"},500);
		$("#repeatpsw").animate({left:"-15px"},100);
	})
	$("#repeatpsw").blur(function(){
		$(".repeatpassword").css("border-color","#999999");
		$(".repeatpassword .tips").css("display","none");
	})
	
	$("#registerbtn").click(function(){
//		console.log("aa");
		var zcname = oRgname.value;
		var zcpassword = oRgpsw.value;
		console.log(zcname,zcpassword);
		$.post("http://h6.duchengjiu.top/shop/api_user.php",{status:"register",username:zcname,password:zcpassword},function(r){
//			console.log(r);
			alert(r.message);
			if(r.code == 0){
				location.href = "login.html";
			}
		})
	})
	
//登录界面
	
	$(".helpmenu").mouseover(function(){
		$(".helpmenu").css({"border":"1px solid #999","height":"127px"});
		$(".helpmenu").mouseout(function(){
			$(".helpmenu").css({"border":"0","height":"25px"});
		})
	});

	$("#loginbtn").click(function(){
		var oName = $("#yonghuming").val();
		var oPassword = $("#pasw").val();
		
		$.post("http://h6.duchengjiu.top/shop/api_user.php",{status:"login",username:oName,password:oPassword},function(l){
			console.log(l);
			setCookie("username",oName,7);
			setCookie("password",oPassword,7);
			
			if(l.code == 0){
				location.href = "index.html";
			}
			
		});
	});
	
	
	
})
	
//主页登录
if(getCookie("username")){
	$("#dl").html("Hi~!"+getCookie("username"));
	$("#nihao").html("欢迎回来！"+getCookie("username"));
	$("#per_dl").remove();
	$("#per_zc").remove();
	$("#zc").html("退出").click(function(){
		removeCookie("username");
		removeCookie("password");
	}).prop("href","login.html");
}
	
	
//Cookie
function setCookie(name, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + value + ";expires=" + oDate + ";path=/";
}

function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] === name) {
			return newArr[1];
		}
	}
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}



