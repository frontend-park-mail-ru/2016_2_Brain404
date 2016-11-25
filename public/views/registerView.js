(function () {
    // import
    const ModalForm = window.ModalForm;
    const Message = window.Message;
    const FormView = window.FormView;

    class RegisterFormView extends FormView {
        constructor(options = {}) {
            super(options);
            this.user = options.user;
            this._el = document.querySelector('.register_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            // this.hide();
        }

        createElements() {
            this.formRegister = new ModalForm({
                el: document.createElement('dialog'),
                form: 'register',
                classAttrs: ['ui', 'modal_register'],
                data: {
                    title: 'Регистрация',
                    controls: [
                        {
                            text: 'Зарегистрироваться',
                            classAttrs: ['ui', 'button', 'registe_submit', 'form_button', 'pink'],
                            attrs: [
                                {
                                    type: 'submit',
                                },
                            ],
                        },
                        {
                            text: 'Сбросить',
                            classAttrs: ['ui', 'button', 'register_reset', 'form_button', 'pink'],
                            attrs: [
                                {
                                    type: 'reset',
                                },
                            ],
                        },
                    ],
                    fields: [
                        {
                            label: 'Email',
                            type: 'text',
                            name: 'email',
                            required: 'required',
                        },
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
                        {
                            label: 'Пароль ещё раз',
                            type: 'password',
                            name: 'passwordRepeat',
                            required: 'required',
                        },
                    ],
                },
            });
        }

        addElements() {
            this._el.appendChild(this.formRegister.el);
        }

        addListeners() {
            document.querySelector('.close_icon_register').addEventListener('click', (event) => {
                this.router.go('/');
            });
            this.formRegister.el.addEventListener('reset', (event) => {
                this.hideMess();
                this.resetFields();
            });
            this.formRegister.el.addEventListener('submit', (event) => { event.preventDefault(); this.submitRegister(); });
        }

        submitRegister() {
            this.hideMess();
            const empty = this.formRegister.tryEmptyField();
            const valid = this.formRegister.tryValidate();
            if (valid) {
                this.formRegister.createMess('error', 'Заполни форму правильно!', valid);
            } else {
                document.querySelector('form.register').classList.add('loading');
                this.user.sendRequest('/registration', 'POST', JSON.stringify(this.formRegister.getFormData()))
                    .then(() => {
                        document.querySelector('form.register').classList.remove('loading');
                        this.formRegister.createMess('success', this.user.responseObj.msg);
                        this.user.isAuth = 1;
                        this.user.id = this.user.responseObj.msg;
                        this.router.go('/');
                    })
                    .catch(() => {
                        document.querySelector('form.register').classList.remove('loading');
                        this.formRegister.createMess('error', this.user.responseObj.msg);
                        Object.keys(this.formRegister.getFormData()).forEach((field) => {
                            this.formRegister.el.querySelector(`input[name=${field}]`).parentNode.classList.add('error');
                        });
                    });
            }
        }

        pause() {
            super.pause();
            this.resetFields();
            this.hideMess();
            if (this.formRegister.el.hasAttribute('open')) {
                this.formRegister.el.close();
            }
        }

        resume() {
            if (this.user.isAuth) {
                this.router.go('/menu');
            } else {
                super.resume();
                this.formRegister.el.showModal();
            }
        }

    }

    // export
    window.RegisterFormView = RegisterFormView;
}());
