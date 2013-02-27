define(function(require) {
    require('receiptverifier');
    require('./install-button');
    require('./math');

    var resources = require('./resources');
    var input = require('./input');
    var level = require('./level');

    var Renderer = require('./renderer');
    var Scene = require('./scene');
    var Camera = require('./camera');

    var renderer;
    var scene;

    function init() {
        var camera = new Camera();
        renderer = new Renderer();
        scene = new Scene(camera);

        level.init(scene, renderer);
        input.init();

        heartbeat();
    }

    var last;
    function heartbeat() {
        if(!last) {
            last = Date.now();
        }

        var now = Date.now();
        var dt = (now - last) / 1000.0;

        scene.update(dt);
        renderer.render(scene);

        //renderer.debug(scene);
        //renderer.debug(scene, 'Trigger');

        last = now;
        requestAnimFrame(heartbeat);
    }

    resources.load([
        'img/bosses.png',
        'img/sprites.png',
        'img/background.png',
        'img/background2.png',
        'img/background3.png'
    ]);
    resources.onReady(init);
});
