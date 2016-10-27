(function () {
    if (typeof window === 'object') {
        const Router = window.Router;
        const LoginFormView = window.LoginFormView;
        const RegisterFormView = window.RegisterFormView;
        const ScoreboardView = window.ScoreboardView;
        const MainView = window.MainView;
        const User = window.User;

        const user = new User({});

        (new Router())
            .addRoute('/login', LoginFormView, { user })
            .addRoute('/scoreboard', ScoreboardView, { user })
            .addRoute('/register', RegisterFormView, { user })
            .addRoute('/', MainView, { user })
            .start();
    }
}());
