/*入口脚本*/
require.config({
    paths: {	// -- 配置别名
    	"jquery":"../assets/js/jquery.min",
    	"amazeui":"../assets/js/amazeui.min",
    	"app":"module/app",
    	"countUp":"module/countUp",
    	"autoexec":"module/autoexec"
    }
});
define(["amazeui"],function(){
	require(["autoexec","app"]);
});







