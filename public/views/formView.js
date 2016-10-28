(function () {
    // import
    const View = window.View;

    class FormView extends View {
        constructor(options = {}) {
            super(options);
        }

        createElements(options = {}) {

        }

        addElements(options = {}) {

        }

        addListeners(options = {}) {

        }

        hideMess() {
            const messError = document.querySelector('div.error.message');
            const messSuccess = document.querySelector('div.success.message');
            if (messError != null) {
                messError.remove();
            }
            if (messSuccess != null) {
                messSuccess.remove();
            }
            return this;
        }

        resetFields() {
            const fieldsError = document.querySelectorAll('.field.error');
            if (fieldsError) {
                fieldsError.forEach((field) => { field.classList.remove('error'); });
            }
            let fields = document.querySelectorAll('input');
            fields.forEach(field => {
                field.value = '';
            });
            return this;
        }

    }

    // export
    window.FormView = FormView;
}());
