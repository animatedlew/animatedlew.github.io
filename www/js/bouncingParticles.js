import Canvas from './libs/canvas.js';
import Particle from './libs/particle.js';
import Vector from './libs/vector.js';
import Utils from './libs/utils.js';
import Line from './libs/line.js';

const init = () => {

    let draw = () => {};
    let canvas = new Canvas("bouncingParticles", 530, 250);
    let step = () => { requestAnimationFrame(step); draw() };

    requestAnimationFrame(step);

    const MAX_PARTICLES = 24;

    let particles = new Array(MAX_PARTICLES)
        .join("!")
        .split("!")
        .map(p => new Particle({
            ctx: canvas.ctx,
            position: new Vector(Utils.rand(30, 500), Utils.rand(20, 180))
        }));

    let connection = new Line(canvas.ctx, 300);

    draw = () => {
        canvas.clear();
        particles.forEach(p => p.update({
          edgeStrategy: "bounce",
          gravity: false,
          random: true,
          limit: 4
        }));
        particles.forEach((p0, i) => {
            while (++i < MAX_PARTICLES) {
                var p1 = particles[i]; // grab the tail
                connection.render(
                    p0.position.x, p0.position.y,
                    p1.position.x, p1.position.y
                );
            }
        });
        particles.forEach(p => p.render());
    };
};

init();
