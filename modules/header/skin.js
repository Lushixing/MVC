define(['MVC' , 'jquery'] , function (MVC , $){
    MVC
.addModel("skin" , {
    // chooseSkinId : "noSkin"
    chooseSkinId : "05"
})
.addView("skin" , function (model , template){
    //1
    var dom = $('<div class="skin" id="skin"></div>');
    //2
    var data = model.get("skin");
    //3
    var tpl = [
        '<div class="skin-header"><div class="container">',
            '<span class="tabs">最新推荐</span>',
            '<span class="no-use-btn">不使用皮肤</span>',
            '<span class="save-btn">保存</span>',
            '<span class="cancel-btn">取消</span>',
        '</div></div>',
        '<div class="skin-content">',
            '<ul class="container">{#skinList#}</ul>',
        '</div>'
    ].join("");
    var skinItem = '<li data-id="{#id#}"><img src="img/skin/{#src#}" alt="" /><p>{#title#}</p><i></i></li>';
    //4
    var html = skinItemsHtml = "";
    //5格式化模板字符串
    for(var i = 0; i < data.list.length; i++){
        skinItemsHtml += template(skinItem , data.list[i]);
    };
    html = template(tpl , {
        skinList : skinItemsHtml
    });
    //6
    dom.html(html);
    dom.prependTo("body");
    //7
    return dom;
})
.addCtrl("skin" , function (model , view , observer){
    var dom = null;
    var skinId = model.get("skin.chooseSkinId");
    //页面不存在我们就要创建一个页面
    function init(){
        $.get("data/imagelist.json"  , function (res){
            if(res.errno == 0){
                model.add("skin.list" , res.data);
                dom = view.create("skin");
                //绑定事件
                bindEvent();
                showSkin();
            }
        })
    }

    //为模块添加交互逻辑
    function bindEvent(){
        //点击保存按钮
        dom.delegate(".save-btn" , "click" , function(){
            observer.fire("closeSkinLayer")
        })
        .delegate(".cancel-btn" , "click" , function(){
            //点击取消按钮
            observer.fire("closeSkinLayer" , {
                notSaveSkin : true
            });
        })
        .delegate(".container li" , "click" , function(){
            //获取当前元素绑定的data-id属性
            var value = $(this).attr("data-id");
            //缓存该id
            skinId = value;
            setBodyBg(value);
        })
        //点击不使用皮肤按钮
        .delegate(".no-use-btn" , "click" , function(){
            skinId = "noSkin";
            setBodyBg(skinId);
        })
    }

    //设置页面背景的方法
    function setBodyBg(value){
        if(value == "noSkin"){
            $("body").css("background" , "#FAFAFA");
        }else{
            $("body").css("background" , "url(img/skin/big_" + value + ".jpg) no-repeat top center")
        }
    }

    //展示skin浮层
    function showSkin(){
        dom.slideDown();
    }
    //隐藏skin浮层
    function hideSkin(){
        dom.slideUp();
    }

    //注册打开页面的消息
    observer.regist("openSkinLayer" , function(){
        if(dom){
            showSkin()
        }else{
            init();
        }
        
    })
    .regist("closeSkinLayer" , function (data){
        //取消按钮
        if(data && data.data && data.data.notSaveSkin){

        }else{
            //点击保存或者换肤按钮
            model.add("skin.chooseSkinId" , skinId);
        }
        setBodyBg(model.get("skin.chooseSkinId"));
        hideSkin();
    })

    //渲染页面中的默认的图片
    setBodyBg(model.get("skin.chooseSkinId"));
})
})