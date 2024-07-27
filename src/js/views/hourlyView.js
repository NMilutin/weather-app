import * as icons from 'url:../../img/svg/*.svg'
import View from './View.js';

class HourlyView extends View {
    _parentEl = document.querySelector('.block--hourly .block-cards');
    _generateMarkup() {
        return this._data.map(hour=>`
            <div class="card card-hourly">
                <div class="date--date">${hour.date}</div>
                <div class="date--time">${hour.hour}</div>
                <img class="icon" src="${icons[hour[hour.isDay?'iconDay':'iconNight']]}"/>
                <div class="card-temp">${hour.temperature}</div>
            </div>
        `).join(' ')
    }
    addHandlerLoad(handler) {
        this._parentEl.addEventListener('click',function(e) {
            const btn = e.target.closest('.btn-reload');
            if (!btn) return;
            handler();
        });
    }
}

export default new HourlyView();