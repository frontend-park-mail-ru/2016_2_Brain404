(function () {
    // import
    const Button = window.Button;
    const View = window.View;
    const AbouTeamView = window.AbouTeamView;

    class MainView extends View {
        constructor(options = {}) {
            super(options);
            this.team = new AbouTeamView();
            this._el = document.querySelector('.main_container_view');
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
                    { iconClass: 'sign in icon', lable: 'Логин', clas: 'login' },
                    { iconClass: 'ordered list icon', lable: 'Лидерборд', clas: 'scoreboard' },
                    { iconClass: 'add user icon', lable: 'Регистрация', clas: 'register' }],
            });
        }

        addElements() {
            this._el.appendChild(this.menu.el);
        }

        addListeners() {
            document.querySelector('.menu_login').addEventListener('click', (event) => {
                this.router.go('/login');
            });
            document.querySelector('.menu_scoreboard').addEventListener('click', (event) => {
                this.router.go('/scoreboard');
            });
            document.querySelector('.menu_register').addEventListener('click', (event) => {
                this.router.go('/register');
            });
        }

        menuIcon() {
            const _template = window.fest['views/mainView.tmpl'](this);
            return _template;
        }

        resume() {
            this.user.getSession()
                .then(() => { this.router.go('/menu'); })
                .catch(() => { this._el.style.display = 'block'; this.team.resume(); });
        }

        pause() {
            super.pause();
            this.team.pause();
        }
    }

    window.MainView = MainView;
}());
