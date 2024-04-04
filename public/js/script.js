const categoryShirts = document.querySelector("#category-shirts");
const combineBroeken = document.querySelector(".combine-broeken");
let dataPromise;

// Fetch data
async function getData() {
    const response = await fetch("../public/data/data.json"); 
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
    const data = await dataPromise;

    // Get current shirt id
    // Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#41f9c46b5c1f4ed38eb30ad9b03e7306
    console.log("Current shirt Id:", currentShirtId);

    console.log(data);

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