/* JQuery ImageView Plugin */

;(function($) {

	function JQueryImageView (obj, opts)
	{
		this.init = function(obj, opts) {
			
			this.$obj = $(obj);
			this.$targets = $(opts.targetSelector, this.$obj);
			this.opts = opts;
			this.i = 0;
			this.last = this.$targets.length - 1;
			
			this.deploy();
		}
		
		this.deploy = function() {
			
			var html = '<div class="imageview">'
				+'<div class="title"></div>'
				+'<a href="javascript:;" class="hide"></a>'
				+'<a href="javascript:;" class="prev"></a>'
				+'<a href="javascript:;" class="next"></a>'
				+'<div class="image"><img src="" /></div>'
				+'</div>';
		
			this.$viewer = $(html).appendTo('body');
			this.$title = $('.title', this.$viewer);
			this.$hide = $('.hide', this.$viewer);
			this.$prev = $('.prev', this.$viewer);
			this.$next = $('.next', this.$viewer);
			this.$image = $('.image img', this.$viewer);
		
			this.$hide.click($.proxy(this.hide, this));
			this.$prev.click($.proxy(this.prev, this));
			this.$next.click($.proxy(this.next, this));
			this.$image.bind('load', function() { $(this).fadeIn(); });
		
			$('body').keydown($.proxy(this.keydown, this));
		
			var self = this;
			this.$targets.each(function (i) {
				$(this).click(function (e) { self.show(i); return false; });
			});
		}
		
		this.hide = function() {
			this.$viewer.fadeOut();
		}
		
		this.keydown = function(e) {
		
			if (!this.$viewer.is(':visible')) {
				return;
			}
			
			if (e.keyCode == 37) {
				if (this.i > 0) this.prev();
			}
			
			if (e.keyCode == 39) {
				if (this.i < this.last) this.next();
			}
		}
		
		this.next = function() {
			this.show(this.i + 1);
		}
		
		this.prev = function() {
			this.show(this.i - 1);
		}
		
		this.show = function(i) {
	
			var $target = this.$targets.eq(i);
		
			this.i = i;
		
			this.$title.text($target.attr(this.opts.titleAttr));
			this.$prev.toggle(i > 0);
			this.$next.toggle(i < this.last);
			this.$viewer.fadeIn();
		
			this.$image.hide().attr('src', $target.attr(this.opts.srcAttr));
		}
		
		this.init(obj, opts);
	}
	
	$.fn.imageview = function(options) {
	
		var defaults = {
			targetSelector: 'a',
			srcAttr: 'href',
			titleAttr: 'title'
		};
		
		var opts = $.extend(defaults, options);
		
		return this.each(function() { $(this).data('imageview', new JQueryImageView(this, opts)); });
	}

})(jQuery);
