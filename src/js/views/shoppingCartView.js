import View from './View';
class ShoppingCartView extends View {
    _shopContainer = document.querySelector('.shop__container')
    _parentElement = document.querySelector('.shop__list');
    _checkOutContainer = document.querySelector('.shop__checkout-box');
   
   _Message='No books in the shopping cart yet. Find a facinating book and add to shopping cart :)';

    addHandlerDeleteFromCart(handler){
        this._shopContainer.addEventListener('click',function checkDeleteBtn(){
          const deleteId = event.target.closest('.preview__delete').dataset.id;
          if(!deleteId)return;
            handler(deleteId);
        });
    }

   addHandlerRenderInitialShoppingCart(handler){
    window.addEventListener('load',function InitialShopCart(){
          handler();
    });
   }

    render(data, total) {
        if(total==0)return this._renderMsg();
        this._data = data;
        this._total = total;
        const itemhtml = this._generateMarkup();
        const totalhtml = this._generateMarkupTotal();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', itemhtml);
        this._checkOutContainer.insertAdjacentHTML('beforeend', totalhtml);
    }

    _generateMarkup() {
        return this._data.map(this._generateMarkItem).join('');
    }


    _generateMarkItem(item) {
        return `<li class="preview">
                                    <a href="#" class="preview__delete" data-id="${item.id}">&times;</a>
                                    <div class="preview__link  preview__cartitem" >
                                        <figure class="preview__fig">
                                              <img src="${item.image}" alt="${item.title}" />
                                        </figure>
                                        <div class="preview__data">
                                            <h4 class="preview__title">
                                                ${item.title}
                                            </h4>
                                            <p class="preview__publisher">${item.author[0]}</p>
                                            <p class="preview__price preview__price-info">$${item.price}</p>
                                        </div>
                                    </div>
                                </li>  `;
    }
    _generateMarkupTotal() {
        this._checkOutContainer.innerHTML = '';
        return `<h2 class="shop__total shop__total-info">Total : $<span class=" shop__total shop__total-value">${this._total}</span></h2>
                              <button class="btn-text shop__checkout">Check Out</button>  
                            `;
    }
   
  _clear(){
    this._checkOutContainer.innerHTML='';
    this._parentElement.innerHTML='';
  }

   _renderMsg(message=this._Message){
    const html = `<div class="message">
                                   <div>
                                     <svg>
                                      <use href="./img/icons.svg#icon-smile"></use>
                                    </svg>
                                   </div>
                                    <p>
                                          ${message}
                                    </p>
                                </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',html);
   }

}
export default new ShoppingCartView();