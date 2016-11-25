(function () {
    'use strict';

    const View = window.View;
    const Game = window.Game;

    class GameView extends View {
        constructor(options = {}) {
            console.log('game');
            super(options);
            this._el = document.querySelector('.js-game');
            this.preInit();
            // this.hide();
        }

        preInit() {
            this.img = new Image();
            this.img.onload = () => {
                this.init();
            };
            console.log("try init");
            this.img.src = 'img/spritesheet.png';
        }

        init() {
            this.canvasField = this._el.querySelector('.js-field');
            this.canvasField.width = '1024';
            this.canvasField.height = '768';

            this.canvas = this._el.querySelector('.js-canvas');
            this.canvas.width = '1024';
            this.canvas.height = '768';

            this.ctx = this.canvas.getContext('2d');
            this.ctxField = this.canvasField.getContext('2d');
        }

        resume(options = {}) {
            document.querySelector('.js-canvas').style.display = 'block';
            document.querySelector('.js-field').style.display = 'block';
            this.img = new Image();
            this.img.onload = () => {
                this._game = new Game({
                    ctx: this.ctx,
                    ctxField: this.ctxField,
                    width: 1024,
                    height: 768,
                    img: this.img,
                });
                // this._game.start();
                this.show();
            };
            this.img.src = 'img/spritesheet.png';
        }

        pause() {
            super.pause();
            // this._game.clear();
        }
    }


    // export
    window.GameView = GameView;

})();
