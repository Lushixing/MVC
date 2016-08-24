//依赖MVC jquery header.css email skin login
define(['MVC' , 'jquery' , 'css!modules/header/header.css' , 'modules/header/email' , 'modules/header/skin' , 'modules/header/login'] , function (MVC , $){
MVC
.addModel("header" , {
    weather: {
        city: '北京',
        text: '晴',
        icon: 'a53',
        temperature: '29 ~ 15℃'
    },
    date: {
        month: '5月19日',
        day: '星期四'
    },
    adList: [
        {
            id: '1',
            url: 'ad_1.jpg'
        },
        {
            id: '2',
            url: 'ad_2.jpg'
        },
        {
            id: '3',
            url: 'ad_3.jpg'
        }
    ]
})
.addView("header" , function ( model , template){
    //1.创建容器
    var dom = $('<div class="header" id="header"></div>');
    //2.获取数据
    var data = model.get("header");
    //3.创建视图模板
    var tpl = [
        '<div class="container">',
            '<div class="header-left">',
                '<img src="img/logo.png" alt="" />',
                '<span class="weather">',
                    '<strong class="city">{#weather.city#}</strong>',
                    '<strong><img src="img/{#weather.icon#}.png" alt="" /> {#weather.text#} {#weather.temperature#}</strong>',
                '</span>',
                '<span class="date"><b>{#date.month#} {#date.day#}</b></span>',
                '<span class="star"><b>星座运势</b></span>',
            '</div>',
            '<div class="header-right">',
                '<ul class="ad">{#list#}</ul>',
                '<span class="user"><b>登录</b></span>',
                '<span class="email"><b>邮箱</b></span>',
                '<span class="browser"><b>浏览器</b></span>',
                '<span class="skin"><b>换肤</b></span>',
            '</div>',
        '</div>'
    ].join("");
    listTpl  = '<li><img src="img/{#url#}" alt="" /></li>';
    //4。定义模板字符串
    var html = listHtml = "";
    //5.格式化模板
    for(var i = 0; i < data.adList.length; i++){
        listHtml += template(listTpl , data.adList[i]);
    }
    //当前模板中与data数据对应的属性list没有值，所以我们给他添加一个
    data.list = listHtml;
    html = template(tpl , data);
    //6.插入页面
    dom.html(html);
    dom.appendTo("#app");
    //7.返回dom
    return dom;
})
.addCtrl("header" , function (model, view, observer){
    var dom  = view.create("header");
    //添加业务逻辑
    dom.delegate('.user', 'click', function () {
        if($(this).hasClass("open")){
            $(this).removeClass("open");
            observer.fire("closeUserLayer");
        }else{
            $(this).addClass("open");
            observer.fire('openUserLayer')
        }
    }).delegate('.email', 'click', function (e) {
        if(e.target.tagName.toLowerCase() == "b"){
            if ($(this).hasClass('open')) {
                observer.fire('closeEmailLayer');
                
            // 否则。，页面是关闭的，那么我们就发送打开浮层的消息
            } else {
                // 第一步，发送打开弹层消息
                observer.fire('openEmailLayer')
                // 第二步为该元素添加类
                $(this).addClass('open')
            }
        }
    }).delegate('.skin', 'click', function () {
        if($(this).hasClass("open")){
            $(this).removeClass("open");
            observer.fire("closeSkinLayer");
        }else{
            $(this).addClass("open");
            observer.fire('openSkinLayer')
        }
    });

    observer.regist("closeEmailLayer" , function(){
        dom.find(".email").removeClass("open");
    })
    .regist("closeSkinLayer" , function(){
        dom.find(".skin").removeClass("open");
    })
    .regist("closeUserLayer" , function(){
        dom.find(".user").removeClass("open");
    })
})
})