var Inga = require("inga");
var State = require("./state");
var Actions = require("./actions");
var VirtualView = require("./virtual-view");
var Api = require("./api");

$(function(){
  var data_source = new Inga.ActionStateStream({
    initialState:new State({
      mainText:"",
      pages:{vert:null, hori:null}
    }),
    plugins:[
      {module:require("inga/plugins/hash-location"), options:{combine:true}}
    ],
    actions:Actions
  });

  Inga.define({
    domRoot:document.querySelector("#app"),
    dataSource:data_source,
    virtualView: function(ctx){
      return VirtualView.render(ctx);
    }
  });
});
