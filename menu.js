/*$(function() {
    setTimeout(() => {

    }, Math.floor(Math.random() * 50000) + 30000); //30sec to 50sec
});*/

$(document).ready(function () {
    ChangeCarouselSelecteditem(0);
});

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

/* Carousel */
class CarouselItem {
    selected = 0;
    length = 0;

    constructor(selected, length) {
        this.selected = selected;
        this.length = length;
    }

    get selected() { return this.selected };
    get length() { return this.length };

    get getTableOfActiveItemsIndex() {
        let table = [
            this.GetIndexOfPrevious(2),
            this.GetIndexOfPrevious(1),
            this.selected,
            this.GetIndexOfNext(1),
            this.GetIndexOfNext(2)
        ];
        return table;
    }

    GetIndexOfNext(count) {
        let indexOfNext = this.selected;
        for (let i = 0; i < count; i++) indexOfNext = (indexOfNext + 1 > this.length ? 1 : indexOfNext + 1);
        return indexOfNext;
    }

    GetIndexOfPrevious(count) {
        let indexOfPrev = this.selected;
        for (let i = 0; i < count; i++) indexOfPrev = (indexOfPrev - 1 < 1 ? this.length : indexOfPrev - 1);
        return indexOfPrev;
    }

    ChangeSelected(number) {
        if (number > 0) this.selected = this.GetIndexOfNext(1);
        else if (number < 0) this.selected = this.GetIndexOfPrevious(1);
    }
}

let carouselItemsData = [
    { img: "carTemp1.png", text: "Obrazek #1 z wieżowcami" },
    { img: "carTemp2.png", text: "Obrazek #2 z nowoczesnym blokiem" },
    { img: "carTemp3.png", text: "Obrazek #3 z salonem aut" },
    { img: "carTemp4.png", text: "Obrazek #4 z oszklonym biurowcem" },
    { img: "carTemp5.png", text: "Obrazek #5 z modernistyczną willą" },
    { img: "", text: "Obrazek #6" },
    { img: "", text: "Obrazek #7" },
];
const carouselItems = new CarouselItem(3, carouselItemsData.length)

function ChangeCarouselSelecteditem(direction) {
    carouselItems.ChangeSelected(direction);

    $(".carouselSelected").removeClass("carouselSelected");
    $(".carouselNext").removeClass("carouselNext").unbind('click');
    $(".carouselPrevious").removeClass("carouselPrevious").unbind('click');
    $(".carousel" + carouselItems.selected).addClass("carouselSelected");
    $(".carousel" + carouselItems.GetIndexOfNext(1)).addClass("carouselNext").click(function () { ChangeCarouselSelecteditem(1) });
    $(".carousel" + carouselItems.GetIndexOfPrevious(1)).addClass("carouselPrevious").click(function () { ChangeCarouselSelecteditem(-1) });
    $("#carousel-info").html(carouselItemsData[carouselItems.selected - 1].text);

    let activeItemsId = carouselItems.getTableOfActiveItemsIndex;
    for (let i = 0; i < 5; i++) {
        let itemPiority = i - 2;
        let itemPiorityAbs = Math.abs(itemPiority);
        $(".carousel" + activeItemsId[i]).css({
            transform: `translateX(${400 * (itemPiority > 0 ? 1 : (itemPiority < 0 ? -1 : 0))}px) scale(${1 - 0.2 * itemPiorityAbs})`,
            opacity: itemPiorityAbs < 2 ? 1 : 0,
            "z-index": itemPiorityAbs * -1,
        });
    }

    let indexOfNew, indexOfRemoved;
    if (direction == 0) {
        indexOfNew = carouselItems.selected;
        indexOfRemoved = carouselItems.selected;
        for (let i = carouselItems.selected - 1; i < carouselItems.selected + 3; i++) {
            $(".carousel" + i).css("background-image", `url("Images/carousel/${carouselItemsData[i - 1].img == "" ? "temp.png" : carouselItemsData[i - 1].img}")`);
        }
    } else {
        indexOfNew = direction < 0 ? carouselItems.GetIndexOfPrevious(2) : carouselItems.GetIndexOfNext(2);
        indexOfRemoved = direction < 0 ? carouselItems.GetIndexOfNext(3) : carouselItems.GetIndexOfPrevious(3);
    }

    $(".carousel" + indexOfRemoved).removeClass("carousel" + indexOfRemoved).addClass("carousel" + indexOfNew).css("background-image", `url("Images/carousel/${carouselItemsData[indexOfNew - 1].img == "" ? "temp.png" : carouselItemsData[indexOfNew - 1].img}")`);
}
