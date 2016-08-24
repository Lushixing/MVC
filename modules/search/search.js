define(['MVC' , 'jquery' , 'css!modules/search/search.css'] , function (MVC , $){
    MVC
.addModel("search" , {
    data : {
        "normalSearch" : [
            "网页",
            "音乐",
            "视频",
            "图片",
            "贴吧",
            "知道",
            "新闻",
            "地图",
            "更多>>"
        ],
        "specialSearch" : [
            "精灵王子进军中国",
            "千余人疑顶替高考",
            "比伯巡演发生意外",
            "假和尚到江西行骗",
            "小学生吐槽父亲",
            "水库炸出1吨巨蟒",
            "iphone6侵权",
            "6旬阿姨像少女",
            "网红露真容变路人",
            "小伙玩网游脚腐烂"
        ],
        "hotsearchtop" : [
            "",
            "天气",
            "NBA",
            "高考查分",
            "好声音节目名停用",
            "欧洲杯",
            "陈冠希发飙",
            "林志玲师姐暴毙",
            "翁虹谈三级片",
        ]

    }
})
.addView("search" , function (model , template){
    //1
    var dom = $('<div class="search" id="search"></div>');
    //2
    var data = model.get("search");
    //3.创建模板字符串
    var tpl = [
        '<div class="logo">',
            '<h1><a href="javascript:;">百度</a></h1>',
        '</div>',
        '<div class="input-shadow">',
            '<a href="javascript:;" class="web">{#chooseSearch#}<i></i></a>',
            '<ul class="list">{#list#}</ul>',
            '<input type="text" />',
            '<span>5</span>',
            '<div class="btn"><a href="javascript:;">百度一下</a></div>',
            '<div class="down_news">',
                '<ul>{#news_list#}</ul>',
            '</div>',
            '<div class="hotsearchtop">',
                '<ul>{#hots_list#}</ul>',
            '</div>',
        '</div>',

        '<div class="new">',
            '<a href="javascript:;">揭黄渤的真实身份惊人</a>',
            '<span></span>',
        '</div>'
    ].join("");
    var listTpl = '<li><a href="javascript:;">{#key#}</a></li>';
    var news_listTpl = '<li><em></em><a href="javascript:;">{#num#}</a></li>';
    var hots_listTpl = '<li><a href="javascript:;">{#con#}</a></li>';
    //定义模板字符串
    var html = listHtml = news_listHtml = hots_listHtml  = "";
    //格式化模板字符串
    for (var i = 0; i < data.data.normalSearch.length; i++){
        listHtml += template(listTpl , {
            key : data.data.normalSearch[i]
        })
    }

    for (var i = 0; i < data.data.specialSearch.length; i++){
        news_listHtml += template(news_listTpl , {
            num : data.data.specialSearch[i]
        })
    }

    for (var i = 0; i < data.data.hotsearchtop.length; i++){
        hots_listHtml += template(hots_listTpl , {
            con : data.data.hotsearchtop[i]
        })
    }

    html = template( tpl , {
        news_list : news_listHtml,
        list : listHtml,
        hots_list : hots_listHtml,
        chooseSearch : data.data.normalSearch[0]
    })

    //输出到页面
    dom.html(html).appendTo("#app");
    //返回dom
    return dom;
})
.addCtrl("search" , function (model , view , observer){
    var dom = view.create("search");

    // 给li下面的em添加数字
    var len = $(".down_news ul li").length;
    for(var i = 1 ; i <= len; i++){
        $(".down_news ul li").eq(i-1).children('em').html(i);
    }

    $(".down_news ul li:lt(3)").children('em').addClass("em");
    $(".down_news ul li:lt(5)").children('a').addClass("xin");

    //交互，添加绑定事件
    $(".search .new").mouseenter(function(){
        $(this).children('span').show();
    }).mouseleave(function(){
        $(this).children('span').hide();
    })

    $(".input-shadow .web").click(function(){
        if($(this).children('i').hasClass("up")){
            $(this).children('i').removeClass("up");
        }else{
            $(this).children('i').addClass("up"); 
        }

        if($(this).siblings('ul').hasClass("open")){
            $(this).siblings('ul').removeClass("open");
        }else{
            $(this).siblings('ul').addClass("open");
        }
    })

    $(".input-shadow .list li").eq(0).addClass("cur");
    $(".input-shadow .list li:lt(8)").click(function(){
        var value = $(this).children('a').html();
        $(".input-shadow .web").html(value + "<i></i>");
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).parent().removeClass('open');
    })
    
    //点击页面任何一个除了ul的位置都应该让ul隐藏
    $(document).click(function(e){  
        var b =  $(".input-shadow .web")[0] === e.target;
        var aa = $.contains( $(".input-shadow .web")[0] , e.target) || b;
        // console.log(aa);
        
        if($(".input-shadow .list").hasClass("open") && !aa){
            $(".input-shadow .list").removeClass("open");
        }
        if($(".input-shadow .web i").hasClass("up") && !aa){
            $(".input-shadow .web i").removeClass("up");
        }

    })

    $(".input-shadow span").click(function(){
        if($(this).hasClass("span")){
            $(this).removeClass('span');
            $(this).html("5");
            $(this).siblings('.down_news').hide();
        }else{
            $(this).html("");
            $(this).addClass("span");
            $(this).siblings('.down_news').show();
        }
        
    })

    $(document).click(function(e){  
        var bb =  $(".input-shadow span")[0] === e.target;
        var aaa = $.contains( $(".input-shadow span")[0] , e.target) || bb;
        // console.log(aaa);
        
        if($(".input-shadow span").hasClass("span") && !aaa){
            $(".input-shadow span").removeClass("span").html('5');
            $(".input-shadow .down_news").hide();
        }
        
    })
    
})
})