
let rand = (s, e) => Math.random() * e + s;
let choose2 = n => n * (n + 1) / 2;
let assert = (condition, message) => {
    if (!condition) { throw message || "Assertion failed"; }
};

///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let canvas = new Canvas("linkedParticles", 530, 250),
        step = () => { requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    const MAX_PARTICLES = 20;
    const MAX_CONNECTIONS = choose2(MAX_PARTICLES - 1);

    let particles = new Array(MAX_PARTICLES)
        .join("!")
        .split("!")
        .map(p => new Circle(
            canvas.ctx,
            rand(30, 500),
            rand(20, 180),
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
