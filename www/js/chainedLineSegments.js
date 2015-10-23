
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

    // points for each connection
    let points = [
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

    let subpoints = [
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(particles[0].position, particles[1].position),
            isDraggable: false
        }),
        new Particle({
            ctx: canvas.ctx,
            position: Vector.midpoint(particles[1].position, particles[2].position),
            isDraggable: false
        })
    ];

    let tracePoint = new Particle({
        ctx: canvas.ctx,
        position: Vector.midpoint(subpoints[0].position, subpoints[1].position),
        isDraggable: false
    });

    let t = 0,
        tVel = 0.01;

    let connection = new Line(canvas.ctx, 1000);

    let draw = () => {
        canvas.clear();

        particles.forEach(p => p.update({
          gravity: false
        }));

        points.forEach(p => p.update({
          gravity: false
        }));

        t += tVel;
        if (t > 1 || t < 0) tVel *= -1;

        connections.forEach((c, i) => {
            let [a, b] = c;
            points[i].position = Vector.periodic(
                particles[a].position,
                particles[b].position,
                t
            );
            connection.render(
                particles[a].position.x, particles[a].position.y,
                particles[b].position.x, particles[b].position.y,
                "#2E5CE6"
            );
            if (i < connections.length-1) {
                subpoints[i].position = Vector.periodic(
                    points[ i ].position,
                    points[i+1].position,
                    t
                );
                connection.render(
                    points[ i ].position.x, points[ i ].position.y,
                    points[i+1].position.x, points[i+1].position.y,
                    "#4775FF"
                );
            }
        });

        connection.render(
            subpoints[0].position.x, subpoints[0].position.y,
            subpoints[1].position.x, subpoints[1].position.y,
            "#99B2FF"
        );

        tracePoint.position = Vector.periodic(
            subpoints[0].position,
            subpoints[1].position,
            t
        );

        tracePoint.render();
        points.forEach(p => p.render());
        subpoints.forEach(p => p.render());
        particles.forEach(p => p.render());
    };
};

init();
