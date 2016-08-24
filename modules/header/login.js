define(['MVC' , 'jquery'] , function (MVC , $){
    MVC
.addModel("login" , {

})
.addView("login" , function (model , template){
    //1.
    var dom = $('<div class="login" id="login"></div>');
    //2.
    var data = model.get("login");
    //3.创建模板字符串
    var tpl = [
        '<div class="login_in">',        
        '<div class="login_hd">',
            '<h2>登录百度账号</h2>',
            '<span class="close"></span>',
        '</div>',
        '<div class="login_bd">',
            '<div class="login_bd_left">',
                '<h3>手机扫描，安全登录</h3>',
                '<img src="img/qrcode.png" alt="" />',
                '<p>请使用<a href="javascript:;">手机百度app</a>扫描登录</p>',
            '</div>',
            '<div class="login_bd_right">',
                '<h4><a href="javascript:;">短信快捷登录</a></h4>',
                '<div class="ipt">',
                    '<div><i></i><input type="text" placeholder="手机/邮箱/用户名" id="ipt01" /></div>',
                    '<div><i class="i"></i><input type="text" placeholder="密码" id="ipt02" /></div>',
                '</div>',
                '<div class="auto">',
                    '<div>',
                        '<input type="checkbox" id="login-checkbox"/>',
                        '<label for="login-checkbox">下次自动登录</label>',
                    '</div>',
                    '<a href="javascript:;">登录遇到问题</a>',
                '</div>',
                '<div class="btn">',
                    '<a href="javascript:;">登录</a>',
                '</div>',
                '<div class="reg">',
                    '<a href="javascript:;">立即注册</a>',
                '</div>',
                '<div class="other">',
                    '<p>可以使用以下方式登录</p>',
                    '<div>',
                        '<a href="javascript:;"></a>',
                        '<a href="javascript:;" class="a01"></a>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
        '</div>'
    ].join("");
    //定义模板字符串
    var html = "";
    html = template(tpl , data);
    //输出到页面中
    dom.html(html).appendTo("body");
    return dom;
})
.addCtrl("login" , function (model , view , observer){
    var dom = null;

    //初始化
    function init(){
        dom = view.create("login");
        //绑定事件
        bindEvent();
        showLogin();
    }

    
    //给浮层添加交互
    function bindEvent(){
        //点击关闭按钮
        dom.delegate(".close" , "click" , function(){
            observer.fire("closeUserLayer");
        })
        .delegate(".ipt #ipt01" , "focus" , function(){
            $(this).addClass("change").siblings('i').addClass("blue01");
        })
        .delegate(".ipt #ipt01" , "blur" , function(){
            $(this).removeClass("change").siblings('i').removeClass("blue01");
        })
        .delegate(".ipt #ipt02" , "focus" , function(){
            $(this).addClass("change").siblings('i').addClass("blue02");
        })
        .delegate(".ipt #ipt02" , "blur" , function(){
            $(this).removeClass("change").siblings('i').removeClass("blue02");
        })
    }

    // 显示浮层
    function showLogin(){
        dom.fadeIn();
    }
    // 隐藏浮层
    function hideLogin(){
        dom.fadeOut();
    }

    //注册打开页面的消息
    observer.regist("openUserLayer" , function(){
        if(dom){
            showLogin()
        }else{
            init();
        }
        
    })
    .regist("closeUserLayer" , function(){
        hideLogin();
    })


})
})