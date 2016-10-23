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
            // this.brain404Icon();
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
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
                // formLogin.el.showModal();
                console.log('click login');
            });
            this.buttonRegister.el.addEventListener('click', (event) => {
                // formRegister.el.showModal();
                console.log('click register');
            });
            document.querySelector('.menu_scoreboard').addEventListener('click', (event) => {
                console.log('click scoreboard');
            });
            document.querySelector('.menu_play').addEventListener('click', (event) => {
                console.log('click play');
            });
        }

        menuIcon() {
            return `<div class="row menu">
                		<div class="ui pink inverted vertical compact labeled massive icon menu ">
                		  <a class="item menu_play">
                		    <i class="gamepad icon"></i>
                		    Играть
                		  </a>
                		  <a href="#" class="item menu_scoreboard">
                		  	<i class="ordered list icon"></i>
                			Лидер борд
                		  </a>
                		</div>
	              </div>`;
        }
    }

    window.MainView = MainView;
}());
