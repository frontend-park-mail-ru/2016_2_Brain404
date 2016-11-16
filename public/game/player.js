(function () {
    'use strict';

    class Player {
        constructor({ x = 0, y = 0, vx = 0, vy = 0, r = 30, color = '#5d5d15', speed = 20 }) {
            this.x = x;
            this.y = y;

            this.vx = vx;
            this.vy = vy;
            this.speed = speed;
            this.r = r;
            this.color = color;
            console.log(this.color);
        }

        update(dt) {
            this.x += (this.vx * dt) / 100;
            this.y += (this.vy * dt) / 100;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        checkRectIntersection(rect, action) {
            let result = {
                px: false,
                py: false,
                mx: false,
                my: false,
            };

            if (this.x + this.r > rect.width) {
                result.mx = true;
            }

            if (this.y + this.r > rect.height) {
                result.my = true;
            }
            if (this.x - this.r < 0) {
                result.px = true;
            }

            if (this.y - this.r < 0) {
                result.py = true;
            }

            this[action](result);
        }

        reflect(result) {
            if (result.mx) {
                this.vx = 0;
                this.x -= 1;
            }
            if (result.my) {
                this.vy = 0;
                this.y -= 1;
            }
            if (result.px) {
                this.vx = 0;
                this.x += 1;
            }
            if (result.py) {
                this.vy = 0;
                this.y += 1;
            }
        }

        dv({ dvx = 0, dvy = 0 }) {
            if (Math.abs(this.vx + dvx) < this.speed) {
                this.vx += dvx;
            }
            if (Math.abs(this.vy + dvy) < this.speed) {
                this.vy += dvy;
            }
        }

    }

    // export
    window.Player = Player;

})();
