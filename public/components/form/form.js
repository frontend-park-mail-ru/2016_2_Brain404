(function () {
  // import
    const Button = window.Button;

    class ModalForm {

        constructor(options = { data: {} }) {
            this.data = options.data;
            this.form = options.form;
            this.classAttrs = options.classAttrs || [];
            this.el = options.el;
            this.render();
        }

        render() {
            this.setClassAttrs(this.classAttrs);
            this._updateHtml();
            this._installControls();
            return this;
        }

        setClassAttrs(classAttrs) {
            this.classAttrs.forEach((name) => {
                this.el.classList.add(name);
            });
        }

        _updateHtml() {
            const _template = window.fest['components/form/form.tmpl'](this);

            this.el.innerHTML = _template;
        }

        _installControls() {
            const controls = this.data.controls;
            controls.forEach((data) => {
                const control = new Button({
                    el: document.createElement('button'),
                    text: data.text,
                    attrs: data.attrs,
                    classAttrs: data.classAttrs,
                });
                this.el.querySelector(`.js-controls_${this.form}`).appendChild(control.el);
            });
        }

        getFormData() {
            const form = this.el.querySelector('form');
            const elements = form.elements;
            const fields = {};

            Object.keys(elements).forEach((element) => {
                const name = elements[element].name;
                const value = elements[element].value;

                if (!name) {
                    return;
                }

                fields[name] = value;
            });

            return fields;
        }

        createMess(status, header, text) {
            const newMess = new Message({
                el: document.createElement('div'),
                classAttrs: ['ui', status, 'message'],
            });
            const head = new Message({
                el: document.createElement('div'),
                classAttrs: ['header'],
                text: header,
            });
            const content = new Message({
                el: document.createElement('p'),
                text,
            });
            newMess.el.appendChild(head.el);
            newMess.el.appendChild(content.el);
            this.el.appendChild(newMess.el);
        }

        // validate form
        tryEmptyField() {
            let formData = this.getFormData(),
                errors = [],
                lastErrors = Array.from(document.getElementsByClassName('error'));
            lastErrors.forEach((element) => {
                element.classList.remove('error');
            });
            Object.keys(formData).forEach((field) => {
                if (formData[field] == false) {
                    errors.push(field);
                }
            });
            errors.forEach((field) => {
                this.el.querySelector(`input[name=${field}]`).parentNode.classList.add('error');
            });
            return errors;
        }

        validateEmail(field) {
            const apos = field.indexOf('@');
            const dotpos = field.lastIndexOf('.');
            if (apos < 1 || dotpos - apos < 2) {
                return false;
            }
            else {
                return true;
            }
        }

        validateUsername(fld) {
            let error = '',
                illegalChars = /\W/; // allow letters, numbers, and underscores
            if ((fld.length < 5) || (fld.length > 15)) {
                error += 'Username от 5 до 15 символов!';
            } else if (illegalChars.test(fld)) {
                error += 'Username только буквы, цифры, нижн.подчеркивание!';
            }
            return error;
        }

        validatePassword(fld, fld2) {
            let error = '',
                illegalChars = /[\W_]/; // allow only letters and numbers

            if ((fld.length < 6) || (fld.length > 15)) {
                error += 'Пароль от 6 до 15 символов!';
            }
            if (illegalChars.test(fld)) {
                error += 'Пароль только цифры и буквы!';
            }
            if (fld != fld2) {
                error += 'Повтори пароль правильно!';
            }
            return error;
        }

        tryValidate() {
            let form = this.el,
                formData = this.getFormData(),
                errorMess = '';
            if (!this.validateEmail(formData.email)) {
                this.el.querySelector('input[name=email]').parentNode.classList.add('error');
                errorMess += 'Заполни правильно Email!';
            }
            const userValid = this.validateUsername(formData.login);
            if (userValid) {
                this.el.querySelector('input[name=login]').parentNode.classList.add('error');
                errorMess += userValid;
            }
            const passValid = this.validatePassword(formData.password, formData.passwordRepeat);
            if (passValid) {
                this.el.querySelector('input[name=password]').parentNode.classList.add('error');
                this.el.querySelector('input[name=passwordRepeat]').parentNode.classList.add('error');
                errorMess += passValid;
            }
            return errorMess;
        }

        // request
        // sendRequest(to, clas) {
        //     const responseMap = {
        //         200: '1',
        //         400: '0',
        //         406: '0',
        //     };
        //     console.log(this.el);
        //     // this.el.classList.add('ui', 'loader');
        //     document.querySelector(`form.${clas}`).classList.add('loading');
        //     const jsonData = JSON.stringify(this.getFormData());
        //     const initPomise = {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //         body: jsonData,
        //     };
        //     const baseUrl = 'https://nameless-wildwood-32323.herokuapp.com/api';
        //     const url = baseUrl + to;
        //
        //     function toJson(response) {
        //         return response.json();
        //     }
        //
        //     function status(response) {
        //         document.querySelector(`form.${clas}`).classList.remove('loading');
        //         if (response.status in responseMap) {
        //             console.log('resolve');
        //             return Promise.resolve(response);
        //         } else {
        //             console.log('reject');
        //             return Promise.reject(response);
        //         }
        //     }
        //
        //     function serverStatus(response) {
        //         if (responseMap[response.status] === '1') {
        //             return Promise.resolve(response);
        //         } else {
        //             return Promise.reject(response);
        //         }
        //     }
        //     // console.log(initPomise);
        //     fetch(url, initPomise)
        //     .then(status)
        //     .then((response) => {
        //         serverStatus(response)
        //         .then(toJson)
        //         .then((data) => {
        //             const mess = this.createMess('success', data.login);
        //         })
        //         .catch((error) => {
        //             toJson(error)
        //             .then((error) => {
        //                 const mess = this.createMess('error', error.msg);
        //                 Object.keys(data).forEach((field) => {
        //                     form.el.querySelector(`input[name=${field}]`).parentNode.classList.add('error');
        //                 });
        //             });
        //         });
        //     })
        //     .catch((error) => {
        //         const mess = this.createMess('error', 'Not a server error!');
        //     });
        // }

  }

  // export
    window.ModalForm = ModalForm;
}());
