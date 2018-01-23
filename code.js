var on = false;
var mode = "normal";
var score;

const green =  new Audio("audio/e.wav");
const red = new Audio("audio/d.wav");
const blue = new Audio("audio/c.wav");
const yellow =new Audio("audio/g.wav");



$(window).ready(function () {

    $("button").click(function () {
        buttons($(this).attr("value"));
    });

    $("input").click(function () {
        mode = $(this).attr("value");
    });

})


function buttons(val) {
    switch (val) {
        case "power":
            if (!on) {
                on = true;
                game();
            } else {
                on = false;
                restart();
            }
            break;

        case "green":
            if (on) {
                $("#green").css("background", "#0ef47d");
                green.play();
                var greenIn = window.setInterval(function () {
                    $("#green").css("background", "#044f28");
                }, 1000);
            }
            break;

        case "red":
            if (on) {
                $("#red").css("background", "#f70000");
                red.play();
                var greenIn = window.setInterval(function () {
                    $("#red").css("background", "#510000");
                }, 1000);
            }
            break;

        case "yellow":
            if (on) {
                $("#yellow").css("background", "#ffd402");
                yellow.play();
                var greenIn = window.setInterval(function () {
                    $("#yellow").css("background", "#7f6a01");
                }, 1000);
            }
            break;

        case "blue":
            if (on) {
                $("#blue").css("background", "#2237f4");
                blue.play();
                var greenIn = window.setInterval(function () {
                    $("#blue").css("background", "#090e42");
                }, 1000);
                break;
            }
            break;
    }
}

function game() {
    $("body").css("background", "#61b3d3");
    $("#onOff").css("background", "url(/img/on.png) no-repeat");
    $(".mode").css("visibility", "hidden");
    $("#counter").css("visibility", "visible");
    switch (mode) {
        case "lamb":
            lambPlay();
            break;

        case "normal":
            normalPlay();
            break;

        case "strict":
            strictPlay();
            break;
    }
}

function restart() {
    $("body").css("background", "#264653");
    $("#onOff").css("background", "url(/img/off.png) no-repeat");
    $(".mode").css("visibility", "visible");
    $("#counter").css("visibility", "hidden");
}

function lambPlay() {
    const lambSong = [green, red, blue, red, green, green, green, red, red, red, green, yellow, yellow, green, red, blue, red, green, green, green];
    let i = 0;
    var song = window.setInterval(function () {
        lambSong[i].play();
        i++;
        if (i >= 20) {
            clearInterval(song);
        }
    }, 1000)
}

function normalPlay() {
    console.log("Normal");
}

function strictPlay() {
    console.log("Strict");
}