const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedItem3 = localStorage.getItem('selectedItem3');

    if (selectedItem3) {
        const selectedItemArray = JSON.parse(selectedItem3);
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

async function showNextCategoryItems(data, selectedCategory, selectedItem3) {
    const categories = Object.keys(data);
    const nextIndex = (categories.indexOf(selectedCategory) + 1) % categories.length;
    const nextCategory = categories[nextIndex];
    const nextCategoryItems = data[nextCategory];

    let modifiedNextCategory;
    let modifiedSelectedCategory;
    let vorigeOrVorig;

    localStorage.setItem('selectedCategory4', nextCategory);

    if (nextCategory === "broeken") {
        modifiedNextCategory = "broek";
    } else if (nextCategory === "shirts") {
        modifiedNextCategory = "shirt";
    } else if (nextCategory === "schoenen") {
        modifiedNextCategory = "schoenen";
    } else {
        modifiedNextCategory = "jurk";
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

async function showData(data, selectedItem3) {
    const currentTemp = Number(localStorage.getItem('currentTemp'));
    const combineData = [];

    data.forEach(item => {
        if (item.combine.includes(selectedItem3.id)) {
            combineData.push(item);
        }
    });

    const sorted = orderByClosest(combineData, currentTemp);

    localStorage.setItem('CombineData2', JSON.stringify(combineData));

    sorted.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-5.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
};

function orderByClosest(arr, num) {
    // temporary array holds objects with position and sort-value
    const mapped = arr.map(function (el, i) {
        return { index: i, value: Math.abs(el.season - num) };
    });

    // sorting the mapped array containing the reduced values
    mapped.sort(function (a, b) {
        return a.value - b.value;
    });

    // return the resulting order
    return mapped.map(function (el) {
        return arr[el.index];
    });
}

async function initialize() {
    const selectedItem3 = getChosenCategory(); // Retrieve selected shirts array
    const selectedCategory = localStorage.getItem('selectedCategory3'); 
    const data = await dataPromise; // Fetch data
    const nextCategoryItems = await showNextCategoryItems(data, selectedCategory, selectedItem3);
    
    showData(nextCategoryItems, selectedItem3);
}
initialize();

async function chooseItem(currentItemId) {
    const selectedCategory4 = localStorage.getItem('selectedCategory4');
    const data = await dataPromise;
    const categoryData = data[selectedCategory4];
    const currentItem = categoryData.find(item => item.id === currentItemId);

    localStorage.setItem('selectedItem3', JSON.stringify(currentItem));

    const altText = currentItem.description;
    localStorage.setItem('altText3', JSON.stringify(altText));
}