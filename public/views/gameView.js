(function () {
    'use strict';

    const View = window.View;
    const Game = window.Game;

    class GameView extends View {
        constructor(options = {}) {
            console.log('game');
            super(options);
            this._el = document.querySelector('.js-game');
            this.init();
            // this.hide();
        }

        init() {
            this.canvas = this._el.querySelector('.js-canvas');
            this.canvas.width = '1024';
            this.canvas.height = '768';

            this.ctx = this.canvas.getContext('2d');
        }

        resume(options = {}) {
            document.querySelector('.js-canvas').style.display = 'block';
            this._game = new Game({
                ctx: this.ctx,
                width: 1024,
                height: 768,
            });
            this._game.start();

            this.show();
        }

        pause() {
            super.pause();
            // this._game.clear();
        }
    }


    // export
    window.GameView = GameView;

})();
