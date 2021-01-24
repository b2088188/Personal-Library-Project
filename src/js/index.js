import '../sass/main.scss';
import * as model from './models/model';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookView from './views/bookView';
import bookMarksView from './views/bookMarksView';
import shoppingCartView from './views/shoppingCartView';

//Search Control
async function controlSearchResults() {
    try {
        const query = searchView.getQuery();
        if (!query) return;
        resultsView.renderSpinner();
        await model.loadSearchResults(query);
        resultsView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search);
    } catch (e) {
        console.log(e);
    }
}

//Pagination Control
function controlPagination(gotoPage) {
    resultsView.render(model.getSearchResultsPage(gotoPage));
    paginationView.render(model.state.search);
}

//BookResult Control
async function controlBookResult() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        bookView.renderSpinner();
        await model.loadBookResult(id);
        bookView.render(model.state.bookresult);
        resultsView.update(model.getSearchResultsPage());
       bookMarksView.update(model.state.bookmarks);
    } catch (error) {
        bookView.renderError();
    }
}

//BookMark Control
function controlBookMarked() {
    if (!model.state.bookresult.bookmarked)
        model.addMarkItem();
    else
        model.deleteMarkItem(model.state.bookresult.id);

    bookView.update(model.state.bookresult);
    bookMarksView.render(model.state.bookmarks);
}

//Render Initial Bookmarks Control
function controlRenderInitialBookMarks() {
    bookMarksView.render(model.state.bookmarks);
}



//ShopCart Add Control
function controlAddShopCart(){
   if(!model.isInCart())
  model.addShopItem();
  shoppingCartView.render(model.state.shopcart,model.state.shopcarttotal);
}
//ShopCart Delete Control
function controlDeleteShopCart(deleteId){
    model.deleteShopItem(deleteId);
    shoppingCartView.render(model.state.shopcart,model.state.shopcarttotal);
}

function init() {
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerPaginationGoto(controlPagination);
    bookView.addHandlerBookResult(controlBookResult);
    bookView.addHandlerBookMarked(controlBookMarked);
    bookMarksView.addHandlerRenderInitialBookmarks(controlRenderInitialBookMarks);
    bookView.addHandlerAddToCart(controlAddShopCart);
    shoppingCartView.addHandlerDeleteFromCart(controlDeleteShopCart);    
}
init();