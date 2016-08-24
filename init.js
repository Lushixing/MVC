require.config({
    //定义jquery和MVC目录
    paths : {
        jquery : 'js/jquery-1.12.3.min',
        MVC : 'js/MVC'
    },
    //引入css插件
    map : {
        '*' : {
            css : 'js/css'
        }
    }
})

//处理main入口
require(['modules/main'] , function (main){
    main();
})