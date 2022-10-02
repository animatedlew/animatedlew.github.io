import Vector from './libs/vector.js';

let s = {
    w: 530,
    h: 250,
    mx: 530/2,
    my: 250/2
};

function setupCanvas(w, h) {
    var canvas = document.getElementById("distanceBehavior");
    canvas.width = w; canvas.height = h;
    return canvas.getContext("2d");
}

function hud(ctx, x, y, d) {

    ctx.fillStyle = "rgb(100, 100, 100)";
    ctx.fillRect(0, s.h - (8 * 3), s.w, s.h);

    ctx.font = "10px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText(`(${[x, y]}) - M: ${(d * 100) | 0}%`, 8, s.h - 8);
}

function line(ctx, x1, y1, x2, y2, c) {
    ctx.save();
    ctx.strokeStyle = c || "steelblue";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

function clear(ctx) {
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillRect(0, 0, s.w, s.h);
}

function circle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
}

function draw(ctx) {
    clear(ctx);

    let segLength = 50,
        weakeningDistance = 200;

    const o = new Vector(s.w, s.h).scale(0.5);
    const m = new Vector(s.mx, s.my);
    const c = m.clone().sub(o);
    var opacity = 1 - c.mag / weakeningDistance; // weakening distance
    opacity = Math.max(Math.min(opacity, 1), 0);
    c.add(m);

    line(ctx, m.x, m.y, o.x, o.y, `rgba(0, 0, 0, ${opacity})`);

    circle(ctx, o.x, o.y, 4);
    circle(ctx, m.x, m.y, 4);

    hud(ctx, m.x, m.y, opacity);
}

var init = function() {

    var ctx = setupCanvas(s.w, s.h);

    ctx.canvas.onmousemove = e => {
        s.mx = e.offsetX;
        s.my = e.offsetY;
    };

    window.requestAnimationFrame(function step() {
        window.requestAnimationFrame(step);
        draw(ctx);
    });

};

init();
