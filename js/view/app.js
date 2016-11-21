var h = require("virtual-dom/h");
var SideMenu = require("./side-menu");
var Pages = require("./pages");

module.exports = {
  renderFull : function(ctx){
    return h(".ui.two.column.grid", [
      h(".row", [
	h(".column", Pages.render(ctx, "tb-rl")),
	h(".column", Pages.render(ctx, "lr-tb"))
      ])
    ]);
  },
  renderCompact : function(ctx){
    return h(".row", [
      h("h2", "vertical"),
      h(".vert", Pages.render(ctx, "tb-rl")),
      h("h2", "horizontal"),
      h(".hori", Pages.render(ctx, "lr-tb"))
    ]);
  },
  renderMain : function(ctx){
    return h(".fourteen.wide.column", [
      h(".ui.info.message", "Change window size, and it reflows!"),
      h(".ui.form", h(".field", h("textarea", ctx.state.mainText))),
      h(".ui.hidden.divider"),
      ((screen.width > 600)? this.renderFull(ctx) : this.renderCompact(ctx))
    ]);
  },
  render : function(ctx){
    try {
      return h(".app", [
	h(".ui.grid", [
	  h(".two.wide.column", SideMenu.render(ctx)),
	  this.renderMain(ctx)
	])
      ]);
    } catch(e){
      console.error(e);
      return h(".ui.error.message", String(e));
    }
  }
};
