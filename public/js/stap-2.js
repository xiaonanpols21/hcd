const mainUlEl = document.querySelector("main ul");

function getChosenCategory() {
    const selectedItem1 = localStorage.getItem('selectedItem1');
    const selectedCategory = localStorage.getItem('selectedCategory');

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
async function showNextCategoryItems(data, selectedItem1, selectedCategory) {
    const categories = Object.keys(data);
    console.log("Categories:", categories);

    console.log("Selected item:", selectedItem1);

    const nextIndex = (categories.indexOf(selectedCategory) + 1) % categories.length;
    console.log("Next index:", nextIndex);

    const nextCategory = categories[nextIndex];
    console.log("Next category:", nextCategory);

    const nextCategoryItems = data[nextCategory];
    console.log("Next category items:", nextCategoryItems);

    console.log(`Je hebt ${selectedCategory} aangeklikt, de volgende categorie die dan komt is ${nextCategory}`);

    return nextCategoryItems;
}

async function showData(data, selectedItem1) {

    const combineData = [];
    data.forEach(item => {
        if (item.combine.includes(selectedItem1.id)) {
            combineData.push(item);
        }
    });
    console.log(combineData);

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
    const selectedItem1 = await getChosenCategory(); // Retrieve selected category
    const selectedCategory = localStorage.getItem('selectedCategory'); // Retrieve selected category
    const data = await dataPromise; // Fetch data
    const nextCategoryItems = await showNextCategoryItems(data, selectedItem1, selectedCategory);
    showData(nextCategoryItems, selectedItem1);
}
initialize();


async function chooseItem(currentItemId) {
    const data = await dataPromise;
    const currentItem = data.broeken.find(item => item.id === currentItemId);
    console.log(currentItem);
    localStorage.setItem('selectedBroek', JSON.stringify(currentItem));
}


