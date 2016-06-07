// TODO: está jogado aqui de fora porque vai virar lixo essa merda de carousel do bootstrap
var projectsCarousel = {
	init : function() {
		self = this;

		self.isWindowResizeCheckOnLine = false;

		self.projectSlider = $('.projects-slider');
		
		var imgs = self.projectSlider.find('img');
		self.imgsToLoad = imgs.length;

		imgs.load(self.checkImageLoad).error(self.checkImageLoad);

	},
	checkImageLoad: function() {
		// Validar se todas as imagens ja foram carregadas, ou tiveram erro no carregamento
		self.imgsToLoad--;

		if (self.imgsToLoad == 0) {
			setTimeout(self.checkHeight, 500);
		}
	},
	checkHeight: function() {
		

		// Ajudar a altura do slider de acordo com slide mais alto
		var higher = 0;

		$.each(self.projectSlider.find('.item'), function(i, item) {
			if ($(item).height() > higher)
				higher = $(item).height();
		});

		self.projectSlider.height(higher + 45); // 45 :: número mágico para espaçamento com relação ao rodapé do carousel ;)

		if (!self.isWindowResizeCheckOnLine) {
			$(window).resize(function() {
				if (self.windowResizeTimer != null) {
					clearTimeout(self.windowResizeTimer);
				}
				self.windowResizeTimer = setTimeout(self.checkHeight, 500);
			});
			self.isWindowResizeCheckOnLine = true;
		}
		self.windowResizeTimer = null;

		self.checkSliderIndicatorsHeight();
	},
	checkSliderIndicatorsHeight: function() {
		// Auto ajusta a altura dos indicators (bolinha que marca a página), baseado na visualização do mesmo (responsive)
		var sliderInidicatorWrapper = self.projectSlider.find('.carousel-indicators');

		if (sliderInidicatorWrapper.find('li').eq(0).css('display') === 'block')
			sliderInidicatorWrapper.css('margin-top', '-' + parseInt(sliderInidicatorWrapper.height() / 2, 10) + 'px');
		else
			sliderInidicatorWrapper.css('margin-top', '0');
	}
};

var homeController = {
	init: function() {
		// TODO: remover este daqui
		projectsCarousel.init();
	}
}

