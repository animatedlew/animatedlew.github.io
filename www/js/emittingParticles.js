
let rid = 0;
let stopAnimation = () => {
    if (rid) {
       cancelAnimationFrame(rid);
       rid = 0;
    }
};

///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let canvas = new Canvas("emittingParticles", 530, 250),
        step = () => { rid = requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    let emitter = new Emitter({
        ctx: canvas.ctx,
        gravity: true,
        total: 30,
        position: new Vector(100, canvas.h / 2),
        velocity: new Vector(10, -12),
        stream: true
    });

    let draw = () => {
        canvas.clear();
        emitter.update();
        emitter.render();
    };
};

init();
