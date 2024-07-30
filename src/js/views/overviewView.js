import * as icons from 'url:../../img/svg/*.svg';
import View from './View.js';

class OverviewView extends View {
    _parentEl = document.querySelector('.overview');
    _errorMessage =
        'There are no added places or there has been an error fetching weather data.';

    _generateMarkup() {
        const hideLeft = this._data.index === 0;
        const hideRight = this._data.index === this._data.length - 1;
        return `
            <img class="btn-reload" src="${icons.reload}" alt="Reload Button"/>
            ${hideLeft ? '' : `<img class="btn btn-left" src="${icons.left}"/>`}
            ${
                hideRight
                    ? ''
                    : `<img class="btn btn-right" src="${icons.right}"/>`
            }
            <div class="overview--location">           
               ${this._data.place}
           </div>
           <img class="overview--icon" src="${
               icons[this._data.icon]
           }" alt="Overview Weather Icon ${this._data.icon}"/>
           <div class="overview--temp">
                ${this._data.temperature}
           </div>
           <div class="overview--condition">${this._data.weather}</div>
           <div class="overview--info">
                <div class="info-block info--feel">Real Feel: ${
                    this._data.realfeel
                }</div>
                <div class="info-block info--wind">Wind: ${
                    this._data.wind.speed
                } <div style="transform: rotateZ(${
            this._data.wind.direction + 90
        }deg">➤</div></div>
                <div class="info-block info--uv">UV Index: ${
                    this._data.uv
                }</div>
           </div>`;
    }
    addHandlerLoad(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-reload');
            if (!btn) return;
            handler();
        });
    }
    addHandlerOpenSettings(handler) {
        document
            .querySelector('.settings-button')
            .addEventListener('click', function () {
                document.querySelector('.settings').classList.remove('hidden');
                document.documentElement.classList.add('hide-scrollbar');
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                handler();
            });
    }
    addHandlerChangeActive(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn');
            if (!btn) return;
            if (btn.classList.contains('btn-left')) handler('l');
            if (btn.classList.contains('btn-right')) handler('r');
        });
    }
}

export default new OverviewView();
