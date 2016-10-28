(function () {
    // import
    const ScoreBoard = window.ScoreBoard;
    const View = window.View;
    const CollectionUsers = window.CollectionUsers;

    class ScoreboardView extends View {
        constructor(options = {}) {
            super(options);
            this.collectionUsers = new CollectionUsers({});
            this._el = document.querySelector('.scoreboard_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
        }

        createElements() {
            this.scoreboard = new ScoreBoard({ el: document.createElement('dialog'),
                classAttrs: ['ui', 'pink'] });
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
            super.pause();
            if (this.scoreboard.el.hasAttribute('open')) {
                this.scoreboard.el.close();
            }
        }

        resume() {
            super.resume();
            this.collectionUsers.sendRequest()
            .then(() => {
                this.scoreboard.setCollection(this.collectionUsers.getCollection());
                this.addListeners();
                this.scoreboard.el.showModal(); }
            );
        }

    }

    window.ScoreboardView = ScoreboardView;
}());
