(function () {
    // import
    const ModalForm = window.ModalForm;
    const Message = window.Message;
    const View = window.View;

    class RegisterFormView extends View {
        constructor(options = {}) {
            super(options);
            console.log('registerForm');
            this._el = document.querySelector('.register_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
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
        }

        pause() {
            this.formRegister.el.close();
        }

        resume() {
            this.formRegister.el.showModal();
        }

    }

    // export
    window.RegisterFormView = RegisterFormView;
}());
