$(document).ready(function() {
	$("#subs_upload_submit").click(function(event) {
		$("#subs_upload_process").show()
	});
	$("input[name=subs_file]").change(function() {
		if (this.files[0].size > 4e5) {
			stop_upxload(1, "Слишком большой файл. Максимальный размер &mdash; 400 Кб");
			return
		}
		var src = window.URL.createObjectURL(this.files[0]);
		try { //чит
			$("input[name=subs_file]").val(src);
		} catch (err) {
			console.log("All is fine. Trust me.");
		}
	});
	$("input[name=local_video]").change(function() {
		var src = window.URL.createObjectURL(this.files[0]);
		$("input[name=video_src]").val(src)
	});
	$("input[name=video_src]").change(function() {
		video_attrs = {}
	});
	$("#submit-btn").click(function(event) {
		if ($("input[name=video_src]").val() !== "") {
			video_attrs.video_src = $("input[name=video_src]").val();
			video_attrs.subs_url = $("input[name=subs_file]").val();
		} else return

		event.preventDefault();

		if (flowplayer()) {
			flowplayer().unload();
			$(".myplayer").remove();
			$("#player_ui_wrapper").hide()
		}

		$("#form_wrapper").hide();
		$("#btnChangeVideo").css("display", "block");
		$("#player_widgets").slideDown();

		video_attrs.video_type = "mp4";
		
		$player_wrapper = $("#player_wrapper");
		$player_wrapper.html(generate_player_code(video_attrs.video_src, video_attrs.video_type, video_attrs.subs_url));
		$player_wrapper.slideDown();
		init_player_ui();

		$('.fp-ui').click(function(event) {
			var trueWhite = $('.container').hasClass('containerBecomeWhite');
			if (trueWhite === true) {
				$('.container').removeClass('containerBecomeWhite');
				$('.container').addClass('containerBecomeBlack');
				console.log('black');
			}
			if (trueWhite === false) {
				$('.container').removeClass('containerBecomeBlack');
				$('.container').addClass('containerBecomeWhite');
				console.log('white');;
			}
		});
		if ($player_wrapper.hasClass("flash")) {
			$(".myplayer").flowplayer({
				engine: "flash"
			})
		} else if ($player_wrapper.hasClass("native")) {
			$video = $("video");
			$video.attr("controls", true);
			$video.css("width", "100%");
			return
		} else { $(".myplayer").flowplayer({})}

		flowplayer.conf.subtitles_shift = 0;
	});
	$("#ui_translation_font input").trigger("change");
	$("#ui_subtitles_font input").trigger("change");
	$(".fp-fullscreen").click(function(event) {
		$(".fp-engine").css('max-height', '100%');
		$(".fp-engine").css('top', '-30px');
	});
	$("#clear_new_words").click(function(event) {
		event.preventDefault();
		new_words = {};
		$("#words_list").html("");
		print_new_words();
	});
	$("#btnChangeVideo").click(function(event) {
		$("#form_wrapper").slideDown();
	});
	$("#copy_words").click(function(event) {
		var res = "";
		$('#words_list').each(function(i, val) {
			res += $(val);
		});
		//last work
		prompt('Скопируйте слова ниже или Ctrl+C', res)
	});	
});

function generate_player_code(video_src,video_type, subs_url) {
	var res = '<div class="myplayer is-splash play-white">' + "\n";
	res += "<video>\n" + '<source src="' + video_src + '" type="video/' + video_type + '"/>' + "\n";
	res += '<track src="' + subs_url + '"/>' + "\n";
	res += "</video>";
	res += "</div><!--myplayer-->\n";
	res += '<div id="player_ui_wrapper">';
	res += '<div id="player_ui_border">';
	res += '<div class="player_ui" id="ui_subtitles_shift">';
	res += '<p>Смещение субтитров</p>';
	res += '<div class="input-prepend input-append">';
	res += '<a class="ui_less btn" href="#"><i class="icon-arrow-left"></i></a>';
	res += '<input type="text" class="input-mini text-center" size="6" value="0sec">';
	res += '<a class="ui_more btn" href="#"><i class="icon-arrow-right"></i></a>';
	res += '</div></div> <!-- player_ui_wrapper -->';
	res += '<div class="player_ui" id="ui_subtitles_font">';
	res += '<p>Размер шрифта субтитров</p>';
	res += '<div class="input-prepend input-append">';
	res += '<a class="ui_less btn" href="#"><i class="icon-minus"></i></a>';
	res += '<input type="text" class="input-mini text-center" size="4" value="100%">';
	res += '<a class="ui_more btn" href="#"><i class="icon-plus"></i></a>';
	res += '</div></div>';
	res += '<div class="player_ui" id="ui_subtitles_position"><p>Положение</p><div class="input-prepend input-append"><a class="ui_less btn" href="#"><i class="icon-arrow-down"></i></a><a class="ui_more btn" href="#"><i class="icon-arrow-up"></i></a></div></div>';
	res += '<div class="player_ui" id="ui_subtitles_opacity"><p>Прозрачность</p><div class="input-prepend input-append"><a class="ui_less btn" href="#"><i class="icon-minus"></i></a><a class="ui_more btn" href="#"><i class="icon-plus"></i></a></div></div>';
	res += '<div class="player_ui" id="ui_subtitles_presence"><p>Показывать субтитры</p><select><option value="always_subs" selected>Всегда</option><option value="paused_subs">При паузе</option><option value="no_subs">Без субтитров</option></select></div>';
	res += '<div></div>';
	res += '</div></div> <!-- player_ui_wrapper -->';

	return res
}

