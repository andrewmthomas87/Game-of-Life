
var $error, $divs;

var error = false, divs = [];

$(document).ready(function() {
	$error = $('div#error');
	setTimeout(function() {
		$('form').fadeIn('slow');
	}, 1000);
	$('form').submit(function(event) {
		event.preventDefault();
		var width = parseInt($(this).find('input:first-child').val(), 10);
		var height = parseInt($(this).find('input:nth-child(2)').val(), 10);
		if (!width || !height) {
			showError('Invalid values');
		}
		if (width > 500 || width < 25 || height > 500 || height < 25) {
			showError('Values must be between 25 and 500');
		}
		var divs = '';
		for (i = 0; i < width; i++) {
			divs[i] = [];
			for (j = 0; j < height; j++) {
				divs[i][j] = false;
				divs += '<div id=\'' + i + '-' + j + '\'></div>';
			}
		}
		$('section').append(divs);
		$divs = $('section div');
		resize();
	});
});

function resize() {
	var ratio = divs.width / divs.height;
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowRatio = windowWidth / windowHeight;
	console.log('Ratio: ' + ratio);
	console.log('Window Ratio: ' + windowRatio);
}

function showError(text) {
	if (!error) {
		error = true;
		$error.html(text);
		$error.fadeIn(250);
		$error.css('top', '0');
		setTimeout(function() {
			$error.css('top', '-3em');
			setTimeout(function() {
				$error.fadeOut(250);
				$error.html('');
				error = false;
			}, 250);
		}, 2750);
	}
}
