(function(){
    'use static';

    class ScoreBoard {

        constructor(opt) {
            this.el = opt.el;
            this.name = 'score'
            this.classAttrs = opt.classAttrs || [];
            this.render();
        }

        render() {
            this.setClassAttrs();
            this.updateHtml();
            return this;
        }

        setClassAttrs() {
            this.classAttrs.forEach( name => {
                this.el.classList.add(name);
            })
        }

        updateHtml(){
            this.el.innerHTML = `
                <div class="close_icon close_icon_${this.name}">
                    <i class="close pink icon float_right"></i>
                </div>
                <table class="ui celled padded large table">
                    <thead>
                        <tr>
                            <th><h4 class="ui pink header">Login name</h4></th>
                            <th>
                                <i class="star pink icon"></i>
                                <i class="star pink icon"></i>
                                <i class="star pink half icon"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                              <h4 class="ui image header">
                                <div class="content">
                                  Lena
                                  <div class="sub header">Human Resources
                                  </div>
                                </div>
                              </h4></td>
                            <td>
                              22
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                              <h4 class="ui image header">
                                <div class="content">
                                  Lena
                                  <div class="sub header">Human Resources
                                  </div>
                                </div>
                              </h4></td>
                            <td>
                              22
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                              <h4 class="ui image header">
                                <div class="content">
                                  Lena
                                  <div class="sub header">Human Resources
                                  </div>
                                </div>
                              </h4></td>
                            <td>
                              22
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
        }
    }

    //exports
    window.ScoreBoard = ScoreBoard;
})();
