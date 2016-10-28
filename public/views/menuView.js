(function () {
    // import
    const Button = window.Button;
    const View = window.View;
    const AbouTeamView = window.AbouTeamView;
    const Menu = window.Menu;

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
            this._el.appendChild(this.menu.el);
        }

        addListeners() {
            document.querySelector('.menu_scoreboard').addEventListener('click', (event) => {
                this.router.go('/scoreboard');
            });
            document.querySelector('.menu_play').addEventListener('click', (event) => {
            });
            document.querySelector('.menu_logout').addEventListener('click', (event) => {
                this.submitLogout();
            });
        }

        submitLogout() {
            this.user.sendRequest('/logout', 'DELETE')
                .then(() => {
                    this.router.go('/');
                })
                .catch(() => {
                });
        }

        resume() {
            this.user.getSession()
                .then(() => { this._el.style.display = 'block'; this.team.resume(); })
                .catch(() => { this.router.go('/'); });
        }

        pause() {
            super.pause();
            this.team.pause();
        }
    }

    window.MenuView = MenuView;
}());
