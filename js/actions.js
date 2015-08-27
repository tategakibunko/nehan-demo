var Rx = require("rx");
var Api = require("./api");
var VirtualView = require("./virtual-view");
var Config = require("./config");

module.exports = (function(){
  var __get_page_width = function(){
    return Math.floor(Config.pageCol * window.innerWidth / 16) - 30;
  };

  return {
    emitHtml : function(name){
      Api.getHtml(name).then(function(html){
	this.emitUpdater(function(state){
	  state.mainText = html;
	  state.createPages(this.createContext(state));
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
	this.emitUpdater(function(state){
	  state.pageWidth = page_width;
	  state.createPages(this.createContext(state));
	}.bind(this));
      }.bind(this));

      return upstream$.combineLatest(page_width$, function(state, page_width){
	state.pageWidth = page_width;
	return state;
      });
    }
  };
})();
