const categoryShirts = document.querySelector("#category-shirts div");
const combineBroeken = document.querySelector(".combine-broeken div");
const combineBroekenSec = document.querySelector(".combine-broeken");

let dataPromise;
combineBroekenSec.classList.add("none");

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
            <button onclick="addCombine(${item.id})">Ik wil dit aan</button>
        </article>`;

        categoryShirts.insertAdjacentHTML("beforeend", html);
    });
}

// Get the matching broek
async function addCombine(currentShirtId) {
    combineBroekenSec.classList.remove("none");
    const data = await dataPromise;

    // Get current shirt id
    // Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#41f9c46b5c1f4ed38eb30ad9b03e7306
    console.log("Current shirt Id:", currentShirtId);

    categoryShirts.innerHTML = "";

    // Push selectedItem
    // Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#2293e39ee18943a4b356b29b8403f245
    const currentItem = data.shirts.find(item => item.id === currentShirtId);

    const currentData = []
    currentData.push(currentItem);

    currentData.forEach( item => {
        const img = item.img;
        const description = item.description;

        const html = 
        `<article>
            <img src="${img}" alt="${description}">
            <button onclick="addCombine(${item.id})">Ik wil dit aan</button>
        </article>`;

        categoryShirts.insertAdjacentHTML("beforeend", html);
    });

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
            <button onclick="addCombine(${item.id})">Ik wil dit aan</button>
        </article>`;

        combineBroeken.insertAdjacentHTML("beforeend", html);
    });
}

const backBtn = document.querySelector("#backBtn");

// Go back
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#0e7d49695937436a90066b044ef08295
async function fetchDataAndShowData() {
    const data = await getData(); 

    categoryShirts.innerHTML = "";

    showData(data);

    console.log(data)
    combineBroekenSec.classList.add("none");
}
backBtn.addEventListener("click", fetchDataAndShowData);
