import * as icons from 'url:../../img/svg/*.svg';
import View from './View.js';

class AqiView extends View {
    _parentEl = document.querySelector('.aqi-info');
    _generateMarkup() {
        return `<div class="aqi-border" style="background: conic-gradient( ${
            this._data.aqiColor
        } ${(this._data.aqi / 500) * 400}grad, #e0e0e0 ${
            (this._data.aqi / 500) * 400
        }grad)">
            <div class="air-quality-index">${this._data.aqi}</div>
        </div>
        <div class="air-quality-details">
            ${this._data.pollutants
                .map(
                    pollutant => `
                    <div class="pollutant">
                        <div class="pollutant-name">${pollutant.name}</div>
                        <div class="pollutant-quantity">${pollutant.val}</div>
                        ${'' /*<div class="pollutant-bar"></div>*/}
                    </div>
                `
                )
                .join(' ')}
        </div>
        `;
    }
    addHandlerLoad(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-reload');
            if (!btn) return;
            handler();
        });
    }
}

export default new AqiView();
