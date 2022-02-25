const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');

const APP_ID = 'e797f738';
const APP_key = 'f53046b28bd0f89e62789a5833593076';

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    if (searchQuery !== ''){
        console.log(searchQuery);
    } else {
        console.log('enter something');
    }
    fetchAPI();
});

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `<div class="item">
        <img src="${result.recipe.image}" alt="chicken">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class='view-button' href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class='item-data'>Calories: ${result.recipe.calories.toFixed(2)}</p>
    </div>`
    })
    searchResultDiv.innerHTML = generatedHTML;
}