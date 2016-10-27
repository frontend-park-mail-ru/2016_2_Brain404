(function () {
    // import
    const View = window.View;

    class AbouTeamView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.about_team');
            this.brain404Icon();
        }

        brain404Icon() {
            let _template = window.fest['views/aboutTeamView.tmpl']();
            this._el.innerHTML = _template;
        }
    }

    // export
    window.AbouTeamView = AbouTeamView;
}());
