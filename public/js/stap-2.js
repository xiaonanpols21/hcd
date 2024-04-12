const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedItem1 = localStorage.getItem('selectedItem1');

    if (selectedItem1) {
        const selectedItemArray = JSON.parse(selectedItem1);
        console.log(selectedItemArray);
        return selectedItemArray;
    } else {
        console.log("No selected shirt found");
        return [];
    }
}
getChosenCategory();

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    console.log(data)
    return data;
}
const dataPromise = getData(); 

// Show next category
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#cfcbd0cab1d64f2285f018a24560d9d4
async function showNextCategoryItems(data, selectedCategory) {
    const categories = Object.keys(data);
    const nextIndex = (categories.indexOf(selectedCategory) + 1) % categories.length;
    const nextCategory = categories[nextIndex];
    const nextCategoryItems = data[nextCategory];

    let modifiedNextCategory;
    let modifiedSelectedCategory;
    let vorigeOrVorig;

    // Juiste taal
    // Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#20bbbb97b15c4f3d924d0f344ea66ef2
    if (nextCategory === "broeken") {
        modifiedNextCategory = "broek";
    } else if (nextCategory === "shirts") {
        modifiedNextCategory = "shirt";
    } else {
        modifiedNextCategory = "schoenen";
    }

    if (selectedCategory === "broeken") {
        modifiedSelectedCategory = "broek";
    } else if (selectedCategory === "shirts") {
        modifiedSelectedCategory = "shirt";
    } else {
        modifiedSelectedCategory = "schoenen";
    }

    if (modifiedSelectedCategory === "shirt") {
        vorigeOrVorig = "vorig";
    } else {
        vorigeOrVorig = "vorige";
    }

    h1.textContent = `Kies bijbehorende ${modifiedNextCategory} bij ${vorigeOrVorig} ${modifiedSelectedCategory}`;

    return nextCategoryItems;
}

async function showData(data, selectedItem1) {
    const combineData = [];

    data.forEach(item => {
        if (item.combine.includes(selectedItem1.id)) {
            combineData.push(item);
        }
    });

    localStorage.setItem('CombineData', JSON.stringify(combineData));

    combineData.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-3.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;
        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
}



async function initialize() {
    const selectedItem1 = await getChosenCategory(); 
    const selectedCategory = localStorage.getItem('selectedCategory'); 
    const data = await dataPromise; 
    const nextCategoryItems = await showNextCategoryItems(data, selectedCategory);

    showData(nextCategoryItems, selectedItem1);
}
initialize();

async function chooseItem(currentItemId) {
    const data = await dataPromise;
    const currentItem = data.broeken.find(item => item.id === currentItemId);
    console.log(currentItem);
    localStorage.setItem('selectedBroek', JSON.stringify(currentItem));
}