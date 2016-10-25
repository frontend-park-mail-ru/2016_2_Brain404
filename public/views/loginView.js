(function () {
    // import
    const ModalForm = window.ModalForm;
    const Message = window.Message;
    // const View = window.View;
    const FormView = window.FormView;

    class LoginFormView extends FormView {
        constructor(options = {}) {
            super(options);
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
            this.formLogin.el.addEventListener('reset', (event) => {
                this.hideMess();
                this.resetFields();
            });
            this.formLogin.el.addEventListener('submit', (event) => { event.preventDefault(); this.submitLogin(); });
        }

        submitLogin() {
            this.hideMess();
            const empty = this.formLogin.tryEmptyField();
            if (empty.length !== 0) {
                this.formLogin.createMess('error', 'Заполни пустые поля!', '');
            } else {
                console.log('send request');
                this.formLogin.sendRequest('/auth', 'login');
            }
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
