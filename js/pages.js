module.exports = (function(){
  function Pages(ctx, flow){
    this.width = ctx.state.pageWidth - 40;
    this.height = this.width;
    this.element = document.createElement("div");
    this.document = this._createDocument(ctx, flow);
  }

  Pages.prototype._createDocument = function(ctx, flow){
    var doc = new Nehan.Document();
    doc.setStyles({
      body:{
	flow:flow,
	width:this.width,
	height:this.height,
	fontSize:16
      }
    });

    doc.setContent(ctx.state.mainText);
    doc.render({
      onPage : function(page, ctx){
	this.element.appendChild(page.element);
      }.bind(this)
    });
    return doc;
  };

  Pages.prototype.getElement = function(){
    return this.element;
  };

  return Pages;
})();
