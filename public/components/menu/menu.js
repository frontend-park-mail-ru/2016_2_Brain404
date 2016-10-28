(function () {
    class Menu {
        constructor(options) {
            this.list = options.list || [];
            this.attrs = options.attrs || [];
            this.classAttrs = options.classAttrs || [];
            this.el = options.el;
            this.login = options.login || '';
            this.render();
        }

        setAttrs(attrs) {
            attrs.forEach((iter) => {
                Object.keys(iter).forEach((name) => {
                    this.el.setAttribute(name, iter[name]);
                });
            });
        }

        setList(list) {
            let str = '';
            if (this.login) {
                str += `<div class="about_acount"><a class="ui pink label ">
            	  <i class="child icon big"></i>
            	  <span class="about_acount_login">${this.login}</span>
            	</a></div>`;
            }
            list.forEach((element) => {
                let _template = window.fest['components/menu/menu.tmpl'](element);
                str += _template;
            });
            this.el.innerHTML = str;
        }

        setClassAttrs(classAttrs) {
            classAttrs.forEach((name) => {
                this.el.classList.add(name);
            });
        }

        render() {
            this.setAttrs(this.attrs);
            this.setClassAttrs(this.classAttrs);
            this.setList(this.list);
            return this;
        }

        toString() {
            return this.el.outerHTML;
        }
  }

    window.Menu = Menu;
}());
