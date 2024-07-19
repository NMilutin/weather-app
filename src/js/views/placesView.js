import * as icons from 'url:../../img/svg/*.svg';
import View from './View.js';

class PlacesView extends View {
    _parentEl = document.querySelector('.settings-places');
    _errorMessage = 'There are no places set up...';
    _generateMarkup() {
        return `
        <div class="add-place-container"><input id="place-add" alt="Place Name"/><img class="place-add" src="${icons.add}"/></div>
        <div class="places-list"> 
            ${this._data.map(place=>`
                <div class="place"><div class=place-name>${place.name}</div><img class="place-delete" src="${icons.delete}"/></div>`
            )}
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
        this._parentEl.addEventListener('click', handler);
    }
}

export default new PlacesView();