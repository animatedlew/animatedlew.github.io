
let rid = 0;
let stopAnimation = () => {
    if (rid) {
       cancelAnimationFrame(rid);
       rid = 0;
    }
};

///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let canvas = new Canvas("verletIntegration", 530, 250),
        step = () => { rid = requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    let particles = [];

    for (var i = 0; i < 50; i++) {
        particles.push(new VerletParticle({
                ctx: canvas.ctx,
                x: 265,
                y: 125,
                color: "#000",
                r: 8,
                dead: true
            }));
    }

    let draw = () => {
        canvas.clear();

        particles.forEach(p =>
            p.update({
                gravity: false,
                edgeStrategy: "die"
            })
        );

        particles.forEach(p => p.render());
    };
};

init();
