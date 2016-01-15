var h = require("virtual-dom/h");

module.exports = (function(){
  return {
    render : function(ctx, flow){
      return h(".pages", {
	type:"Widget",
	init:function(){
	  return ctx.state.elements[flow];
	}
      });
    }
  };
})();
