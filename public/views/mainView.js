(function () {
    // import
    const Button = window.Button;
    const View = window.View;
    const AbouTeamView = window.AbouTeamView;
    // const user = window.User;

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
            // console.log(options);
        }

        createElements() {
            this.buttons = new Button({
                el: document.createElement('div'),
                classAttrs: ['ui', 'large', 'buttons'],
            });

            this.buttonLogin = new Button({
                el: document.createElement('button'),
                classAttrs: ['ui', 'button', 'login', 'pink'],
                text: 'Логин',
            });

            this.buttonOr = new Button({
                el: document.createElement('div'),
                classAttrs: ['or'],
            });

            this.buttonRegister = new Button({
                el: document.createElement('button'),
                classAttrs: ['ui', 'button', 'register', 'pink'],
                text: 'Регистрация',
            });
        }

        addElements() {
            this._el.innerHTML = this.menuIcon();
            this._el.appendChild(this.buttons.el);
            this.buttons.el.appendChild(this.buttonLogin.el);
            this.buttons.el.appendChild(this.buttonOr.el);
            this.buttons.el.appendChild(this.buttonRegister.el);
        }

        addListeners() {
            this.buttonLogin.el.addEventListener('click', (event) => {
                console.log('click login');
                this.pause();
                this.router.go('/login');
            });
            this.buttonRegister.el.addEventListener('click', (event) => {
                console.log('click register');
                this.router.go('/register');
            });
            document.querySelector('.menu_scoreboard').addEventListener('click', (event) => {
                console.log('click scoreboard');
                this.router.go('/scoreboard');
            });
            // document.querySelector('.menu_play').addEventListener('click', (event) => {
            //     console.log('click play');
            // });
        }

        menuIcon() {
            // <div class="ui pink inverted vertical compact labeled massive icon menu ">
            //   <a class="item menu_play" onclick="return false">
            //     <i class="gamepad icon"></i>
            //     Играть
            //   </a>
            return `<div class="row menu">
                        <div class="ui pink inverted vertical compact labeled massive icon menu ">
                		  <a href="" onclick="return false" class="item menu_scoreboard">
                		  	<i class="ordered list icon"></i>
                			Лидер борд
                		  </a>
                		</div>
	              </div>`;
        }

        resume() {
            this.user.getSession()
                .then(() => { this.router.go('/menu'); console.log(this.user.responseObj); })
                .catch(() => { this._el.style.display = 'block'; this.team.resume(); console.log(this.user.responseObj); });
        }

        pause() {
            super.pause();
            this.team.pause();
        }
    }

    window.MainView = MainView;
}());
