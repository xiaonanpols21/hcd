const links = document.querySelectorAll('a');

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    console.log(data);
    return data;
}
const dataPromise = getData(); 


// Local storage next page
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#3336b72f01f742a88d4b973cd75b1ba1
function chooseCategory(event) {
    event.preventDefault();
    const category = event.target.getAttribute('data-category');
    localStorage.setItem('selectedCategory', category);
    window.location.href = event.target.href;
}
links.forEach(link => {
    link.addEventListener('click', chooseCategory);
});