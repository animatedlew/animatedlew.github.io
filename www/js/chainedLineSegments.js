
///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let canvas = new Canvas("chainedLineSegments", 530, 250),
        step = () => { requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    // create 4 particles
    let particles = [
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(20, 200),
            r: 10
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(100, 40),
            r: 10
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(400, 40),
            r: 10
        }),
        new Particle({
            ctx: canvas.ctx,
            position: new Vector(500, 200),
            r: 10
        })
    ];

    // links between the nodes
    let connections = [[0, 1], [1, 2], [2, 3]];

    // midpoints for each connection
    let midpoints = [
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(particles[0].position, particles[1].position),
            isDraggable: false
        }),
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(particles[1].position, particles[2].position),
            isDraggable: false
        }),
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(particles[2].position, particles[3].position),
            isDraggable: false
        })
    ];

    let t = 0,
        tVel = 0.01;

    let connection = new Line(canvas.ctx, 1000);

    let draw = () => {
        canvas.clear();

        particles.forEach(p => p.update({
          gravity: false
        }));

        midpoints.forEach(p => p.update({
          gravity: false
        }));

        t += tVel;
        if (t > 1 || t < 0) tVel *= -1;

        connections.forEach((c, i) => {
            let [a, b] = c;
            midpoints[i].position = Vector.periodic(particles[a].position, particles[b].position, t);
            connection.render(
                particles[a].position.x, particles[a].position.y,
                particles[b].position.x, particles[b].position.y,
                "#00CCFF"
            );
            if (i < connections.length-1) {
                connection.render(
                    midpoints[i].position.x, midpoints[i].position.y,
                    midpoints[i+1].position.x, midpoints[i+1].position.y,
                    "#336699"
                );
            }
        });

        midpoints.forEach(p => p.render());
        particles.forEach(p => p.render());
    };
};

init();
