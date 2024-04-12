/*$(function() {
    setTimeout(() => {

    }, Math.floor(Math.random() * 50000) + 30000); //30sec to 50sec
});*/

window.onscroll = function (e) {
    /*let logo = $("#menu-icon");
    if (window.scrollY > 260) logo.addClass("menu-icon_hidden_bg");
    else logo.removeClass("menu-icon_hidden_bg");*/

    let scissorsIcon = $(".scissors i");
    let scissorsPosY = $(".scissors hr").position().top - 220;
    let scrollY = window.scrollY;
    if (scrollY > scissorsPosY - 720 && scrollY < scissorsPosY) {
        scissorsIcon.css("left", `${(scissorsPosY - scrollY) / 8}%`);
    }

    let galleryposY = $("#galery-view").position().top - 450;
    if (scrollY > galleryposY) $("#galery-view-title").addClass("galery-title-popup");
    else $("#galery-view-title").removeClass("galery-title-popup");
}

$("#menu-icon").on("click", function () {
    $("#menu-bar").removeClass("menu-bar-hidden");
});

$("#menu-bar-close-icon").on("click", function () {
    $("#menu-bar").addClass("menu-bar-hidden");
});