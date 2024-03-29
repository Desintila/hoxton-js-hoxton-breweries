const state = {
  breweries: [],
  filter: '',
  selectedByType: '',
  selectedByCities: [],
  searchByName: ''
}
const filterSection = document.querySelector('main')
const searchForm = document.querySelector('#select-state-form')

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
  buttonEl.addEventListener('click', function () {
    clearFilter()
    render()
  })
  const cities = extractCitiesData(state.breweries)
  for (const city of cities) {
    const inputEl = document.createElement('input')
    inputEl.setAttribute('type', 'checkbox')
    inputEl.setAttribute('name', city)
    inputEl.setAttribute('value', city)
    inputEl.setAttribute('id', city)
    inputEl.setAttribute('class', 'city')
    if (state.selectedByCities.includes(city))
      inputEl.checked = true
    const labelCityEl = document.createElement('label')
    labelCityEl.setAttribute('for', city)
    labelCityEl.textContent = city
    filterByCityForm.append(inputEl, labelCityEl)
    asideEl.append(h2El, filterByTypeFormEl, divEl, filterByCityForm)
    filterSection.append(asideEl)
    selectEl.addEventListener('change', function () {
      state.selectedByType = selectEl.value
      render()
    })
    inputEl.addEventListener('click', function () {
      const checkboxes = document.querySelectorAll('.city')
      let selectedCities = []
      for (const checkbox of checkboxes) {
        if (checkbox.checked)
          selectedCities.push(checkbox.value)
      }
      state.selectedByCities = selectedCities
      render()
    })
    if (state.selectedByCities.includes(city))
      inputEl.checked = true
  }
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
  searchFormEl.addEventListener('submit', function (event) {
    event.preventDefault()
    state.searchByName = searchFormEl['search-breweries'].value
    render()
  })
  const articleEl = document.createElement('article')
  const ulEl = document.createElement('ul')
  ulEl.setAttribute('class', 'breweries-list')
  let searchedBreweries = filterByState()
  searchedBreweries = searchedBreweries.slice(0, 10)
  for (const brewery of searchedBreweries) {
    const liEl = document.createElement('li')
    liEl.setAttribute('class', 'list')
    const h2El = document.createElement('h2')
    h2El.textContent = brewery.name
    const divEl = document.createElement('div')
    divEl.setAttribute('class', 'type')
    divEl.textContent = brewery.brewery_type
    const addressSectionEl = document.createElement('section')
    addressSectionEl.setAttribute('class', 'address')
    const addressH3El = document.createElement('h3')
    addressH3El.textContent = 'Address:'
    const addressPEl = document.createElement('p')
    addressPEl.textContent = brewery.street
    const pEl = document.createElement('p')
    const strongEl = document.createElement('strong')
    strongEl.textContent = `${brewery.city}, ${brewery.postal_code}`
    pEl.append(strongEl)
    addressSectionEl.append(addressH3El, addressPEl, pEl)
    const phoneSectionEl = document.createElement('section')
    phoneSectionEl.setAttribute('class', 'phone')
    const phoneH3El = document.createElement('h3')
    phoneH3El.textContent = 'Phone:'
    const phonePEl = document.createElement('p')
    phonePEl.textContent = brewery.phone
    phoneSectionEl.append(phoneH3El, phonePEl)
    const linkSectionEl = document.createElement('section')
    linkSectionEl.setAttribute('class', 'link')
    const linkEl = document.createElement('a')
    linkEl.setAttribute('href', brewery.website_url)
    linkEl.setAttribute('target', '_blank')
    linkEl.textContent = 'Visit Website'
    linkSectionEl.append(linkEl)
    liEl.append(h2El, divEl, addressSectionEl, phoneSectionEl, linkSectionEl)
    ulEl.append(liEl)
    articleEl.append(ulEl)
    filterSection.append(headerEl, articleEl)
  }
}

function getDataByState(state) {
  return fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=50`).then(function (resp) {
    return resp.json()
  })
}
function selectByType() {
  return state.breweries.filter(function (brewery) {
    return brewery.brewery_type.includes(state.selectedByType)
  })
}

function filterByState() {
  let listOfBreweries = state.breweries.filter(function (brewery) {
    return brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub'
  })
  if (state.selectedByType !== '') {
    listOfBreweries = selectByType()
  }
  if (state.selectedByCities.length > 0) {
    listOfBreweries = listOfBreweries.filter(function (brewery) {
      return state.selectedByCities.includes(brewery.city)
    })
  }
  listOfBreweries = listOfBreweries.filter(function (brewery) {
    return brewery.city.toLowerCase().includes(state.searchByName.toLowerCase()) || brewery.name.toLowerCase().includes(state.searchByName.toLowerCase())
  })
  return listOfBreweries
}
function extractCitiesData(breweries) {
  let cities = []
  for (const brewery of breweries) {
    if (!cities.includes(brewery.city)) {
      cities.push(brewery.city)
    }
  }
  return cities
}
function listenToSearch() {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    state.filter = searchForm['select-state'].value
    getDataByState(state.filter).then(function (breweries) {
      state.breweries = breweries
      state.selectedByCities = []
      state.selectedByType = ''
      state.searchByName = ''
      render()
    })
    searchForm.reset()
  })
}
function clearFilter() {
  state.selectedByCities = []
  state.selectedByType = ''
  state.searchByName = ''
}
listenToSearch()
function render() {
  createFilterSection()
  displayBreweries()
}
render()