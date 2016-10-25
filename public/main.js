(function () {
    if (typeof window === 'object') {
        const Router = window.Router;
        const LoginFormView = window.LoginFormView;
        const RegisterFormView = window.RegisterFormView;
        const ScoreboardView = window.ScoreboardView;
        const MainView = window.MainView;

        (new Router())
            .addRoute('/login', LoginFormView)
            .addRoute('/register', RegisterFormView)
            .addRoute('/scoreboard', ScoreboardView)
            .addRoute('/', MainView)
            .start();
    }
}());
