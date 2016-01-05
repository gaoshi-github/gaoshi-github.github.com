(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery", "laytpl", "lazyload"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"), require("laytpl"), require("lazyload"));
	} else {
		factory(root.jQuery);
	}
}(this, function($, laytpl) {
	// -- 开启轮播
	$("#home-carousel").flexslider({
		slideshowSpeed: 3000,
		controlNav: false
	});
	// -- 添加用户
	$.getJSON("js/data/user.json", function(data) {
		var gettpl = document.getElementById("users-tpl").innerHTML;
		laytpl(gettpl).render(data, function(html) {
			document.getElementById("user-box").innerHTML = html;
		});
		var $userBox = $("#user-box");
		// 开启赖加载 绑定sporty事件立即执行
		var userLazyLoad = $userBox.find(".lazyload");
		userLazyLoad.lazyload({
			event: "sporty"
		});
		var iw; // 获取用户图片指定宽度
		if ($userBox.width() > 1000) {
			iw = $userBox.width() / 6;
			// 打开页面时加载前7个用户头像
			userLazyLoad.each(function(index) {
				if (index < 7) {
					$(this).trigger("sporty")
				}
			})
		} else {
			iw = $userBox.width() / 3;
			// 打开页面时加载前4个用户头像
			userLazyLoad.each(function(index) {
				if (index < 4) {
					$(this).trigger("sporty")
				}
			})
		}
		$userBox.find(".am-slider").flexslider({
			itemWidth: iw,
			itemMargin: 5,
			controlNav:false,
			pauseOnHover: true,
			slideshowSpeed: 300000,
			after: function() {
				userLazyLoad.trigger("sporty");
			}
		});
	});
	// -- 促销活动
	$.getJSON("js/data/activity-soft.json", function(data) {
		addActivity("activity-tpl", "activity-soft", data);
		addGallery(document.getElementById("activity-soft"));
		$("#activity-soft .lazyload").lazyload({
			threshold: 280
		});
	});
	// -- 所有活动
	$.getJSON("js/data/activity-box.json", function(data) {
		addActivity("activity-tpl", "activity-box", data);
		$("#activity-box .lazyload").lazyload({
			threshold: 280
		});
		// -- mixitup 排序分类
		require(["mixitup"], function() {
			var filter = $("#classify .filter"); // -- 分类按钮节点
			filter.on("click", function() {
				$(this).addClass("am-active").siblings(".filter").removeClass("am-active");
			});
			$('#activity-box').mixitup({
				targetSelector: ".all",
				filterSelector: ".filter",
				effects: ["fade"],
				easing: "snap",
				onMixStart: function(event) {
					filter.addClass("am-disabled");
				},
				onMixEnd: function(event) {
					filter.removeClass("am-disabled");
					$(window).trigger("scroll"); // 触发浏览器滚动事件   防止图片卡在加载
				}
			});
		});
	});
	// -- 活动模版
	function addActivity(tplId, setDomId, data) {
		var gettpl = document.getElementById("article-tpl").innerHTML;
		laytpl(gettpl).render(data, function(html) {
			document.getElementById(setDomId).innerHTML = html;
		});
	}
	// - 给am-gallery-item添加动画- 移动端效果不佳 暂不开启
	function addGallery(elm) {
		var animateDom;
		if (elm) {
			animateDom = elm.getElementsByClassName("am-gallery-item");
		} else {
			animateDom = document.getElementsByClassName("am-gallery-item");
		}
		if (animateDom.length < 1) {
			return false;
		}
		for (var i = 0; i < animateDom.length; i++) {
			var delay = parseInt(Math.random() * (150 - 250 + 1) + 150); // 生成随机数
			animateDom[i].setAttribute("data-am-scrollspy", "{animation: 'fade',delay:" + delay + ",repeat: false}")
		}
	}
}));