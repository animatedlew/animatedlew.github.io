class Particle {
    constructor(options) {

        this.r = options.r || 4;
        this.padding = 2;
        this.ctx = options.ctx;
        this.circle = new Circle(this.ctx, 0, 0, this.r, "white", options.isDraggable || true);

        this.position = options.position || new Vector(0, 0);
        this.velocity = options.velocity || new Vector(0, 0);
        this.acceleration = options.acceleration || new Vector(0, 0);
        this.MAX_VELOCITY = 4;

        this.mass = options.mass || Math.random() * 10 + 5;
        this.gravity = new Vector(0, this.mass);
    }
    wrap() {
        if (this.position.x < -this.r)
            this.position.x = this.ctx.canvas.width + this.r;

        if (this.position.x > this.ctx.canvas.width + this.r)
            this.position.x = -this.r;

        if (this.position.y < -this.r)
            this.position.y = this.ctx.canvas.height + this.r;

        if (this.position.y > this.ctx.canvas.height + this.r)
            this.position.y = -this.r;
    }
    bounce() {
        if (this.position.x < this.r + this.padding) {
            this.position.x = this.r + this.padding;
            this.velocity.x *= -1;
        }

        if (this.position.x > this.ctx.canvas.width - this.r - this.padding) {
            this.position.x = this.ctx.canvas.width - this.r - this.padding;
            this.velocity.x *= -1;
        }

        if (this.position.y < this.r + this.padding) {
            this.position.y = this.r + this.padding;
            this.velocity.y *= -1;
        }

        if (this.position.y > this.ctx.canvas.height - this.r - this.padding) {
            this.position.y = this.ctx.canvas.height - this.r - this.padding;
            this.velocity.y *= -1;
        }
    }
    applyForce(v) {
        return this.acceleration.add(v.clone().scale(1/this.mass));
    }
    get friction() {
        return this.velocity.clone().reverse().normalize().scale(0.3);
    }
    get random() {
        return Vector.random2D().scale(20);
    }
    update(options = { random: false, friction: false, gravity: false, limit: 10, edgeStrategy: "bounce" }) {

        if (!this.circle.isDragging) {
            if (options.friction) this.applyForce(this.friction);

            if (options.random) this.applyForce(this.random);
            if (options.gravity) this.applyForce(this.gravity);

            this.velocity.add(this.acceleration);
            if (options.limit) this.velocity.limit(options.limit);
            
            this.position.add(this.velocity);

            if (options.edgeStrategy) this[options.edgeStrategy]();
            else this.bounce();
        }
        this.acceleration.zero();
    }
    render() {
        if (!this.circle.isDragging) this.circle.position = this.position.clone();
        else this.position = this.circle.position.clone();
        this.circle.render();
    }
}

window.Particle = Particle;
