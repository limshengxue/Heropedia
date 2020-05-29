export default class Favs{
    constructor(){
        this.favs = []
    }
    addFavs(id,name,publisher){
        const fav = {id,name,publisher}
         if(!this.favs.some(el=>el.id == fav.id)){
          this.favs.push(fav)
          this.persistData() 
          return true 
        }   
    }
    removeFavs(id){
        this.favs.forEach((el,i)=>{
            if(el.id == id){
                this.favs.splice(i,1)
            }
        })
        this.persistData()
    }
    persistData(){
        localStorage.setItem("favs",JSON.stringify(this.favs))
    }
    retrieveData(){
        const data = JSON.parse(localStorage.getItem("favs"))
        if(data) this.favs = data
    }
}