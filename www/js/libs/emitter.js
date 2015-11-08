class Emitter {
    constructor(options) {

        this.ctx = options.ctx;
        this.total = options.total || 0;
        this.position = options.position ||
            new Vector(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
        this.velocity = options.velocity || new Vector(0, 0);
        this.massRange = [4, 8];
        this.gravity = options.gravity || false;
        this.particles = [];
        this.stream = options.stream || false;
        this.streamCounter = 0;
        this.streamThreshold = 3;

        for (var i = 0; i < this.total; i++) {

            let grey = (Math.random() * 200 + 55) | 0;
            let m = (Math.random() * this.massRange[1]) | 0 + this.massRange[0];

            this.particles.push(new VerletParticle({
                    ctx: this.ctx,
                    x: -m * 2, y: -m,
                    mass: m,
                    color: "rgba("+[grey, grey, grey, Math.min(1, Math.random() + 0.1)]+")",
                    r: m,
                    dead: false
                }));
        }
    }
    wakeParticle() {
        if (++this.streamCounter > this.streamThreshold) {
            this.streamCounter %= this.streamThreshold;
            for (let particle of this.particles) {
                if (particle.dead) {
                    particle.setX(this.position.x);
                    particle.setY(this.position.y);
                    particle.vx = this.velocity.x + Math.random() * 6 - 3;
                    particle.vy = this.velocity.y + Math.random() * 8 - 4;
                    particle.dead = false;
                    return;
                }
            }
        }
    }
    update(callback) {
        if (this.stream) this.wakeParticle();
        this.particles.forEach(p => {
            if (typeof callback === "function") callback(p);
            p.update({
                gravity: this.gravity,
                edgeStrategy: "die"
            });
        });
    }
    render() {
        this.particles.forEach(p => {
            if (!p.dead) p.render();
        });
    }
}

window.Emitter = Emitter;
