(function () {
    if (typeof window === 'object') {
    // // import
    //     const Button = window.Button;
    //     const ModalForm = window.ModalForm;
    //     const Message = window.Message;
    //     const ScoreBoard = window.ScoreBoard;
    //
    //     const mainContainer = document.querySelector('.main_container');
    //
    // // elements
    //     const buttons = new Button({
    //         el: document.createElement('div'),
    //         classAttrs: ['ui', 'large', 'buttons'],
    //     });
    //
    //     const buttonLogin = new Button({
    //         el: document.createElement('button'),
    //         classAttrs: ['ui', 'button', 'login', 'pink'],
    //         text: 'Логин',
    //     });
    //
    //     const buttonOr = new Button({
    //         el: document.createElement('div'),
    //         classAttrs: ['or'],
    //     });
    //
    //     const buttonRegister = new Button({
    //         el: document.createElement('button'),
    //         classAttrs: ['ui', 'button', 'register', 'pink'],
    //         text: 'Регистрация',
    //     });
    //
    //     const formLogin = new ModalForm({
    //         el: document.createElement('dialog'),
    //         form: 'login',
    //         classAttrs: ['ui', 'modal_login'],
    //         data: {
    //             title: 'Логин',
    //             controls: [
    //                 {
    //                     text: 'Войти',
    //                     classAttrs: ['ui', 'button', 'login_submit', 'form_button', 'pink'],
    //                     attrs: [
    //                         {
    //                             type: 'submit',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     text: 'Сбросить',
    //                     classAttrs: ['ui', 'button', 'login_reset', 'form_button', 'pink'],
    //                     attrs: [
    //                         {
    //                             type: 'reset',
    //                         },
    //                     ],
    //                 },
    //             ],
    //             fields: [
    //                 {
    //                     label: 'Логин',
    //                     type: 'text',
    //                     name: 'login',
    //                     required: 'required',
    //                 },
    //                 {
    //                     label: 'Пароль',
    //                     type: 'password',
    //                     name: 'password',
    //                     required: 'required',
    //                 },
    //             ],
    //         },
    //     });
    //
    //     const formRegister = new ModalForm({
    //         el: document.createElement('dialog'),
    //         form: 'register',
    //         classAttrs: ['ui', 'modal_register'],
    //         data: {
    //             title: 'Регистрация',
    //             controls: [
    //                 {
    //                     text: 'Зарегистрироваться',
    //                     classAttrs: ['ui', 'button', 'registe_submit', 'form_button', 'pink'],
    //                     attrs: [
    //                         {
    //                             type: 'submit',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     text: 'Сбросить',
    //                     classAttrs: ['ui', 'button', 'register_reset', 'form_button', 'pink'],
    //                     attrs: [
    //                         {
    //                             type: 'reset',
    //                         },
    //                     ],
    //                 },
    //             ],
    //             fields: [
    //                 {
    //                     label: 'Email',
    //                     type: 'text',
    //                     name: 'email',
    //                     required: 'required',
    //                 },
    //                 {
    //                     label: 'Логин',
    //                     type: 'text',
    //                     name: 'login',
    //                     required: 'required',
    //                 },
    //                 {
    //                     label: 'Пароль',
    //                     type: 'password',
    //                     name: 'password',
    //                     required: 'required',
    //                 },
    //                 {
    //                     label: 'Пароль ещё раз',
    //                     type: 'password',
    //                     name: 'passwordRepeat',
    //                     required: 'required',
    //                 },
    //             ],
    //         },
    //     });
    //
    //     const scoreBoard = new ScoreBoard({
    //         el: document.createElement('dialog'),
    //         classAttrs: ['ui', 'pink']
    //     });
    //
    //     function _createMess(status, header, text) {
    //         const newMess = new Message({
    //             el: document.createElement('div'),
    //             classAttrs: ['ui', status, 'message'],
    //         });
    //         const head = new Message({
    //             el: document.createElement('div'),
    //             classAttrs: ['header'],
    //             text: header,
    //         });
    //         const content = new Message({
    //             el: document.createElement('p'),
    //             text,
    //         });
    //         newMess.el.appendChild(head.el);
    //         newMess.el.appendChild(content.el);
    //         return newMess;
    //     }
    //
    //     function _hideMess() {
    //         const messError = document.querySelector('div.error.message');
    //         const messSuccess = document.querySelector('div.success.message');
    //         if (messError != null) {
    //             messError.remove();
    //         }
    //         if (messSuccess != null) {
    //             messSuccess.remove();
    //         }
    //     }
    //
    // // listener
    //     const _addListeners = function () {
    //         document.querySelector('.close_icon_login').addEventListener('click', (event) => {
    //             formLogin.el.close();
    //             _resetForm(formLogin.form);
    //         });
    //         document.querySelector('.close_icon_register').addEventListener('click', (event) => {
    //             formRegister.el.close();
    //             _resetForm(formRegister.form);
    //         });
    //         buttonLogin.el.addEventListener('click', (event) => {
    //             formLogin.el.showModal();
    //         });
    //         buttonRegister.el.addEventListener('click', (event) => {
    //             formRegister.el.showModal();
    //         });
    //         buttonRegister.el.addEventListener('click', (event) => {
    //             formRegister.el.showModal();
    //         });
    //         document.querySelector('.menu_scoreboard').addEventListener('click', event => {
    //             scoreBoard.el.showModal();
    //         });
    //         formLogin.el.addEventListener('submit', _submitLogin);
    //         formLogin.el.addEventListener('reset', (event) => {
    //             // _resetForm(formLogin.form);
    //             _resetForm(formLogin);
    //         });
    //         formRegister.el.addEventListener('submit', _submitRegister);
    //         formRegister.el.addEventListener('reset', (event) => {
    //             _resetForm(formRegister.form);
    //         });
    //     };
    //
    // // events
    //     function _submitLogin(event) {
    //         event.preventDefault();
    //         _hideMess();
    //         const empty = formLogin.tryEmptyField();
    //         if (empty.length != 0) {
    //             const mess = _createMess('error', 'Заполни пустые поля!', '');
    //             formLogin.el.appendChild(mess.el);
    //         } else {
    //             _sendRequest('/auth', formLogin.getFormData(), formLogin, 'login');
    //         }
    //     }
    //
    //     function _submitRegister(event) {
    //         event.preventDefault();
    //         _hideMess();
    //         const empty = formRegister.tryEmptyField();
    //         const valid = formRegister.tryValidate();
    //         if (valid) {
    //             const mess = _createMess('error', 'Заполни форму правильно!', valid);
    //             formRegister.el.appendChild(mess.el);
    //         } else {
    //             _sendRequest('/registration', formRegister.getFormData(), formRegister, 'register');
    //         }
    //     }
    //
    //     function _resetForm(form) {
    //         _hideMess();
    //         const mess = document.querySelector('div.error.message');
    //         if (mess != null) {
    //             mess.remove();
    //         }
    //         const errors = Array.from(document.getElementsByClassName('error'));
    //         errors.forEach((element) => {
    //             element.classList.remove('error');
    //         });
    //     }
    //
    // // requests +
    //
    //     function _sendRequest(to, data, form, clas) {
    //         const responseMap = {
    //             200: '1',
    //             400: '0',
    //             406: '0',
    //         };
    //         document.querySelector(`form.${clas}`).classList.add('loading');
    //         const jsonData = JSON.stringify(data);
    //         const initPomise = {
    //             method: 'POST',
    //             mode: 'cors',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //             body: jsonData,
    //         };
    //         let baseUrl = 'http://brain404-backend.herokuapp.com/api',
    //             url = baseUrl + to;
    //
    //         function to_json(response) {
    //             return response.json();
    //         }
    //
    //         function status(response) {
    //             document.querySelector(`form.${clas}`).classList.remove('loading');
    //             if (response.status in responseMap) {
    //                 return Promise.resolve(response);
    //             } else {
    //                 return Promise.reject(response);
    //             }
    //         }
    //
    //         function serverStatus(response) {
    //             if (responseMap[response.status] === '1') {
    //                 return Promise.resolve(response);
    //             } else {
    //                 return Promise.reject(response);
    //             }
    //         }
    //
    //         fetch(url, initPomise)
    //         .then(status)
    //         .then((response) => {
    //             serverStatus(response)
    //           .then(to_json)
    //           .then((data) => {
    //               console.log(data);
    //               const mess = _createMess('success', data.login);
    //               form.el.appendChild(mess.el);
    //           })
    //           .catch((error) => {
    //               to_json(error)
    //             .then((error) => {
    //                 console.log(error);
    //                 const mess = _createMess('error', error.msg);
    //                 form.el.appendChild(mess.el);
    //                 Object.keys(data).forEach((field) => {
    //                     form.el.querySelector(`input[name=${field}]`).parentNode.classList.add('error');
    //                 });
    //             });
    //           });
    //         })
    //         .catch((error) => {
    //             const mess = _createMess('error', 'Not a server error!');
    //             form.el.appendChild(mess.el);
    //         });
    //     }
    //
    //     mainContainer.appendChild(buttons.el);
    //     buttons.el.appendChild(buttonLogin.el);
    //     buttons.el.appendChild(buttonOr.el);
    //     buttons.el.appendChild(buttonRegister.el);
    //     mainContainer.appendChild(formLogin.el);
    //     mainContainer.appendChild(formRegister.el);
    //     mainContainer.appendChild(scoreBoard.el);
    //     _addListeners();

        const Router = window.Router;
        const ChatView = window.ChatView;
        const MainView = window.MainView;

        (new Router())
        // .addRoute('/chat', ChatView)
        .addRoute('/', MainView)
        .start();
    }

    const filter = (str, rules = ['kek', 'hek']) => {
        rules.forEach((rule) => {
            const star = '*';
            const stars = star.repeat(rule.length);
            const rgx = new RegExp(`\\b${rule}\\b`, 'gi');
            str = str.replace(rgx, stars);
        });
        return str;
    };

    function plural(num) {
        const end = num % 10;
        if ((end > 1 && end < 5) && !(num > 10 && num < 14)) {
            return 'раза!';
        }
        return 'раз!';
    }

    if (typeof exports === 'object') {
    // for NodeJS
        exports.plural = plural;
    }
}());
