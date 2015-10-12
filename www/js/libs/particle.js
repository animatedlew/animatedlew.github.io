class Particle {
    constructor(options) {
        this.position = options.position || new Vector(0, 0);
        this.velocity = options.velocity || new Vector(0, 0);
        this.acceleration = options.acceleration || new Vector(0, 0);
    }
}

window.Particle = Particle;
