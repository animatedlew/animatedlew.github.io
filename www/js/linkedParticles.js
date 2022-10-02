import Utils from './libs/utils.js';
import Canvas from './libs/canvas.js';
import Circle from './libs/circle.js';
import Line from './libs/line.js';

const init = () => {

    let canvas = new Canvas("linkedParticles", 530, 250),
        step = () => { requestAnimationFrame(step); draw() };

    requestAnimationFrame(step);

    const MAX_PARTICLES = 16;
    const MAX_CONNECTIONS = Utils.collisionComplexity(MAX_PARTICLES);
    //console.log(`MAX CONNECTIONS: ${MAX_CONNECTIONS}`);

    let particles = new Array(MAX_PARTICLES)
        .join("!")
        .split("!")
        .map(p => new Circle(
            canvas.ctx,
            Utils.rand(30, 500),
            Utils.rand(20, 180),
            4, "#ddd"
        ));

    let connection = new Line(canvas.ctx, 300);

    let draw = () => {
        canvas.clear();
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
