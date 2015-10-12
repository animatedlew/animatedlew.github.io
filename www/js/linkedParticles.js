
///////////////////////////////////////////////////////////////////////////////
var init = () => {

    let canvas = new Canvas("linkedParticles", 530, 250),
        step = () => { requestAnimationFrame(step); draw(); };

    requestAnimationFrame(step);

    let x = Math.random() * 500 + 30,
        y = Math.random() * 180 + 20;

    let circleA = new Circle(canvas.ctx, x, y, 10),
        circleB = new Circle(canvas.ctx, x/2, y/2, 10),
        lineA = new Line(canvas.ctx, 200);

    let draw = () => {
        canvas.clear();
        lineA.render(
            circleA.position.x, circleA.position.y,
            circleB.position.x, circleB.position.y
        );
        circleA.render();
        circleB.render();
    };
};

init();