function init_player_ui() {
	$("#ui_subtitles_shift input").change(function() {
		val = parseFloat($(this).val());
		if (isNaN(val)) {
			val = 0
		}
		$(this).val(val + "sec");
		shift_subtitles(val)
	});
	$("#ui_subtitles_font input").change(function() {
		val = parseFloat($(this).val());
		if (!val) {
			return
		}
		$(this).val(val + "%");
		change_font_size_absolute(".fp-subtitle", val / 100)
	});
	$("#ui_subtitles_opacity a").click(function(e) {
		e.preventDefault();
		var step = .1;
		if ($(this).hasClass("ui_less")) step = -step;
		change_subs_opacity(step)
	});
	$("#ui_translation_font input").change(function() {
		val = parseFloat($(this).val());
		if (!val) {
			return
		}
		$(this).val(val + "%");
		change_font_size_absolute(".translation", val / 100)
	});
	$("#ui_subtitles_shift a").click(function(e) {
		e.preventDefault();
		var interval = 1;
		if ($(this).hasClass("ui_less")) {
			interval = -interval
		}
		var res = parseFloat($("#ui_subtitles_shift input").val());
		res += interval;
		$("#ui_subtitles_shift input").val(res.toString() + "sec");
		$("#ui_subtitles_shift input").trigger("change")
	});
	$("#ui_translation_font a, #ui_subtitles_font a").click(function(e) {
		e.preventDefault();
		var step = 10;
		var parent = $(this).parent();
		if ($(this).hasClass("ui_less")) {
			step = -step
		}
		var input = parent.find("input");
		var res = parseInt(input.val()) + step;
		input.val(res.toString() + "%");
		input.trigger("change")
	});
	$("#ui_subtitles_presence select").change(function(e) {
		var player_class = $(this).val();
		var $player = $(".flowplayer");
		$.each(["always_subs", "paused_subs", "no_subs"], function(i, c) {
			$player.removeClass(c)
		});
		$player.addClass(player_class);
		dump($player)
	});
	$("#ui_subtitles_position a").click(function(e) {
		e.preventDefault();
		var step = 5;
		if ($(this).hasClass("ui_less")) step = -step;
		change_subs_position(step)
	});

	//$("#player_ui_wrapper").slideDown(); настройки скрыты
	$("#player_ui_wrapper").hide()
}

//Subtitles
function resize_subtitle_wrap(factor) {
	var h = $(".fp-subtitle-wrap").height();
	var b = parseFloat($(".fp-subtitle").css("bottom"));
	$(".fp-subtitle-wrap").height(h * factor);
	$(".fp-subtitle").css("bottom", (b * factor).toString() + "px")
}

function shift_subtitles(time) { 
	var player_obj = flowplayer(".myplayer");
	var shift = time - flowplayer.conf.subtitles_shift;
	if (shift == 0) {
		return
	}

	function set_time(obj, prop, time) {
		obj[prop] += time
	}
	for (var i = 0; i < player_obj.cuepoints.length; i += 2) {
		set_time(player_obj.cuepoints[i], "time", shift);
		set_time(player_obj.cuepoints[i].subtitle, "startTime", shift);
		set_time(player_obj.cuepoints[i].subtitle, "endTime", shift);
		set_time(player_obj.cuepoints[i + 1], "time", shift)
	}
	flowplayer.conf.subtitles_shift += shift
};

function change_subs_opacity(step) {
	var obj = $(".fp-subtitle"),
		opacity = parseFloat($(".fp-subtitle").css("background-color").split(",")[3]);
	if (isNaN(opacity)) opacity = 1;
	var new_opacity = opacity + step;
	new_opacity = new_opacity < 0 ? 0 : new_opacity > 1 ? 1 : new_opacity;
	obj.css({
		"background-color": "rgba(0,0,0," + new_opacity.toString() + ")"
	})
}

function change_subs_position(step) {
	var obj = $(".fp-subtitle"), wrap_obj = $(".fp-subtitle-wrap");
	bottom = parseFloat(obj.css("bottom")), new_bottom = bottom + step, max_bottom = parseInt($(".myplayer").height() / 4);
	new_bottom = new_bottom < 0 ? 0 : new_bottom > max_bottom ? max_bottom : new_bottom;
	wrap_obj.height(new_bottom);
	obj.css("bottom", new_bottom + "px")
}

function hide_urban(){
	$(".urban-data").hide();
	$(".translation").css("max-width","15%");
	$(".yandex-data").show();
	//$(".translation").css("left","");
	$("#urban-data").hide();
};
		
function hide_yandex(){
	urban_translate(text);
	$(".yandex-data").hide();
	$(".translation").css("max-width","70%");
	$("#urban-data").show();
	$(".urban-data").show();
};