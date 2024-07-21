import * as icons from 'url:../../img/svg/*.svg';
import View from './View.js';

class OverviewView extends View{
    _parentEl = document.querySelector('.overview'); 
    _errorMessage = 'There are no added places or there has been an error fetching weather data.'
    
    _generateMarkup() {
        return `
            <img class="btn-reload" src="./src/img/svg/reload.svg"/>
            <div class="overview--location">           
               ${this._data.place}
           </div>
           <img class="overview--icon" src="${icons[this._data.icon]}"/>
           <div class="overview--temp">
                ${this._data.temperature}
           </div>
           <div class="overview--condition">${this._data.weather}</div>
           <div class="overview--info">
                <div class="info-block info--feel">Real Feel: ${this._data.realfeel}</div>
                <div class="info-block info--wind">Wind: ${this._data.wind.speed} <div style="transform: rotateZ(${this._data.wind.direction+90}deg">➤</div></div>
                <div class="info-block info--uv">UV Index: 7</div>
           </div>` 
    }
    addHandlerLoad(handler) {
        this._parentEl.addEventListener('click',function(e) {
            const btn = e.target.closest('.btn-reload');
            if (!btn) return;
            handler();
        });
    }
    addHandlerOpenSettings(handler) {
        document.querySelector('.settings-button').addEventListener('click',function(){
            document.querySelector('.settings').classList.remove('hidden');
            document.documentElement.classList.add('hide-scrollbar');
            window.scrollTo({top:0, left:0,behavior: 'smooth'})
        });
        handler();
    }
}

export default new OverviewView();