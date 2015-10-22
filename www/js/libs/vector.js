class Vector {
    constructor    (x, y) { this.x = x; this.y = y; }
    static dot     (a, b) { return a.x * b.x + a.y * b.y; }
    static angle   (a, b) { return Math.acos(a.dot(b)); }
    static distance(a, b) {
        let x = b.x - a.x, y = b.y - a.y;
        return Math.sqrt(x * x + y * y);
    }
    static periodic(a, b, t = 0.5) {
        return b.clone().sub(a).scale(t).add(a);
    }
    static midpoint(a, b) {
        return Vector.periodic(a, b);
    }
    static random2D() {
        return new Vector(Math.random() - Math.random(), Math.random() - Math.random());
    }
    reverse() { this.x = -this.x; this.y = -this.y; return this; }
    zero() { this.x = 0; this.y = 0; return this; }
    clone()     { return new Vector(this.x, this.y); }
    get rn()    { return new Vector(this.y, -this.x); }
    get ln()    { return new Vector(-this.y, this.x); }
    get mag()   { return Math.sqrt(this.magSq); }
    get magSq() { return this.x * this.x + this.y * this.y; }
    setMag(mag) { this.normalize().scale(mag); return this; }
    limit(mag) { if (mag < this.mag) this.setMag(mag); return this; }
    normalize() {
        var m = this.mag;
        if (m) { this.x /= m; this.y /= m; }
        else { this.x = 1; this.y = 0; }
        return this;
    }
    scale(f)    { this.x *= f; this.y *= f; return this; }
    add(v)      { this.x += v.x; this.y += v.y; return this; }
    sub(v)      { this.x -= v.x; this.y -= v.y; return this; }
    toString()  { return `<${this.x}, ${this.y}>`; }
}

// export class globally
window.Vector = Vector;
