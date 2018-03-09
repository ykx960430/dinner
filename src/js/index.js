/*
* @Author: Marte
* @Date:   2018-03-08 09:49:39
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-09 21:00:05
*/

'use strict';


// 渲染页面的菜单
require(["config"], function(){
    require(["jquery", "template"],function($,template){
        $.getJSON("/mock/list.json", function(data){

            let rendDate = {data : data.menus};//取得需要渲染的  楼层  数据
            // rendDate1 = {cate : menus};//取得需要渲染的  菜品 数据

            let html = template("floor", rendDate);
            $(".floor").html(html);
        })


        /*
         * 滚动触发元素显示隐藏
         *     搜索栏吸顶
         *
         *
         */
        // 搜索栏吸顶
        $(window).scroll(function() {
            console.log($(".sortBox").offset().top);//得到的是距离文档的高度
            if( $(".sortBox").offset().top <= 0 ){
                $(".sortBox").css({"position": "fixed"});
                console.log("111");
            }

        });









    })
})