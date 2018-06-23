const app = {}

app.imageCreater = (classes = "img_box",url,description) => {
    const $img_container = $(".img_container");

    let markup = `
        <div class="${classes}">
            <img class="img" src="assets/img/${url}.jpg"/>
            <div class="detail_box"><p>${description}</p></div>
        </div> `

    $img_container.append(markup);            
}

app.imageRunner = (res) => {
    // console.log(res)
    for (let i = 0; i < res.length; i++){
       app.imageCreater(res[i].classes, res[i].url, res[i].description) 
    }  
}

app.getJSON = () => {
    $.ajax({
        url: "./public/js/painting_list.json",
        dataType: "json",
        success: function(res) {
            app.imageRunner(res.paintings);
        }
    });
}

app.events = () => {
///////// Activating Animation on scroll
    
    $(window).scroll(function() {
        const $header = $(".enterence");
        const $page_container = $(".page_container");
        const scroll = $(window).scrollLeft();
        if (scroll >= 20) {
            $header.removeClass('enterence_open').addClass("enterence_short");
            $page_container.addClass("enterence_short_img");
            // $("#triangle").css("animation-play-state", "paused");
            // $('.svg').prop('disabled', true);
        } else {
            $header.removeClass("enterence_short").addClass('enterence_open');
            $page_container.removeClass("enterence_short_img");
            // $("#triangle").css("animation-play-state", "running");
            // $('.svg').prop('disabled', false); 
        }
    });
///////// Activating Animation on scroll End

    $("#info svg").click(function() {
        if($(window).scrollLeft() + $(window).width() >= $(document).width() - 500 ){
            
            $('html, body').animate({scrollLeft: 0}, 1000);
            return false;
        }
    });


};

app.hittingLeft = () => {
    $(window).scroll(function() {
        if($(window).scrollLeft() + $(window).width() >= $(document).width() - 500 ){
            
            $("#info p em").text("back to beginning");
            $("#info svg").attr('transform', 'rotate(180)');
            
            $('.svg').prop('disabled', false); 

        } else {
            $("#info p em").text("scroll horizontally");
            $("#info svg").attr('transform', 'rotate(0)');
            $('.svg').prop('disabled', true); 

        }
    });
}
    

app.init = () => {

    const $header = $(".enterence");
    const $page_container = $(".page_container");
    
///////// Page Load Animation
    $header.addClass("enterence_open");
    $page_container.addClass("img_load_animation");
///////// Page Load Animation End
    
    app.getJSON();
    app.hittingLeft();

///////// Horizontal Scrolling  
    let controller = new ScrollMagic.Controller({vertical:false});

    // init ScrollMagic Controller
    
    // var scene = new ScrollMagic.Scene({
    //   triggerElement: '#end'
    // })
    //  // Add Scene to ScrollMagic Controller
    // .on("mouseover mouseout", function() {
    //     console.log("boom");
    // })
    // .addTo(controller);

    

    // controller.addScene([
    //   scene
    // ]);
///////// Horizontal Scrolling End
    
    
}

$(function() {
    app.init();
    app.events();
});


