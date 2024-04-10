const categoryShirts = document.querySelector("#category-shirts div");
const categoryShirtsSec = document.querySelector("#category-shirts");

const combineBroeken = document.querySelector(".combine-broeken div");
const combineBroekenSec = document.querySelector(".combine-broeken");

const combineSchoenenSec = document.querySelector(".combine-schoenen");
const combineSchoenen = document.querySelector(".combine-schoenen div");

const resultsSec = document.querySelector(".results");
const resultsDiv = document.querySelector(".results div");

const backBtn = document.querySelector("#backBtn");

let dataPromise;
let currentShirtId = null;
let currentPantsId = null;
let currentShoosId = null;

combineBroekenSec.classList.add("none");
combineSchoenenSec.classList.add("none");
resultsSec.classList.add("none");

// Fetch data
async function getData() {
    const response = await fetch("public/data/data.json"); 
    const data = await response.json();
    return data;
}

// Wait for data
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#5db7a29c393e4308841d5314fe39d760
dataPromise = getData().then((data) => {
    showData(data);
    return data;
});

function showData(data) {
    data.shirts.forEach( item => {
        const img = item.img;
        const description = item.description;

        const html = 
        `<article>
            <img src="${img}" alt="${description}">
            <button onclick="addPants(${item.id})">Ik wil dit aan</button>
        </article>`;

        categoryShirts.insertAdjacentHTML("beforeend", html);
    });
}

// Get the matching broek
async function addPants(currentShirtId) {
    const data = await dataPromise;
    const currentShirt = data.shirts.find(item => item.id === currentShirtId);
    console.log(currentShirt);

    updateLocalStorage({
        target: {
            name: 'shirt',
            value: currentShirt
        }
    });

    combineBroekenSec.classList.remove("none");
    

    categoryShirtsSec.classList.add("none");

    combineBroeken.innerHTML = "";

    const broekenCombineData = [];
    data.broeken.forEach(item => {
        if (item.combine.includes(currentShirtId)) {
            broekenCombineData.push(item);
        }
    });
    
    broekenCombineData.forEach( item => {
        const img = item.img;
        const description = item.description;

        const html = `
        <article>
            <img src="${img}" alt="${description}">
            <button onclick="addShoos(${item.id})">Ik wil dit aan</button>
        </article>`;

        combineBroeken.insertAdjacentHTML("beforeend", html);
    });
}

// Go back
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#0e7d49695937436a90066b044ef08295
async function fetchDataAndShowData() {
    const data = await getData(); 

    categoryShirtsSec.classList.remove("none");

    categoryShirts.innerHTML = "";

    showData(data);

    console.log(data)
    combineBroekenSec.classList.add("none");
}
backBtn.addEventListener("click", fetchDataAndShowData);

async function addShoos(currentPantsId) {
    const data = await dataPromise;
    const currentPants = data.broeken.find(item => item.id === currentPantsId);
    console.log(currentPants);

    updateLocalStorage({
        target: {
            name: 'pants',
            value: currentPants
        }
    });

    combineSchoenenSec.classList.remove("none");

    combineBroekenSec.classList.add("none");

    combineSchoenen.innerHTML = "";

    const schoenenCombineData = [];
    data.schoenen.forEach(item => {
        if (item.combine.includes(currentPantsId)) {
            schoenenCombineData.push(item);
        }
    });
    
    schoenenCombineData.forEach( item => {
        const img = item.img;
        const description = item.description;

        const html = `
        <article>
            <img src="${img}" alt="${description}">
            <button onclick="showResults(${item.id})">Ik wil dit aan</button>
        </article>`;

        combineSchoenen.insertAdjacentHTML("beforeend", html);
    });
}

async function showResults(currentShoosId) {
    const data = await dataPromise;
    const currentShoos = data.schoenen.find(item => item.id === currentShoosId);
    console.log(currentShoos);

    updateLocalStorage({
        target: {
            name: 'shoes',
            value: currentShoos
        }
    });
    
    resultsSec.classList.remove("none");
    combineSchoenenSec.classList.add("none");

    
}

// Local storage
// Bron: https://blog.logrocket.com/localstorage-javascript-complete-guide/
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#d07731522b274a09bad98712f9ce0252
function updateLocalStorage(event) {
    const chosenItems = JSON.parse(localStorage.getItem('chosenItems')) || {};
    const itemType = event.target.name;
    const itemId = event.target.value;

    if (itemType === 'shirt') {
        chosenItems['shirt'] = itemId;
    } else if (itemType === 'pants') {
        chosenItems['broek'] = itemId;
    } else if (itemType === 'shoes') {
        chosenItems['schoenen'] = itemId;
    }

    localStorage.setItem('chosenItems', JSON.stringify(chosenItems));
    console.log(chosenItems);
}


