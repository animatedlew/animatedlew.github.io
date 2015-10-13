class Canvas {
    constructor(selector, w, h) {
        this.selector = selector;
        this.w = w; this.h = h;
        this.ctx = this.getCanvas().getContext("2d");
        this.mouse = new Vector(this.w/2, this.h/2);
        this.setupEvents(this.ctx.canvas);
    }
    setupEvents(canvas) {
        canvas.onmousedown = e => {
            this.mouse.x = e.offsetX; this.mouse.y = e.offsetY;
            this.ctx.canvas.classList.add("dragging");
            canvas.dispatchEvent(new CustomEvent("mouse.down", {
                detail: { button: e.button, mouse: this.mouse.clone() }
            }));
        };
        canvas.onmousemove = e => {
            this.mouse.x = e.offsetX; this.mouse.y = e.offsetY;
            canvas.dispatchEvent(new CustomEvent("mouse.move", {
                detail: { button: e.button, mouse: this.mouse.clone() }
            }));
        };
        canvas.onmouseup = e => {
            this.mouse.x = e.offsetX; this.mouse.y = e.offsetY;
            this.ctx.canvas.classList.remove("dragging");
            canvas.dispatchEvent(new CustomEvent("mouse.up", {
                detail: { button: e.button, mouse: this.mouse.clone() }
            }));
        };
    }
    getCanvas() {
        var canvas = null;
        if (!this.ctx) {
            canvas = document.getElementById(this.selector);
            canvas.width = this.w; canvas.height = this.h;
        }
        return canvas;
    }
    line(x1, y1, x2, y2, c) {
        this.ctx.save();
        this.ctx.strokeStyle = c || "steelblue";
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.restore();
    }
    hud(x, y, d) {
        this.ctx.fillStyle = "rgb(100, 100, 100)";
        this.ctx.fillRect(0, this.h - (8 * 3), this.w, this.h);

        this.ctx.font = "10px Verdana";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`(${[x|0, y|0]}) - M: ${(d * 100) | 0}%`, 8, this.h - 8);
    }
    clear() {
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
    circle(x, y, r) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#FFF";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.fill();
    }
    render() {}
}

window.Canvas = Canvas;
