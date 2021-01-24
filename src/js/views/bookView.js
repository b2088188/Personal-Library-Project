import View from './View';
class BookView extends View{
      _parentElement = document.querySelector('.books');
      _errorMessage = 'We could not find the book. Please try another one!';
      addHandlerBookResult(handler){
      	['hashchange','load'].forEach(function TwoEvent(ev){
               window.addEventListener(ev, function BookResult(){
                    handler();
               });
      	})
      }

     addHandlerBookMarked(handler){
      this._parentElement.addEventListener('click',function checkBookMarked(){
          const bookMarkBtn = event.target.closest('.books__markicon');
          if(bookMarkBtn)
            handler();
      });
     }

    addHandlerAddToCart(handler){
      this._parentElement.addEventListener('click',function checkAddCartBtn(){
           const addToCartBtn = event.target.closest('.books__addcart');
           if(addToCartBtn)
            handler();
      });
    }

      _generateMarkup(){
          return `<div class="books__card">
            <div class="books__cardside books__cardside--front">
              <figure class="books__fig">
                <img src="${this._data.image}" alt="${this._data.title}" class="books__img" />
              </figure>
            </div>
            <div class="books__cardside  books__cardside--back">
              <div class="books__cta">
                <div class="books__url-box">
                  <p class="books__url-info">Here's the LInk&darr;</p>
                </div>
                <a href="${this._data.buylink}" class="btn btn--white books__url" target="_blank">Buy now!</a>
              </div>
            </div>
          </div>
          
          <div class="books__detail">
            <h1 class="books__title">
            <span>${this._data.title}</span>
            </h1>
            <span class="books__info-text">Author</span>
            <h2 class="books__info-data books__author">${this._data.author[0]}</h2>
            <span class="books__info-text">★Rating</span>
            <h2 class="books__info-data books__rating">${this._data.rating}</h2>
            <span class="books__info-text">Publisher</span>
            <h2 class="books__info-data books__publisher">${this._data.publisher}</h2>
            <span class="books__info-text">Publisher Date</span>
            <h2 class="books__info-data books__date">${this._data.publisherdate}</h2>
            <span class="books__info-text">Price</span>
            <h2 class="books__info-data books__price">$${this._data.price}</h2>
          
            <button class = "btn--round books__markicon">
            <svg>
              <use   href="./img/icons.svg#icon-bookmark${this._data.bookmarked?'-fill':''}"></use>
            </svg>
            </button>
          </div> 
        
          <div class="books__description-box">
            <h1 class="books__title books__description-title">
            <span>Description</span>
            </h1>
            <p class="books__description">
              ${removeChars(this._data.description)}
            </p>
          </div>`;
      }

      

}

function removeChars(description){
       description = description.replace(/<p[^>]*>/g, "");
       description =description.replace(/<\/?p[^>]*>/g, "");
       description =description.replace('.','.</br>');
       return description;
}

export default new BookView();