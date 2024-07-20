import * as icons from 'url:../../img/svg/*.svg'
class View {
    _data;
    render(data) {
        if(!data) return;
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    renderError(message=this._errorMessage) {
        const markup = `
        <div class="error">
            <img class="error-icon" src="${icons.error}"/>
            <div class="error-message">${message}</div>
        </div>
        `
        document.body.insertAdjacentHTML('beforeend',markup);
        setTimeout(() => {
            document.querySelector('.error').remove();
        }, 2000);
    }
    _clear() {
        this._parentEl.innerHTML='';
    } 
}
export default View;