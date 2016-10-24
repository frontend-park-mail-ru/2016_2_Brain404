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

        _getFields() {
            const fields = this.data.fields;
            return fields.map((field) => {
                return `
        <div class="field ${field.required}">
          <label>${field.label}</label>
          <input type="${field.type}" name="${field.name}" placeholder="${field.label}">
        </div>
        `;
            }).join(' ');
        }

        _updateHtml() {
            this.el.innerHTML = `
        <div class="close_icon close_icon_${this.form}">
          <i class="close pink icon float_right"></i>
        </div>
        <h2 class="ui center pink aligned icon header">
          <i class="circular pink users icon"></i>
          ${this.data.title}
        </h2>
        <div class="description">
          <div class="form_container">
            <form class="ui form ${this.form}">
              ${this._getFields()}
              <div class="js-controls_${this.form}">
              </div>
            </form>
          </div>
        </div>
      `;
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

  }

  // export
    window.ModalForm = ModalForm;
}());
