(function () {
  'use strict';

  beforeEach(function () {
    delete Router.__instance;
    this.router = new Router();
  });


  describe('Класс Router', function () {
    it('instance of Router is singletone', function () {
      expect(new Router()).toEqual(this.router);
    });
  });

  describe('Router.fn.start', function () {
    beforeEach(function () {
      spyOn(Route.prototype, 'navigate');
    });

    it('Не происходит переходов на роуты до вызова метода', function () {
      this.router.addRoute('/login', View);
      this.router.addRoute('/register', View);
      this.router.addRoute('/scoreboard', View);
      expect(Route.prototype.navigate).not.toHaveBeenCalled();

      // имитирует переход по клику по ссылке
      this.router.history.pushState({}, '', '/login');
      expect(Route.prototype.navigate).not.toHaveBeenCalled();

      this.router.go('/register');
      // expect(Route.prototype.navigate).not.toHaveBeenCalled();

      this.router.go('/scoreboard');
      // expect(Route.prototype.navigate).not.toHaveBeenCalled();
    });

    it('После вызова метода переходы по роутам происходят', function () {
      this.router.addRoute('/login', View);
      this.router.addRoute('/register', View);
      this.router.start();
      this.router.go('/login');
      expect(Route.prototype.navigate).toHaveBeenCalledWith('/login', {});
      this.router.go('/register');
      expect(Route.prototype.navigate).toHaveBeenCalledWith('/register', {});

    });


    it('Переходит на текущий роут', function () {
      history.pushState({}, '', '/');
      this.router.addRoute('/', View);
      this.router.start();
      expect(Route.prototype.navigate).toHaveBeenCalledWith('/', {});
    });

  });

  describe('Router.fn.addRoute', function () {
    it('создаёт новый Route', function () {
      this.router.addRoute('/login', View);
      this.router.addRoute('/register', View);
      expect(this.router.routes[0] instanceof Route).toBe(true);
      expect(this.router.routes[1] instanceof Route).toBe(true);
      expect(this.router.routes.length).toBe(2);
    });


    it('прокидывает свой инстанс в новый роут', function () {
      this.router.addRoute('/login', View);
      expect(this.router.routes[0].__router).toEqual(this.router);
    });
  });

  describe('Router.fn.go', function () {
    beforeEach(function () {
      this.router.start();
      spyOn(this.router, 'onroute');
    });

    it('меняет pathname страницы', function () {
      this.router.go('/login');
      expect(window.location.pathname).toBe('/login');
    });

    it('вызывает метод onroute c новым путём', function () {
      this.router.go('/register');
      expect(this.router.onroute).toHaveBeenCalledWith('/register', {});
    });

    it('вызывает метод onroute только если новый путь отличался от старого', function () {
      this.router.history.pushState({}, '', '/scoreboard');
      this.router.go('/scoreboard');
      expect(this.router.onroute).not.toHaveBeenCalled();
    });
  });

  describe('Router.fn.onroute', function () {
    beforeEach(function () {
      this.router.addRoute('/login', View);
      this.router.addRoute('/register', View);
      this.router.start();
      spyOn(this.router.routes[1], 'navigate');
    });

    it('метод переходит на один из роутов', function () {
      this.router.go('/register');
      expect(this.router.routes[1].navigate).toHaveBeenCalledWith('/register', {});
    })
  });

  // describe('Router.fn.history', function () {
  //   beforeEach(function () {
  //     spyOn(Route.prototype, 'navigate');
  //   });
  //
  //   it('метод переходит назад', function () {
  //     this.router.addRoute('/login', View);
  //     this.router.addRoute('/register', View);
  //     this.router.start();
  //     this.router.go('/login');
  //     this.router.go('/register');
  //     this.router.setHistory(this.router.back());
  //     expect(window.location.pathname).toBe('/login');
  //   })
  // });

})();