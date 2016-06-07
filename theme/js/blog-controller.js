var blogController = {
	init: function() {
		self = this;
		console.log('blog controller');


		self.bindElements();
	},
	bindElements: function() {
		// Enter no fild de busca
		$('#inpBlogSearch').keypress(function(e) {
			if (e.keyCode === 13)
				self.doSearch();
		})
		// Botão dentro do input de busca
		$('#btnBlogSearch').click(self.doSearch);

	},
	doSearch: function() {
		var inputSearch = $('#inpBlogSearch');

		if (inputSearch.val() == '') {
			inputSearch.focus();
			return;
		}

		console.log('faz o search aeee');
	}
}