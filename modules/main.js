//定义main模块
//依赖模块有 MVC header slider  search hao123_body content
define(['MVC' , 'modules/header/header' , 'modules/slider/slider' , 'modules/search/search' , 'modules/hao123_body/hao123_body' , 'modules/content/main_left' , 'modules/content/main_right' , ] , function (MVC){

    function init(){
        MVC.install();
    }
    return init;
})