const dataApi = 'https://restcountries.eu/rest/v2/all';
let allCountriesList = [], selectedCountries = [];

let getCountryList = () => {
    fetch(dataApi)
        .then(resp => resp.json())
        .then(data => allCountriesList = data)
};

showCountryList = () => {
    let val = document.getElementById('search-input').value;
    if (val.length >= 1) {
        let eligibleList = allCountriesList.filter(country => country.name.toUpperCase().indexOf(val.toUpperCase()) > -1);
        let htmlStr = '';
        if (eligibleList.length > 0) {
            htmlStr = htmlListToAppend(eligibleList);
        } else {
            htmlStr = '<span>No Data Found</span>';
        }
        document.getElementById('autosuggest-list').innerHTML = htmlStr;
    } else {
        document.getElementById('autosuggest-list').innerHTML = '';
    }
}

htmlListToAppend = (eligibleList) => {
    let htmlStr = eligibleList.reduce((htmlStr, country) => {
        htmlStr += `<li class='eligible-country' onclick='addCountryToSelection(${JSON.stringify(country)})'><span class='country-name'>${country.alpha3Code}:</span>&nbsp;<span>${country.name}</span></li>`;
        return htmlStr;
    }, '<ul class="country-list">');
    htmlStr += '</ul>';
    return htmlStr
};

addCountryToSelection = (country) => {
    let isCountryPresent = false;
    for (let i = 0; i < selectedCountries.length; ++i) {
        if (selectedCountries[i].alpha3Code === country.alpha3Code) {
            isCountryPresent = true;
            break;
        }
    }
    if (!isCountryPresent) {
        selectedCountries.push(country);
        addCountriesToResultSelection(selectedCountries);
        addCountriesToTagSelection(selectedCountries);
    }
}

addCountriesToResultSelection = (selectedCountries) => {
    let htmlNode = document.getElementById('result-list');
    htmlNode.innerText = JSON.stringify(selectedCountries);
};

addCountriesToTagSelection = (selectedCountries) => {
    let htmlStr = createTags(selectedCountries);
    let htmlNode = document.getElementById('selected-countries-tags');
    htmlNode.innerHTML = htmlStr;
};

createTags = (selectedCountries) => selectedCountries.reduce((htmlStr, country) => {
    htmlStr += `<div class='tag-wrapper'><div class='country-code'>${country.alpha3Code}</div><div class='clear-country' onclick='removeCountryFromSelection(${JSON.stringify(country)})'>&#10005;</div></div>`
    return htmlStr;
}, '')

removeCountryFromSelection = (country) => {
    selectedCountries = selectedCountries.filter(selectedCountry => selectedCountry.alpha3Code !== country.alpha3Code);
    addCountriesToResultSelection(selectedCountries);
    addCountriesToTagSelection(selectedCountries);
};

addCountriesToResultSelection(selectedCountries);
addCountriesToTagSelection(selectedCountries);