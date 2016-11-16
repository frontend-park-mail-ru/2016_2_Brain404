(function () {
    // import
    const ModalForm = window.ModalForm;
    const Message = window.Message;
    const View = window.View;

    class AboutUserView extends View {
        constructor(options = {}) {
            super(options);
            this.user = options.user;
            this._el = document.querySelector('.user_container_view');
            // this.createElements();
            // this.addElements();
            // this.addListeners();
            this.hide();
        }

        pause() {
            super.pause();
        }

        resume() {
            if (this.user.isAuth) {
                super.resume();
                this.user.sendRequest(`/user/${this.user.id}/`, 'GET')
                    .then(() => {
                        console.log(this.user.responseObj);
                    })
                    .catch(() => {
                        console.log(this.user.responseObj);
                    });
            } else {
                this.router.go('/');
            }
        }

    }

    // export
    window.AboutUserView = AboutUserView;
}());
