import * as icons from 'url:../../img/svg/*.svg';

console.log(icons);

class OverviewView {
    _data;
    _parentEl = document.querySelector('.overview'); 
    render(data) {
        if(!data || (Array.isArray(data) && data.length===0)) return;
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    _clear() {
        this._parentEl.innerHTML='';
    }
    _generateMarkup() {
        return `<div class="overview--location">           
               ${this._data.place}
           </div>
           <img class="overview--icon" src="${icons[this._data.icon]}"/>
           <div class="overview--temp">
                ${this._data.temperature}
           </div>
           <div class="overview--condition">Clear Sky</div>
           <div class="overview--info">
                <div class="info-block info--feel">${this._data.realfeel}</div>
                <div class="info-block info--wind">5.6 m/s</div>
                <div class="info-block info--uv">7</div>
           </div>` 
    }
    addHandlerLoad(handler) {
        window.addEventListener('load',handler);
    }
}

export default new OverviewView();