function jsonp(url,cb){
	return new Promise(function(resolve , reject){
		cb = cb ? cb : "callback";
		var randomName = "n" + Date.now();
		var script = document.createElement("script");
		url += (/\?/.test(url) ? "&" : "?") + cb + "=" + randomName;
		script.src=url;
		document.body.appendChild(script);
		window[randomName] = function(res){
			resolve(res);
		}
		script.onload = function(){
			this.remove(); 
		}
	}) 
}

function _(selector){
      var ele = document.querySelectorAll(selector);
      if(ele.length == 0) return null;
      return  ele.length == 1 ? ele[0] : ele; 
}

function switchArray(args){
	return Array.prototype.slice.call(args);
}
