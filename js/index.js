$(function () {

    NProgress.start();
    NProgress.configure({ easing: 'ease', speed: 500 });

    // 点击导航事件
    $("#category").on("click","li", function () {
        $("#category li").each(function () {
            $(this).removeClass("active");
        })
        $(this).addClass("active");
        // 获取当前楼层名
        var floorId = $(this).attr("id");
        var floorName = floorId + "Item";
        // 获取楼层高度
        var floorTop = $("#" + floorName).offset().top;
        // console.log(floorTop);
        $('html,body').stop().animate({
            scrollTop: floorTop
        }, 800);

    });


    $(window).scroll(function () {
        // 获取屏幕滚动的高度
        var top = $('html,body').scrollTop() || $(window).scrollTop();

        $("#mainContent > div").each(function () {
            // 获取当前盒子在浏览器的高度
            var floorHight = $(this).offset().top;
            // 获取当前楼层id
            var floorName = $(this).attr("id");
            var floorId = floorName.substring(0,floorName.length-4);
            // 设置楼层高度范围
            var floorTop =  floorHight;
            var floorFoot = floorHight + $("#"+floorId).height();
            if (top >= floorTop && top <= floorFoot) {
                $("#category li").each(function () {
                    $(this).removeClass("active");
                })
                $("#"+floorId).addClass("active");
            }
        })

    });

    // $.ajax({
    //     type: "get",
    //     url: "../data/FrontEndNav.json",
    //     dataType: "json",
    //     success: function (res) {
    //         var categoryHTML = template("CategoryId",{list:res});
    //         var navItemHTML = template("navItemId",{list:res});
    //         $('#category > ul').html(categoryHTML);
    //         $("#mainContent").html(navItemHTML);
    //     }
    // });
    $.getJSON("https://raw.githubusercontent.com/Hulkye/FrontEndNav/master/data/db.json", (res)=>{
            var categoryHTML = template("CategoryId",{list:res});
            var navItemHTML = template("navItemId",{list:res});
            $('#category > ul').html(categoryHTML);
            $("#mainContent").html(navItemHTML);

            Echo.init({
                offset: 0,
                throttle: 500
            });
            $("img").on("load",()=>{
                NProgress.done();
            })
        }
    );

    
});