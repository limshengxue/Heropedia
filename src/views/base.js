export const DOMSelectors = {
resultPanel : document.querySelector(".resultPanel"),
profilePanel : document.querySelector('.heroProfile'),
searchForm : document.querySelector('.search'),
favPanel : document.querySelector('.favList'),
favIcon : document.querySelector('.favButton'),
getAll : document.querySelector('.searchAll'),
searchBtn : document.querySelector('.searchBtn')
}

export const renderLoader = (position) => {
    const mockup = `<div class="loader">
    <p class="loader">l</p>
    <p class="loader">o</p>
    <p class="loader">a</p>
    <p class="loader">d</p>
    <p class="loader">i</p>
    <p class="loader">n</p>
    <p class="loader">g</p>
    </div>`
    position.insertAdjacentHTML("beforeend",mockup)
}

export const clear = (position) => {
    position.innerHTML = ""
}
