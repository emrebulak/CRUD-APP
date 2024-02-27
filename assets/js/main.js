const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const button = document.querySelector("#button");
const listItems = document.querySelector("#listItems");

let updateId = null;
let updateIsDone = null;
let name = "";
let email = "";
let isUpdate = false;

document.addEventListener("DOMContentLoaded", () => {
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
  const item = `<li onclick="updateDone(event, ${data.id})" class="container__list--item ${data.isDone ? "active" : ""
    }">
        <p class="container__list--item--title">Name : ${data.name} - Email : ${data.email
    }</p>
        <div class="container__list--item--buttons">
            <button onclick="updateItem(event, ${data.id
    })" class="btn container__list--item--button--update"><i class="fa-solid fa-pen"></i></button>    
            <button onclick="deleteItem(event, ${data.id
    })" class="btn container__list--item--button--delete"><i class="fa-solid fa-trash"></i></button>    
        </div>
    </li>`;
  listItems.innerHTML += item;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isUpdate) {
    addStorage(name, email);
    clearForm();
  } else {
    updateStorage();
  }
});

const clearForm = () => {
  updateId = null;
  isUpdate = null;
  nameInput.value = "";
  emailInput.value = "";
  name = "";
  email = "";
  button.disabled = true;
  button.value = "Add";
};

const updateItem = (event, id) => {
  event.stopPropagation();
  if (id) {
    isUpdate = true;
    const items = JSON.parse(localStorage.getItem("items"));
    const index = items.map((i) => i.id).indexOf(id);
    const item = items[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    updateId = item.id;
    updateIsDone = item.isDone;
    name = item.name;
    email = item.email;
    button.disabled = false;
    button.value = "Update";
  }
};

const deleteItem = (event, id) => {
  event.stopPropagation();
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
    const item = { id: generateUniqueId(), name: name, email: email, isDone: false };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    addItem(item);
  } else {
    const items = JSON.parse(localStorage.getItem("items"));
    const item = {
      id: generateUniqueId(),
      name: name,
      email: email,
      isDone: false,
    };
    items.push(item);
    addItem(item);
    localStorage.setItem("items", JSON.stringify(items));
  }
};

const updateStorage = () => {
  if (localStorage.getItem("items") !== null) {
    const item = { id: updateId, name: name, email: email, isDone: updateIsDone };
    const items = JSON.parse(localStorage.getItem("items"));
    const index = items.map((i) => i.id).indexOf(item.id);
    items[index] = item;
    localStorage.setItem("items", JSON.stringify(items));
    listItems.innerHTML = "";
    getStorage();
    clearForm();
  }
};

const updateDone = (event, id) => {
  event.stopPropagation();
  if (id) {
    const items = JSON.parse(localStorage.getItem("items"));
    const index = items.map((i) => i.id).indexOf(id);
    const item = items[index];
    item.isDone = !item.isDone;
    items[index] = item;
    localStorage.setItem("items", JSON.stringify(items));
    listItems.innerHTML = "";
    getStorage();
  }

};

const generateUniqueId = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const uniqueId = `${hours}${minutes}${seconds}${milliseconds}`;
  return Number(uniqueId);
}
