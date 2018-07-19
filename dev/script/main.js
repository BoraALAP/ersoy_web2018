const app = {};

app.result = [];

app.imageCreater = (classes = "img_box",url,description, alt_des, collection = "moon") => {
    const $img_container = $(".img_container");

    let markup = `
        <div class="${classes}">
            <img class="img" alt="${alt_des}" src="assets/img/${url}.jpeg"/>
            <div class="detail_box"><p>${description}</p></div>
        </div> `

    $img_container.append(markup);            
};

app.imageRunner = (res, collection = "expression") => {
    res.forEach(painting => {
        if(painting.collection === collection){
            app.imageCreater(painting.classes, painting.url, painting.description);
        }
    }); 
};

app.getJSON = () => {
    $.ajax({
        url: "./public/js/painting_list.json",
        dataType: "json",
        success: function(res) {
            app.result = [...res.paintings]
            app.imageRunner(app.result);
        }
    });
};

app.displayCollection = () => {
    console.log(this)
}

app.events = () => {

    const $header = $(".enterence");
    const $page_container = $(".page_container");
    const $img_container = $(".img_container");
    const nav = document.querySelectorAll(".navigation button");
    // const buttons = nav.
///////// Activating Animation on scroll
    
    nav.forEach((button) => {
        button.addEventListener("click", function(){
            $img_container.empty();
            $('html, body').animate({scrollLeft: 0}, 600);
            app.imageRunner(app.result, this.dataset.collection);
        })
    })

    $(window).scroll(function(e) {
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
///////// Activating Animation on scroll End

    $("#info svg").click(function() {
        if($(window).scrollLeft() + $(window).width() >= $(document).width() - 500 ){    
            $('html, body').animate({scrollLeft: 0}, 1000);
        }
    });

    $("#description-btn").click(function() {
        if (screen.width >= 768) {
            $('html, body').animate({scrollLeft: $("#description").offset().left}, 2500);
        } else {
            $('html, body').animate({scrollTop: $("#description").offset().top}, 2500);
        }
    });


};
 

app.init = () => {

    const $header = $(".enterence");
    const $page_container = $(".page_container");
    
///////// Page Load Animation
    $header.addClass("enterence_open");
    $page_container.addClass("img_load_animation");
///////// Page Load Animation End
    
    app.getJSON();

/////// Horizontal Scrolling  
    var controller = new ScrollMagic.Controller({vertical:false});
/////// Horizontal Scrolling End

    $(window).scroll(function(e, delta) {
        $(window).scrollLeft -= (delta * 40);
        e.preventDefault();
    });   

}

$(function() {
    app.init();
    app.events();
});



