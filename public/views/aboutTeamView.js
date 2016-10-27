(function () {
    // import
    const View = window.View;

    class AbouTeamView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.about_team');
            this.brain404Icon();
            this.hide();
        }

        brain404Icon() {
            const _template = window.fest['views/aboutTeamView.tmpl']();
            this._el.innerHTML = _template;
        }

        resume() {
            super.resume();
        }
    }

    // export
    window.AbouTeamView = AbouTeamView;
}());
