(function () {
    'use strict';

    class Player {
        constructor({ img, x = 0, y = 0, vx = 0, vy = 0, r = 30, color = '#5d5d15', speed = 30 }) {
            this.x = x;
            this.y = y;

            this.vx = vx;
            this.vy = vy;
            this.speed = speed;
            this.r = r;
            this.color = color;
            this.img = img;
        }

        update(dt) {
            this.x += (this.vx * dt) / 100;
            this.y += (this.vy * dt) / 100;
        }

        draw(ctx) {
            ctx.clearRect(0, 0, 1024, 768);
            let animal = ctx.drawImage(this.img, 593, 595, 284, 285, this.x - (this.r / 2), this.y - (this.r / 2), this.r, this.r);
        }

        checkRectIntersection(rect, action) {
            let result = {
                px: false,
                py: false,
                mx: false,
                my: false,
            };

            if (this.x + (this.r / 2) > rect.width) {
                result.mx = true;
            }

            if (this.y + (this.r / 2) > rect.height) {
                result.my = true;
            }
            if (this.x - (this.r / 2) < 0) {
                result.px = true;
            }

            if (this.y - (this.r / 2) < 0) {
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
