const state = {
  breweries: []
}
const filterSection = document.querySelector('main')
function createFilterSection() {
  filterSection.innerHTML = ''
  const asideEl = document.createElement('aside')
  asideEl.setAttribute('class', 'filters-section')
  const h2El = document.createElement('h2')
  h2El.textContent = 'Filter By:'
  const filterByTypeFormEl = document.createElement('form')
  filterByTypeFormEl.setAttribute('id', 'filter-by-type-form')
  filterByTypeFormEl.setAttribute('autocompete', 'off')
  const labelEl = document.createElement('label')
  labelEl.setAttribute('for', 'filter-by-type')
  const h3El = document.createElement('h3')
  h3El.textContent = 'Type of Brewery:'
  labelEl.append(h3El)
  const selectEl = document.createElement('select')
  selectEl.setAttribute('id', 'filter-by-type')
  selectEl.setAttribute('name', 'filter-by-type')
  const optionEl = document.createElement('option')
  optionEl.setAttribute('value', '')
  optionEl.textContent = 'Select a type...'
  const optionValue1El = document.createElement('option')
  optionValue1El.setAttribute('value', 'micro')
  optionValue1El.textContent = 'Micro'
  const optionValue2El = document.createElement('option')
  optionValue2El.setAttribute('value', 'regional')
  optionValue2El.textContent = 'Regional'
  const optionValue3El = document.createElement('option')
  optionValue3El.setAttribute('value', 'brewpub')
  optionValue3El.textContent = 'Brewpub'
  selectEl.append(optionEl, optionValue1El, optionValue2El, optionValue3El)
  filterByTypeFormEl.append(labelEl, selectEl)
  const divEl = document.createElement('div')
  divEl.setAttribute('class', 'filter-by-city-heading')
  const h3CitiesEl = document.createElement('h3')
  h3CitiesEl.textContent = 'Cities'
  const buttonEl = document.createElement('button')
  buttonEl.textContent = 'clear all'
  buttonEl.setAttribute('class', 'clear-all-btn')
  divEl.append(h3CitiesEl, buttonEl)
  const filterByCityForm = document.createElement('form')
  filterByCityForm.setAttribute('id', 'filter-by-city-form')
  for (const brewerie of state.breweries) {
    const inputEl = document.createElement('input')
    inputEl.setAttribute('type', 'checkbox')
    inputEl.setAttribute('name', brewerie.city)
    inputEl.setAttribute('value', brewerie.city)
    const labelCityEl = document.createElement('label')
    labelCityEl.setAttribute('for', brewerie.city)
    labelCityEl.textContent = brewerie.city
    filterByCityForm.append(inputEl, labelCityEl)
  }
  asideEl.append(h2El, filterByTypeFormEl, divEl, filterByCityForm)
  filterSection.append(asideEl)
}

function displayBreweries() {

  const h1El = document.createElement('h1')
  h1El.textContent = 'List of Breweries'
  const headerEl = document.createElement('header')
  headerEl.setAttribute('class', 'search-bar')
  const searchFormEl = document.createElement('form')
  searchFormEl.setAttribute('id', 'search-breweries-form')
  searchFormEl.setAttribute('autocompete', 'off')
  const searchLabelEl = document.createElement('label')
  searchLabelEl.setAttribute('for', 'search-breweries')
  const h2SearchEl = document.createElement('h2')
  h2SearchEl.textContent = 'Search breweries:'
  searchLabelEl.append(h2SearchEl)
  const searchInputEl = document.createElement('input')
  searchInputEl.setAttribute('id', 'search-breweries')
  searchInputEl.setAttribute('name', 'search-breweries')
  searchInputEl.setAttribute('type', 'text')
  searchFormEl.append(searchLabelEl, searchInputEl)
  headerEl.appendChild(searchFormEl)
  const articleEl = document.createElement('article')
  const ulEl = document.createElement('ul')
  ulEl.setAttribute('class', 'breweries-list')
  for (const brewerie of state.breweries) {
    const liEl = document.createElement('li')

    const h2El = document.createElement('h2')
    h2El.textContent = brewerie.name
    const divEl = document.createElement('div')
    divEl.setAttribute('class', 'type')
    divEl.textContent = brewerie.brewery_type
    const addressSectionEl = document.createElement('section')
    addressSectionEl.setAttribute('class', 'address')
    const addressH3El = document.createElement('h3')
    addressH3El.textContent = 'Address:'
    const addressPEl = document.createElement('p')
    addressPEl.textContent = brewerie.street
    const pEl = document.createElement('p')
    const strongEl = document.createElement('strong')
    strongEl.textContent = `${brewerie.city}, ${brewerie.postal_code}`
    pEl.append(strongEl)
    addressSectionEl.append(addressH3El, addressPEl, pEl)
    const phoneSectionEl = document.createElement('section')
    phoneSectionEl.setAttribute('class', 'phone')
    const phoneH3El = document.createElement('h3')
    phoneH3El.textContent = 'Phone:'
    const phonePEl = document.createElement('p')
    phonePEl.textContent = brewerie.phone
    phoneSectionEl.append(phoneH3El, phonePEl)
    const linkSectionEl = document.createElement('section')
    linkSectionEl.setAttribute('class', 'link')
    const linkEl = document.createElement('a')
    linkEl.setAttribute('href', brewerie.website_url)
    linkEl.setAttribute('target', '_blank')
    linkEl.textContent = 'Visit Website'
    linkSectionEl.append(linkEl)
    liEl.append(h2El, divEl, addressSectionEl, phoneSectionEl, linkSectionEl)
    ulEl.append(liEl)
  }
  articleEl.append(ulEl)
  filterSection.append(headerEl, articleEl)

}

function getData() {
  return fetch('https://api.openbrewerydb.org/breweries').then(function (resp) {
    return resp.json()
  })
}
getData().then(function (dataFromServer) {
  state.breweries = dataFromServer
  console.log(state)
  render()
})

function render() {
  createFilterSection()
  displayBreweries()
}
render()