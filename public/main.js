(function () {
    if (typeof window === 'object') {
        const Router = window.Router;
        const AboutUserView = window.AboutUserView;
        const LoginFormView = window.LoginFormView;
        const RegisterFormView = window.RegisterFormView;
        const ScoreboardView = window.ScoreboardView;
        const MainView = window.MainView;
        const MenuView = window.MenuView;
        const User = window.User;
        const GameView = window.GameView;

        const user = new User({});

        user.getSession()
            .then(() => {
                (new Router())
                    .addRoute('/user', AboutUserView, { user })
                    .addRoute('/login', LoginFormView, { user })
                    .addRoute('/scoreboard', ScoreboardView, { user })
                    .addRoute('/register', RegisterFormView, { user })
                    .addRoute('/menu', MenuView, { user })
                    .addRoute('/game', GameView)
                    .addRoute('/', MainView, { user })
                    .start();
            });
    }
}());
