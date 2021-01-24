import View from './View';
class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerPaginationGoto(handler) {
        this._parentElement.addEventListener('click', function checkPaginationBtn() {
            const gotoPage = event.target.closest('.pagination__btn').dataset.goto;
            if (gotoPage)
                handler(Number(gotoPage));
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const totalPage = Math.ceil(this._data.results.length / this._data.resPerPage);
        if (curPage == 1 && totalPage > 1) {
            return this._generatePaginationBtn(curPage, 'next');
        }
        if (curPage < totalPage) {
            return `${this._generatePaginationBtn(curPage,'prev')}
               ${this._generatePaginationBtn(curPage,'next')}`;
        }
        if (curPage == totalPage && totalPage > 1) {
            return this._generatePaginationBtn(curPage, 'prev');
        }
    }

    _generatePaginationBtn(page, type) {
        if (type == 'prev')
            return `<button class="btn--inline pagination__btn pagination__btn--prev" data-goto="${page-1}">
            <svg class="pagination__icon">
              <use href="./img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${page-1}</span>
            </button>`;

        return `<button class="btn--inline pagination__btn pagination__btn--next" data-goto="${page+1}">
            <span>Page ${page+1}</span>
            <svg class="pagination__icon">
              <use href="./img/icons.svg#icon-arrow-right"></use>
            </svg>            
            </button>`;
    }
}

export default new PaginationView();