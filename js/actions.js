var Rx = require("rx");
var Api = require("./api");
var VirtualView = require("./virtual-view");
var Config = require("./config");

module.exports = (function(){
  var __get_page_width = function(){
    var page_col = (screen.width > 600)? Config.pageCol : Config.pageCol * 2;
    return Math.floor(page_col * window.innerWidth / 16) - 30;
  };

  return {
    createDemo : function(flow, page_size){
      this.emitUpdater(function(state){
	var element = state.getElement(flow);
	element.innerHTML = "";
	new Nehan.Document()
	  .setStyle("body", {
	    flow:flow,
	    fontSize:Config.fontSize,
	    width:page_size,
	    height:page_size
	  })
	  .setContent(state.mainText)
	  .render({
	    onPreloadProgress : function(status){
	      //console.log("preload:%o", status);
	    },
	    onPage:function(page, ctx){
	      element.appendChild(page.element);
	    }
	  });
      });
    },
    updateDemo : function(page_size){
      this.createDemo("tb-rl", page_size);
      this.createDemo("lr-tb", page_size);
    },
    emitHtml : function(name){
      Api.getHtml(name).then(function(html){
	this.emitUpdater(function(state){
	  state.mainText = html;
	  this.updateDemo(state.getPageSize());
	}.bind(this));
      }.bind(this));
    },
    action:function(state, upstream$){
      this.getPlugin("hash-location").subscribe(function(location){
	this.emitUpdater(function(state){
	  VirtualView.onload(location, this.createContext(state));
	}.bind(this));
      }.bind(this));

      VirtualView.onload(state.location || Config.defaultLocation, this.createContext(state));
    },
    combine:function(state, upstream$){
      var page_width$ = new Rx.Observable.fromEvent(window, "resize")
	    .debounce(250)
	    .map(__get_page_width)
	    .startWith(__get_page_width())
      ;

      page_width$.subscribe(function(page_width){
	state.pageWidth = page_width;
	this.updateDemo(state.getPageSize());
      }.bind(this));

      return upstream$.combineLatest(page_width$, function(state, page_width){
	state.pageWidth = page_width;
	return state;
      });
    }
  };
})();
