(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {
        const app = {};

        app.result = [];

        app.imageCreater = (classes = "img_box", url, description, alt_des, collection = "moon") => {
            const $img_container = $(".img_container");

            let markup = `
        <div class="${classes}">
            <img class="img" alt="${alt_des}" src="assets/img/${url}.jpeg"/>
            <div class="detail_box"><p>${description}</p></div>
        </div> `;

            $img_container.append(markup);
        };

        app.imageRunner = (res, collection = "expression") => {
            res.forEach(painting => {
                if (painting.collection === collection) {
                    app.imageCreater(painting.classes, painting.url, painting.description);
                }
            });
        };

        app.getJSON = () => {
            $.ajax({
                url: "./public/js/painting_list.json",
                dataType: "json",
                success: function (res) {
                    app.result = [...res.paintings];
                    app.imageRunner(app.result);
                }
            });
        };

        app.displayCollection = () => {
            console.log(this);
        };

        app.events = () => {

            const $header = $(".enterence");
            const $page_container = $(".page_container");
            const $img_container = $(".img_container");

            const nav = document.querySelectorAll(".navigation button");
            // const buttons = nav.
            ///////// Activating Animation on scroll

            const img_boxes = document.querySelectorAll(".img_box");
            function listenTransition(collectionName) {
                $img_container.empty();
                app.imageRunner(app.result, collectionName);
            }

            nav.forEach(button => {
                button.addEventListener("click", function () {
                    $('html, body').animate({ scrollLeft: 0 }, 600);
                    const data = this.dataset.collection;
                    listenTransition(data);

                    // if(window.location.pathname === "/about.html"){
                    //     window.location.href = "/";
                    // } else {
                    // }
                });
            });

            $(window).scroll(function (e) {
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

                if ($(window).scrollLeft() + $(window).width() >= $(document).width() - 500) {
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

            $("#info svg").click(function () {
                if ($(window).scrollLeft() + $(window).width() >= $(document).width() - 500) {
                    $('html, body').animate({ scrollLeft: 0 }, 1000);
                }
            });

            $("#description-btn").click(function () {
                if (screen.width >= 768) {
                    $('html, body').animate({ scrollLeft: $("#description").offset().left }, 2500);
                } else {
                    $('html, body').animate({ scrollTop: $("#description").offset().top }, 2500);
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
            var controller = new ScrollMagic.Controller({ vertical: false });
            /////// Horizontal Scrolling End

            $(window).scroll(function (e, delta) {
                $(window).scrollLeft -= delta * 40;
                e.preventDefault();
            });
        };

        $(function () {
            app.init();
            app.events();

            function after_form_submitted(data) {
                if (data.result == 'success') {
                    $('form#reused_form').hide();
                    $('#success_message').show();
                    $('#error_message').hide();
                } else {
                    $('#error_message').append('<ul></ul>');

                    jQuery.each(data.errors, function (key, val) {
                        $('#error_message ul').append('<li>' + key + ':' + val + '</li>');
                    });
                    $('#success_message').hide();
                    $('#error_message').show();

                    //reverse the response on the button
                    $('button[type="button"]', $form).each(function () {
                        $btn = $(this);
                        label = $btn.prop('orig_label');
                        if (label) {
                            $btn.prop('type', 'submit');
                            $btn.text(label);
                            $btn.prop('orig_label', '');
                        }
                    });
                } //else
            }

            $('#reused_form').submit(function (e) {
                e.preventDefault();

                $form = $(this);
                //show some response on the button
                $('button[type="submit"]', $form).each(function () {
                    $btn = $(this);
                    $btn.prop('type', 'button');
                    $btn.prop('orig_label', $btn.text());
                    $btn.text('Sending ...');
                });

                $.ajax({
                    type: "POST",
                    url: 'mail.php',
                    data: $form.serialize(),
                    success: after_form_submitted,
                    dataType: 'json'
                });
            });
        });
    }, {}] }, {}, [1]);