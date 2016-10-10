(function () {
  'use strict';

  if (typeof window === 'object'){

    //import
    let Button = window.Button;
    let ModalForm = window.ModalForm;
    let Message = window.Message;

    let mainContainer = document.querySelector('.main_container');

    //elements
    let buttons = new Button({
      el: document.createElement('div'),
      classAttrs: ['ui', 'large', 'buttons'],
    });

    let buttonLogin = new Button({
      el: document.createElement('button'),
      classAttrs: ['ui', 'button', 'login'],
      text: 'Логин'
    });

    let buttonOr = new Button({
      el: document.createElement('div'),
      classAttrs: ['or']
    });

    let buttonRegister = new Button({
      el: document.createElement('button'),
      classAttrs: ['ui', 'button', 'register'],
      text: 'Регистрация'
    });

    let formLogin = new ModalForm({
      el: document.createElement('dialog'),
      form: 'login',
      classAttrs: ['ui', 'modal_login'],
      data: {
        title: 'Логин',
        controls: [
          {
            text: 'Войти',
            classAttrs: ['ui', 'button', 'login_submit', 'form_button'],
            attrs : [
              {
              type: 'submit'
              }
            ],
          },
          {
            text: 'Сбросить',
            classAttrs: ['ui', 'button', 'login_reset', 'form_button'],
            attrs : [
              {
              type: 'reset'
              }
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

    let formRegister = new ModalForm({
      el: document.createElement('dialog'),
      form: 'register',
      classAttrs: ['ui', 'modal_register'],
      data: {
        title: 'Регистрация',
        controls: [
          {
            text: 'Зарегистрироваться',
            classAttrs: ['ui', 'button', 'registe_submit', 'form_button'],
            attrs : [
              {
              type: 'submit'
              }
            ],
          },
          {
            text: 'Сбросить',
            classAttrs: ['ui', 'button', 'register_reset', 'form_button'],
            attrs : [
              {
              type: 'reset'
              }
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

    function _createMess(status, header, text) {
      let newMess = new Message({
        el: document.createElement('div'),
        classAttrs: ['ui', status, 'message'],
      });
      let head = new Message({
        el: document.createElement('div'),
        classAttrs: ['header'],
        text: header
      });
      let content = new Message({
        el: document.createElement('p'),
        text: text
      });
      newMess.el.appendChild(head.el);
      newMess.el.appendChild(content.el);
      return newMess;
    }

    function _hideMess() {
      let messError = document.querySelector('div.error.message');
      let messSuccess = document.querySelector('div.success.message');
      if( messError != null){
        messError.remove();
      }
      if( messSuccess != null){
        messSuccess.remove();
      }
    }

    //listener
    let _addListeners = function() {
      document.querySelector('.close_icon_login').addEventListener('click', event => {
        formLogin.el.close();
        _resetForm(formLogin.form);
      });
      document.querySelector('.close_icon_register').addEventListener('click', event => {
        formRegister.el.close();
        _resetForm(formRegister.form);
      });
      buttonLogin.el.addEventListener('click', event => {
        formLogin.el.showModal();
      });
      buttonRegister.el.addEventListener('click', event => {
        formRegister.el.showModal();
      });
      formLogin.el.addEventListener('submit', _submitLogin);
      formLogin.el.addEventListener('reset', event => {
        // _resetForm(formLogin.form);
        _resetForm(formLogin)
      });
      formRegister.el.addEventListener('submit', _submitRegister);
      formRegister.el.addEventListener('reset', event => {
        _resetForm(formRegister.form);
      });
    }

    //events
    function _submitLogin(event) {
      event.preventDefault();
      _hideMess();
      let empty = formLogin.tryEmptyField();
      if (empty.length != 0) {
        let mess = _createMess('error', 'Заполни пустые поля!', '');
        formLogin.el.appendChild(mess.el);
      } else {
        _sendRequest('/auth', formData, formLogin, 'login');
      }
    }

    function _submitRegister(event) {
      event.preventDefault();
      _hideMess();
      let empty = formRegister.tryEmptyField();
      let valid = formRegister.tryValidate();
      if ( valid ) {
        let mess = _createMess('error', 'Заполни форму правильно!', valid);
        formRegister.el.appendChild(mess.el);
      } else {
        _sendRequest('/registration', formData, formRegister, 'register');
      }

    }

    function _resetForm(form){
      _hideMess();
      let mess = document.querySelector('div.error.message');
      if( mess != null){
        mess.remove();
      }
      let errors = Array.from(document.getElementsByClassName('error'));
      errors.forEach( element => {
        element.classList.remove('error');
      });
    }

    //requests +

    function _sendRequest(to, data, form, clas) {
      let responseMap = {
        200: '1',
        400: '0',
        406: '0'
      };
      document.querySelector('form.'+clas).classList.add('loading');
      let jsonData = JSON.stringify(data);
      let initPomise = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      };
      let base_url = 'http://brain404-backend.herokuapp.com/api',
          url = base_url + to;

      function to_json(response) {
        return response.json();
      }

      function status(response) {
        document.querySelector('form.'+clas).classList.remove('loading');
        if (response.status in responseMap) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      }

      function serverStatus(response) {
        if (responseMap[response.status] === '1') {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      }

      fetch(url, initPomise)
        .then(status)
        .then(response => {
          serverStatus(response)
          .then(to_json)
          .then( data => {
            console.log(data);
            let mess = _createMess('success', data['login']);
            form.el.appendChild(mess.el);
          })
          .catch ( error => {
            to_json(error)
            .then( error => {
              console.log(error);
              let mess = _createMess('error', error['msg']);
              form.el.appendChild(mess.el);
              Object.keys(data).forEach( field => {
                form.el.querySelector('input[name=' + field + ']').parentNode.classList.add('error');
              });
            })
          });
        })
        .catch ( error => {
            let mess = _createMess('error', 'Not a server error!');
            form.el.appendChild(mess.el);
        });
    }

    mainContainer.appendChild(buttons.el);
    buttons.el.appendChild(buttonLogin.el);
    buttons.el.appendChild(buttonOr.el);
    buttons.el.appendChild(buttonRegister.el);
    mainContainer.appendChild(formLogin.el);
    mainContainer.appendChild(formRegister.el);
    _addListeners();
  }

  const filter = (str, rules = ['kek', 'hek']) => {
    rules.forEach(rule => {
      const star = '*';
      const stars = star.repeat(rule.length);
      const rgx = new RegExp('\\b' + rule + '\\b', 'gi');
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
})();
