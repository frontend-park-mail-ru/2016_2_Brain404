(function(){
    'use static';

    class ScoreBoard {

        constructor(opt) {
            this.el = opt.el;
            this.name = 'score'
            this.classAttrs = opt.classAttrs || [];
            this.render();
        }

        render() {
            this.setClassAttrs();
            this.updateHtml();
            return this;
        }

        setClassAttrs() {
            this.classAttrs.forEach( name => {
                this.el.classList.add(name);
            })
        }

        updateHtml(){
            let _template = window.fest['scoreboard/scoreboard.tmpl'](this);
            this.el.innerHTML = _template;
        }
    }

    //exports
    window.ScoreBoard = ScoreBoard;
})();
