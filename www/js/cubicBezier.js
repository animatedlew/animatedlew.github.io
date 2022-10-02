import Particle from './libs/particle.js';
import Vector from './libs/vector.js';
import Canvas from './libs/canvas.js';
import Line from './libs/line.js';

let rid = 0;
let stopAnimation = () => {
    if (rid) {
       cancelAnimationFrame(rid);
       rid = 0;
    }
};

///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let draw = () => {};
    let canvas = new Canvas("cubicBezier", 530, 250);
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

    let q = [
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(p[0].position, p[1].position),
            isDraggable: false
        }),
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(p[1].position, p[2].position),
            isDraggable: false
        }),
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(p[2].position, p[3].position),
            isDraggable: false
        })
    ];

    let r = [
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(q[0].position, q[1].position),
            isDraggable: false
        }),
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(q[1].position, q[2].position),
            isDraggable: false
        })
    ];

    let b = new Particle({
        ctx: canvas.ctx,
        position: Vector.midpoint(r[0].position, r[1].position),
        isDraggable: false,
        color: "red"
    });

    let handles = [[0, 1], [2, 3]];
    let connections = [[0, 1], [1, 2], [2, 3]];
    let connection = new Line(canvas.ctx, 1000, { lineWidth: 4 });

    draw = () => {
        canvas.clear();

        p.forEach(p => p.update({
          gravity: false
        }));

        // draw bezier curve
        for (let t = 0, prev = p[0].position; t < 1; t += 0.05) {

            connections.forEach((c, i) => {
                let [a, b] = c;
                q[i].position = Vector.periodic(
                    p[a].position,
                    p[b].position, t
                );
                if (i < connections.length-1) {
                    r[i].position = Vector.periodic(
                        q[ i ].position,
                        q[i+1].position, t
                    );
                }
            });

            b.position = Vector.periodic(
                r[0].position,
                r[1].position, t
            );

            connection.render(
                prev.x, prev.y,
                b.position.x, b.position.y, "#99B2FF"
            );
            prev = b.position;
        }

        let lastp = p[p.length-1];
        connection.render(
            b.position.x, b.position.y,
            lastp.position.x, lastp.position.y, "#99B2FF"
        );

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
