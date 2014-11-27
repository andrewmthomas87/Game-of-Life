
var $error, $divs;

var error = false, divs;

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
				'width': Math.ceil(ratio * windowHeight) + 'px'
			});
			$divs.css({
				'width': Math.floor(windowHeight / divs[0].length) + 'px',
				'height': Math.floor(windowHeight / divs[0].length) + 'px'
			});
		}
		else {
			$('section').css({
				'width': '100%',
				'height': Math.ceil((1 / ratio) * windowWidth) + 'px',
				'margin': Math.floor((windowHeight - ((1 / ratio) * windowWidth)) / 2) + 'px 0'
			});
			$divs.css({
				'width': '',
				'height': ''
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
