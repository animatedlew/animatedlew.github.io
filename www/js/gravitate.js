import Canvas from './libs/canvas.js';
import Vector from './libs/vector.js';
import Particle from './libs/particle.js';
import Force from './libs/force.js';

var init = () => {

    const SCREEN_WIDTH = 530, SCREEN_HEIGHT = 250;

    let draw = () => {};
    let canvas = new Canvas("gravitate", SCREEN_WIDTH, SCREEN_HEIGHT);
    let step = () => { requestAnimationFrame(step); draw() };

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

    draw = () => {
        canvas.clear();

        Force.gravitate(particles[0], particles[1]);

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
