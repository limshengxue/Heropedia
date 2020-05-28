import Results from './models/Results'
import * as resultsView from './views/resultsView'
import {DOMSelectors,renderLoader,clear} from './views/base'
import Profile from './models/Profile'
import * as profileView from './views/profileView'

const state ={

};

//Initialise
const loadResults = async function(page = 1){
    try{
    clear(DOMSelectors.resultPanel)
      //First window load in 10 heroes
    state.results = new Results()
    renderLoader(DOMSelectors.resultPanel)
    const results = await state.results.loadResults(page)
    //Display the heroes
    clear(DOMSelectors.resultPanel)
     results.forEach(el=>resultsView.renderResults(el))
    //Render Paging Buttons
    resultsView.renderButtons(page)  
    }catch(error){
        console.log(error)
    }
}

const init = loadResults.bind(this,1)

window.addEventListener("load",init)

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
        if(!state.profile) state.profile = new Profile()
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
const searchProfile = async function(){
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

DOMSelectors.searchForm.addEventListener('submit',searchProfile)
