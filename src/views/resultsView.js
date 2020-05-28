import {DOMSelectors, clear} from './base'

export const renderResults = (result) => {
    if(result){
    const markup = `<div class = "results">
    <a href="#${result.id}">
    <img src="${result.img}" class="heroImage" alt="${result.name}">
    <h4 class="heroName">${result.name}</h4>
    <p class="heroPublisher">${result.publisher}</p>
    </a>
    </div> `
    DOMSelectors.resultPanel.insertAdjacentHTML("beforeend",markup)  
    }  
}

export const renderSearchResult = (page,result) => {
    clear(DOMSelectors.resultPanel)
    const firstRec = (page-1) * 9 
    const lastRec = (page * 9)
    for(let i = firstRec; i < lastRec;i++){
        if(i < result.length){
         const markup =  `<div class = "results">
        <a href="#${result[i].id}">
        <img src="${result[i].img}" class="heroImage" alt="${result[i].name}">
        <h4 class="heroName">${result[i].name}</h4>
        <p class="heroPublisher">${result[i].publisher}</p>
        </a>
        </div> `
        DOMSelectors.resultPanel.insertAdjacentHTML("beforeend",markup)   
        }
    }
}

export const renderButtons = (page,totalResult = 732,type='id') => {
    const endPage = Math.ceil(totalResult/9);
    page = parseInt(page)
    let markup,markup1;
    if(endPage > 1){
     if(page == 1){
        markup = 
    `<div class="pagingButton" id="${type}">
        <button class="next" data-set="${page + 1}"><i class="fas fa-arrow-right"></i>  Page ${page + 1}</button>
    `
    }else if (page == endPage){
        markup = 
    `<div class="pagingButton" id="${type}">
        <button class="prev" data-set="${page - 1}"><i class="fas fa-arrow-left"></i>  Page ${page - 1}</button>
    `
    }else{
        markup = 
    `<div class="pagingButton"id="${type}">
        <button class="prev"  data-set="${page - 1}"><i class="fas fa-arrow-left"></i>  Page ${page - 1}</button>
        <button class="next"  data-set="${page + 1}"><i class="fas fa-arrow-right"></i>  Page ${page + 1}</button>
    `
    }
    if(type == 'id'){
        markup1 = `     
        <form class="pagingForm">
        <input type="text" class="pageValue" required></input><button type="submit" class="jumpBtn">Jump To</button>
        </form>
        </div>`
    }else{
        markup1 = `</div>`
    }
    markup = markup + markup1
    DOMSelectors.resultPanel.insertAdjacentHTML('beforeend',markup)   
    }
}