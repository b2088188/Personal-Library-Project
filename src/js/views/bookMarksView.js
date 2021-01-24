import View from './View';
class BookMarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

   addHandlerRenderInitialBookmarks(handler){
    window.addEventListener('load',function render() {
       handler();
    });
   }

    _generateMarkup() {
       return this._data.map(this._generateMarkItem).join('');
    }

    _generateMarkItem(item) {
      const id = window.location.hash.slice(1);
        return `<li class="preview">
                    <a class="preview__link ${item.id==id?'preview__link--active':''}" href="#${item.id}">
                      <figure class="preview__fig">
                        <img src="${item.image}" alt="${item.title}" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__title">
                        ${item.title}
                        </h4>
                        <p class="preview__publisher">${item.author[0]}</p>
                      </div>
                    </a>
                  </li>`;
    }
}
export default new BookMarksView();