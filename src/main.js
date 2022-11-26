'use strict'
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
    `
}
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null){
        return;
    }
    updateItems(items,key,value);
}

// 수정필요
function updateItems(items,key,value){
    const classItem = document.querySelector('.item');
    items.forEach(item => {
        if(item[key]===value){
            classItem.classList.remove('invisible');
        } else{
            classItem.classList.add('invisible');
        }
    });
}

function setEventListener(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
    .then(items => {
        displayItems(items);
        setEventListener(items)
    })
    .catch(console.log);