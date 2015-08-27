var h = require("virtual-dom/h");

module.exports = (function(){
  return {
    render : function(ctx, pages){
      return h(".pages", {
	type:"Widget",
	init:function(){
	  return pages? pages.getElement() : document.createElement("div");
	}
      });
    }
  };
})();
