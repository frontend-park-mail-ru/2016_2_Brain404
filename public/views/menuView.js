(function () {
    // import
    const Button = window.Button;
    const View = window.View;
    const AbouTeamView = window.AbouTeamView;
    const Menu = window.Menu;

    class MenuView extends View {
        constructor(options = {}) {
            super(options);
            this.user = options.user;
            this.team = new AbouTeamView();
            this._el = document.querySelector('.menu_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            // this.hide();
        }

        createElements() {
            this.menu = new Menu({
                el: document.createElement('div'),
                classAttrs: ['ui', 'pink', 'inverted', 'vertical', 'labeled', 'massive', 'icon', 'menu'],
                list: [
                    { iconClass: 'game icon', lable: 'Играть', clas: 'play' },
                    { iconClass: 'ordered list icon', lable: 'Лидерборд', clas: 'scoreboard2' },
                    { iconClass: 'sign out icon', lable: 'Выйти', clas: 'logout' }],
                id: this.user.id,
            });
        }

        addElements() {
            this._el.appendChild(this.menu.el);
        }

        addListeners() {
            document.querySelector('.menu_scoreboard2').addEventListener('click', (event) => {
                this.router.go('/scoreboard');
            });
            document.querySelector('.menu_play').addEventListener('click', (event) => {
                this.router.go('/game');
            });
            document.querySelector('.menu_logout').addEventListener('click', (event) => {
                this.submitLogout();
            });
            document.querySelector('.about_acount').addEventListener('click', (event) => {
                this.router.go('/user');
            });

        }

        submitLogout() {
            this.user.sendRequest('/logout', 'DELETE')
                .then(() => {
                    this.user.isAuth = 0;
                    this.router.go('/');
                })
                .catch(() => {
                });
        }

        menuIcon() {
            const _template = window.fest['views/mainView.tmpl'](this);
            return _template;
        }

        resume() {
            if (this.user.isAuth) {
                this._el.style.display = 'block'; this.team.resume();
                document.querySelector('.about_acount_login').innerHTML = this.user.id;
            } else {
                this.router.go('/');
            }
        }

        pause() {
            super.pause();
            this.team.pause();
        }
    }

    window.MenuView = MenuView;
}());
