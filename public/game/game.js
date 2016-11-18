(function () {
    'use strict';

    const Player = window.Player;
    const KeyMaster = window.KeyMaster;
    const Field = window.Field;

    class Game {
        constructor({ ctx, width, height, img }) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.img = img;
            this.key = new KeyMaster();
            this.key.init();

            this.field = new Field({ width: this.width, hight: this.hight, img: this.img });
            this.ball = new Player({ img: this.img, x: 100, y: 100, r: 40, color: '#0e751f' });
        }

        start() {
            this.ball.draw(this.ctx);
            this.field.draw(this.ctx);
            this.animate();
        }

        animate() {
            let date = Date.now();
            let doAnimate = () => {
                let localDate = Date.now();
                this.clear();

                this.ball.update(localDate - date);
                this.field.draw(this.ctx);
                this.ball.draw(this.ctx);
                this.ball.checkRectIntersection({
                    width: this.width,
                    height: this.height,
                }, 'reflect');

                this.doKeys();
                console.log(this.ball);

                date = localDate;

                requestAnimationFrame(doAnimate);
            };

            doAnimate();
        }

        doKeys() {
            if (this.key.is('w')) {
                this.ball.dv({ dvy: -1 });
            } else if (this.key.is('s')) {
                this.ball.dv({ dvy: 1 });
            } else if (this.key.is('a')) {
                this.ball.dv({ dvx: -1 });
            } else if (this.key.is('d')) {
                this.ball.dv({ dvx: 1 });
            } else {
                if (this.ball.vx > 0) {
                    this.ball.vx -= 1;
                }
                if (this.ball.vx < 0) {
                    this.ball.vx += 1;
                }
                if (this.ball.vy > 0) {
                    this.ball.vy -= 1;
                }
                if (this.ball.vy < 0) {
                    this.ball.vy += 1;
                }
            }
        }

        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            // this.key.destroy();
        }
    }


    // export
    window.Game = Game;

})();
