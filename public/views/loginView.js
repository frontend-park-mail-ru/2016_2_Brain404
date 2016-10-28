(function () {
    // import
    const ModalForm = window.ModalForm;
    const Message = window.Message;
    const FormView = window.FormView;

    class LoginFormView extends FormView {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.login_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
            this.user = options.user;
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
            if (empty.length) {
                this.formLogin.createMess('error', 'Заполни пустые поля!', '');
            } else {
                document.querySelector('form.login').classList.add('loading');
                this.user.sendRequest('/auth', 'POST', JSON.stringify(this.formLogin.getFormData()))
                    .then(() => {
                        document.querySelector('form.login').classList.remove('loading');
                        this.formLogin.createMess('success', this.user.responseObj.msg);
                        this.user.isAuth = 1;
                        this.router.go('/menu');
                    })
                    .catch(() => {
                        document.querySelector('form.login').classList.remove('loading');
                        this.formLogin.createMess('error', this.user.responseObj.msg);
                        Object.keys(this.formLogin.getFormData()).forEach((field) => {
                            this.formLogin.el.querySelector(`input[name=${field}]`).parentNode.classList.add('error');
                        });
                    });
            }
        }

        pause() {
            super.pause();
            this.resetFields();
            this.formLogin.el.close();
        }

        resume() {
            this.user.getSession()
                .then(() => { this.router.go('/menu'); })
                .catch(() => { super.resume(); this.formLogin.el.showModal();
                });
        }

    }

    // export
    window.LoginFormView = LoginFormView;
}());
