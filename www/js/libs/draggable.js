class Draggable {
    constructor(ctx, x, y, r) {
        this.ctx = ctx;
        this.r = r;
        this.position = new Vector(x, y);
        this.setupMouseEvents(ctx.canvas);
    }
    setupMouseEvents(canvas) {
        this.isDragging = false;
        canvas.onmousemove = e => {
            if (this.isDragging) {
                this.position.x = e.offsetX;
                this.position.y = e.offsetY;
            }
        };
        canvas.onmousedown = e => {
            var dist = Vector.distance(this.position, new Vector(e.offsetX, e.offsetY));
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

window.Draggable = Draggable;
