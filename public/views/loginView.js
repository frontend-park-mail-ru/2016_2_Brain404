(function () {
    // import
    const ModalForm = window.ModalForm;
    const Message = window.Message;
    const View = window.View;

    class LoginFormView extends View {
        constructor(options = {}) {
            super(options);
            console.log('loginForm');
            this._el = document.querySelector('.login_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
        }

        createElements() {
            this.formLogin = new ModalForm({
                el: document.createElement('dialog'),
                form: 'login',
                classAttrs: ['ui', 'modal_login'],
                data: {
                    title: 'Логин',
                    controls: [
                        {
                            text: 'Войти',
                            classAttrs: ['ui', 'button', 'login_submit', 'form_button', 'pink'],
                            attrs: [
                                {
                                    type: 'submit',
                                },
                            ],
                        },
                        {
                            text: 'Сбросить',
                            classAttrs: ['ui', 'button', 'login_reset', 'form_button', 'pink'],
                            attrs: [
                                {
                                    type: 'reset',
                                },
                            ],
                        },
                    ],
                    fields: [
                        {
                            label: 'Логин',
                            type: 'text',
                            name: 'login',
                            required: 'required',
                        },
                        {
                            label: 'Пароль',
                            type: 'password',
                            name: 'password',
                            required: 'required',
                        },
                    ],
                },
            });
        }

        addElements() {
            this._el.appendChild(this.formLogin.el);
        }

        addListeners() {
            document.querySelector('.close_icon_login').addEventListener('click', (event) => {
                this.router.go('/');
            });
        }

        pause() {
            this.formLogin.el.close();
        }

        resume() {
            this.formLogin.el.showModal();
        }

    }

    // export
    window.LoginFormView = LoginFormView;
}());
