const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory');

    if (selectedCategory === "shirts") {
        h1.textContent = "Kies een shirt";
    } else if (selectedCategory === "broeken") {
        h1.textContent = "Kies een broek";
    } else if (selectedCategory === "schoenen") {
        h1.textContent = "Kies schoenen";
    } else {
        h1.textContent = "Kies een accessoire";
    }
}
getChosenCategory();

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    return data;
}
const dataPromise = getData(); 

// Show data based on category
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#dc07340e5f2f409d8a29c7f49b89e0a7
async function showData(data, selectedCategory) {
    const categoryData = data[selectedCategory];
    const currentTemp = Number(localStorage.getItem('currentTemp'));
    const sorted = orderByClosest(categoryData, currentTemp);

    sorted.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-2.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
}

// Bron: https://stackoverflow.com/questions/37655336/order-an-array-by-closest-values
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

// Dynamic data
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#9cd8889b11564e5a95e664133e8d35aa
async function chooseItem(currentItemId) {
    const selectedCategory = localStorage.getItem('selectedCategory');
    const data = await dataPromise;
    const categoryData = data[selectedCategory];
    const currentItem = categoryData.find(item => item.id === currentItemId);

    localStorage.setItem('selectedItem1', JSON.stringify(currentItem));

    const altText = currentItem.description;
    localStorage.setItem('altText1', JSON.stringify(altText));
}

dataPromise
    .then(data => {
        const selectedCategory = localStorage.getItem('selectedCategory');
        showData(data, selectedCategory);
    })
    .catch(error => console.error(error));
