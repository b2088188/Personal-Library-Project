import View from './View';
class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _data;
    _errorMessage='No books found for your search! Please try again';

    _generateMarkup() {
      return  this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {    	
        const id = window.location.hash.slice(1);
        return `<li class="preview">
              <a class="preview__link ${result.id==id?'preview__link--active':''}" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.image}" alt="${result.title}"  class="preview__img"/>
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${_limitTitle(result.title)}</h4>
                  <p class="preview__publisher">${result.author[0]}</p>
                  <p class="preview__price">$${result.price}</p>
                </div>
              </a>
            </li>`;
    }



}

   function  _limitTitle(title,limit=30){    	   	    
        let strArr=title.split(' ');
        const newStr=[];
        strArr.reduce(function countLength(acc,curStr){
          if((curStr.length+acc)<limit)
              newStr.push(curStr);          
          return acc+curStr.length;    
        },0);
        return `${newStr.join(' ')} ...`;
    }

export default new ResultsView();