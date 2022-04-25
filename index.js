const buttonSearch = document.getElementsByClassName('btn-search')[0].addEventListener('click', addCity)
const searchbar = document.getElementById('searchbar-container').addEventListener('change', setInput)

let cities = []
let cityToFind = ''

function card(json) {
    this.temp = json.main.temp.toString().slice(0, 2)
    this.name = json.name
    this.country = json.sys.country
    this.id = json.id
    this.img = json.weather[0].icon
    this.description = json.weather[0].description
    this.wind = json.wind.speed + ' k/h'
}

function setInput(e) {
    cityToFind = e.target.value
}
function buildCard(city) {
    const card = document.createElement('div')
    const temp = document.createElement('h1')
    const name = document.createElement('h3')
    const wind = document.createElement('h6')
    const description = document.createElement('h5')
    const icon = document.createElement('img')
    const btnDelete = document.createElement('img')
    const cardHeader = document.createElement('div')
    const cardInfo = document.createElement('div')
    const cityDescription = document.createElement('div')

    btnDelete.addEventListener('click', deleteCity)

    card.classList.add('card')

    cityDescription.classList.add('city-description-container')
    cityDescription.appendChild(name)
    cityDescription.appendChild(description)

    cardInfo.classList.add('card-info')
    temp.classList.add('temp')

    cardHeader.classList.add('card-header')
    btnDelete.classList.add('delete-card')

    description.innerText = city.description
    wind.innerText = 'wind: ' + city.wind
    temp.innerText = city.temp + '°'
    name.innerText = city.name
    
    icon.src = `https://openweathermap.org/img/wn/${city.img}@2x.png`
    btnDelete.src = './x.png'

    btnDelete.value = city.id
    
    card.appendChild(cardHeader)
    cardHeader.appendChild(btnDelete)
    card.appendChild(cityDescription)
    card.appendChild(icon)
    card.appendChild(temp)
    card.appendChild(wind)

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
    let info = await api.json()
    const newCard = new card(info)
    cities.push(newCard)
    cityToFind = ''
    displayCards()
}

function deleteCity(e) {
    cities.filter(el => el.id !== e.target.value)
    console.log(cities)
    displayCards()
}
