export default class Favs{
    constructor(){
        this.favs = []
    }
    addFavs(id,name,publisher){
        const fav = {id,name,publisher}
        this.favs.push(fav)
    }
    removeFavs(id){
        this.favs.forEach((el,i)=>{
            if(el.id == id){
                this.favs.splice(i,1)
            }
        })
    }
}