define(function(require) {
    function Graphic(img) {
        this.img = img;
    }

    Graphic.prototype = {
        render: function(ctx) {
            ctx.drawImage(this.img, 0, 0);
        }
    };

    return Graphic;
});