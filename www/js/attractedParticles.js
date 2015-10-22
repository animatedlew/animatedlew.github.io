
///////////////////////////////////////////////////////////////////////////////
var init = () => {

    const SCREEN_WIDTH = 530, SCREEN_HEIGHT = 250, G = 1;

    let canvas = new Canvas("attractedParticles", SCREEN_WIDTH, SCREEN_HEIGHT),
        step = () => { requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    let center = new Vector(SCREEN_WIDTH/2, SCREEN_HEIGHT/2),
        particles = [
            new Particle({
                ctx: canvas.ctx,
                position: center.clone(),
                r: 50,
                mass: 10000
            }),
            new Particle({
                ctx: canvas.ctx,
                position: center.clone().add(new Vector(100, 0)),
                r: 4,
                mass: 1
            })
        ];

    let attract = (a, b) => {
        let force = a.position.clone().sub(b.position);
        let m = (G * a.mass * b.mass) / force.magSq;
        force.setMag(m).limit(0.5);
        a.applyForce(force.clone().reverse());
        b.applyForce(force.clone());
    };

    let draw = () => {
        canvas.clear();

        attract(particles[0], particles[1]);

        particles.forEach((p, i) => {
            p.update({
                edgeStrategy: "wrap",
                friction: true,
                limit: 4
            });
        });

        particles.forEach(p => p.render());
    };
};

init();
