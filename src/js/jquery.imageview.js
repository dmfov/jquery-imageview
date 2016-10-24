
function JQueryImageView (obj, opts)
{
	this.__construct = function (obj, opts)
	{
		this.$obj = $(obj);
		this.$targets = $(opts.targets, this.$obj);
		this.opts = opts;
		this.i = 0;
		this.last = this.$targets.size() - 1;
		
		this.deploy();
	}
	
	this.deploy = function ()
	{
		var html = '<div class="imageview">'
			+'<div class="title"></div>'
			+'<div class="hide"></div>'
			+'<div class="prev"></div>'
			+'<div class="next"></div>'
			+'<div class="images"></div>'
			+'</div>';
		
		this.$viewer = $(html).appendTo('body');
		this.$title = $('.title', this.$viewer);
		this.$hide = $('.hide', this.$viewer);
		this.$prev = $('.prev', this.$viewer);
		this.$next = $('.next', this.$viewer);
		this.$images = $('.images', this.$viewer);
		
		this.$hide.click($.proxy(this.hide, this));
		this.$prev.click($.proxy(this.prev, this));
		this.$next.click($.proxy(this.next, this));
		
		$('body').keydown($.proxy(this.hotkey, this));
		
		var self = this;
		this.$targets.each(function (i) {
			$(this).click(function () { self.show(i); return false; });
			$('<img>').appendTo(self.$images).bind('load',function () { $(this).fadeIn(); });
		});
	}
	
	this.hide = function ()
	{
		this.$viewer.fadeOut();
	}
	
	this.hotkey = function (e)
	{
		if (!this.$viewer.is(':visible')) return;
		
		if (e.keyCode == 37) {
			if (this.i > 0) this.prev();
		}
		
		if (e.keyCode == 39) {
			if (this.i < this.last) this.next();
		}
	}
	
	this.next = function ()
	{
		this.show(this.i + 1);
	}
	
	this.prev = function ()
	{
		this.show(this.i - 1);
	}
	
	this.show = function (i)
	{
		var $target = this.$targets.eq(i);
		
		this.i = i;
		
		this.$title.html($target.attr('title'));
		this.$prev.toggle(i > 0);
		this.$next.toggle(i < this.last);
		this.$viewer.fadeIn();
		
		this.$images.children().hide().eq(i).attr('src', $target.attr('href')).fadeIn();
	}
	
	this.__construct(obj, opts);
}

(function ($) {

	$.fn.imageview = function (options)
	{
		var defaults = {
			targets: 'a'
		};
		
		var opts = $.extend(defaults, options);
		
		return this.each(function () { $(this).data('imageview',new JQueryImageView(this,opts)); });
	}

})(jQuery);