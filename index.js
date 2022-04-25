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
    this.wind = json.wind.speed    
}

function setInput(e) {
    cityToFind = e.target.value
}

function buildCard(city) {
    const card = document.createElement('div')
    const temp = document.createElement('h2')
    const name = document.createElement('h3')
    const country = document.createElement('h3')
    const icon = document.createElement('img')
    const btnDelete = document.createElement('button')
    btnDelete.addEventListener('click', deleteCity)
    card.classList.add('card')
    temp.innerHTML = city.temp + '°'
    name.innerHTML = city.name
    icon.src = `https://openweathermap.org/img/wn/${city.img}@2x.png`
    country.innerHTML = city.country
    btnDelete.innerHTML = 'x'
    btnDelete.value = city.id
    card.appendChild(name)
    card.appendChild(temp)
    card.appendChild(icon)
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
    let info = await api.json()
    const newCard = new card(info)
    console.log(info)
    cities.push(newCard)
    cityToFind = ''
    displayCards()
}

function deleteCity(e) {
    console.log(e.target.value)
    cities.filter(el => el.id !== e.target.value)
    displayCards()
}

displayCards()