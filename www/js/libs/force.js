const G = 1;

class Force {
    static gravitate(a, b) {
        let force = a.position.clone().sub(b.position);
        let m = (G * a.mass * b.mass) / force.magSq;
        force.setMag(m).limit(0.5);
        a.applyForce(force.clone().reverse());
        b.applyForce(force.clone());
    }
}

window.Force = Force;
