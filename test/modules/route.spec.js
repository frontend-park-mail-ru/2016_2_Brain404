(function () {
  'use strict';

  describe('Route.fn.match', function () {
    beforeEach(function () {
      this.route = new Route('/login', View);
    });

    it('возвращает true, если переданный путь удовлетворяет шаблону, заданому при создании роута', function () {
      expect(this.route.match('/login')).toBe(true);
    });


    it('возвращает false, если переданный путь не удовлетворяет шаблону, заданому при создании роута', function () {
      expect(this.route.match('/register')).toBe(false);

    });
  })

  describe('Route.fn.navigate', function () {
    beforeEach(function () {
      this.route = new Route('/path/:key', View);
      spyOn(View.prototype, 'init');
      spyOn(View.prototype, 'resume');
      spyOn(View.prototype, 'setRouter');
    });

    it('при первом переходе на роут создаётся инстанс view', function () {
      this.route.navigate('/login');
      expect(this.route._view).toBeDefined();
      expect(this.route._view instanceof View).toBe(true);
    });

    it('при первом переходе на роут у созданной view вызывается метод init()', function () {
      this.route.navigate('/login');
      expect(View.prototype.init).toHaveBeenCalled();
    });

    it('при переходе на роут у созданной view вызывается метод resume() c первым артументом, содержащим параметры пути', function () {
      this.route.navigate('/path/111');
      expect(View.prototype.resume).toHaveBeenCalledWith({key: '111'});
    });

    it('при переходе на роут у созданной view вызывается метод resume() c первым артументом, содержащим данные из state', function () {
      let state = {foo: 'bar'};
      this.route.navigate('/path/123', state);
      expect(View.prototype.resume).toHaveBeenCalledWith({foo: 'bar', key: '123'});
    });

    it('при переходе на роут во вновь созданную view прокидывается объект роутера, установленный вызовом метода setRoute()', function () {
      let router = {foo: 'bar'};
      this.route.setRouter(router);
      this.route.navigate('/login');
      expect(View.prototype.setRouter).toHaveBeenCalledWith(router);
    });

  });
  // describe('Route.fn.leave', function () {
  //   beforeEach(function () {
  //     this.route = new Route('/path/:key', View);
  //     spyOn(View.prototype, 'pause');
  //   });
  //
  //   it('При покидании роута у view вызывается метод pause', function () {
  //     this.route.navigate('/path/123');
  //     this.route.leave();
  //     expect(View.prototype.pause).toHaveBeenCalled();
  //   });
  // });


})();