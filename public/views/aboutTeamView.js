(function () {
    // import
    const View = window.View;

    class AbouTeamView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.about_team');
            this.brain404Icon();
        }

        brain404Icon() {
            this._el.innerHTML = `<div class="ui grid one about_team">
            		<div class="ui animated huge list">
            			<div class="item">
            				<a href="https://github.com/frontend-park-mail-ru/2016_2_Brain404" target="_blank" class="ui">
            					<i class="github pink icon"></i>
            				</a>
            			</div>
            			<div class="item">
            				<a href="#" class="ui">
            					<i class="credit card alternative pink icon"></i>
            				</a>
            			</div>
            		</div>
            	</div>`;
        }
    }

    // export
    window.AbouTeamView = AbouTeamView;
}());
