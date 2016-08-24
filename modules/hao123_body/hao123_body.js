define(['MVC' , 'jquery' , 'css!modules/hao123_body/hao123_body.css'] , function (MVC , $){
    MVC
.addModel("h_body" , {
    number : {
        "tit" : [
            "首页",
            "电视剧",
            "最新电影",
            "新闻头条",
            "八卦娱乐",
            "军事热点",
            "热门游戏",
            "小游戏",
            "今日特价",
            "特价旅游",
            "生活服务"
        ]
    }
    
})
.addView("h_body" , function (model , template){
    //1
    var dom = $('<div class="h_body" id="h_body"></div>');
    //2
    var data = model.get('h_body');
    // console.log(data)
    //3创建模板字符串
    var tpl = [
        '<div class="hd">',
            '<div class="hd_top">',
                '<ul>{#hd_top#}</ul>',
            '</div>',
            '<div class="hd_bottom">',
                '<ul>{#hd_bottom#}</ul>',
            '</div>',
        '</div>'
    ].join('');

    var listTopTpl = '<li><a href="javascript:;" target="_block">{#title#}</a><span></span></li>';
    var listBottomTpl = '<li><a href="{#src#}" target="_block">{#subtitle#}</a><span></span></li>';
    //定义模板字符串
    var html = listTopHtml = listBottomhtml = '';
    //格式化模板字符串
    for(var i = 0 ; i < data.number.tit.length; i++){
        listTopHtml += template(listTopTpl , {
            title : data.number.tit[i]
        })
    }
    for(var i = 0 ; i < data.data.length; i++){
        listBottomhtml += template(listBottomTpl , {
            src : data.data[i].src,
            subtitle : data.data[i].subtitle
        })
    }

    html = template(tpl , {
        hd_top : listTopHtml,
        hd_bottom : listBottomhtml
    })

    //输出到页面
    dom.html(html).appendTo("#app");
    //返回dom
    return dom;
})
.addCtrl("h_body" , function (model , view , observer){
    var dom = null;
    $.get('data/bodyNav.json' , function (res){
        if(res.errno == 0){
            model.add("h_body.data" , res.data);
            dom = view.create("h_body");
        }
    })
})
})