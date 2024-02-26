const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const button = document.querySelector('#button');

let name = "";
let email = "";

document.addEventListener('DOMContentLoaded', () => {
    console.log('Hello, World!');
});

nameInput.addEventListener('keyup', (e) => {
    name = e.target.value;

    if (name != "" && email != "") {
        button.disabled = false;
    } else {
        button.disabled = true;
    }

});

emailInput.addEventListener('keyup', (e) => {
    email = e.target.value;

    if (name != "" && email != "") {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
});

form.addEventListener('submit', (e) => {
    console.log('Datas : ', name, email);
    e.preventDefault();
});