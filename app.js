
var $error, $divs;

var error = false, divs, playing = false, interval;

$(window).resize(resize);

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
			return;
		}
		if (width > 75 || width < 10 || height > 75 || height < 10) {
			showError('Values must be between 10 and 75');
			return;
		}
		$(this).fadeOut('fast');
		var divsHTML = '';
		divs = [];
		for (i = 0; i < width; i++) {
			divs[i] = [];
			for (j = 0; j < height; j++) {
				divs[i][j] = false;
				divsHTML += '<div id=\'' + i + '-' + j + '\'></div>';
			}
		}
		$('section').append(divsHTML);
		$divs = $('section div');
		$divs.click(function() {
			var coordinates = $(this).attr('id').split('-');
			divs[coordinates[0]][coordinates[1]] = !divs[coordinates[0]][coordinates[1]];
			$(this).toggleClass('active');
		});
		resize();
		$('section').fadeIn('slow');
		setTimeout(function() {
			$('a#play-pause, a#move, a#erase').fadeIn('fast');
		}, 1000);
		$('a#play-pause').click(function() {
			if (!playing) {
				interval = setInterval(move, 100);
				$(this).html('Pause');
			}
			else {
				clearInterval(interval);
				$(this).html('Play');
			}
			playing = !playing;
		});
		$('a#move').click(move);
		$('a#erase').click(function() {
			clearInterval(interval);
			$('a#play-pause').html('Play');
			for (i = 0; i < divs.length; i++) {
				for (j = 0; j < divs[0].length; j++) {
					if (divs[i][j]) {
						divs[i][j] = false;
						$divs.filter('#' + i + '-' + j).removeClass('active');
					}
				}
			}
		});
	});
});

function resize() {
	if (divs) {
		var ratio = divs.length / divs[0].length;
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var windowRatio = windowWidth / windowHeight;
		if (windowRatio > ratio) {
			$('section').css({
				'height': '100%',
				'width': Math.round(ratio * windowHeight) + 'px'
			});
			$divs.css({
				'width': (100 / divs.length) + '%',
				'height': (100 / divs[0].length) + '%'
			});
		}
		else {
			$('section').css({
				'width': '100%',
				'height': Math.round((1 / ratio) * windowWidth) + 'px',
				'margin': Math.round((windowHeight - ((1 / ratio) * windowWidth)) / 2) + 'px 0'
			});
			$divs.css({
				'width': (100 / divs.length) + '%',
				'height': (100 / divs[0].length) + '%'
			});
		}
	}
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

function move() {
	var changes = [];
	var changed = false;
	for (i = 0; i < divs.length; i++) {
		changes[i] = [];
		for (j = 0; j < divs[0].length; j++) {
			var count = getNeighbors(i, j);
			if ((divs[i][j] && (count < 2 || count > 3)) || (!divs[i][j] && count == 3)) {
				changes[i][j] = true;
				changed = true;
			}
		}
	}
	for (i = 0; i < divs.length; i++) {
		for (j = 0; j < divs[0].length; j++) {
			if (changes[i][j]) {
				divs[i][j] = !divs[i][j];
				$divs.filter('#' + i + '-' + j).toggleClass('active');
			}
		}
	}
	if (!changed) {
		clearInterval(interval);
		$('a#play-pause').html('Play');
	}
}

function getNeighbors(x, y) {
	var count = (divs[x][y] ? -1 : 0);
	for (k = (x > 0 ? -1 : 0); k < (x < divs.length - 1 ? 2 : 1); k++) {
		for (l = (y > 0 ? -1 : 0); l < (y < divs[0].length - 1 ? 2 : 1); l++) {
			var neighborX = x + k;
			var neighborY = y + l;
			if (divs[neighborX][neighborY]) {
				count++;
			}
		}
	}
	return count;
}
