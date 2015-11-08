class Liquid {
    constructor(options) {
        this.ctx = options.ctx;
        this.p0x = options.p0x || 0;
        this.p0y = options.p0y || 0;
        this.p1x = options.p1x || 0;
        this.p1y = options.p1y || 0;
    }
    contains(x, y) {
        return x > this.p0x && x < this.p1x && y > this.p0y && y < this.p1y;
    }
    drag(particle, c = 0.3) {
        let velocity = new Vector(particle.vx, particle.vy);
        let speed = velocity.mag;
        let dragMag = c * speed * speed;
        return velocity.clone().reverse().setMag(dragMag);
    }
    render() {
        this.ctx.save();
        this.ctx.fillStyle = "rgba(0, 0, 128, 0.3)";
        this.ctx.fillRect(this.p0x, this.p0y, this.p1x - this.p0x, this.p1y - this.p0y);
        this.ctx.restore();
    }
}

window.Liquid = Liquid;
