// Flowplayer config
var new_words = {};
var new_words_eng = [];
var new_words_ru = [];
var video_attrs = {
	id: "",
	video_src: "",
	subs_url: "",
	video_type: ""
};

flowplayer.conf = {
	embed: false,
	tooltip: false,
	base_fontsize: 18,
	subtitles_shift: 0,
	sub_opacity:.5,
	sub_position:0,
	volume: .5,
	elapsed_time_percent: .75,
	player_width: $(".myplayer").width()
};

flowplayer(
	function(api, root) {
		var add_movie_tries_count = 0, notify_success_start = 120;

		calculate_base_fontsize()
		change_font_size_absolute(".fp-subtitle", api.conf.base_fontsize / flowplayer.conf.base_fontsize);

		api.elapsed_time = {
			enabled: true,
			time: 0,
			start: 0
		};
		api.paused_by_mouseenter = false;
		api.bind(
			"fullscreen", function() {
				var factor = $(window).width() / flowplayer.conf.player_width;
				change_font_size_relative(".fp-subtitle", factor);
				change_font_size_relative(".translation", factor);
				resize_subtitle_wrap(factor)
			},"fullscreen-exit", function() {
				var factor = flowplayer.conf.player_width / $(window).width();
				change_font_size_relative(".fp-subtitle", factor);
				change_font_size_relative(".translation", factor);
				resize_subtitle_wrap(factor)
			},"resume", function() {
				$(".flowplayer").removeClass("play-white");
				$(".translation").hide();
				remove_words_class("selected");
				remove_words_class("pinned");
				remove_words_class("right-clicked");
				api.paused_by_mouseenter = false;
				api.elapsed_time.start = api.video.time
			},"pause", function() {
				update_elapsed_time_time(api.elapsed_time, api.video)
			},"beforeseek", function() {
				if (!api.paused) update_elapsed_time_time(api.elapsed_time, api.video)
			},"seek", function() {
				api.elapsed_time.start = api.video.time
			},"ready", function() {
				api.volume(flowplayer.conf.volume);
				if (typeof api.subtitles_src !== "undefined") {
					var timer = setInterval(function() {
						if (api.cuepoints.length > 0) {
							clearInterval(timer);
							$("#ui_subtitles_shift input").trigger("change")
						}
					}, 1e3)
				}
				if (api.video.duration < 3900) {
					api.elapsed_time.enabled = false;
					return
				}
			},"error", function(e, api, error) {
				notify("Player error: " + error.message + ". Elapsed_time " + api.elapsed_time.time);
				if (error.code > 4) return;
				var error_buttons = '<div id="error_buttons">' + '<a href="#" id="err-btn-restart" class="btn btn-large btn-success">Перезапустить</a>';
				error_buttons += '<a href="#" id="err-btn-close" class="btn btn-large btn-info">Закрыть</a>';
				if (error.code == 2) {
					if (window.location.href.indexOf("engine=flash") !== -1) {
						error_buttons += "<div>Вернуться в html5-плеер:</div>";
						error_buttons += '<a href="#" id="err-btn-html5" class="btn btn-info"><span>Открыть через html5-плеер</span></a>'
					} else {
						error_buttons += "<div>Если эта ошибка возникает очень часто и доставляет неудобства, попробуйте открыть это видео через flash-плеер:</div>";
						error_buttons += '<a href="#" id="err-btn-flash" class="btn btn-info"><span>Открыть через flash-плеер</span></a>'
					}
				} else if (error.code == 3) {
					error_buttons += "<div>В разделе &laquo;Помощь&raquo; описано решение для вашей проблемы :</div>";
					error_buttons += '<a href="page/help#problems" class="btn btn-info"><span>Известные проблемы и решения</span></a>'
				} else if (error.code == 4) {
					error_buttons += "<div><strong>Возможные причины появления этой ошибки:</strong></div>";
					error_buttons += "<ul><li>видеохостинг, с которого вы открыли видео, не поддерживается плеером</li><li>ссылка на видео устарела (в этом случае вам нужно заново открыть видео из каталога)</li>"
				}
				error_buttons += "</div>";
				$("#error_buttons").remove();
				$(".fp-message p").after(error_buttons);
				$("#err-btn-restart").click(function(e) {
					e.preventDefault();
					$("#submit-btn").trigger("click")
				});
				$("#err-btn-close").click(function(e) {
					e.preventDefault();
					api.fullscreen()
				});
				$("#err-btn-flash").click(function(e) {
					e.preventDefault();
					var url = window.location.href;
					url = url.replace(/\&engine=\w+/g, "");
					window.location.href = url + "&engine=flash"
				});
				$("#err-btn-html5").click(function(e) {
					e.preventDefault();
					var url = window.location.href;
					url = url.replace(/\&engine=\w+/g, "");
					window.location.href = url + "&engine=html5"
				})
		});

		//Actions with subtitles state
		$(".fp-subtitle").on("mouseenter", function(event) {
			if (!api.paused) {
				api.pause();
				api.paused_by_mouseenter = true
			}
		});
		$(".fp-subtitle-wrap").on("mouseleave", function(event) {
			var el = $(event.relatedTarget);
			if (api.paused && api.paused_by_mouseenter && !(el.hasClass("fp-controls") || el.hasClass("fp-progress") || el.hasClass("fp-buffer") || el.hasClass("fp-timeline") || el.is("a"))) {
				api.resume()
			}
		});
		$(".fp-subtitle").on("mouseup", function(event) {
			var text = $.trim(sel).replace(/[\r\n]/g, " ");
			var sel = document.getSelection().toString();

			if (event.which === 3 || !sel || !text) return;
			remove_words_class("right-clicked");

			add_new_words(text);
			get_translation(text);
		});
		$(".fp-subtitle").on("mousedown", function(event) {
			window.getSelection().removeAllRanges()
		});
		$(".fp-subtitle").on("click", "span", function(event) {
			sel = document.getSelection().toString();
			if (sel) return;
			text = $(this).text();

			add_new_words(text);
			get_translation(text);
			/*change*/
		});
		$(".fp-subtitle").on("contextmenu", "span", function(event) {
			var span = $(this);
			var text = "";

			event.stopPropagation();
			event.preventDefault();
			
			span.toggleClass("right-clicked");
			if (!span.hasClass("right-clicked")) return;
			
			$(".fp-subtitle .right-clicked").each(function() {
				text += $(this).text() + " "
			});

			add_new_words(text);
			get_translation(text);
		});
		$(".fp-subtitle").on("contextmenu", function(event) {
			event.stopPropagation()
		})
	}
);

