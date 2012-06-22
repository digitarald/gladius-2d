define(function(require) {
    function Circle(radius) {
        this.radius = radius;
    }

    Circle.prototype = {
        render: function(ctx, x, y) {
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.arc(0, 0, this.radius, Math.PI*2, false);
            ctx.fill();
        }
    };

    return Circle;
});