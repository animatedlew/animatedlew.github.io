
class Line {
    constructor(ctx, weakeningDistance, options = { lineWidth: 2 }) {
        this.weakeningDistance = weakeningDistance;
        this.ctx = ctx;
        this.lineWidth = options.lineWidth;
    }
    draw(x1, y1, x2, y2, c) {
        this.ctx.save();
        this.ctx.strokeStyle = c || "steelblue";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.restore();
    }
    render(x1, y1, x2, y2, color) {
        const a = new Vector(x1, y1);
        const b = new Vector(x2, y2);
        var c = a.clone().sub(b);
        var opacity = 1 - c.mag / this.weakeningDistance;
        opacity = Math.max(Math.min(opacity, 1), 0);
        c.add(a);
        this.draw(a.x, a.y, b.x, b.y, color || `rgba(0, 0, 0, ${opacity})`);
    }
}

window.Line = Line;
