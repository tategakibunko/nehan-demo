var h = require("virtual-dom/h");
var SideMenu = require("./side-menu");
var Pages = require("./pages");

module.exports = {
  render : function(ctx){
    try {
      return h(".app", [
	h(".ui.grid", [
	  h(".two.wide.column", SideMenu.render(ctx)),
	  h(".fourteen.wide.column", [
	    h(".ui.info.message", "Change window size, and it reflows!"),
	    h(".ui.form", h(".field", h("textarea", ctx.state.mainText))),
	    h(".ui.hidden.divider"),
	    h(".ui.two.column.grid", [
	      h(".row", [
		h(".column", Pages.render(ctx, "tb-rl")),
		h(".column", Pages.render(ctx, "lr-tb"))
	      ])
	    ])
	  ])
	])
      ]);
    } catch(e){
      console.error(e);
      return h(".ui.error.message", String(e));
    }
  }
};
