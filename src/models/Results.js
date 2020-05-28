import axios from 'Axios'

export default class Results{
    constructor(){
        this.results = []
    }
    async loadResults(page){
        const firstRec = (page-1) * 9 + 1
        const lastRec = page * 9
        for(var i = firstRec;i <= lastRec;i++){
            try{
                const respond = await axios (`https://api.allorigins.win/raw?url=https://superheroapi.com/api/3111630088923163/${i}`)
                const data = respond.data
                const result = {id : data.id,name : data.name,publisher : data.biography.publisher,img : data.image.url}
                this.results.push(result)
            }    
            catch(error){
                continue
                alert(error)
            }
        }
        return this.results
    }
    async searchHero(name){
        const respond = await axios (`https://api.allorigins.win/raw?url=https://superheroapi.com/api/3111630088923163/search/${name}`)  
        const data = respond.data.results
        data.forEach(el => {
        const result = {id : el.id,name : el.name,publisher : el.biography.publisher,img : el.image.url}
        this.results.push(result)     
        })
        return this.results           
    }
}