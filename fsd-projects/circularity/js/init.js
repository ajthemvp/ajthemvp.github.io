var init = function (window) {
    'use strict';
    var
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,

        app = window.opspark.makeApp(),
        canvas = app.canvas,
        view = app.view,
        fps = draw.fps('#000');

    window.opspark.makeGame = function () {

        window.opspark.game = {};
        var game = window.opspark.game;

        ///////////////////
        // PROGRAM SETUP //
        ///////////////////

        var circles = [];

        // Colors for circles
        var colors = ['#ff0000', '#ffffff']; // red or white

        // Create a black background
        var background = new createjs.Shape();
        background.graphics.beginFill('#000000').drawRect(0, 0, canvas.width, canvas.height);
        view.addChildAt(background, 0); // Add to back

        // Function to create circles with flashing LED effect
        function drawCircle() {
            var radius = Math.random() * 20 + 10;
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;

            // Pick random base color: red or white
            var baseColor = colors[Math.floor(Math.random() * colors.length)];

            var circle = draw.circle(radius, baseColor, 2);
            circle.x = x;
            circle.y = y;

            // For flashing: the light color is the same as circle color, but we modulate alpha to simulate flashing glow
            circle.baseColor = baseColor;
            circle.radius = radius;

            circle.flashSpeed = 0.02 + Math.random() * 0.03; // different speeds
            circle.flashProgress = Math.random() * Math.PI * 2; // random starting phase

            physikz.addRandomVelocity(circle, canvas, 5, 5);
            view.addChild(circle);
            circles.push(circle);
        }

        // Create 25 circles
        for (var i = 0; i < 25; i++) {
            drawCircle();
        }

        ///////////////////
        // PROGRAM LOGIC //
        ///////////////////

        function update() {
            for (var i = 0; i < circles.length; i++) {
                var c = circles[i];

                physikz.updatePosition(c);
                game.checkCirclePosition(c);

                // Flashing LED glow using alpha modulation of fill and stroke
                c.flashProgress += c.flashSpeed;

                // Use sine wave to simulate smooth flashing glow (between 0.5 and 1 alpha)
                var alpha = 0.5 + 0.5 * Math.sin(c.flashProgress);

                // Redraw circle with alpha applied
                c.graphics.clear();
                c.graphics.setStrokeStyle(2);
                c.graphics.beginFill(applyAlphaToColor(c.baseColor, alpha));
                c.graphics.beginStroke(applyAlphaToColor(c.baseColor, alpha));
                c.graphics.drawCircle(0, 0, c.radius);
                c.graphics.endFill();
            }
        }

        // Helper to apply alpha to a hex color string (#rrggbb)
        function applyAlphaToColor(hex, alpha) {
            var r = parseInt(hex.substr(1, 2), 16);
            var g = parseInt(hex.substr(3, 2), 16);
            var b = parseInt(hex.substr(5, 2), 16);
            return `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
        }

        game.checkCirclePosition = function (circle) {
            if (circle.x > canvas.width) circle.x = 0;
            if (circle.x < 0) circle.x = canvas.width;
            if (circle.y > canvas.height) circle.y = 0;
            if (circle.y < 0) circle.y = canvas.height;
        }

        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////

        view.addChild(fps);
        app.addUpdateable(fps);

        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;

        app.addUpdateable(window.opspark.game);
    }
};

// DO NOT REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    module.exports = init;
}