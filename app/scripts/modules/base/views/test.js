'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone) {

	return function (Module) {
		var homeView = Backbone.View.extend({
			// el: 'div.homepage',
			init: function(options){
				options = (typeof options === 'undefined')? {} : options;
				this.render(options);
			},
			render: function(options){
				var html = this.template();

				if (typeof options.animation !== 'undefiend' && typeof App.Transitions[options.animation] !== 'undefined') {
					console.log('animation option defined');
					App.Transitions.render({html: html, animation: animation});
				} else {
					console.log('animation option undefined');
					App.Transitions.render({html: html});
				}					

			},
			template: JST[Module.nameSpace + '/testpage'],
			setListeners: function(){
				// 
			}
		});
		return homeView;
	}

});
