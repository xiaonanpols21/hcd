const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedItem2 = localStorage.getItem('selectedItem2');

    if (selectedItem2) {
        const selectedItemArray = JSON.parse(selectedItem2);
        console.log(selectedItemArray)
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
    return data;
}
const dataPromise = getData(); 

async function showNextCategoryItems(data, selectedCategory) {
    const categories = Object.keys(data);
    const nextIndex = (categories.indexOf(selectedCategory) + 1) % categories.length;
    const nextCategory = categories[nextIndex];
    const nextCategoryItems = data[nextCategory];

    let modifiedNextCategory;
    let modifiedSelectedCategory;
    let vorigeOrVorig;

    localStorage.setItem('selectedCategory3', nextCategory);

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

async function showData(data, selectedItem2) {
    const currentTemp = localStorage.getItem('currentTemp');
    const combineData = [];

    data.forEach(item => {
        if (item.combine.includes(selectedItem2.id)) {
            combineData.push(item);
        }
    });

    console.log(combineData);

    localStorage.setItem('CombineData2', JSON.stringify(combineData));
    
    if (currentTemp <= 5) {
        console.log("Het is winter tijd");

        combineData.sort((a, b) => {
            if (a.season === 5) return -1; 
            if (b.season === 5) return 1; 
            return 0; 
        });
    } else if (currentTemp <= 10) {
        console.log("Het is autumn tijd");
        combineData.sort((a, b) => {
            if (a.season === 10) return -1; 
            if (b.season === 10) return 1;
            return 0; 
        });
    } else if (currentTemp <= 15) {
        console.log("Het is spring tijd");
        combineData.sort((a, b) => {
            if (a.season === 15) return -1; 
            if (b.season === 15) return 1; 
            return 0; 
        });
    } else {
        console.log("Het is summer tijd");
        combineData.sort((a, b) => {
            if (a.season === 20) return -1; 
            if (b.season === 20) return 1; 
            return 0; 
        });
    }

    combineData.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-4.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
};

async function initialize() {
    const selectedItem2 = getChosenCategory(); // Retrieve selected shirts array
    const selectedCategory = localStorage.getItem('selectedCategory2'); 
    const data = await dataPromise; // Fetch data
    const nextCategoryItems = await showNextCategoryItems(data, selectedCategory);
    
    showData(nextCategoryItems, selectedItem2);
}
initialize();

async function chooseItem(currentItemId) {
    const selectedCategory3 = localStorage.getItem('selectedCategory3');
    const data = await dataPromise;
    const categoryData = data[selectedCategory3];
    const currentItem = categoryData.find(item => item.id === currentItemId);
    localStorage.setItem('selectedItem3', JSON.stringify(currentItem));
}