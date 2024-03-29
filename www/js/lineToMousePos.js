let s = {
    w: 530,
    h: 250,
    mx: 530/2,
    my: 250/2
};

function setupCanvas(w, h) {
    var canvas = document.getElementById("line2mouse");
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas.getContext("2d");
}

function hud(ctx, x, y) {
    ctx.fillStyle = "rgb(100, 100, 100)";
    ctx.fillRect(0, s.h - (8 * 3), s.w, s.h);

    ctx.font = "10px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("(" + [x, y] + ")", 8, s.h - 8);
}

function line(ctx, x1, y1, x2, y2) {
    ctx.save();
    ctx.strokeStyle = "steelblue";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

function clear(ctx) {
    // low opacity for ghosting effect
    ctx.fillStyle = "rgb(200, 200, 200)";
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
    line(ctx, s.w / 2, s.h / 2, s.mx, s.my);
    circle(ctx, s.w / 2, s.h / 2, 4);
    circle(ctx, s.mx, s.my, 4);
    hud(ctx, s.mx, s.my);
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
