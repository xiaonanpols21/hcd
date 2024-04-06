const categoryShirts = document.querySelector("#category-shirts div");
const categoryShirtsSec = document.querySelector("#category-shirts");

const combineBroeken = document.querySelector(".combine-broeken div");
const combineBroekenSec = document.querySelector(".combine-broeken");

const combineSchoenenSec = document.querySelector(".combine-schoenen");
const combineSchoenen = document.querySelector(".combine-schoenen div");

const backBtn = document.querySelector("#backBtn");

let dataPromise;

combineBroekenSec.classList.add("none");
combineSchoenenSec.classList.add("none");

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
    combineBroekenSec.classList.remove("none");
    const data = await dataPromise;

    categoryShirtsSec.classList.add("none");

    combineBroeken.innerHTML = "";

    const broekenCombineData = [];
    data.broeken.forEach(item => {
        if (item.combine.includes(currentShirtId)) {
            broekenCombineData.push(item);
        }
    });

    console.log(broekenCombineData)
    
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
    combineSchoenenSec.classList.remove("none");
    const data = await dataPromise;

    combineBroekenSec.classList.add("none");

    combineSchoenen.innerHTML = "";

    const schoenenCombineData = [];
    data.schoenen.forEach(item => {
        if (item.combine.includes(currentPantsId)) {
            schoenenCombineData.push(item);
        }
    });

    console.log(schoenenCombineData)
    
    schoenenCombineData.forEach( item => {
        const img = item.img;
        const description = item.description;

        const html = `
        <article>
            <img src="${img}" alt="${description}">
            <button onclick="addShoos(${item.id})">Ik wil dit aan</button>
        </article>`;

        combineSchoenen.insertAdjacentHTML("beforeend", html);
    });
}