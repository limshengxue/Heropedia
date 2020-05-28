import axios from 'Axios'

export default class Results{
    constructor(){
        this.results = []
    }
    async loadResults(page,type = 'id',name){
        const firstRec = (page-1) * 9 + 1
        const lastRec = page * 9
        for(var i = firstRec;i <= lastRec;i++){
            try{
                if(type == 'id'){
                const respond = await axios (`https://api.allorigins.win/raw?url=https://superheroapi.com/api/3111630088923163/${i}`)
                const data = respond.data
                const result = {id : data.id,name : data.name,publisher : data.biography.publisher,img : data.image.url}
                this.results.push(result)
                }else{
                const respond = await axios (`https://api.allorigins.win/raw?url=https://superheroapi.com/api/3111630088923163/search/${name}`)  
                const data = respond.data.results
                if(i <= data.length){
                 const result = {id : data[i-1].id,name : data[i-1].name,publisher : data[i-1].biography.publisher,img : data[i-1].image.url}
                this.results.push(result)   
                }else{
                    break
                } 
            }    
            }catch(error){
                continue
                alert(error)
            }
        }
        return this.results
    }
}