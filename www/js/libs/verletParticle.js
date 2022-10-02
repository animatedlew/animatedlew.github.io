import Circle from "./circle.js";
import Vector from "./vector.js";
import Force from "./force.js";

export default class VerletParticle {
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

    update(options = {
        random: false,
        friction: false,
        gravity: false,
        respawn: null,
        limit: 10,
        edgeStrategy: "bounce"
    }) {
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
            if (options.respawn) {
                this.setX(options.respawn.x);
                this.setY(options.respawn.y);
                this.vx = options.respawn.vx;
                this.vy = options.respawn.vy;
                this.dead = false;
            }
            // possibly remove particle from array, based on a setting
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
