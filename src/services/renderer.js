define(function(require) {
    var Service = require('base/service');
    var extend = require('common/extend');
    var Event = require('core/event');

    function Renderer(scheduler, options) {
        Service.call(this, scheduler, {
            render: {
                tags: ['@render', 'graphics'],
                dependsOn: []
            }
        });

        options = options || {};
        this.canvas = options.canvas || null;
        this.ctx = (this.canvas !== null ? this.canvas.getContext('2d') : null);
    }
    Renderer.prototype = Object.create(Service.prototype);
    Renderer.prototype.constructor = Renderer;

    extend(Renderer.prototype, {
        render: function() {
            if (this.canvas === null) return;

            var registeredComponents = this._registeredComponents;
            var spaces = {};

            var renderEvent = new Event('Render', {
                ctx: this.ctx
            });

            var cameraOwnerIds = Object.keys(registeredComponents['Camera'] || {});
            if (cameraOwnerIds.length === 0) return;

            var space = registeredComponents["Camera"][cameraOwnerIds[0]].owner.space;
            var camera = space.findWith('Camera');
            var transform = camera.findComponent('Transform');

            this.ctx.save();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(transform.position[0], transform.position[1]);

            this.forEachComponent(function(component) {
                while(component.handleQueuedEvent()) {
                    // Pass
                }
                renderEvent(component);
            });

            this.ctx.restore();
        },

        forEachComponent: function(callback, type) {
            var components = this._registeredComponents;
            for (var componentType in components) {
                if (type !== undefined && componentType !== type) return;
                for (var entityId in components[componentType]) {
                    callback.call(this, components[componentType][entityId]);
                }
            }
        },

        // Loaders have nowhere else to live. :(
        loaders: {
           image: require('src/loaders/image')
        }
    });

    return Renderer;
});