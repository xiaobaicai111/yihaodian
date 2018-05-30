
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
  			var oA = document.getElementById("ranklistcontent");
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
	  			oA.innerHTML = str3;
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
    
    
    //登录界面
	$(".helpmenu").mouseover(function(){
		$(".helpmenu").css({"border":"1px solid #999","height":"127px"});
		$(".helpmenu").mouseout(function(){
			$(".helpmenu").css({"border":"0","height":"25px"});
		})
	});
	
	
	
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
	$("#rgstname").focus(function(){
		$(".registername").css("border-color","red");
	})
	
})