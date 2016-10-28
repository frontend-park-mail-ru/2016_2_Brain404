(function () {
    class Menu {
        constructor(options) {
            this.list = options.list || [];
            this.attrs = options.attrs || [];
            this.classAttrs = options.classAttrs || [];
            this.el = options.el;
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
            console.log(list);
            let str = '';
            list.forEach((element) => {
                str += `<a href="" onClick="return false" class="item menu_${element.clas}">
                            <i class="${element.iconClass}"></i>
                            ${element.lable}
                        </a>`;
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
