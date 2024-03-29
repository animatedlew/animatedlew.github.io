import Draggable from "./draggable.js";

export default class Circle extends Draggable {
    constructor(ctx, x, y, r, c, isDraggable = true) {
        super(ctx, x, y, r, isDraggable);
        this.c = c;
    }
    render() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.arc(this.position.x, this.position.y, this.r + (this.isDragging ? 2 : 0), 0, 2 * Math.PI);
            this.ctx.fillStyle = this.c || "steelblue";
            this.ctx.lineWidth = 2;
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
}
