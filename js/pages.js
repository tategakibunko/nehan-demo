module.exports = (function(){
  function Pages(ctx, flow){
    this.width = ctx.state.pageWidth - 40;
    this.height = this.width;
    this.$pages = this._createPages(ctx, flow);
  }

  Pages.prototype._createPages = function(ctx, flow){
    var pe = Nehan.createPagedElement().setStyles({
      body:{
	flow:flow,
	width:this.width,
	height:this.height,
	fontSize:16
      }
    });

    var $pages = pe.getElement();
    pe.setContent(ctx.state.mainText, {
      onProgress : function(tree, stream){
	var page = stream.getPage(tree.pageNo);
	$pages.appendChild(page.element);
      }
    });
    return $pages;
  };

  Pages.prototype.getElement = function(){
    return this.$pages;
  };

  return Pages;
})();
