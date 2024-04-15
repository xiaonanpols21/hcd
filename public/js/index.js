const links = document.querySelectorAll('a');
const h2 = document.querySelector(".weather h2");

async function getWeather() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.374&longitude=4.8897&current=temperature_2m");
    const data = await response.json();
    console.log(data);
    displayWeather(data);
}
getWeather()

// Bron: https://www.w3schools.com/jsref/jsref_round.asp
async function displayWeather(data) {
    const temp = data.current.temperature_2m;
    const afronden = Math.round(temp);
    console.log(afronden)
    localStorage.setItem('currentTemp', afronden);

    h2.textContent = `Het is vandaag ${afronden} graden`;
}

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    return data;
}
const dataPromise = getData(); 


// Local storage next page
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#3336b72f01f742a88d4b973cd75b1ba1
function chooseCategory(event) {
    event.preventDefault();
    const category = event.target.getAttribute('data-category');
    localStorage.setItem('selectedCategory', category);
    window.location.href = event.target.href;
}
links.forEach(link => {
    link.addEventListener('click', chooseCategory);
});