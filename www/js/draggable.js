class Draggable {
    constructor(ctx, x, y, r) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isDragging = false;
        this.setupMouseEvents(ctx.canvas);
    }
    setupMouseEvents(canvas) {
        canvas.onmousemove = e => {
            if (this.isDragging) {
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
        };
        canvas.onmousedown = e => {
            var dist = distance([this.x, this.y], [e.offsetX, e.offsetY]);
            if (dist < this.r) {
                this.isDragging = e.button === 0;
                this.ctx.canvas.classList.add("dragging");
            }
        };
        canvas.onmouseup = e => {
            this.isDragging = false;
            this.ctx.canvas.classList.remove("dragging");
        };
    }
}

class Circle extends Draggable {
    constructor(ctx, x, y, r) { super(ctx, x, y, r); }
    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r + (this.isDragging ? 2 : 0), 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.stroke();
    }
}

class Canvas {
    constructor(selector, w, h) {
        this.selector = selector;
        this.w = w;
        this.h = h;
        this.ctx = this.getCanvas().getContext("2d");
        this.circle = new Circle(this.ctx, this.w/2, this.h/2, 10);
    }
    getCanvas() {
        var canvas = null;
        if (!this.ctx) {
            canvas = document.getElementById(this.selector);
            canvas.setAttribute("width", this.w);
            canvas.setAttribute("height", this.h);
        }
        return canvas;
    }
    line(x1, y1, x2, y2) {
        this.ctx.save();
        this.ctx.strokeStyle = "steelblue";
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.restore();
    }
    clear() {
        this.ctx.fillStyle = "rgba(250, 250, 250, 1)";
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
    circle(x, y, r) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.fill();
    }
    draggableCircle() {
        this.circle.render();
    }
    render() {
        this.clear();
        this.draggableCircle();
    }
}

function distance(posA, posB) {
    let x = posB[0] - posA[0], y = posB[1] - posA[1];
    return Math.sqrt(x * x + y * y);
}

const init = () => {
    let canvas = new Canvas("draggable", 530, 250),
        step = () => {
            requestAnimationFrame(step);
            canvas.render();
        };
    requestAnimationFrame(step);
};

init();
