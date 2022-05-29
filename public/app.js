var body = document.querySelector("body");
var h1 = document.getElementById("secondH1");

var divMeme = document.getElementById("memeContainer");
var ul = document.createElement("ul");
var button = document.getElementById("roomsBtn");
const customers = document.createElement("customersDiv");

const server = "http://localhost:3006"; // https://salty-chamber-96193.herokuapp.com/

document.getElementById("visitorsBtn").addEventListener("click", getData);

document.getElementById("visitorsBtn").addEventListener("click", getData);
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  createCustomers();
  getData();
});
document.getElementById("updateform").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementsByClassName("update");
  updateCustomers(id[0].id);
  closeUpdateForm();
});

function openForm() {
  document.getElementById("myForm").style.display = "block ";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openUpdateForm() {
  document.getElementById("updateForm").style.display = "block ";
}
function closeUpdateForm() {
  document.getElementById("updateForm").style.display = "none";
}

async function getData() {
  const result = await fetch(`${server}/api/customers`);
  const data = await result.json();
  console.log(data);
  const divUl = document.createElement("div");
  divUl.setAttribute("class", "divUl");
  divUl.setAttribute("id", "divUl");
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    console.log(current);
    const customerUl = document.createElement("ul");
    customerUl.setAttribute("id", current.id);
    customerUl.innerText = `${current.groupname}, ${current.partysize}, ${current.roomcategory}, ${current.timeslot}`;
    console.log(customerUl);

    divUl.appendChild(customerUl);

    customerUl.addEventListener("click", (e) => {
      hideDivUl();
      getOneCustomer(e);
    });
  }
  ulContainer.appendChild(divUl);
  document.body.appendChild(ulContainer);
  console.log(divUl);
}

async function createCustomers() {
  const dataObj = {
    groupname: `${document.getElementById("group").value}`,
    partysize: `${document.getElementById("party").value}`,
    roomcategory: `${document.getElementById("room").value}`,
    timeslot: `${document.getElementById("time").value}`,
  };
  const res = await fetch(`${server}/api/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  const data = await res.json();
  closeForm();
}

async function getOneCustomer(e) {
  console.log(e.target.id);
  const result = await fetch(`${server}/api/customer/${e.target.id}`);
  console.log(e.target.id);
  const newDivUl = document.createElement("div");
  newDivUl.setAttribute("id", "newDivUl");
  console.log(newDivUl);
  const data = await result.json();
  console.log(data);
  const customerUl = document.createElement("ul");
  customerUl.setAttribute("id", data.id);
  customerUl.classList.add("ul");
  customerUl.innerText = `${data.groupname}, ${data.partysize}, ${data.roomcategory}, ${data.timeslot}`;
  console.log(customerUl);
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update");
  updateBtn.setAttribute("id", data.id);
  console.log(updateBtn.id);
  updateBtn.innerText = "UPDATE";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "DELETE";
  customerUl.appendChild(updateBtn);
  customerUl.appendChild(deleteBtn);
  newDivUl.appendChild(customerUl);
  ulContainer.appendChild(newDivUl);
  document.body.appendChild(newDivUl);

  updateBtn.addEventListener("click", (e) => {
    openUpdateForm();
    hideDivUl();
  });

  deleteBtn.addEventListener("click", (e) => {
    deleteCustomer(data.id);
    newDivUl.remove();
  });
}

function hideDivUl() {
  const divUl = document.getElementById("divUl");
  divUl.remove();
}

function hideNewDivUl() {
  const newDivUl = document.getElementById("newDivUl");
  newDivUl.remove();
}

async function updateCustomers(id) {
  const dataObj = {
    groupname: `${document.getElementById("updategroup").value}`,
    partysize: `${document.getElementById("updateparty").value}`,
    roomcategory: `${document.getElementById("updateroom").value}`,
    timeslot: `${document.getElementById("updatetime").value}`,
  };
  await fetch(`${server}/api/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
  hideNewDivUl();
}

async function deleteCustomer(id) {
  console.log(id);
  try {
    const response = await fetch(`${server}/api/customers/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
