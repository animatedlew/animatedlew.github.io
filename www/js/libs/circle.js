class Circle extends Draggable {
    constructor(ctx, x, y, r, c) { super(ctx, x, y, r); this.c = c;     }
    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.r + (this.isDragging ? 2 : 0), 0, 2 * Math.PI);
        this.ctx.fillStyle = this.c || "steelblue";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.fill();
    }
}

window.Circle = Circle;
