var Promise = require("bluebird");

module.exports = (function(){
  var __promise = function(method, url, args){
    args = args || {};
    return new Promise(function(resolve, reject){
      return $.ajax({
	type:"get",
	dataType:"html",
	url:url,
	data:args
      }).then(function(result){
	resolve(result);
      }).fail(function(result){
	reject(result);
      });
    });
  };
  var __get = function(url, args){
    return __promise("get", url, args);
  };

  return {
    getHtml : function(name){
      return __get("/static/nehan-demo/" + name + ".html");
    }
  };
})();
