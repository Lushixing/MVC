define(['MVC' , 'jquery' , 'css!modules/content/main.css'] , function (MVC , $){
    MVC
.addModel('main_right' , {
    
})
.addView('main_right' , function (model , template){
     //1
    var dom = $('<div class="main_right" id="main_right"></div>');
    //2
    var data = model.get('main_right');
    //3创建模板字符串
    var tpl = [
        '<div class="main_right01">',
            '<div class="main_right_t">',
                '<ul>{#topNav#}</ul>',
            '</div>',
            '<div class="line"></div>',
            '<div class="main_right_b">',
                '<ul>{#bottomNav#}</ul>',
            '</div>',
        '</div>',
        '<div class="adbar">',
            '<ul>{#adbar#}</ul>',
        '</div>',
        '<div class="guesslikelink">',
            '<i class="left"></i>',
            '<i class="right"></i>',
            '<div class="guesslikelink01">',
                '<a href="https://game.hao123.com/" target="_block">游戏</a>',
                '<ul>{#guesslikelink01#}</ul>',
                '<span>换一换</span>',
            '</div>',
            '<div class="guesslikelink02">',
                '<a href="http://go.hao123.com/?tn=cnxh" target="_block">热门</a>',
                '<ul>{#guesslikelink02#}</ul>',
                '<span>换一换</span>',
            '</div>',
             '<div class="guesslikelink03">',
                '<a href="http://tejia.hao123.com/?tn=zjl" target="_block">购物</a>',
                '<ul>{#guesslikelink03#}</ul>',
                '<span>换一换</span>',
            '</div>',
        '</div>'
    ].join('');
    var listTopTpl = '<li><i></i><a href="{#src#}" target="_block">{#topNav#}</a><span>•</span><a href="{#src01#}" target="_block">{#topNav01#}</a></li>';
    var listBottomTpl = '<li><a href="{#src_b#}" target="_block">{#bottomNav#}</a><span>•</span><a href="{#src_b01#}" target="_block">{#bottomNav01#}</a></li>';

    var listLikeTpl = '<li><a href="{#src#}" target="_block">{#like#}</a></li>';
    
    var listAdbarTpl = '<li><a href="{#src#}" target="_block">{#title#}</a></li>';

    //定义模板字符串
    var html = listTopHtml = listBottomHtml = listLikeHtml = listLikeHtml01 = listLikeHtml02 = listAdbarHtml = '';
    //格式化模板字符串
    for(var i = 0; i < data.topNav.length; i++){
        listTopHtml += template(listTopTpl , {
            src : data.topNav[i].src,
            topNav : data.topNav[i].word,
            src01 : data.topNav[i].src01,
            topNav01 : data.topNav[i].word01
        })
    }

    for(var i = 0; i < data.bottomNav.length; i++){
        listBottomHtml += template(listBottomTpl , {
            src_b : data.bottomNav[i].src,
            bottomNav : data.bottomNav[i].word,
            src_b01 : data.bottomNav[i].src01,
            bottomNav01 : data.bottomNav[i].word01
        })
    }

    for(var i = 0; i < data.guesslikelink01.length; i++){
        listLikeHtml += template(listLikeTpl , {
            src : data.guesslikelink01[i].src,
            like : data.guesslikelink01[i].word
        })
    }
    for(var i = 0; i < data.guesslikelink02.length; i++){
        listLikeHtml01 += template(listLikeTpl , {
            src : data.guesslikelink02[i].src,
            like : data.guesslikelink02[i].word
        })
    }
    for(var i = 0; i < data.guesslikelink03.length; i++){
        listLikeHtml02 += template(listLikeTpl , {
            src : data.guesslikelink03[i].src,
            like : data.guesslikelink03[i].word
        })
    }

    for(var i = 0; i < data.data_adbar.length; i++){
        listAdbarHtml += template(listAdbarTpl , {
            src : data.data_adbar[i].src,
            title : data.data_adbar[i].title
        })
    }
    // console.log(listTopHtml);
    html = template(tpl , {
        topNav : listTopHtml,
        bottomNav : listBottomHtml,
        guesslikelink01 : listLikeHtml,
        guesslikelink02 : listLikeHtml01,
        guesslikelink03 : listLikeHtml02,
        adbar : listAdbarHtml
    })

    //输出到页面
    dom.html(html).appendTo('#main');
    //返回dom
    return dom;
    
})
.addCtrl('main_right' , function (model , view , observer){
    var data = null;
    //ajax
    $.get('data/mainRight.json' , function (res){
        if(res.errno == 0){
            model.add('main_right' , res.data);
            dom = view.create("main_right");
            //事件绑定
            // bindEvent();
        }
    })
})
})