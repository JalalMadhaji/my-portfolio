$(document).ready(function() {
    setTimeout(function() {
        $("canvas#canvas2").fadeOut("slow");
        move();
        $("canvas#canvas").fadeIn("slow");
        $(".all").fadeIn("slow");
    }, 5000);
    $(".menu .bars").click(function() {
        if ($(window).innerWidth() < 1000) {
            $(".menu nav").toggleClass("open-nav");
            $(".menu .bars").toggleClass("opened");
        }
    });
    $(window).resize(function() {
        $(".menu nav").removeClass("open-nav");
    });

    // toggle hide and show the sections
    $(".menu nav a").each(function(i) {
        $(this).click(function(e) {
            $(".menu nav").removeClass("open-nav");
            if (i == 1) {
                $(".bar span")
                    .delay(500)
                    .queue(function() {
                        $(this).css("width", $(this).attr("data-value") + "%");
                    });
            }
            $("main > div").each(function() {
                $(this).css("display", "none");
            });
            $(".menu nav a").each(function() {
                $(this).removeClass("active");
            });
            e.preventDefault();
            let index = $(this)
                .attr("href")
                .indexOf(".");
            let theID = $(this)
                .attr("href")
                .substring(0, index);
            $(this).addClass("active");
            $(`main div#${theID}`).fadeIn("slow");
        });
    });
    $("#cntct").click(function(e) {
        e.preventDefault();
        $(".menu nav a").removeClass("active");
        $(".menu nav a#ct").addClass("active");
        $(".main-hero").css("display", "none");
        $("#contact").fadeIn("slow");
    });
    $(".hero .dots .dot").each(function(i) {
        $(this).click(function(e) {
            $(".main-hero .left").each(function() {
                $(this).css("display", "none");
            });
            $(".hero .dots .dot").each(function() {
                $(this).removeClass("active");
            });
            // console.log($(this).attr("data-power"));
            $(this).addClass("active");
            let theID = $(this).attr("data-value");
            $(`.hero div#${theID}`).fadeIn("slow");
            $(".right .progress span").css(
                "width",
                $(this).attr("data-power") + "%"
            );
            $(".right .up #currentIndex").text(`0${i + 1}`);
            $(".right .up #currentIndex-s").text(i + 1);
        });
    });
    $("a#view-profile").click(function(e) {
        e.preventDefault();
        $("#index").css("display", "none");
        $("#profile").fadeIn("slow");
    });
});
