import {DOMSelector, DOMSelectors} from './base'

export const renderFavs = (id,name,publisher) => {
    if(publisher.length + name.length > 20){
        publisher = publisher.slice(0,20-publisher.length) + ".."
    }
    const markup = 
    ` <div class = "favs" id="${id}">
    <a href ="#${id}" class="favs"> 
    <h4 class="favName">${name}</h4>
    <p class="favPublisher">${publisher}</p> 
    </a>
    <img class="deleteBtn" src="img/Icons8_flat_delete_generic.svg.png">
    </div>`
DOMSelectors.favPanel.insertAdjacentHTML('beforeend',markup)
}

export const renderFavsIcon = (favs) => {
    if(favs.length < 1){
        DOMSelectors.favIcon.style.display = 'none'
    }else{
        DOMSelectors.favIcon.style.display = 'inline-block'
    }
}

 export const removeFavs = (id) => {
     const target = document.getElementById(id)
     target.parentElement.removeChild(target)
 }