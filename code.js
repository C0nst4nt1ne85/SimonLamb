var on = false;
var mode = "normal";
var score;
var pcTunes = [];
var playerTunes = [];
var player= false;
var turn;

const green =  new Audio("audio/e.wav");
const red = new Audio("audio/d.wav");
const blue = new Audio("audio/c.wav");
const yellow =new Audio("audio/g.wav");
const beep = new Audio("audio/beep.wav");
const error = new Audio("audio/error.wav");
const win = new Audio("audio/win.wav");

$(window).ready(function () {
    
    $("#onOff").mousedown(function () {
        buttons($(this).attr("value"));
    });

    $("input").mousedown(function () {
        mode = $(this).attr("value");
    });

})


function buttons(val) {
    switch (val) {
        case "power":
            beep.play();
            if (!on) {
                on = true;
                game();
            } else {
                on = false;
                restart();
            }
            break;

        case "green":
        case green:
            if (on) {
                $("#green").css("background", "#0ef47d");
                green.play();
                var greenIn = window.setInterval(function () {
                    $("#green").css("background", "#044f28");
                    clearInterval(greenIn);
                }, 1200);
            }
            break;

        case "red":
        case red:
            if (on) {
                $("#red").css("background", "#f70000");
                red.play();
                var redIn = window.setInterval(function () {
                    $("#red").css("background", "#510000");
                    clearInterval(redIn);
                }, 1200);
            }
            break;

        case "yellow":
        case yellow:
            if (on) {
                $("#yellow").css("background", "#ffd402");
                yellow.play();
                var yellowIn = window.setInterval(function () {
                    $("#yellow").css("background", "#7f6a01");
                    clearInterval(yellowIn);
                }, 1200);
            }
            break;

        case "blue":
        case blue:
            if (on) {
                $("#blue").css("background", "#2237f4");
                blue.play();
                var blueIn = window.setInterval(function () {
                    $("#blue").css("background", "#090e42");
                    clearInterval(blueIn);
                }, 1200);
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
    var playerTunes = [];
    if (mode == "lamb") {
        pcTunes = [green, red, blue, red, green, green, green, red, red, red, green, yellow, yellow, green, red, blue, red, green, green, green];
    } else {
        let selector;
        for (let i = 0; i < 20; i++) {
            selector = Math.floor(Math.random() * Math.floor(4));
            switch (selector) {
                case 0:
                    pcTunes.push(green);
                    break;

                case 1:
                    pcTunes.push(red);
                    break;

                case 2:
                    pcTunes.push(yellow);
                    break;

                case 3:
                    pcTunes.push(blue);
                    break;
                }
        }
    }
    turn = 0;
    pcTurn(turn);
}

function pcTurn(turn) {
    let i = 0;
    if (turn > 3) {
        $("#counter").html("Victory");
        win.play();
    } else {
        $("#counter").html("Counter: " + turn);
        let pcSong = window.setInterval(function () {
            buttons(pcTunes[i]);
            if (i >= turn) {
                clearInterval(pcSong);
                playerTurn(turn);
            }
            i++;
        }, 1500);
    }
}

function restart() {
    $("body").css("background", "#264653");
    $("#onOff").css("background", "url(/img/off.png) no-repeat");
    $(".mode").css("visibility", "visible");
    $("#counter").css("visibility", "hidden");
    pcTunes = [];
    playerTunes= [];
}

function playerTurn(turn) {
    player = true;
    playerTunes = [];
    let i = 0;
    $(".colors").mousedown(function () {
        playerTunes.push(eval($(this).attr("value")));
        buttons($(this).attr("value"));
        if (playerTunes[i] == pcTunes[i]) {
            if (turn == i) {
                turn++;
                $(".colors").off("mousedown");
                pcTurn(turn);
            } else {
                i++;
            }
        } else {
            $("#counter").html("Wrong!!!");
            error.play();
            var delay = window.setInterval(function () {
                if (mode != "strict") {
                    $(".colors").off("mousedown");
                    pcTurn(turn);
                } else {
                    turn = 0;
                    $(".colors").off("mousedown");
                    game();
                }
                clearInterval(delay);
            }, 1000);
        }
    });
}