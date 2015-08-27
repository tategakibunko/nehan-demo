var Router = require("./router");
var AppView = require("./view/app");
var Api = require("./api");
var urls = new Router({
  "([a-z\\-]+)$" : function(name){
    return {
      onload : function(ctx){
	ctx.action.emitHtml(name);
      }
    };
  }
});

module.exports = (function(){
  return {
    onload : function(location, ctx){
      var resource = urls.match(location, function(){});
      if(resource && resource.onload){
	resource.onload(ctx);
      }
    },
    render : function(ctx){
      return AppView.render(ctx);
    }
  };
})();
