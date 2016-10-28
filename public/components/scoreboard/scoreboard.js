(function () {
    'use static';

    class ScoreBoard {

        constructor(opt) {
            this.el = opt.el;
            this.name = 'score';
            this.classAttrs = opt.classAttrs || [];
            this.collectionUsers = [];
            this.render();
        }

        render() {
            this.setClassAttrs();
            this.updateHtml();
            return this;
        }

        setClassAttrs() {
            this.classAttrs.forEach((name) => {
                this.el.classList.add(name);
            });
        }

        updateHtml(collection) {
            const _template = window.fest['components/scoreboard/scoreboard.tmpl'](this);
            this.el.innerHTML = _template;
        }

        setCollection(collection) {
            this.collectionUsers = collection;
            this.updateHtml();
        }
    }

    // exports
    window.ScoreBoard = ScoreBoard;
}());
