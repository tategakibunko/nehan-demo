var h = require("virtual-dom/h");
var Config = require("../config");
var DemoList = require("../demo-list");

module.exports = (function(){
  return {
    renderItem : function(ctx, title, name){
      var location = ctx.state.location || Config.defaultLocation;
      var markup = (location === name)? "a.active.item" : "a.item";
      return h(markup, {
	href:"#"+name
      }, title);
    },
    render : function(ctx){
      return h(".ui.list", DemoList.map(function(demo){
	return this.renderItem(ctx, demo.title, demo.name);
      }.bind(this)));
    }
  };
})();
