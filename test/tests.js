
$('#iv').imageview();
var iv = $('#iv').first().data('imageview');

describe('Basic functionality', function() {

  it('should appear on click', function() {
    iv.$targets.first().click();
    expect(iv.$viewer.is(':visible')).to.be(true);
  });
	
  it('should change on next', function() {
    iv.$next.click();
    expect(iv.$image.is(':visible'));
    expect(iv.$image.attr('src')).to.be(iv.$targets.eq(1).attr(iv.opts.srcAttr));
  });
	
  it('should change on prev', function() {
    iv.$prev.click();
    expect(iv.$image.is(':visible'));
    expect(iv.$image.attr('src')).to.be(iv.$targets.eq(0).attr(iv.opts.srcAttr));
  });
	
  it('should close on cross', function(done) {
    iv.$hide.click();
    setTimeout(function() {
      expect(iv.$viewer.is(':visible')).to.be(false);
      done();
    }, 800); // 400 fadeIn + 400 fadeOut
  });

});
