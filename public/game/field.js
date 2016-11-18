(function () {
    'use strict';

    let randomArray = (length, max) => [...new Array(length)]
    .map((_, i) => Math.round(Math.random() * max));

    class Field {
        constructor({ width, hight, img }) {
            console.log('createField');
            this.hight = width;
            this.width = hight;
            this.img = img;
            this.createField();
        }

        draw(ctx) {
            // ctx.beginPath();
            this.fill(ctx);
            // ctx.closePath();
        }

        createField() {
            this.field = randomArray(192, 1);
        }

        fill(ctx) {
            let dx = 0;
            let dy = 0;
            this.field.forEach(el => {
                if (el) {
                    ctx.drawImage(this.img, 299, 5, 64, 64, dx, dy, 64, 64);
                    ctx.fill();
                } else {
                    ctx.drawImage(this.img, 373, 5, 64, 64, dx, dy, 64, 64);
                    ctx.fill();
                }
                dx += 64;
                if (dx === 1024) {
                    dx = 0;
                    dy += 64;
                }
            });
        }
    }

    // export
    window.Field = Field;

})();
