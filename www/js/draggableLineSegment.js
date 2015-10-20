
///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let canvas = new Canvas("draggableLineSegment", 530, 250),
        step = () => { requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    let particles = [
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(Utils.rand(30, 500), Utils.rand(20, 180)),
            r: 10
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(Utils.rand(30, 500), Utils.rand(20, 180)),
            r: 10
        })
    ];

    let connection = new Line(canvas.ctx, 1000);
    let midpoint = new Particle({
        ctx: canvas.ctx,
        position: Vector.midpoint(particles[0].position, particles[1].position),
        isDraggable: false
    });

    let p = 0,
        pvel = 0.01;

    let draw = () => {
        canvas.clear();

        particles.forEach(p => p.update({
          edgeStrategy: "bounce",
          gravity: false,
          random: false
        }));

        p += pvel;
        if (p > 1 || p < 0) pvel *= -1;
        midpoint.position = Vector.periodic(particles[0].position, particles[1].position, p);

        connection.render(
            particles[0].position.x, particles[0].position.y,
            particles[1].position.x, particles[1].position.y
        );

        midpoint.render();
        particles.forEach(p => p.render());
    };
};

init();
