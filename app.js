
var $error;

var error = false;

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
	});
});

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
