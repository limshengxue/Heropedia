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
      //First window load in 10 heroes
    state.results = new Results
    renderLoader(DOMSelectors.resultPanel)
    const results = await state.results.loadResults(page)
    clear(DOMSelectors.resultPanel)
    //Display the heroes
     resultsView.renderResults(results)
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
if(e.target.closest('.next','.prev')){
     const page = e.target.closest('.next','.prev').dataset.set
     clear(DOMSelectors.resultPanel)
     const id = e.target.parentNode.id
     if(id == 'id'){
       loadResults(page)   
     }else{
         loadResults(page,'name')
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

const searchProfile = async function(){
    const name = document.querySelector('#searchBar').value
    if(name){
    clear(DOMSelectors.resultPanel)
    state.results = new Results()
    renderLoader(DOMSelectors.resultPanel)
    const result = await state.results.loadResults(1,'name',name)
    console.log(result)
    clear(DOMSelectors.resultPanel)
    //Display the heroes
    resultsView.renderResults(result)
    
    }
}

DOMSelectors.searchForm.addEventListener('submit',searchProfile)
