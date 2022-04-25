const buttonSearch = document.getElementsByClassName('btn-search')[0].addEventListener('click', addCity)
const searchbar = document.querySelector('#searchbar').addEventListener('change', setInput)

let cities = []
let cityToFind = ''

function card(json) {
    // console.log(json)
    this.temp = json.temp
    this.name = json.name
    this.country = json.country
    this.humidity = json.humidity
}

function setInput(e) {
    cityToCall = e.target.value
}

function buildCard(city, index) {
    const card = document.createElement('div')
    const temp = document.createElement('h2')
    const name = document.createElement('h3')
    const country = document.createElement('h3')
    const btnDelete = document.createElement('button')
    card.classList.add('card')
    card.id = index
    temp.innerHTML = city.temp
    name.innerHTML = city.name
    country.innerHTML = city.country
    btnDelete.innerHTML = 'x'

    card.appendChild(temp)
    card.appendChild(name)
    card.appendChild(country)
    card.appendChild(btnDelete)

    return card

}

function buildCards(cards) {
    return cards.map(buildCard)
}

function displayCards() {
    const cardsContainer = document.querySelector('.cards-container')
    buildCards(cities).map(city => cardsContainer.appendChild(city))
}   

async function addCity() {
    let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityToFind}&appid=7f210d5570077900ff87e63e6b354f27&units=metric`)
    let info = api.json()
    const newCard = new card(info)
    cities.push(newCard)
    displayCards()
}

displayCards()