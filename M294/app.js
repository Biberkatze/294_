let rezepte = [];

const app_el = document.getElementById("app");

const addRezept = function (event) {
  event.preventDefault();
  let title = document.querySelector("input[name='rezept']").value;
  let rezept = { title: title };

  fetch("http://localhost:2940/api/v1/entities", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(rezept),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json && json.id) {
        rezept.id = json.id;
        rezepte.push(rezept);

        // Save the updated data to localStorage
        localStorage.setItem("rezepte", JSON.stringify(rezepte));

        updateList();
      } else {
        console.error("Unexpected server response:", json);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const createForm = function (parent) {
  const form_el = document.createElement("form");

  const input_el = document.createElement("input");
  input_el.setAttribute("type", "text");
  input_el.setAttribute("name", "rezept");

  const submit_el = document.createElement("input");
  submit_el.setAttribute("type", "submit");
  submit_el.setAttribute("value", "save");

  form_el.appendChild(input_el);
  form_el.appendChild(submit_el);

  parent.appendChild(form_el);
};

const createList = function (parent) {
  const ul_el = document.createElement("ul");

  if (Array.isArray(rezepte)) {
    rezepte.forEach((rezept) => {
      addListElement(rezept, ul_el);
    });
  }

  parent.appendChild(ul_el);
};

const addListElement = function (rezept, parent) {
  let li_el = document.createElement("li");
  li_el.classList.add("rezept");
  li_el.innerHTML = rezept.title;

  // Add a delete button for each item
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deleteRezept(rezept.id));

  li_el.appendChild(deleteButton);
  parent.appendChild(li_el);
};

const updateList = function () {
  // Clear the existing list
  app_el.innerHTML = "";

  // Recreate the form and list
  createForm(app_el);
  createList(app_el);
};

const deleteRezept = function (id) {
  // Assuming you have the ID of the entity to be deleted
  fetch(`http://localhost:2940/api/v1/entities/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      // Remove the deleted rezept from the array
      rezepte = rezepte.filter((rezept) => rezept.id !== id);

      // Save the updated data to localStorage
      localStorage.setItem("rezepte", JSON.stringify(rezepte));

      // Update the displayed list
      updateList();
    })
    .catch((error) => {
      console.log(error);
    });
};

// Initialize the list with data from localStorage
rezepte = JSON.parse(localStorage.getItem("rezepte")) || [];
updateList();

const form_el = document.querySelector("#app form");
form_el.addEventListener("submit", addRezept);
