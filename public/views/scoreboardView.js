(function () {
    // import
    const ScoreBoard = window.ScoreBoard;
    const View = window.View;
    const CollectionUsers = window.CollectionUsers;

    class ScoreboardView extends View {
        constructor(options = {}) {
            super(options);
            console.log('scoreboardView');
            this._el = document.querySelector('.scoreboard_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
            this.collectionUsers = new CollectionUsers({});
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
                console.log("close");
                this.router.go('/');
            });
        }

        pause() {
            super.pause();
            this.scoreboard.el.close();
        }

        resume() {
            super.resume();
            // this.scoreboard.collectionUsers = this.collectionUsers.getCollection();
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
