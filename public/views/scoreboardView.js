(function () {
    // import
    const ScoreBoard = window.ScoreBoard;
    const View = window.View;

    class ScoreboardView extends View {
        constructor(options = {}) {
            super(options);
            console.log('scoreboardView');
            this._el = document.querySelector('.scoreboard_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
        }

        createElements() {
            this.scoreboard = new ScoreBoard({el: document.createElement('dialog'),
                    classAttrs: ['ui', 'pink']});
        }

        addElements() {
            this._el.appendChild(this.scoreboard.el);
        }

        addListeners() {
          document.querySelector('.close_icon_score').addEventListener('click', (event) => {
              this.router.go('/');
          });
        }

        pause() {
            this.scoreboard.el.close();
        }

        resume() {
            this.scoreboard.el.showModal();
        }

    }

    window.ScoreboardView = ScoreboardView;
}());
