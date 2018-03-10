/*
* @Author: Marte
* @Date:   2018-03-08 09:49:39
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-10 17:40:55
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
         *     鼠标滑过显示二级菜单
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


        /*
         *  实现 导航 页面内跳转
         *  回到顶部
         *
         */
        $(function(){
            $(".sideNav").on('click', '> li', function(event) {
                event.preventDefault();
                // 给当前的元素加上类名
                $(".sideNav>li").each(function(){
                    $(this).removeClass('curren');
                })
                $(this).addClass('curren');
                $(".floorHeader").each(function(){
                    $(this).removeClass("curren");
                })
                $($(".floorHeader")[$(this).index()]).addClass('curren');

                var scrollToWhere =  $($(".floorHeader")[$(this).index()]).offset().top - 130 + "px";
                $("body").animate({
                    scrollTop: scrollToWhere},
                    300, function() {
                });
            });
            // allCate
            $(".allCate").on('click', '> li', function(event) {
                event.preventDefault();
                // 给当前的元素加上类名
                $(".allCate>li").each(function(){
                    $(this).removeClass('curren');
                })
                $(this).addClass('curren');
                $(".floorHeader").each(function(){
                    $(this).removeClass("curren");
                })
                $($(".floorHeader")[$(this).index()]).addClass('curren');

                var scrollToWhere =  $($(".floorHeader")[$(this).index()]).offset().top - 130 + "px";
                $("body").animate({
                    scrollTop: scrollToWhere},
                    300, function() {
                });
            });

            // 页面滚动时 判断对应的nav.curre显示
            $(window).scroll(function(event) {
                var hideHeight = $(document).scrollTop();
                var nowArr =[];
                $(".floorHeader").each(function(){
                    // 判断当前谁在可视区范围
                    // 元素顶端到可见区域顶端的距离  <= 浏览器可见区域高度
                    // console.log($(this).offset().top, $(window).height());
                        if( $(this).offset().top >= $(window).scrollTop() && $(this).offset().top < ($(window).scrollTop()+$(window).height() ) ){
                            // 不知道该如何判断
                            nowArr.push(Number($(this).attr("data-id")));
                            console.log(nowArr);
                        }
                })
            });

            //回到顶部
            $(".goToTop").click(function(event) {
                $("body").animate({scrollTop: 0 },300)
            });
        })





    })
})