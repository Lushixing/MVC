//依赖 MVC jquery slider.css
define(['MVC' , 'jquery' , 'css!modules/slider/slider.css'] , function (MVC , $){
    MVC
.addModel("slider" , {
    data : [
        {
            "icon": "01.png",
            "iconTitle": "萌主页",
            "title": "当女孩遇到熊",
            "content": "深山里有萝莉出没",
            "img": "01.png"
        },
        {
            "icon": "02.jpg",
            "iconTitle": "动漫",
            "title": "会说话的汤姆猫",
            "content": "汤姆猫给你讲故事",
            "img": "02.png"
        },
        {
            "icon": "03.png",
            "iconTitle": "LOL直播",
            "title": "中单蚂蚱输出爆炸",
            "content": "JY解说",
            "img": "03.jpg"
        },
        {
            "icon": "04.png",
            "iconTitle": "景点门票",
            "title": "厦门方特梦幻王国",
            "content": "跟着跑男一起狂欢",
            "img": "04.jpg"
        },
        {
            "icon": "05.png",
            "iconTitle": "hao到家",
            "title": "美食送到家",
            "content": "吃货福音私人订制",
            "img": "05.png"
        }
    ]
})
.addView("slider" , function (model , template){
    //1.定义容器
    var dom = $('<div class="slider" id="slider"></div>');
    //2.获取数据
    var data = model.get("slider");
    //3.定义模板
    var tpl = [
        '<div class="container"><ul>{#list#}</ul></div>',
        '<div class="arrow"></div>'
    ].join("");  //这个是数组，我们需要的是字符串，所以调用join方法
    var liTpl = [
        '<li>',
            '<img src="img/slider_icon_{#icon#}" alt="" />',
            '<p>{#iconTitle#}</p>',
            '<div>',
                '<img src="img/slider_img_{#img#}" alt="" />',
                '<h4>{#title#}</h4>',
                '<p>{#content#}</p>',
            '</div>',
        '</li>'
    ].join("");

    //4.定义模板字符串
    var html = liHtml = '';
    //5.格式化模板
    for(var i = 0; i < data.data.length; i++){
        liHtml += template(liTpl , data.data[i]);
    }
    html = template(tpl , {
        list : liHtml
    })

    //6.插入到页面中
    dom.html(html);
    dom.appendTo("body");
    return dom;
})  
.addCtrl("slider" , function (model , view){
    var dom = view.create("slider");
    //添加箭头按钮的交互
    dom.delegate(".arrow" , "click" , function(){
        //当按钮有close，说明现在是关闭状态，此时点击就要显示容器，并将close按钮的类取消掉
        if($(this).hasClass("close")){
            //取消close
            $(this).removeClass("close");
            //将容器显示出来
            dom.find(".container").animate({"marginLeft":0},200);
        }else{
            //否则没有close类，说明此时是打开状态，此时点击就要隐藏容器，并添加close类
            //添加close
            $(this).addClass("close");
            //将容器隐藏
            dom.find(".container").animate({"marginLeft":"-50px"},200);
        }
    })
})
})