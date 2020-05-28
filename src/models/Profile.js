import axios from "Axios";

export default class Profile{
    constructor(){

    }
    async loadProfile(input){
        try{
         const respond = await axios(`https://api.allorigins.win/raw?url=https://superheroapi.com/api/3111630088923163/${input}`)
        const data = respond.data
            this.name = data.name    
            this.id = data.id
            this.img = data.image.url
            this.biography = data.biography
            this.powerStats = data.powerstats
            return this   
        }catch(error){
            alert(error)
        }
    }
}