const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedItem1 = localStorage.getItem('selectedItem1');

    if (selectedItem1) {
        const selectedItemArray = JSON.parse(selectedItem1);
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
async function showNextCategoryItems(data, selectedCategory, selectedItem1) {
    const categories = Object.keys(data);
    const nextIndex = (categories.indexOf(selectedCategory) + 1) % categories.length;
    const nextCategory = categories[nextIndex];
    const nextCategoryItems = data[nextCategory];

    console.log({selectedItem1})
    console.log({nextCategoryItems})

    const nextNextIndex = (nextIndex + 1) % categories.length;
    const nextNextCategory = categories[nextNextIndex];

    let foundMatch = false; // Flag to track if a match is found

    // for (nextCategoryItems) {
    //     if (item.id === selectedItem1.combine ) {
            
    //     }
    // }

    // nextCategoryItems.forEach((item) => {
    //     if (foundMatch) return; // Exit loop if match is already found
    //     item.combine.forEach((id) => {
    //         if (id === selectedItem1.combine) {
    //             console.log("Found a match in category: ", nextCategory);
    //             foundMatch = true; // Set flag to true to stop further iterations
    //             return; // Exit inner loop if match is found
    //         } else {
    //             console.log(`Next category who matches is ${nextNextCategory}`);
    //         }
    //     });
    // });

    let modifiedNextCategory;
    let modifiedSelectedCategory;
    let vorigeOrVorig;

    localStorage.setItem('selectedCategory2', nextCategory);

    // Juiste taal
    // Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#20bbbb97b15c4f3d924d0f344ea66ef2
    if (nextCategory === "broeken") {
        modifiedNextCategory = "broek";
    } else if (nextCategory === "shirts") {
        modifiedNextCategory = "shirt";
    } else if (nextCategory === "schoenen") {
        modifiedNextCategory = "schoenen";
    } else if (nextCategory === "accessoires") {
        modifiedNextCategory = "accessoire";
    }

    if (selectedCategory === "broeken") {
        modifiedSelectedCategory = "broek";
    } else if (selectedCategory === "shirts") {
        modifiedSelectedCategory = "shirt";
    } else if (selectedCategory === "schoenen") {
        modifiedSelectedCategory = "schoenen";
    } else if (selectedCategory === "jurken") {
        modifiedSelectedCategory = "jurk";
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
    const currentTemp = Number(localStorage.getItem('currentTemp'));

    const combineData = [];

    data.forEach(item => {
        if (item.combine.includes(selectedItem1.id)) {
            combineData.push(item);
        }
    });

    const sorted = orderByClosest(combineData, currentTemp);

    localStorage.setItem('CombineData1', JSON.stringify(combineData));

    sorted.forEach(item => {
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
    const selectedItem1 = await getChosenCategory(); 
    const selectedCategory = localStorage.getItem('selectedCategory'); 
    const data = await dataPromise; 
    const nextCategoryItems = await showNextCategoryItems(data, selectedCategory, selectedItem1);

    showData(nextCategoryItems, selectedItem1);
}
initialize();

async function chooseItem(currentItemId) {
    const selectedCategory2 = localStorage.getItem('selectedCategory2');
    const data = await dataPromise;
    const categoryData = data[selectedCategory2];
    const currentItem = categoryData.find(item => item.id === currentItemId);

    localStorage.setItem('selectedItem2', JSON.stringify(currentItem));

    const altText = currentItem.description;
    localStorage.setItem('altText2', JSON.stringify(altText));
}