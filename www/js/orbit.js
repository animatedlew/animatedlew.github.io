
///////////////////////////////////////////////////////////////////////////////
var init = () => {

    const SCREEN_WIDTH = 530, SCREEN_HEIGHT = 250;

    let canvas = new Canvas("orbit", SCREEN_WIDTH, SCREEN_HEIGHT),
        step = () => { requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    let center = new Vector(SCREEN_WIDTH/2, SCREEN_HEIGHT/2),
        particles = [
            new Particle({
                ctx: canvas.ctx,
                position: center.clone(),
                r: 25, mass: 150 // attractor body with larger mass
            }),
            new Particle({
                ctx: canvas.ctx,
                position: new Vector(SCREEN_WIDTH/2, 80),
                velocity: new Vector(3, 0),
                r: 5, mass: 3 // smaller mass to orbit attractor
            })
        ];

    let draw = () => {
        canvas.clear();
        let [a, b] = particles;
        b.applyForce(Force.orbit(a, b)); // apply gravity to b
        particles.forEach((p, i) => p.update({
            edgeStrategy: "bounce",
            limit: 5 // don't let the math turn into chaos
        }));
        particles.forEach(p => p.render());
    };
};

init();
