(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require, exports, module);
	} else {
		factory();
	}
}(this, function(require, exports, module) {
	require(["amazeui"], function(amazeui) {　　
		
	});
}));