$(function() {
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
	//nav选项卡
	$('#nav ul li').click(function() {
		var index = $(this).index();
		$('#nav ul li').removeClass('now').eq(index).addClass('now');
	});


	//随机key\
	var oKey = null;
		key();
	function key() {
		$.ajax({
			url: 'http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=6960527462&g_tk=1336552782&loginUin=382798577&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0',
			type: 'get',
			async: false,
			dataType: 'jsonp',
			jsonp: "jsonpCallback",
			success: function(data) {
				oKey = data.key;
				oKey = oKey;
			},
			data: {
				loginUin: "382798577", //登陆QQ号ID
			}
		});
	};


	//拿数据
	var music = JSON.parse(localStorage.getItem('MusicUserID'));

	var MusicUserID = music.MusicUserID;
	var Muscitype = music.Muscitype;
	var inde = null,a=null;
	$('section .music-title .pai').html('派别:' + Muscitype);
	
	$.ajax({
		url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=725399323&loginUin=382798577&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&order=listen&begin=0&num=30&songstatus=1',
		type: 'get',
		dataType: 'jsonp',
		jsonp: 'jsonpCallback',
		success: function(data) {
	
			var a = data.data.list;
			//console.log(oKey)
			var music_img = "//y.gtimg.cn/music/photo_new/T001R300x300M000" + data.data.singer_mid + ".jpg?max_age=2592000";
			var music_name = data.data.singer_name; //作者
			$('section .music-title h3').html(music_name);
			$('section .music-img img').attr('src', music_img);
			//获得songmid
			$.each(a, function(i, val) {
				var songImg ="http://y.gtimg.cn/music/photo_new/T002R300x300M000" + val.musicData.albummid + ".jpg?max_age=2592000"; //歌曲图片
				var songname = val.musicData.songname; //歌曲名字
				//console.log(albummid);
				setTimeout(function() {
					var songUrl = "http://cc.stream.qqmusic.qq.com/C200" + val.musicData.songmid + ".m4a?vkey=" + oKey + "&guid=6960527462&fromtag=30";; //歌曲URL					
					var a = $("<li><div class='music-img'><img src='" + songImg + "' alt='' /></div>" +
						"<div class='music-title'><p>" + songname + "</p><span>" + music_name + "</span></div><div class='musi-play'>" +
						"<img songUrl='" + songUrl + "' songname='" + songname + "' songImg='" + songImg + "' inde='" + i + "' src='images/play.png' alt='' /></div></li>");
					$('.music_lsit').append(a);
				}, 500)
				
			});
			add(content)
		},
		data: {
			singermid: MusicUserID,
		},

	});

	$('#content').click(function(ev) {
		var ev = ev || window.event;
		var a = ev.toElement || ev.target;
		if(a.nodeName === "IMG") {
			inde = parseInt($(a).attr('inde'));
			//console.log(inde)
			Audio(inde);
		};
	});
	
	//播放音乐的函数
	function Audio(inde) {
		$('#audio').attr('autoplay', false);
		$('.kong').addClass('L').css('display', 'none');
		if(!$('.play').hasClass('bBtn')) {
			Play();
		}
		var oImg = $('.music_lsit li').eq(inde).children('.musi-play').children('img');
		//console.log(oImg)
		var songurl = oImg.attr('songurl');
		var songImg = oImg.attr('songImg');
		var songname = oImg.attr('songname');

		$('#audio').attr('src', songurl);
		$('#audio').attr('autoplay', true);
		$('.music-play .Pause').addClass('Play');
		$('.play .music-img img').attr('src', songImg);
		$('.play .music-title p').html(songname);
		//setTimeout(function(){console.log($('#audio')[0].duration)},1000)
	};
	
	$('#audio')[0].ontimeupdate = function() {
		var a = this.currentTime; //当前时长
		var b = this.duration; //总时长
		//console.log(b,musicData)
		var c = a / b;
		//console.log(c);
		$('.scrollX .sc').css('width', c * 100 + "%");
		if($('#audio')[0].ended) {
			console.log("我播放完毕啦！！")
			if(inde > $('.music_lsit li').length) {
				inde = 0;
			}
			Audio(inde);
			++inde
		}
	};
	
	$('#audio')[0].addEventListener('loadedmetadata', function() {
		clearInterval(a);
		musicData = parseInt($('#audio')[0].duration - 0.5);
		Minute = parseInt(musicData / 60); //分钟
		second = parseInt(musicData % 60); //秒
		//console.log(musicData)
		pay();
		//console.log(musicData)
	}, false);
	
	function pay() {
		//console.log($('#audio').currentTime)
		a = setInterval(function() {
			second--
			if(second < 0) {
				second = 59;
				Minute--;
			};
			if(Minute < 0) {
				second = 0;
				Minute = 0;
			}
			if(second < 10) {
				second = "0" + second;
			} else {
				second = second;
			}
			//console.log(musicData,Minute,second);
			$('.play .music-title span').html("-0" + Minute + ":" + second);
		}, 1000)
	};
	
	//音乐暂停/播放设置
	$('.music-play .Pause').click(function() {
		var Pause = $('.music-play .Pause');

		if(Pause.hasClass('Play')) {
			console.log(Pause)
			$('#audio')[0].pause();
			$(this).removeClass('Play').css({
				background: "url(images/player.png) no-repeat -66px 0",
				backgroundSize: '1.1rem 0.3rem'
			});
		} else if(!Pause.hasClass('Play')) {
			$('#audio')[0].play();
			$(this).addClass('Play').css({
				background: "url(images/player.png) no-repeat -94px 0",
				backgroundSize: '1.1rem 0.3rem'
			});
		}
		return false;
	});

	//下一曲
	$('.down_music').click(function() {
		if(inde > $('.music_lsit li').length) {
			inde = 0;
		}
		Audio(++inde)
	});

	$('.footerNav .type').click(function(){
		window.location.href = 'ClassBro.html'
	});
	$('.footerNav .index').click(function(){
		window.location.href = 'index.html';
	});
})