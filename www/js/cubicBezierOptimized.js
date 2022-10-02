import Line from './libs/line.js';
import Vector from './libs/vector.js';
import Canvas from './libs/canvas.js';
import Particle from './libs/particle.js';
import Curve from './libs/curve.js';

let rid = 0;
let stopAnimation = () => {
    if (rid) {
       cancelAnimationFrame(rid);
       rid = 0;
    }
};

const init = () => {

    let draw = () => {};
    let canvas = new Canvas("cubicBezierOptimized", 530, 250);
    let step = () => { rid = requestAnimationFrame(step); draw() };

    requestAnimationFrame(step);

    let p = [
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(225, 200),
            color: "#000", r: 8
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(100, 40),
            color: "#000", r: 8
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(430, 40),
            color: "#000", r: 8
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(305, 200),
            color: "#000", r: 8
        })
    ];

    let handles = [[0, 1], [2, 3]];
    let connection = new Line(canvas.ctx, 1000, { lineWidth: 4 });

    let curve = new Curve({
        ctx: canvas.ctx
    });

    draw = () => {
        canvas.clear();

        p.forEach(p => p.update({
          gravity: false,
          random: true,
          limit: 6
        }));

        curve.update({
            p0: p[0].position,
            p1: p[1].position,
            p2: p[2].position,
            p3: p[3].position
        });

        curve.render();

        // draw handles
        handles.forEach((c, i) => {
            let [a, b] = c;
            connection.render(
                p[a].position.x, p[a].position.y,
                p[b].position.x, p[b].position.y, "#ddd"
            );
        });

        p.forEach(p => p.render());
    };
};

init();
