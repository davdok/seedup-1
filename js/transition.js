'use strict';

var onlineTest = document.getElementById('onlineTest');
var reverseCss = document.getElementById('reverseCss');

// pokemon animation

var c = document.getElementById("cvs"),
    ctx = c.getContext("2d"),
    caseNumber = 14,
    ratio = 5.2,
    recWidth = c.offsetWidth / caseNumber,
    recHeight = c.offsetHeight / caseNumber * ratio,
    mult = 3.5;

if (window.matchMedia("(max-width: 1200px)").matches && document.body.offsetWidth >= 992) {
    recHeight = c.offsetHeight / (caseNumber / 3);
} else if (window.matchMedia("(max-width: 992px)").matches) {
    recHeight = c.offsetHeight / (caseNumber / 5);
}

ctx.canvas.width = document.body.clientWidth;
ctx.canvas.height = document.body.clientHeight;

var sign = 1,
    num = 0,
    obj = { x: caseNumber / 2 - 1, y: caseNumber / 2 },
    arr = [{ x: caseNumber / 2 - 1, y: caseNumber / 2 }];

Array(Math.round(caseNumber * mult)).fill().map(function (_, i) {
    sign = [1, 2].includes(i % 4) ? -1 : 1;
    num += i % 2 === 0 ? 1 : 0;
    Array(num).fill().map(function (_) {
        return arr.push({ x: obj.x += i % 2 === 0 ? sign * 1 : 0,
            y: obj.y += i % 2 === 0 ? 0 : sign * 1 });
    });
});

function normal() {
    var split = document.getElementsByClassName('secondPart');
    var ul = document.getElementsByClassName('secondPart');
    var cat = document.getElementsByClassName('category');
    reverseCss.disabled = true;

    var max = 0;
    for (var i = 0; i < split.length; i++) {
        var newHeight = split[i].offsetHeight;
        if (newHeight > max) {
            max = newHeight;
        }
    }

    for (var _i = 0; _i < split.length; _i++) {
        split[_i].style.height = max + "px";
        var _ul = split[_i].getElementsByTagName('ul')[0];
        _ul.style.position = "absolute";
        _ul.style.bottom = "0";
        var category = cat[_i].offsetLeft;
        _ul.style.left = category + "px";
    }
}

function reverse() {
    reverseCss.disabled = false;
    var split = document.getElementsByClassName('secondPart');
    var ul = document.getElementsByClassName('secondPart');
    var cat = document.getElementsByClassName('category');
    onlineTest.style.display = 'none';

    var max = 0;
    for (var i = 0; i < split.length; i++) {
        var newHeight = split[i].offsetHeight;
        if (newHeight > max) {
            max = newHeight;
        }
    }

    for (var _i2 = 0; _i2 < split.length; _i2++) {
        split[_i2].style.height = max + "px";
        var _ul = split[_i2].getElementsByTagName('ul')[0];
        _ul.style.position = "absolute";
        _ul.style.bottom = "0";
        _ul.style.textAlign = "right";
        var category = cat[_i2].offsetLeft;
        _ul.style.right = category + "px";
    }
}

onlineTest.onclick = function () {
    ctx.canvas.width = document.body.clientWidth;
    ctx.canvas.height = document.body.clientHeight;
    c.style.zIndex = 9999;
    var pokemonSound = new Audio('http://localhost/pokemon.mp3');
    pokemonSound.play();
    document.body.style.overflowY = "hidden";
    setTimeout(function () {
        return fillIt(50, 0, function () {
            reverse();
            document.body.style.overflowY = "auto";
            document.getElementById('onRecrute').innerHTML = '<p>Choisis <span class="red"> ton profile ! </span></p>';
            setTimeout(function () {
                c.style.opacity = 0;
                c.style.zIndex = -1;
            }, 300); 
        });   
    }, 300);
    addClickEvent();
    window.location = "http://recrutement.seed-up.org/";
};

var addClickEvent = function addClickEvent() {

    return Array.from(document.getElementsByClassName('splitContainer')).forEach(function (el, i) {
        return el.onclick = function (e) {
            return window.location = "http://recrutement.seed-up.org/2?profile=" + el.getElementsByClassName('category')[0].innerHTML.trim().toLowerCase();
        };
    });
};
var fill = function fill(x, y, i) {
    ctx.fillStyle = "rgb(" + i * 10 + "," + i * +"," + 1.5 * i + ")";
    if (window.matchMedia("(max-width: 1200px)").matches && document.body.offsetWidth >= 992) {
        ctx.fillRect(x * recWidth, y * recHeight / 3 + document.body.scrollTop / 2, recWidth + 10, recHeight + 10);
    } else if (window.matchMedia("(max-width: 992px)").matches) {
        ctx.fillRect(x * recWidth, y * recHeight / 2 + document.body.scrollTop / 2 - 700, recWidth + 10, recHeight + 50);
    } else {
        ctx.fillRect(x * recWidth, y * recHeight + document.body.scrollTop / 2, recWidth + 10, recHeight + 10);
    }
};

var fillIt = function fillIt(wait, i, cb) {
    fill(arr[i].x, arr[i].y, i);
    if (i < arr.length - 1) setTimeout(function () {
        return fillIt(wait - 1, i + 1, cb);
    }, wait);else cb();
};

normal();
addClickEvent();