import Canvas from './libs/canvas.js';
import Emitter from './libs/emitter.js';
import Vector from './libs/vector.js';
import Liquid from './libs/liquid.js';

let rid = 0;
let stopAnimation = () => {
    if (rid) {
       cancelAnimationFrame(rid);
       rid = 0;
    }
};

const init = () => {

    let draw = () => {};
    let canvas = new Canvas("emittingParticles", 530, 250);
    let step = () => {
            setTimeout(() => {
                rid = requestAnimationFrame(step);
                draw();
            }, 17);
        };

    requestAnimationFrame(step);

    let emitter = new Emitter({
        ctx: canvas.ctx,
        gravity: true,
        total: 30,
        position: new Vector(10, canvas.h / 2),
        velocity: new Vector(10, -12),
        stream: true
    });

    let liquid = new Liquid({
        ctx: canvas.ctx,
        p0x: 0,
        p0y: canvas.h / 2 + 20,
        p1x: canvas.w,
        p1y: canvas.h
    });

    draw = () => {
        canvas.clear();
        emitter.update(p => {
            if (liquid.contains(p.x, p.y)) p.applyForce(liquid.drag(p));
        });
        emitter.render();
        liquid.render();
    };
};

init();
