(function () {
    // import

    class AbouTeam {
        constructor(options = {}) {
            this._el = document.querySelector('.about_team');
            this.render();
        }

        _updateHtml() {
            const _template = window.fest['components/aboutTeam/aboutTeam.tmpl']();
            this._el.innerHTML = _template;
        }

        render() {
            this._updateHtml();
            return this;
        }

        // resume() {
        //     super.resume();
        // }
    }

    // export
    window.AbouTeam = AbouTeam;
}());
