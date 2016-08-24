define(['MVC' , 'jquery'] , function (MVC , $){
MVC
.addModel("email" , {

})
.addView("email" , function (model , template){
    //定义容器
    var dom = $('<div class="email-layer" id="email"></div>');
    //获取数据 
    var data = model.get("email");
    //定义模板
    var tpl = [
        '<div class="container">',
            '<div>',
                '<input type="text" placeholder="邮箱账号"/>',
                '<span class="choose-email">{#chooseEmail#}</span>',
                '<ul>{#list#}</ul>',
            '</div>',
            '<div>',
                '<input type="password" placeholder="账号密码"/>',
                '<span class="log">登录</span>',
                '<span class="cancel">取消</span>',
            '</div>',
            '<div>',
                '<input type="checkbox" id="email-checkbox"/>',
                '<label for="email-checkbox">我阅读并同意使用协议</label>',
            '</div>',
        '</div>'
    ].join("");
    var listTpl = '<li class="{#cls#}">{#key#}</li>';
    //定义模板字符串 
    var html = listHtml = "";
    //格式化模板
    for(var i = 0; i < data.normalEmail.length; i++){
        listHtml += template(listTpl , {
            key : data.normalEmail[i],
            cls : "choose"
        })
    }
    listHtml += '<li class="not-email">以下为弹出登录</li>'
    for (var i = 0; i < data.specialEmail.length; i++) {
        listHtml += template(listTpl, {
            key : data.specialEmail[i]
            // cls : "choose"
        })
    }
    html = template(tpl , {
        list : listHtml,
        chooseEmail : data.normalEmail[0]
    })

    //输出到页面中
    dom.html(html).appendTo("#header .email");
    return dom;
})
.addCtrl("email" , function (model , view , observer){
    var dom = null;
    //Ajax 当我们打开页面的时候没有该模块，点击邮箱按钮的时候才打开的
    // $.get("data/email.json" , function (res){
    //     if(res.errno == 0){
    //         model.add("email" , res.data);
    //         view.create("email");
    //     }
    // })
    //在创建视图之前要异步获取数据 
    
    //初始化我们的浮层
    function init(){
        $.get('data/email.json', function (res) {
            if (res.errno === 0) {
                //为model添加数据
                model.add('email', res.data);
                 //创建视图
                dom = view.create('email');
                //绑定事件
                bindEvent();
                //展示浮层
                showLayer();
            }
        })
    };

    //我们的浮层要有交互，所以我们要绑定事件
    function bindEvent(){
        dom.delegate('.cancel', 'click', function () {
            // 当点击取消按钮，要关闭浮层能，所以要发布关闭浮层的消息
            observer.fire('closeEmailLayer');
        })
        //为邮箱后缀名绑定事件
        .delegate(".choose-email" , "click" , function(){
            if(dom.find("ul").hasClass("open")){
                dom.find("ul").removeClass('open')
            }else{
                dom.find("ul").addClass("open");
            }
        })
        //为ul中的li添加绑定事件,点击这个li并且获取li的内容，填充到choose-email的span中
        .delegate("ul li", "click" , function(){
            
            //如果点击的li有choose类，那么这个li就可以设置内容
            if($(this).hasClass("choose")){
                //获取该元素的内容
                var value = $(this).html();
                //为choose-email添加该内容
                dom.find(".choose-email").html(value);
            }
            
            //并且关闭列表
            dom.find("ul").removeClass("open");
        })
        //点击页面的时候要关闭email，并且点击的的这个元素一定不能在span这个元素里面，更不是是这个元素
        $(document).click(function(e){
            if($.contains($("#header .email")[0] , e.target) || $("#header .email")[0] == e.target){
                return;
            }
            observer.fire("closeEmailLayer");
        })
    }

    //为模块添加类
    function showLayer(){
        dom.addClass('open');
    }

    //为模块删除类
    function hideLayer(){
        dom.removeClass("open");
    }

    observer.regist("openEmailLayer" , function(){
        //判断页面有没初始化,判断dom存不存在就ok了
        if(dom){
            showLayer();
        }else{
            //打开浮层
            init();
        }
        
    }).regist("closeEmailLayer" , function(){
        //隐藏浮层
        hideLayer();
    })
})

})