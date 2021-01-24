export default class View {
    render(data) {
        if (!data || data.length == 0) return this.renderError();
        this._data = data;
        const html = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', html);
    }

    update(data) {
        this._data = data;
        const UpdateHtml = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(UpdateHtml);
        const newElements = [...newDOM.querySelectorAll('*')];
        const curElements = [...this._parentElement.querySelectorAll('*')];
        newElements.forEach(function UpdateHandle(newEl, i) {
            const curEl = curElements[i];
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() != '')
                curEl.textContent = newEl.textContent;

            if (!newEl.isEqualNode(curEl))
                [...newEl.attributes].forEach(function UpdateAttributes(attr) {
                    curEl.setAttribute(attr.name, attr.value);
                });
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage) {
        const errorhtml = `<div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', errorhtml);
    }

    renderSpinner() {
        const spinhtml =
            `<div class="spinner">
              <svg>
                <use href="./img/icons.svg#icon-loader"></use>
              </svg>
            </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', spinhtml);
    }
}