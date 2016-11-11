$(function() {
	var second, Minute, musicData, a, bBtn;
	var
		oNavList = $('nav ul li'),
		oNavLista = $('nav ul a');
	//console.log(oNavLista)
	oNavList.click(function() {
		var index = $(this).index();
		//console.log(index)
		if(index == 0) {
			oNavLista.removeClass('bor1');
			oNavList.eq(index).children('a').addClass('bor');
		} else if(index == 1) {
			oNavLista.removeClass('bor');
			oNavList.eq(index).children('a').addClass('bor1');
		}
	});

	var oKey = null,
		osip = null,
		othirdip = null,
		inde = null;

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
				//console.log(oKey)
			},
			data: {
				loginUin: "382798577", //登陆QQ号ID
			}
		});
	};

	//获得系统时间
	var MyDate = new Date();
	var oFullYear = MyDate.getFullYear(); //年份
	var oMonth = MyDate.getMonth() + 1; //月份
	var oDate = MyDate.getDate() - 1; //日
	if(oDate < 10) {
		oDate = "0" + oDate;
	}
	var iDate = oFullYear + "-" + oMonth + "-" + oDate;
		//iDate = '2016-11-05';

	function music() {
		$.ajax({
			url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
			type: 'get',
			async: false,
			dataType: 'jsonp',
			jsonp: 'jsonpCallback',
			data: {
				date: iDate
			},
			success: function(data) {
				$('#section .music_lsit').html('');
				console.log(data)
				$('#song_wrapper .music_lsit').css('height', 0.65 * (data.songlist.length) + "rem");
				$.each(data.songlist, function(i, val) {
					key();
					i = i + 1;
					if(i < 10) {
						i = "0" + i;
					};
					var songUrl;
					var songImg = "http://y.gtimg.cn/music/photo_new/T002R300x300M000" + val.data.albummid + ".jpg?max_age=2592000"; //歌曲图片;
					var musicuser = val.data.singer[0].name;
					//console.log(musicuser)
					var songname = val.data.songname; //歌曲名称
					setTimeout(function() {
						songUrl = "http://cc.stream.qqmusic.qq.com/C200" + val.data.songmid + ".m4a?vkey=" + oKey + "&guid=6960527462&fromtag=30";
						//console.log(songImg,songname,songUrl,musicuser)
						var a = $("<li><div class='music-img'><img src='" + songImg + "' alt='' /><div class='mask'>" + i + "</div></div>" +
							"<div class='music-title'><p>" + songname + "</p><span>" + musicuser + "</span></div><div class='musi-play'>" +
							"<img songUrl='" + songUrl + "' songname='" + songname + "' songImg='" + songImg + "' inde='" + i + "' src='images/play.png' alt='' /></div></li>");
						$('.music_lsit').append(a);
					}, 200);

				});
				add();
			},
		});
	};
	music();

	function music_rm() {
		$.ajax({
			url: 'http://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=1284743233&loginUin=382798577&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
			type: 'get',
			async: false,
			dataType: 'jsonp',
			jsonp: 'jsonpCallback',
			data: {
				date: '2016-11-06'
			},
			success: function(data) {
				$('#section .music_rm').html('');
				//console.log(data)
				$('#song_wrapper .music_rm').css('height', 0.65 * (data.data.list.length) + "rem");
				$.each(data.data.list, function(i, val) {
					var songImg = "http://y.gtimg.cn/music/photo_new/T001R150x150M000" + val.Fsinger_mid + ".jpg?max_age=2592000"; //音乐人头像;
					var musicuser = val.Fsinger_name; //音乐人
					//console.log(musicuser,songImg);

					var a = $("<li><div class='music-img'><img src='" + songImg + "' alt='' /></div><div class='music-title'>" +
						"<p oId = '" + val.Fsinger_mid + "'>" + musicuser + "</p><span>别名：" + val.Fother_name + "</span><i>4651人关注</i></div><div class='music-right'>" +
						"<img src='images/like_s.png' alt='' /></div></li>");
					$('#section .music_rm').append(a);
				});
				add();
			},
		});
	};

	$('.music-r').click(function() {
		$('#song_wrapper .music_lsit').css('display', 'none');
		$('#song_wrapper .music_rm').css('display', 'block');
		music_rm();
	});
	$('.music-q').click(function() {
		$('#song_wrapper .music_lsit').css('display', 'block');
		$('#song_wrapper .music_rm').css('display', 'none');
		music();
	});

	$('.music_rm ').click(function(e) {
		var e = e || window.event;
		var ev = e.toElement || e.target;
		var oClassType = ev.nodeName;
		if(oClassType === 'P') {
			var a = $(ev).attr('oid');
			var list = {
				"MusicUserID": a,
				"Muscitype": "华语男",
			};
			localStorage.setItem('MusicUserID', JSON.stringify(list));
			setTimeout(function(){
				window.location.href = 'MuscicList.html';
			},200);
		};
	});

	var
		oScroll = null,
		oScrollDown = null,
		oScrollUp = null,
		oScrollNav = null;

	function add() {
		setTimeout(function() {
			oScroll = new iScroll('section', {
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

	$('#Zplay').click(function() {
		Play();
	});

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

	$('.music_lsit').click(function(ev) {
		var ev = ev || window.event;
		var a = ev.toElement || ev.target;
		if(a.nodeName === "IMG") {
			inde = parseInt($(a).attr('inde')) - 1;
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

	$('.footerNav .type').click(function() {
		window.location.href = 'ClassBro.html'
	});
});