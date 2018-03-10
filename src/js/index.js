/*
* @Author: Marte
* @Date:   2018-03-08 09:49:39
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-10 14:49:05
*/

'use strict';


// 渲染页面的菜单
require(["config"], function(){
    require(["jquery", "template"],function($,template){
        $.getJSON("/mock/list.json", function(data){

            let rendDate = {data : data.menus};
            //取得需要渲染的  楼层  数据

            let html = template("floor", rendDate);
            $(".floor").html(html);
        })

        $.getJSON("/mock/list.json",function(data){
            let msg = { data : data.menus };
            let html = template("side_nav",msg);
            $(".sideNav").html(html);
            $(".allCate").html(html);
        })


        /*
         * 滚动触发元素显示隐藏
         *     搜索栏吸顶
         *
         *
         */
        // 搜索栏吸顶
        var sortBoxOffsetTop = $(".sortBox").offset().top;
        $(window).scroll(function() {
            var sortBoxClientHeight = sortBoxOffsetTop - $(window).scrollTop();
            //  搜索栏距浏览器的高度 = 搜索栏距文档的高度 - 窗口滚动的高度
            if( sortBoxClientHeight <= 0  ){
                $(".sortBox").addClass('sortBoxOnTop');
                $(".floorBox").addClass("floorBoxMT");
                // 显示侧边导航
                $(".sideNav").slideDown();
                // 回到顶部的盒子显示
                $(".goto").fadeIn();
            }else{
                $(".sortBox").removeClass('sortBoxOnTop');
                $(".floorBox").removeClass("floorBoxMT");
                // 隐藏侧边导航
                $(".sideNav").slideUp();
                $(".goto").fadeOut();
            }

        });
        // 鼠标悬停所有商品显示二级菜单
        $(".searchBar").on('mouseenter', '>li', function(event) {
            $(this).children('ul').stop(true,false).slideDown('200');
        });
        $(".searchBar").on('mouseleave', '>li', function(event) {
            $(this).children('ul').stop(true,false).slideUp('200');
        });









    })
})