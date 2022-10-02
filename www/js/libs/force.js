import Vector from "./vector.js";
import Utils from "./utils.js";

const G = 0.1; // Gravitational constant

export default class Force {
    static gravity(v) {
        return new Vector(0, v.mass); // ~9.8 m/s
    }
    static orbit(a, b) {
        let force = a.position.clone().sub(b.position);
        let distance = Utils.clamp(force.mag, 5, 10);
        let m = (G * a.mass * b.mass) / (distance * distance);
        return force.normalize().scale(m); // setMag
    }
    static gravitate(a, b) {
        let force = a.position.clone().sub(b.position);
        let m = (G * a.mass * b.mass) / force.magSq;
        force.setMag(m).limit(0.5);
        a.applyForce(force.clone().reverse());
        b.applyForce(force.clone());
    }
}
