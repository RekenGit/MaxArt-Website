/*$(function() {
    setTimeout(() => {
        $('#menu-icon')
            .someCoolFunction()
            .anotherCoolFunction();
    }, Math.floor(Math.random() * 50000) + 30000); //30sec to 50sec
});*/

window.onscroll = function (e) {
    let logo = $("#menu-icon");
    if (window.scrollY > 260) logo.addClass("menu-icon_hidden_bg");
    else logo.removeClass("menu-icon_hidden_bg");
}

$("#menu-icon").on("click", function () {
    $("#menu-bar").removeClass("menu-bar-hidden");
});

$("#menu-bar-close-icon").on("click", function () {
    $("#menu-bar").addClass("menu-bar-hidden");
});