import * as icons from 'url:../../img/svg/*.svg'
import View from './View.js';

class DailyView extends View {
    _parentEl = document.querySelector('.block--daily .block-cards');
    _generateMarkup() {
        return this._data.map(day=>`
            <div class="card card-daily">
                <div class="date--date">${day.date}</div>
                <div class="date--day">${day.weekday}</div>
                <div class="card-daily--daytime">
                    <img class="icon" src="${icons[day.iconDay]}"/>
                    <div class="card-temp">${day.temperatureMax}</div>
                </div>
                <div class="card-daily--nighttime">
                    <div class="card-temp">${day.temperatureMin}</div>
                    <img class="icon" src="${icons[day.iconNight]}"/>
                </div>
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

export default new DailyView();