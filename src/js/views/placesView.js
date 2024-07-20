import * as icons from 'url:../../img/svg/*.svg';
import View from './View.js';

class PlacesView extends View {
    _parentEl = document.querySelector('.settings-places');
    _errorMessage = 'No places found! Try again with a different one.';
    _generateMarkup() {
        return `
        <div class="add-place-container"><input id="place-add" alt="Place Name"/><img class="place-add" src="${icons.add}"/></div>
        <div class="places-list"> 
            ${this._data.map((place,i)=>`
                <div class="place" data-i="${i}"><div class=place-name>${place.place}</div><img class="place-del" src="${icons.delete}"/></div>`
            ).join('')}
        </div>
        `
    }
    addHandlerPlaceAdd(handler) {
        this._parentEl.addEventListener('click', (function (e) {
            const btn = e.target.closest('.place-add');
            if (!btn) return;
            handler(this._parentEl.querySelector('#place-add').value);
        }).bind(this))
    }
    addHandlerPlaceDel(handler) {
        this._parentEl.addEventListener('click', (function (e) {
            const btn = e.target.closest('.place-del');
            if (!btn) return;
            handler(+btn.closest('.place').dataset.i)
        }).bind(this));
    }
}

export default new PlacesView();