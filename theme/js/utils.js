var utils = {
	autoNextFormElement: function(inputElements) {
		// Quando campo preenchido e enter é pressionado, move para o próximo campo (muito útil em mobile ?!?1)

		var inputs = inputElements;

		inputs.keypress(function(e) {
			var el = $(this);

			if (e.keyCode === 13 && el.val() != '' && /text|email|tel/.test(el.attr('type'))) {
				var ci = inputs.index(el);

				if (ci + 1 < inputs.length) {
					var nextEl = inputs.eq(ci + 1);

					if (nextEl.attr('type') !== 'button')
						nextEl.focus();
				}
			}
		});
	},
	forms: {
		showAlertBox: function(message, type) {
			var el = $('.luizalabs-form-alert-message');

			if (type == undefined)
				type = 'success';
			else if (type == 'error')
				type = 'danger';

			el.addClass('alert-' + type);

			el.find('.luizalabs-form-alert-message-text').html(message);

			if (!el.is(':visible'))
				el.fadeIn(900);
		}
	}
}


// *** Forms ***

// Jquery plugins
$.fn.addError = function(message) {
	// debugger;

	if (this.data('bs.popover') == undefined) {
		// this.addClass('error');

		this.popover({
			placement: 'auto',
			trigger: 'focus',
			html: true,
			content: message
		});
	}

	var d = this.data('bs.popover');
	if (d.options.content !==  message)
		d.options.content =  message;

	return this;
}

$.fn.remError = function(message) {
	if (this.data('bs.popover') != undefined) {
		// this.removeClass('error');
		this.popover('destroy');
	}
	return this;
}


// validators: {
// 	multiple: function() {
// 		return {
// 			validate: function(val, multiple) {
// 				return val % multiple === 0;
// 			},
// 			priority: 2
// 		};
// 	}
// },
// messages: {
// 	multiple: "This value should be a multiple of %s"
// }


// Custom form validator
var parsleyLuizaLabs = {
	errorClass: 'error',
	showErrors: true,
	useHtml5Constraints: false,
	errors: {
		errorsWrapper: '',
		errorElem: ''
	},
	listeners: {
		onFieldError: function ( elem, constraints, ParsleyField ) {
			var msg = '';
			// debugger;

			if (constraints.required != undefined && constraints.required.valid === false)
				msg = 'Este campo deve ser preenchido.<br>';
			if (constraints.minlength != undefined && constraints.minlength.valid === false)
				msg += 'Entre com pelo menos ' + constraints.minlength.requirements + ' caracteres.<br>';

			if (constraints.type != undefined) {
				// debugger;
				if (constraints.type.valid === false) {
					if (constraints.type.requirements === 'email')
						msg += 'Entre com um e-mail válido.<br>';
				}
			}

			if (msg !== '')
				msg = msg.replace(/\<br\>$/, '');

			// debugger;

			elem.addError(msg);
		},
		onFieldSuccess: function ( elem, constraints, ParsleyField ) {
			// debugger;
			elem.remError();

		}
	}
};


var checkActivePage = {
	init: function() {
		this.pageCheck();
	},
	pageCheck: function() {
		var p = /\/([a-z0-9\-]+)\/$/.exec(window.location.href);

		if (p !== null)
			p = p[1];
		else
			p = 'home';

		$('.header-menu-links').find('.page-ref-' + p).addClass('active');
	}
}

