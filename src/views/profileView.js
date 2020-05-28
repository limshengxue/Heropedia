import {DOMSelectors} from './base'

export const renderProfile = (profile) => {
let alias = "";
for(let string of profile.biography.aliases){
    if(alias.length < 37){
        alias = alias + string + ", "
    }else{
        alias = alias + "..."
        break
    }
}
const markup = 
`<h1 class="heroTitle">${profile.name}</h1>
<h3 class="heroOrigin">from the ${profile.biography.publisher}</h3>
<img src="${profile.img}" alt="name" class="heroProPic">
<div class="heroBio">
    <h2 class="heroBio">Biography</h2>
    <ul class="bioList">
        <li>Full-Name : ${profile.biography['full-name']}</li>
        <li>Alter-Egos : ${profile.biography['alter-egos']}</li>
        <li>Aliases : ${alias}</li>
        <li>Place of Birth : ${profile.biography['place-of-birth']}</li>
        <li>First Apperarance : ${profile.biography['first-appearance']}</li>
        <li>Publisher : ${profile.biography.publisher}</li>
        <li>Alignment : ${profile.biography.alignment}</li>
    </ul>
</div>
<div class="heroPow">
    <h2 class="heroPow">Power Stats</h2>
    <ul class="powList">
        <li>Intelligence : ${profile.powerStats.intelligence}</li>
        <li>Strength : ${profile.powerStats.strength}</li>
        <li>Speed : ${profile.powerStats.speed}</li>
        <li>Durability : ${profile.powerStats.durability}</li>
        <li>Power : ${profile.powerStats.power}</li>
        <li>Combat : ${profile.powerStats.combat}</li>
    </ul>
</div>
<button class="addFav" data-set="${profile.id}"><i class="fas fa-star"></i>  Add To Favourite</button>`

DOMSelectors.profilePanel.insertAdjacentHTML('beforeend',markup)
}