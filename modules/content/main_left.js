define(['MVC' , 'jquery' , 'css!modules/content/main.css'] , function (MVC , $){
    MVC
.addModel('main' , {
    toptab_nav : [
        "推荐",
        "社会",
        "娱乐",
        "军事",
        "旅游",
        "财经",
        "汽车",
        "体育"
    ],
    listNew : [
        {
            "words" : "王石曾得朱镕基赏识 拒绝薄熙来邀请 ",
            "src" : "http://www.2258.com/news/view/246658"
        },
        {
            "words" : "985、211将废 有非211院校入列重点",
            "src" : "http://hot.ynet.com/3.1/1606/29/11433104.html"
        },
        {
            "words" : "湖北厅官买车送情人 情人跟别人私奔",
            "src" : "http://society.cnr.cn/news1/20160629/t20160629_522525951.html?hao123"
        },
        {
            "words" : "记者逼女实习生开房 事后微信转2千",
            "src" : "http://www.cankaoxiaoxi.com/tuigao/hao123/20160629/1210960.shtml"
        },
        {
            "words" : "男子砍伤9人判死刑 8受害人请求免死",
            "src" : "http://www.cankaoxiaoxi.com/tuigao/hao123/20160629/1210960.shtml"
        },
        {
            "words" : "丈夫欲霸王硬上弓 被妻子用长袜勒死",
            "src" : "http://www.cankaoxiaoxi.com/tuigao/hao123/20160629/1210960.shtml"
        }
    ]
})
.addView('main' , function (model , template){
    //1
    var dom = $('<div class="main" id="main"></div>');
    //2
    var data = model.get('main');
    //3.创建模板字符串
    var tpl = [
        '<div class="main_left">',
            '<div class="starbar">',
                '<ul>{#starbar#}</ul>',
            '</div>',
            '<div class="box_startools">',
                '<i></i>',
                '<div>{#box_startools#}</div>',
                '<em></em>',
            '</div>',
            '<div class="toptab">',
                '<div class="toptab_nav">',
                    '<ul>{#toptab_nav#}</ul>',
                    '<i></i>',
                '</div>',
                '<div class="Img">',
                    '<img src="img/dd.jpg" alt="" />',
                '</div>',
                '<div class="listNew">',
                    '<ul>{#listNew#}</ul>',
                '</div>',
            '</div>',
        '</div>',
    ].join('');
    var listTpl = '<li><i></i><a href="{#src#}" target="_block">{#key#}</a><span>|</span><a href="{#src_one#}" target="_block">{#key_one#}</a></li>';
    var listBoxTpl = '<a href="{#src_own#}" target="_block">{#key_own#}</a>';

     var listNavTpl = '<li><a href="javascript:;">{#nav#}</a><span></span></li>';
     var listNewTpl = '<li><a href="{#src#}">{#new#}</a></li>';
    // 定义模板字符串
    var html = listHtml = listBoxHtml = listNavHtml = listNewHtml = '';
    //格式化模板字符串
    for(var i = 0; i < data.data.length; i++){
        listHtml += template(listTpl , {
            key : data.data[i].key,
            src : data.data[i].src,
            key_one : data.data[i].key_one,
            src_one : data.data[i].src_one
        })

        listBoxHtml += template(listBoxTpl , {
            key_own : data.data[i].key_own,
            src_own : data.data[i].src_own
        })
    }
    // console.log(data.toptab_nav.length);
    for(var i = 0; i < data.toptab_nav.length; i++){
        listNavHtml += template(listNavTpl , {
            nav : data.toptab_nav[i]
        })
    }
    for(var i = 0; i < data.listNew.length; i++){
        listNewHtml += template(listNewTpl , {
            src : data.listNew[i].src,
            new : data.listNew[i].words
        })
    }

    html = template( tpl , {
        starbar : listHtml,
        box_startools : listBoxHtml,
        toptab_nav : listNavHtml,
        listNew : listNewHtml
    })

    //输出到页面
    dom.html(html).appendTo("#app");
    //返回dom
    return dom;
})
.addCtrl('main' , function (model , view , observer){
    var data = null;
    $.get('data/mainLeftTop.json' , function (res){
        if(res.errno == 0){
            model.add('main.data' , res.data);
            dom = view.create("main");
            //事件绑定
            bindEvent();
        }
    })

    function bindEvent(){
        $(".box_startools em").click(function(){
            if($(this).hasClass('open')){
                //如果em有open类，说明此时是打开状态，需要关闭，反之需要打开
                $(this).removeClass('open');
                $('.box_startools a:nth-child(n+6)').hide();
            }else{
                $(this).addClass('open');
                $('.box_startools a:nth-child(n+6)').show();
            }
        })

        $('.toptab_nav i').click(function(){
            // console.log(111111)
            if($(this).hasClass('open')){
                //有open类说明是打开状态，此时需要关闭，反之需要打开
                $(this).removeClass('open');
                $('.toptab_nav li:nth-child(n+6)').hide();
            }else{
                 $(this).addClass('open');
                $('.toptab_nav li:nth-child(n+6)').show();
            }
        })
    }

    $(document).click(function(e){  
        var bb =  $(".toptab_nav i")[0] === e.target;
        var aaa = $.contains( $(".toptab_nav i")[0] , e.target) || bb;
        // console.log(aaa);
        
        if($(".toptab_nav i").hasClass("open") && !aaa){
            $(".toptab_nav i").removeClass("open")
            $('.toptab_nav li:nth-child(n+6)').hide();
        }
        
    })
})
})