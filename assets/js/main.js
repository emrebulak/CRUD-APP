const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const button = document.querySelector("#button");
const listItems = document.querySelector("#listItems");

let name = "";
let email = "";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello, World!");
  getStorage();
});

nameInput.addEventListener("keyup", (e) => {
  name = e.target.value;

  if (name != "" && email != "") {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});

emailInput.addEventListener("keyup", (e) => {
  email = e.target.value;

  if (name != "" && email != "") {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});

const addItem = (data) => {
  const item = `<li class="container__list--item ${
    data.isDone ? "active" : ""
  }">
        <p class="container__list--item--title">Name : ${data.name} - Email : ${
    data.email
  }</p>
        <div class="container__list--item--buttons">
            <button onclick="updateItem(${
              data.id
            })" class="btn container__list--item--button--update"><i class="fa-solid fa-pen"></i></button>    
            <button onclick="deleteItem(${
              data.id
            })" class="btn container__list--item--button--delete"><i class="fa-solid fa-trash"></i></button>    
        </div>
    </li>`;
  listItems.innerHTML += item;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addStorage(name, email);
  clearForm();
});

const clearForm = () => {
  nameInput.value = "";
  emailInput.value = "";
  name = "";
  email = "";
  button.disabled = true;
};

const updateItem = (id) => {
  console.log("Update Item : ", id);
};

const deleteItem = (id) => {
  if (id) {
    Swal.fire({
      title: "Silmek istediğinize emin misiniz?",
      showCancelButton: true,
      cancelButtonText: "İptal",
      confirmButtonText: "Sil",
    }).then((result) => {
      if (result.isConfirmed) {
        const items = JSON.parse(localStorage.getItem("items"));
        const index = items.map((i) => i.id).indexOf(id);
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        listItems.innerHTML = "";
        getStorage();
      }
    });
  }
};

const getStorage = () => {
  if (localStorage.getItem("items") !== null) {
    const items = JSON.parse(localStorage.getItem("items"));
    items.forEach((item) => {
      addItem(item);
    });
  }
};

const addStorage = (name, email) => {
  if (localStorage.getItem("items") === null) {
    const items = [];
    const item = { id: 1, name: name, email: email, isDone: false };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    addItem(item);
  } else {
    const items = JSON.parse(localStorage.getItem("items"));
    const item = {
      id: items.length + 1,
      name: name,
      email: email,
      isDone: false,
    };
    items.push(item);
    addItem(item);
    localStorage.setItem("items", JSON.stringify(items));
  }
};
