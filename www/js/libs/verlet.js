class Verlet {
    constructor(options) {
        this.p = {};

        this.setX(options.x || 0);
        this.setY(options.y || 0);

        this.vx = options.vx || 0;
        this.vy = options.vy || 0;

        this.r = options.r || 4;
        this.padding = 2;

        this.ctx = options.ctx;
        this.circle = new Circle(this.ctx, 0, 0, this.r, options.color || "white", options.isDraggable || false);

        this.acceleration = options.acceleration || new Vector(0, 0);
        this.MAX_VELOCITY = 4;

        this.mass = options.mass || Math.random() * 10 + 5;
        this.gravity = Force.gravity(this);
        this.dead = options.dead || false;
    }
    bounce() {
        let w = this.ctx.canvas.width;
        let h = this.ctx.canvas.height;
        if (this.x < this.r + this.padding) {
            this.x = this.r + this.padding;
            this.vx *= -1;
        }
        if (this.x > w - this.r - this.padding) {
            this.x = w - this.r - this.padding;
            this.vx *= -1;
        }
        if (this.y < this.r + this.padding) {
            this.y = this.r + this.padding;
            this.vy *= -1;
        }
        if (this.y > h - this.r - this.padding) {
            this.y = h - this.r - this.padding;
            this.vy *= -1;
        }
    }
    wrap() {
        let w = this.ctx.canvas.width;
        let h = this.ctx.canvas.height;
        if (this.x < -this.r)     this.x =  this.r + w;
        if (this.x >  this.r + w) this.x = -this.r;
        if (this.y < -this.r)     this.y =  this.r + h;
        if (this.y >  this.r + h) this.y = -this.r;
    }
    die() {
        let w = this.ctx.canvas.width;
        let h = this.ctx.canvas.height;
        if (    this.x >  this.r + w ||
                this.x < -this.r     ||
                this.y >  this.r + h ||
                this.y < -this.r    ) this.dead = true;
    }
    applyForce(v) {
        return this.acceleration.add(v.clone().scale(1/this.mass));
    }

    get vx()      { return this.x - this.p.x; }
    get vy()      { return this.y - this.p.y; }

    set vx(value) { this.p.x = this.x - value; }
    set vy(value) { this.p.y = this.y - value; }

    setX(value)   { this.x = value; this.p.x = value; }
    setY(value)   { this.y = value; this.p.y = value; }

    cachePos() { this._p = { x: this.x, y: this.y }; }
    setCachedPos() { this.p = this._p; }

    update(options = { random: false, friction: false, gravity: false, limit: 10, edgeStrategy: "bounce" }) {
        if (!this.dead) {
            if (options.gravity) this.applyForce(this.gravity);
            this.vx += this.acceleration.x;
            this.vy += this.acceleration.y;
            this.cachePos();
            this.x += this.vx;
            this.y += this.vy;
            this.setCachedPos();
            if (options.edgeStrategy) this[options.edgeStrategy]();
            else this.die();
            this.acceleration.zero();
        } else {
            this.setX(this.ctx.canvas.width/2);
            this.setY(this.ctx.canvas.height/2);
            this.vx = (Math.random() * 8 - 4) * 2;
            this.vy = (Math.random() * 8 - 4) * 2;
            this.circle.r = this.r = Math.random() * 8 + 1;
            let grey = (Math.random() * 200 + 55) | 0;
            this.circle.c = "rgba("+[grey, grey, grey, Math.min(1, Math.random() + 0.1)]+")" ;
            this.dead = false;
        }
    }
    render() {
        if (!this.dead) {
            this.circle.position.x = this.x;
            this.circle.position.y = this.y;
            this.circle.render();
        }
    }
}

window.VerletParticle = Verlet;
