const mainUlEl = document.querySelector("main ul");

// Show results
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#b6c7e7cccdf94e899f6603c8abc96ea6
function getChosenItems() {
    const selectedItemsArray = [];

    const selectedItem1 = localStorage.getItem('altText1');
    const selectedItem2 = localStorage.getItem('altText2');
    const selectedItem3 = localStorage.getItem('altText3');

    // Push selected items into the selectedItemsArray if they are not null
    if (selectedItem1) {
        selectedItemsArray.push(JSON.parse(selectedItem1));
    }
    if (selectedItem2) {
        selectedItemsArray.push(JSON.parse(selectedItem2));
    }
    if (selectedItem3) {
        selectedItemsArray.push(JSON.parse(selectedItem3));
    }

    const combineString = selectedItemsArray.join(' '); 

    console.log(combineString);
    return selectedItemsArray;
}

async function showData(combineString) {
    const html =
        `<p>${combineString}</p>`;

    mainUlEl.insertAdjacentHTML("beforeend", html);
}


const selectedItemsArray = getChosenItems();

showData(selectedItemsArray);
