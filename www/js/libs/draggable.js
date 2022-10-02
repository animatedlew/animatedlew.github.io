import Vector from './vector.js';

export default class Draggable {
    constructor(ctx, x, y, r, isDraggable) {
        this.ctx = ctx;
        this.r = r;
        this.position = new Vector(x, y);
        if (isDraggable) this.setupMouseEvents(ctx?.canvas);
    }
    setupMouseEvents(canvas) {
        if (canvas) {
        this.isDragging = false;
        canvas.addEventListener("mouse.down", e => {
            var dist = Vector.distance(this.position, e.detail.mouse);
            if (dist <= this.r) {
                this.isDragging = e.detail.button === 0;
                this.ctx.canvas.classList.add("dragging");
            }
        }, false);
        canvas.addEventListener("mouse.move", e => {
            if (this.isDragging) this.position = e.detail.mouse;
        }, false);
        canvas.addEventListener("mouse.up", e => {
            this.isDragging = false;
            this.ctx.canvas.classList.remove("dragging");
        }, false);
        }
    }
}
