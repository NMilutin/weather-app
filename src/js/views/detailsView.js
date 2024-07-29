import * as icons from 'url:../../img/svg/*.svg';
import View from './View.js';

class DetailsView extends View {
    _parentEl = document.querySelector('.block--details');
    _generateMarkup() {
        return `
            <div class="block-title">Details</div>
            <div class="details">
            ${this._data
                .map(
                    det => `
                    <div class="detail">
                        <div class="detail-name">${det.name}</div>
                        <div class="detail-value">${det.val}</div>
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

export default new DetailsView();
