/** 
 *  by. huaizhi
 *  2018 12 5 
 *  version 0.1.0
 * 
                            _ooOoo_
                           o8888888o
                           88" . "88
                           (| -_- |)
                           O\  =  /O
                        ____/`---'\____
                      .'  \\|     |//  `.
                     /  \\|||  :  |||//  \
                    /  _||||| -:- |||||-  \
                    |   | \\\  -  /// |   |
                    | \_|  ''\---/''  |   |
                    \  .-\__  `-`  ___/-. /
                  ___`. .'  /--.--\  `. . __
               ."" '<  `.___\_<|>_/___.'  >'"".
              | | :  `- \`.;`\ _ /`;.`/ - ` : | |
              \  \ `-.   \_ __\ /__ _/   .-` /  /
         ======`-.____`-.___\_____/___.-`____.-'======
                            `=---='
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      佛祖保佑       永无BUG
*/


;;
(function($,window){
      // a = 10;
      // console.log($)
      $.fn.nav = function(options){
            // 调用这个方法的dom对象;
            // console.log(this);
            this.children(options.parent).on("mouseenter",showlist)
            this.children(options.parent).on("mouseleave",hidelist)
            function showlist(event){
                  var e = event || window.event;
                  var target = e.currentTarget;
                  // 动画效果 , 让列表显示出来;
                  $(target).children(options.children).stop().show();
            }

             function hidelist(event){
                  var e = event || window.event;
                  var target = e.currentTarget;
                  
                  // console.log(target);
                  // 动画效果 , 让列表显示出来;
                  $(target).children(options.children).stop().hide();
            }
      }

})(jQuery,window);