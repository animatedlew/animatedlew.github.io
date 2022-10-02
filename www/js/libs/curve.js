export default class Curve {
    constructor(options) {
        let o = { x: 0, y: 0 };
        this.ctx = options.ctx;
        this.p0 = options.p0 || o;
        this.p1 = options.p1 || o;
        this.p2 = options.p2 || o;
        this.p3 = options.p3 || o;
        this.color = options.color || "steelblue";
        this.lineWidth = this.lineWidth || 4;
        this.step = options.step || 1/20;
    }
    cubicBezier(t, d) {
        let [p0, p1, p2, p3] = [this.p0[d], this.p1[d], this.p2[d], this.p3[d]];
        let term3 = Math.pow(1 - t, 3) * p0;
        let term2 = 3 * Math.pow(1 - t, 2) * t * p1;
        let term1 = 3 * (1 - t) * t * t * p2;
        let term0 = t * t * t * p3;
        return  term3 + term2 + term1 + term0;
    }
    cubicBezier2D(t) {
        return {
            x: this.cubicBezier(t, 'x'),
            y: this.cubicBezier(t, 'y')
        };
    }
    update(options) {
        let o = { x: 0, y: 0 };
        this.p0 = options.p0 || o;
        this.p1 = options.p1 || o;
        this.p2 = options.p2 || o;
        this.p3 = options.p3 || o;
        this.step = options.step || 1/20;
    }
    render() {
        this.ctx.save();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.p0.x, this.p0.y);
        for (let t = 0; t <= 1; t += this.step) {
            let p = this.cubicBezier2D(t);
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.stroke();
        this.ctx.restore();
    }
}
