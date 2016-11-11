$(function() {
	$('#Zplay').click(function() {
		Play();
	});

	function Play() {
		if(!$('.play').hasClass('bBtn') && $('.kong').hasClass('L')) {
			$('#Zplay').css({
				background: 'url(images/playing_current.png)no-repeat center center',
				backgroundSize: ' 0.58rem 0.5rem'
			});
			$('.play').addClass('bBtn').animate({
				bottom: '0.52rem'
			}, 500);
			$('.scrollX').animate({
				bottom: '0.50rem'
			}, 500);
		} else if($('.play').hasClass('bBtn') && $('.kong').hasClass('L')) {
			$('#Zplay').css({
				background: "url(images/playing.png)no-repeat center center",
				backgroundSize: ' 0.58rem 0.5rem'
			})
			$('.play').removeClass('bBtn').animate({
				bottom: '-0.98rem'
			}, 500);
			$('.scrollX').animate({
				bottom: '-1rem'
			}, 500);
		};
		if(!$('.kong').hasClass('k')) {
			$('.kong').addClass('k').animate({
				bottom: '0.50rem'
			}, 500);
		} else if($('.kong').hasClass('k')) {
			$('.kong').removeClass('k').animate({
				bottom: '0'
			}, 500);
		};
	};
	
	//input标签获得焦点事件
	$('#text').focus(function(){
		//console.log($('#submit'))
		$('#submit').animate({right:'0.50rem'},500,function(){
			$('.cancel_btn').css({display:'block'});
		});
		$('.box').slideDown('slow');
		
	});
	function oAnimate(){
		$('.cancel_btn').css({display:'none'});
		$('#submit').animate({right:'0.10rem'},500);
	}
	//失去焦点
	$('#text').blur(function(){
		//oAnimate();
	});
	//取消框点击事件
	$('.cancel_btn').click(function(){
		oAnimate();
		$('.box').slideUp('slow');
	});


function musicTypeList(type){
	$.ajax({
	url: 'http://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&pagesize=100&pagenum=1&g_tk=725399323&loginUin=382798577&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
	type: 'get',
	dataType: 'jsonp',
	jsonp:'jsonpCallback',
	success:function(data){
		$('#music_name ul').html("");
		var oEach = data.data.list;
		$.each(oEach,function(i,val){
			/*//y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000*/
			var Fsinger_name = val.Fsinger_name;
			var music_img = "//y.gtimg.cn/music/photo_new/T001R300x300M000"+val.Fsinger_mid +".jpg?max_age=2592000";
			//var music_Url = "";
			var a = $("<li><div class='music-img' Fsinger_mid='"+ val.Fsinger_mid+"'><img src='"+music_img +"' alt='' /></div><div class='title'>"+
						"<h4 Fsinger_mid='"+ val.Fsinger_mid+"'>"+ val.Fsinger_name +"</h4><p>"+ Muscitype +"</p><span>5622125关注</span></div><div class='love'></div></li>");
			$('#music_name ul').append(a);
		});
		add(music_name);
		//获得Fsinger_mid,Fsinger_name
		//图片封面  
		//   //y.gtimg.cn/music/photo_new/T001R150x150M0000【Fsinger_mid】.jpg?max_age=2592000
	},
	data:{
		key:type,
	},
});
};


var key = null,Muscitype=null;
$('.box ul li').click(function(){
	var index = $(this).index();
	key = $(this).attr('key');
	$('.music_List').css('display','none');
	$('#music_name').css('display','block');
	musicTypeList(key);
	Muscitype = $(this).text();
	oAnimate();
	$('.box').slideUp('slow');
	$('header .title').text(Muscitype);
	$('header .left').css('display','block');
});
$('#music_List ul li').click(function(){
	var index = $(this).index();
	key = $(this).attr('key');
	$('.music_List').css('display','none');
	$('#music_name').css('display','block');
	musicTypeList(key);
	Muscitype = $(this).text();
	$('header .title').text(Muscitype);
	$('header .left').css('display','block');
});


//iScroll
var
	oScroll = null,
	oScrollDown = null,
	oScrollUp = null,
	oScrollNav = null;
	function add(id) {
		setTimeout(function() {
			oScroll = new iScroll(id, {
				vScrollbar: false,
				hScrollbar: false,
				topOffset: 0,
				onScrollMove: function() {

				},
				onScrollEnd: function() {
					//console.log($(this)[0])
				},
				onRefresh: function() {

				},
			})
		}, 1000);
	};
add(music_List);


//点击歌手选择歌曲
$('#music_name ul').click(function(e){
	var ev = e || window.event;
	var a = ev.toElement || ev.target;
	if(a.nodeName === 'H4'){
		var MusicUserID = $(a).attr('fsinger_mid');
		var music = {
			MusicUserID : MusicUserID,
			Muscitype 	: Muscitype,
		}
		localStorage.setItem('MusicUserID',JSON.stringify(music));
		window.location.href='MuscicList.html';
	}
	//nodeclass,classname
});

$('.footerNav .index').click(function(){
	window.location.href = 'index.html';
});
});