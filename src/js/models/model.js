import { API_Url, Image_Url } from '../config/config';
import { getResults } from '../helpers/helpers';

export const state = {
    bookresult: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resPerPage: 10
    },
    fakeprices: [],
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
    shopcart: [],
    shopcarttotal: 0
}

export async function loadSearchResults(query) {
    try {
        state.search.query = query;
        const res = await getResults(`${API_Url}?q=${state.search.query}&maxResults=40`);
        if (Array.isArray(res.data.items) && res.data.items.length > 0)
            state.search.results = res.data.items.map(function storeResults(result) {                
                return {
                    id: result.id,
                    title: result.volumeInfo.title || 'Unknown',
                    author: result.volumeInfo.authors || ['Unknown'],
                    image: result.volumeInfo.imageLinks?result.volumeInfo.imageLinks.smallThumbnail : 'http://books.google.com/books/content?id=DKcWE3WXoj8C&printsec=frontcover&img=1',
                    price:Math.floor(Math.random() * 301) + 200
                };                
            });
    
    } catch (error) {
        throw error;
    }
}

export function getSearchResultsPage(page = 1) {
    state.search.page = page;
    const start = (state.search.page - 1) * state.search.resPerPage;
    const end = state.search.page * state.search.resPerPage;
    return state.search.results.slice(start, end);
}

export async function loadBookResult(id) {
    try {
        const res = await getResults(`${API_Url}/${id}`);
        const { data } = res;
        state.bookresult = {
            id: data.id,
            title: data.volumeInfo.title || 'Unknown',
            author: data.volumeInfo.authors || ['Unknown'],
            image: `${Image_Url}${data.id}?fife=w600-h500`,
            publisher: data.volumeInfo.publisher || 'Unknow',
            publisherdate: data.volumeInfo.publisherDate || 'Unknown',
            rating: data.volumeInfo.averageRating || 0,
            description: data.volumeInfo.description || 'This is a description about the book',
            buylink: data.saleInfo.buyLink || 'https://play.google.com/store/books',
            price: getPrice(data.id),
            bookmarked: false
        }
        state.bookresult.bookmarked = checkMarked(state.bookresult.id);
    } catch (error) {
        throw error;
    }
}


function getPrice(id) {
    const res = state.search.results.find(function findResPrice(result) {
        return result.id == id;
    });

    if (!res) return 475;

    return res.price;
}

function checkMarked(bookresultId) {
    const index = state.bookmarks.findIndex(function findMark(mark) {
        return mark.id == bookresultId;
    });
    return index > -1 ? true : false;
}

export function addMarkItem() {
    state.bookmarks.push(state.bookresult);
    persistBookmarks();
    state.bookresult.bookmarked = true;
}

export function deleteMarkItem(id) {
    const delIndex = state.bookmarks.findIndex(function findDel(mark) {
        return mark.id == id;
    });
    state.bookmarks.splice(delIndex, 1);
    persistBookmarks();
    state.bookresult.bookmarked = false;
}

export function isInCart(){
    const index = state.shopcart.findIndex(function checkId(item){
        return item.id == state.bookresult.id;
    });
    return index>-1?true:false;
}

export function addShopItem() {
    state.shopcart.push(state.bookresult);
    CalcShopTotal('increase',state.bookresult.price);
}

export function deleteShopItem(id) {
    const delIndex = state.shopcart.findIndex(function findDelIndex(item){
        return id==item.id;
    });
    if(delIndex>-1)
       {
           state.shopcart.splice(delIndex,1);
           CalcShopTotal('decrease',getPrice(id));     
       }     
}



function CalcShopTotal(type,price) {
    if(type=='increase')
    state.shopcarttotal += price;
    if(type=='decrease')
        state.shopcarttotal -= price;
}

function persistBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}