class SearchView {
    _parentElement = document.querySelector('.search');

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function CheckInput() {
            event.preventDefault();
            handler();
        });
    }

    getQuery() {
        return document.querySelector('.search__field').value;
    }

}

export default new SearchView();