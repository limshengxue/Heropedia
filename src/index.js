import Results from './models/Results'
import * as resultsView from './views/resultsView'
import {DOMSelectors,renderLoader,clear} from './views/base'
import Profile from './models/Profile'
import * as profileView from './views/profileView'
import Favs from './models/Favs'
import * as favsView from './views/favsView'

const state= {};

//Initialise
const loadResults = async function(page = 1){
    try{
    DOMSelectors.searchBtn.disabled = true; 
      //First window load in 10 heroes
    state.results = new Results()
    clear(DOMSelectors.resultPanel)
    renderLoader(DOMSelectors.resultPanel)
    const results = await state.results.loadResults(page)
    //Display the heroes
    clear(DOMSelectors.resultPanel)
     results.forEach(el=>resultsView.renderResults(el))
    //Render Paging Buttons
    resultsView.renderButtons(page)
    DOMSelectors.searchBtn.disabled = false;  
    }catch(error){
        console.log(error)
    }
}

const init = loadResults.bind(this,1)

window.addEventListener("load",init)

DOMSelectors.getAll.addEventListener('click',init)

//Paging
DOMSelectors.resultPanel.addEventListener("click",e=>{
if(e.target.matches('.prev')||e.target.matches('.next')){
    let page;
    if(e.target.closest('.prev')){
        page = e.target.closest('.prev').dataset.set  
    }else{
        page = e.target.closest('.next').dataset.set
    }
     const id = e.target.parentNode.id
     if(id == 'id'){
       loadResults(page)   
     }else{
        resultsView.renderSearchResult(page,state.results.results)
        resultsView.renderButtons(page,state.results.results.length,'name')
     }
}
})

//GOTO paging
DOMSelectors.resultPanel.addEventListener("submit",e=>{
    if(e.target.closest(".pagingForm")){
        e.preventDefault()
        const page =  document.querySelector('.pageValue').value
        if(page > 82){
            alert('Exceed Maximum Page')
        }else{
           clear(DOMSelectors.resultPanel)
            loadResults(page) 
        } 
    }
})

//Load Hero Profile
const loadProfile = async function(){
    let input = location.hash.toString().replace('#','')
    if(input){
        state.profile = new Profile()
        clear(DOMSelectors.profilePanel)
        renderLoader(DOMSelectors.profilePanel)
        const profile = await state.profile.loadProfile(input)
        clear(DOMSelectors.profilePanel)
        profileView.renderProfile(profile)
    }
}
window.addEventListener('hashchange',loadProfile)
window.addEventListener('load',loadProfile)

//Search Hero
const searchProfile = async function(e){
    e.preventDefault()
    const name = document.querySelector('#searchBar').value
    if(name){
    clear(DOMSelectors.resultPanel)
    state.results = new Results()
    renderLoader(DOMSelectors.resultPanel)
    const result = await state.results.searchHero(name)
    clear(DOMSelectors.resultPanel)
    //Display the heroes
    resultsView.renderSearchResult(1,result)
    resultsView.renderButtons(1,state.results.results.length,'name')
    }
}

DOMSelectors.searchForm.addEventListener('submit',e=>searchProfile(e))

//Add as favourite
DOMSelectors.profilePanel.addEventListener('click',e=>{
    if(e.target.closest('.addFav')){
        if(!state.favs) state.favs = new Favs()
        const status = state.favs.addFavs(state.profile.id,state.profile.name,state.profile.biography.publisher)
        favsView.renderFavsIcon(state.favs.favs)
        if(status)favsView.renderFavs(state.profile.id,state.profile.name,state.profile.biography.publisher)
    }
})

//Remove favs
DOMSelectors.favPanel.addEventListener('click',e=>{
    if(e.target.closest('.deleteBtn')){
        let id = e.target.parentNode.getAttribute("id")
        state.favs.removeFavs(id)
        favsView.removeFavs(id)
        favsView.renderFavsIcon(state.favs.favs)
    }
})

//Persist favs
window.addEventListener('load',()=>{
    state.favs = new Favs()
    state.favs.retrieveData()
    state.favs.favs.forEach(el=>favsView.renderFavs(el.id,el.name,el.publisher))
})