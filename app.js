
var $error;

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
			error('Invalid values');
		}
	});
});

function error(text) {
	$error.html(text);
	$error.show();
	$error.css('top', '0');
	setTimeout(function() {
		$error.css('top', '-3em');
		setTimeout(function() {
			$error.hide();
			$error.html('');
		}, 125);
	}, 2625);
}