//Flowplayer helper fun
function calculate_base_fontsize() {
	var fullscreen_fontsize = 42 / 1080 * screen.height;
	flowplayer.conf.base_fontsize = fullscreen_fontsize * ($(".myplayer").height() / screen.height)
}

function change_font_size_absolute(selector, factor) {
	var new_size = (parseFloat(flowplayer.conf.base_fontsize) * factor).toString() + "px";
	$(selector).css("font-size", new_size)
}

function change_font_size_relative(selector, factor) {
	var size = $(selector).css("font-size");
	var new_size = (parseFloat(size) * factor).toString() + "px";
	$(selector).css("font-size", new_size)
}

function remove_classes(classes) {
	for (var i = 0, len = classes.length; i < len; i++) {
		remove_words_class(classes[i])
	}
}

function remove_words_class(css_class) {
	$(".fp-subtitle ." + css_class).each(
		function() {
			$(this).removeClass(css_class)
		}
	)
}

function update_elapsed_time_time(elapsed_time, video) {
	if (!elapsed_time.enabled) return;

	var interval = video.time - elapsed_time.start;
	elapsed_time.time += interval > 0 ? interval : 0;

	if (elapsed_time.time / video.duration > flowplayer.conf.elapsed_time_percent) {
		if (video_attrs.id !== "") {
			notify("coming_to_the_end");
			elapsed_time.enabled = false
		} else {
			add_movie_to_lib(false, function(success) {
				if (success) elapsed_time.enabled = false
			});
			if (++add_movie_tries_count >= 2) elapsed_time.enabled = false
			}
		}
	if (notify_success_start && notify_success_start < elapsed_time.time) {
				notify("success_start", 4);
				notify_success_start = 0
	}
}