(function () {
    // import
    const Button = window.Button;
    const View = window.View;
    const AbouTeamView = window.AbouTeamView;
    const Menu = window.Menu;
    // const user = window.User;

    class MenuView extends View {
        constructor(options = {}) {
            super(options);
            this.team = new AbouTeamView();
            this._el = document.querySelector('.menu_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
            this.user = options.user;
        }

        createElements() {
            this.menu = new Menu({
                el: document.createElement('div'),
                classAttrs: ['ui', 'pink', 'inverted', 'vertical', 'labeled', 'massive', 'icon', 'menu'],
                list: [
                    { iconClass: 'game icon', lable: 'Играть', clas: 'play' },
                    { iconClass: 'ordered list icon', lable: 'Лидерборд', clas: 'scoreboard' },
                    { iconClass: 'sign out icon', lable: 'Выйти', clas: 'logout' }],
            });
        }

        addElements() {
            // this._el.innerHTML = this.menuIcon();
            this._el.appendChild(this.menu.el);
        }

        addListeners() {
            document.querySelector('.menu_scoreboard').addEventListener('click', (event) => {
                console.log('click scoreboard');
                this.router.go('/scoreboard');
            });
            document.querySelector('.menu_play').addEventListener('click', (event) => {
                console.log('click play');
            });
            document.querySelector('.menu_logout').addEventListener('click', (event) => {
                console.log('click logout');
            });
        }

        menuIcon() {
            const _template = window.fest['views/mainView.tmpl'](this);
            return _template;
        }

        resume() {
            this.user.getSession()
                .then(() => { this._el.style.display = 'block'; this.team.resume(); console.log(this.user.responseObj); })
                .catch(() => { this.router.go('/'); console.log(this.user.responseObj); });
        }

        pause() {
            super.pause();
            this.team.pause();
        }
    }

    window.MenuView = MenuView;
}());
