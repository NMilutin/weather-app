import View from './View.js';

class SettingsView extends View {
    _parentEl = document.querySelector('.settings');
    
    addHandlerCloseSettings(handler) {
        this._parentEl.addEventListener('click',(function (e) {
            const btn = e.target.closest('.settings-close');
            if (!btn) return;
            this._parentEl.classList.add('hidden');
            handler();
        }).bind(this))
    }
}

export default new SettingsView();