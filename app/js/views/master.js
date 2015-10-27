'use strict';

var templates = require('../templates.js');
var HeaderView = require('../modules/ui/views/header.js');
var Transitions = require('../modules/pagetransitions/pagetransitions');
var scrollTracker = require('../helpers/scroll-tracker.js');

var View = require('../extensions/view'),

	MasterView = View.extend({
		
		el: 'html',

		header: '.header',

		initialize: function(){

			var state = (window.location.hash.length >= 1) ? 'content' : 'intro';
			this.render({
				state: state
			});

			this.transitions = new Transitions({
				container: '.page-wrap .main .transition-container',
				main: '.content-main',
				transitioner: '.transitioner'
			});

			// var view = this;
			$(document).on('keydown', function(e){
				if (e.which === 39) {
					window.Backbone.trigger('page:nextContent');
				} else if (e.which === 37) {
					window.Backbone.trigger('page:prevContent');
				} else {
					return;
				}
			});

			this.$header = $(this.header);
			this.headerView = new HeaderView({help: true, template: templates['ui/header']});
			this.initialized = true;
			this.setListeners();

			return this;

		},

		events: {
			'click .show-content': 'goToCurrentContent',
			'click .go-prev': 'prevContent',
			'click .go-next': 'nextContent'
			// 'click .show-intro': 'showIntro'
	  	},

	  	render: function(options){
	  		$('body').html(templates.master(options));

	  		scrollTracker.initialize();
	  	},

	  	showContent: function() {
			$('body').addClass('content').removeClass('intro');
			console.log('showContent', document.body.className);
		},

		showIntro: function() {
			$('body').addClass('intro').removeClass('content');
		},

		setNamespace: function(namespace) {	
			document.body.className = $.trim(
				document.body.className.split(' ').filter(function(c) { 
					return c.lastIndexOf('page-', 0) !== 0; 
				}).join(' ') + ' page-' +namespace );
		},

		swiperUp: function(){
			if (!this.swiperUpReady()) { return false; }
			this.showIntro();
		},

		swiperDown: function(){
			if (!this.swiperDownReady()) { return false; }
			this.showContent();
			this.goToCurrentContent();
		},

		swiperLeft: function(){
			if (!this.swiperLeftReady()) { return false; }
			this.nextContent();
		},

		swiperRight: function(){
			if (!this.swiperRightReady()) { return false; }
			this.prevContent();
		},

		swiperUpReady: function(){
			return false;
			// return $('body.content .content-main').scrollTop() <= 0;
		},

		swiperDownReady: function(){
			return $('body.intro').length >= 1;
		},

		swiperLeftReady: function(){
			return true;
		},

		swiperRightReady: function(){
			return true;
		},

		nextContent: function(e){
			console.log('nextContent');
			// if (e) { e.preventDefault(); }
			// if (this.transitions.animating) {return false;}
			// this.transitions.direction = 'next';
			// window.Backbone.trigger('router:nextContent');
			if (this.transitions.animating) {
				if (e) {
					console.log('is animating with e');
					e.preventDefault();
				} else {
					console.log('is animating no e');
				}
			}
		},

		prevContent: function(e){
			console.log('prevContent', this.transitions.animating);
			if (e) { e.preventDefault(); }
			if (this.transitions.animating) {return false;}
			this.transitions.direction = 'prev';
			window.Backbone.trigger('router:prevContent');
		},

	  	goToCurrentContent: function(){
	  		window.Backbone.trigger('router:goToCurrentContent');
	  	},

		setListeners: function(){

			var transitions = this.transitions;

			function render(content){transitions.render(content);}

			this.listenTo(window.Backbone, 'ui:showContent', this.showContent);
			this.listenTo(window.Backbone, 'ui:showIntro', this.showIntro);
			this.listenTo(window.Backbone, 'page:setNamespace', this.setNamespace);
			this.listenTo(window.Backbone, 'page:nextContent', this.nextContent);
			this.listenTo(window.Backbone, 'page:prevContent', this.prevContent);

			this.listenTo(window.Backbone, 'swiper:up', this.swiperUp);
			this.listenTo(window.Backbone, 'swiper:down', this.swiperDown);
			this.listenTo(window.Backbone, 'swiper:left', this.swiperLeft);
			this.listenTo(window.Backbone, 'swiper:right', this.swiperRight);


			this.listenTo(window.Backbone, 'transition:render', render);

		}
	});

module.exports = MasterView;