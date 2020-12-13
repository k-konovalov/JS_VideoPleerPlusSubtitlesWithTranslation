function get_translation(text, isWord) {
	$.each(["'s", "n't", "'m", "'re", "'ll", "'ve", "'d"], function(i, val) {
		text = text.replace(val, "")
	});
	$.each([",", ".", "!", "?", "...", ","], function(i, val) {
		text = text.replace(val, "")
	});
	
	console.log("After cleanings: " + text);
	if(!isWord){
		var words = text.split(" ");
		$.each(words, function(i, val) {
			google_translate(words[i], !isWord);
		});
	};
	google_translate(text);
}

function google_translate(text, isWord) {
	$.each([",", ".", "!", "?", "...", ","], function(i, val) {
		text = text.replace(val, "")
	});
	
	$.ajax({
		type: "GET",
		url: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyBcUTss9FFo1qMhTRxswhxwZyONolZwyF4&target=ru&q=' + text,
		success: function(data) {
			var res = data.data.translations[0].translatedText; //первый перевод
			process_google_reply(res, text, isWord);
			add_words_to_db(text, res);
		},
		error: function(errorThrown) {
			alert("Отсутствует интернет-соединение");
		}
	});
}

function testTranslation(){
	$.ajax({
		type: "GET",
		url: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyBcUTss9FFo1qMhTRxswhxwZyONolZwyF4&target=ru&q=' + "test",
		success: function(data) {
			var res = data.data.translations[0].translatedText; //первый перевод
			alert("test: " + res);
		},
		error: function(errorThrown) {
			alert("Отсутствует интернет-соединение");
		}
	});
}

function process_google_reply(data, text, isWord) {
	var engText = text;
	var res = "";

	if (data.length == 0) {
		res = '<p class="eng">' + text.replace(",", " ") + '</p><p class="notfound">Перевода слова не найдено</p>'
	};
	if (data.length > 0) {
		//res += '<a class="btn btn-small btn-success" id="yandex_btn" onclick="hide_urban();">Yandex</a>';
		// res += '<a class="btn btn-small btn-success" id="urban_btn" onclick="hide_yandex();">Urban</a>';
		//res += '<a href="#urban-data" class="btn btn-small btn-success" id="urban_btn" onclick="hide_yandex();">Urban</a>';
		res += '<div class="yandex-data">';
		res += '<p class="eng">' + engText + "</p>";
		res += '<p class="ru">' + data + "</p>";
		res += '</div>';
		res += '<div class="urban-data"></div>';
	};
	
	show_translation_google(res, data, engText, isWord);
}

function show_translation_google(text, data, engText, isWord) {
	var tr_obj = $(".translation");
	var sub_obj = $(".fp-subtitle");
	var sub_wrap = $(".fp-subtitle-wrap");
	var header = "";
	var old = $("#words_list").html();
	var left = ($(".myplayer").width() - tr_obj.outerWidth()) / 2;
	var res = old;
		res += '<div class="word_holder">';
		res += '<div class="word">';
		res += '<p>'
		res += engText;
		res += '</p>'
		res += '</div>';
		res += '<div class="translated">';
		res += '<p>'
		res += data;
		res += '</p>'
		res += '</div>';
		res += '</div>';

	$("#words_list").html(res);
	
	if(!isWord){
		tr_obj.css({
			// bottom: sub_obj.height() + parseFloat(sub_obj.css("bottom")),
			"max-height": ($(".myplayer").height() - sub_obj.outerHeight() - sub_wrap.height() - parseInt(sub_wrap.css("bottom")) - 2 * parseInt(tr_obj.css("padding-top")) - 2 * parseInt(tr_obj.css("border-top-width"))).toString() + "px",
			"bottom": $(".fp-subtitle").height() + 10,
			"left": left
		});
		tr_obj.html(header + text);
		tr_obj.show();
	}
}

function add_words_to_db(engText, ruText){
	var json = '{"translation":"' + ruText + '"}';
	$.ajax({
		type: "PUT",
		url: 'https://translateplayer-e1b8e.firebaseio.com/user/words/' + engText + '.json',
		contentType: 'application/json; charset=UTF-8',
		data: json,
		error: function(errorThrown) {
			alert("Ошибка при добавлении в БД");
		}
	});
}

//Urban translation

function urban_translate(text) {
	text = text.replace(" ", ",");
	$.each(["'s", "n't", "'m", "'re", "'ll", "'ve", "'d"], function(i, val) {
		text = text.replace(val, "")
	});
		$.ajax({
			type: "GET",
			dataType: "json",
			url: 'http://api.urbandictionary.com/v0/define?term=' + text,
			success: function(data) {
				process_urban_reply(data, text);
			},
		});
}

function process_urban_reply(data, text) {
	var sum = "";
	var tags_length = data.tags.length;
	var tags_data = data.tags;
	var list_data_length = data.list.length;

	if (data.tags.length == 0) {
		res = '<p class="eng">' + text.replace(",", " ") + '</p><p class="notfound">ѕеревода слова не найдено</p>'
	};

	for (var i = 0; i < tags_length; i++) {
		old_sum = sum;
		var tags = tags_data[i];
		sum = old_sum + tags + " ";
	}
	tags_title = '<p class="eng">' + "Words:" + "</p>";
	tags_res = '<div class="tags">'+ tags_title +'<p class="ru">' + sum + "</p>" + "</div>";
	sum = "";

	for (var i = 0; i < list_data_length; i++) {
		old_sum = sum;
		var definition = data.list[i].definition;
		sum = old_sum + '<p class="ru">' + definition + "</p>";
	}
	definition_title = '<p class="eng">' + "Definitions:" + "</p>";
	definition_res = '<div class="definition">' + definition_title + sum + "</div>";
	sum = "";

	for (var i = 0; i < list_data_length; i++) {
		var example = data.list[i].example;
		sum = old_sum + '<p class="ru">' + example + "</p>";
	}
	example_title = '<p class="eng">' + "Example:" + "</p>";
	example_res = '<div class="example">' + example_title + sum + "</div>";

	show_translation_urban (tags_res,definition_res,example_res);
}

function show_translation_urban (tags,example,definition){
	$("#urban-data").html(tags + example + definition);
}