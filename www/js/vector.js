class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    get mag() {
        return Math.sqrt(this.magSq);
    }
    get magSq() {
        return this.x * this.x + this.y * this.y;
    }
    setMag(mag) {
        this.normalize().scale(mag);
        return this;
    }
    normalize() {
        var m = this.mag;
        this.x /= m;
        this.y /= m;
        return this;
    }
    scale(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    toString() {
        return `<${this.x}, ${this.y}>`;
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
}

// export class globally
window.Vector = Vector;
