import VerletParticle from './libs/verletParticle.js';
import Canvas from './libs/canvas.js';

let rid = 0;
let stopAnimation = () => {
    if (rid) {
       cancelAnimationFrame(rid);
       rid = 0;
    }
};

const init = () => {

    let draw = () => {};
    let canvas = new Canvas("verletIntegration", 530, 250);
    let step = () => { rid = requestAnimationFrame(step); draw() };

    requestAnimationFrame(step);

    let particles = [];

    for (var i = 0; i < 50; i++) {
        let grey = (Math.random() * 200 + 55) | 0;
        particles.push(new VerletParticle({
                ctx: canvas.ctx,
                x: 265,
                y: 125,
                color: "rgba("+[grey, grey, grey, Math.min(1, Math.random() + 0.1)]+")",
                r: (Math.random() * 4 + 2) | 0,
                mass: 2,
                dead: true
            }));
    }

    draw = () => {
        canvas.clear();

        particles.forEach(p =>
            p.update({
                gravity: false,
                edgeStrategy: "die",
                respawn: {
                    x: 265,
                    y: 125,
                    vx: (Math.random() * 20 - 10) || 1,
                    vy: (Math.random() * 20 - 10) || 1
                }
            })
        );

        particles.forEach(p => p.render());
    };
};

init();
