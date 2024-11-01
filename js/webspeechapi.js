var flag_speech = 0;
var status = 1; //1:再生 2:停止
var tmp_content = '';
var beforeContent = document.querySelector("#content");

function wsapiwp_function() {
	window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
	var recognition = new webkitSpeechRecognition();
	recognition.lang = 'ja';
	recognition.interimResults = true;
	recognition.continuous = true;

	if (status != 1) {
		return false;
	}

	recognition.onsoundstart = function () {
		document.getElementById('status').innerHTML = "Recognizing...";
	};
	recognition.onnomatch = function () {
		document.getElementById('status').innerHTML = "Please try again.";
	};
	recognition.onerror = function () {
		document.getElementById('status').innerHTML = "Error.";
		if (flag_speech == 0)
			wsapiwp_function();
	};
	recognition.onsoundend = function () {
		document.getElementById('status').innerHTML = "Stopped.";
		wsapiwp_function();
	};
	recognition.onresult = function (event) {
		var results = event.results;

		for (var i = event.resultIndex; i < results.length; i++) {
			if (results[i].isFinal) {
				flag_speech = 0;

				var contentNode = document.querySelector("#content");
				var sentence = contentNode.value;
				beforeContent = sentence;
				var len = sentence.length;
				var pos = contentNode.selectionStart;

				var before = sentence.substr(0, pos);
				var insertedStr = results[i][0].transcript;
				var after = sentence.substr(pos, len);

				contentNode.value = before + insertedStr + after;

				wsapiwp_function();

			} else {
				document.getElementById('progress').innerHTML = results[i][0].transcript;
				flag_speech = 1;
			}
		}
	}
	document.getElementById('status').innerHTML = "Start";
	recognition.start();

	// 音声認識開始
	document.getElementById('speech_start').onclick = function () {
			recognition.start();
			status = 1;
			wsapiwp_function();
		}
		// 一時停止
	document.getElementById('speech_stop').onclick = function () {
		recognition.stop();
		status = 2;
		wsapiwp_function();
	}
}
