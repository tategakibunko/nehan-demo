var Inga = require("inga");
var State = require("./state");
var Actions = require("./actions");
var VirtualView = require("./virtual-view");
var Api = require("./api");

$(function(){
  var data_source = new Inga.ActionStateStream({
    initialState:new State({
      mainText:"",
      elements:{
	"tb-rl":document.createElement("div"),
	"lr-tb":document.createElement("div")
      }
    }),
    plugins:[
      {module:require("inga/plugins/hash-location"), options:{combine:true}}
    ],
    actions:Actions
  });

  Nehan.Config.preloadMarkups = ["img", "math"];

  // initialize maxjax
  MathJax.Hub.Config({
    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
  });

  Inga.define({
    domRoot:document.querySelector("#app"),
    dataSource:data_source,
    virtualView: function(ctx){
      return VirtualView.render(ctx);
    }
  });
});
