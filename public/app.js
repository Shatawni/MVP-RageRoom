var body = document.querySelector("body");
  var h1 = document.getElementById("secondH1");
 
  var divMeme = document.getElementById("memeContainer");
  var ul = document.createElement("ul");
  var button = document.getElementById("roomsBtn");
  const customers = document.createElement("customersDiv");
  // const li = document.createElement("customerListItem");


  
  document.getElementById("visitorsBtn").addEventListener("click", getData);
  document.getElementById("submit").addEventListener("click", createCustomer);
//document.querySelector("#delete").addEventListener("click", deleteCustomer);

    function openForm() {
    document.getElementById("myForm").style.display = "block ";
  }
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

async function getData() {
//     try {
        const result = await fetch("http://localhost:3001/api/customers");
        const data = await result.json();
        console.log(data); 
        let customerObj = {};
        for(let i = 0; i < data.length; i++) {
          const current = data[i];
          //customerObj = JSON.parse(current);
          console.log(current)

//           const groupli = document.createElement("li");
//           const partyli = document.createElement("li");
//           const roomli = document.createElement("li");
//           const timeli = document.createElement("li");
//           groupli.setAttribute("class", "groupList")
//           partyli.setAttribute("class", "partyList")
//           roomli.setAttribute("class", "roomList")
//           timeli.setAttribute("class", "timeList")
           const customerUl = document.createElement("ul");
           customerUl.innerText = current;
          
          var divUl = document.createElement("div");
          divUl.setAttribute("class", "divUl")
          divUl.appendChild(customerUl)
          document.body.appendChild(divUl)
          console.log(divUl)
//           groupli.innerText = data[i].groupname;
//           partyli.innerText = data[i].partysize;
//           roomli.innerText = data[i].roomcategory;
//           timeli.innerText = data[i].timeslot;
//           customerUl.append(groupli);
// customerUl.append(partyli);
// customerUl.append(roomli);
// customerUl.append(timeli);
// divUl.append(customerUl);
// document.body.append(divUl);

//           divUl.addEventListener("click", (e) => {
//             var current = e.target;
//             console.log(current)
//             if(current) 
//     var newDivContainer = document.createElement("div");
//     newDivContainer.setAttribute("class", "newDiv");
//     newDivContainer.innerText = current;
//     console.log(newDivContainer)
//     document.body.append("newDivContainer")
//     divUl.remove()
//           });

    }
//     } catch (error) {
//         console.error(error)
//     }
  }

async function createCustomer() {
  const group = document.getElementById("group").value;
  const party = document.getElementById("party").value;
  const room = document.getElementById("room").value;
  const time = document.getElementById("time").value;
  const newCustomer = {
    groupname: group,
    partysize: party,
    roomcategory: room,
    timeslot: time
  }
  try {
    const result = await fetch("http://localhost:3001/api/customers", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCustomer)
  })
  const data = await result.json()
  console.log(data)
} catch (error) {
    console.error(error)
}
}

function updateCustomers(id, data) {
  fetch(`http://localhost:3001/api/customers/:${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
     data
    })
  }).then((response) => {
    response.json().then((response) => {
      console.log(response);
    })
  }).catch(err => {
    console.error(err)
  });
}
    //     async function deleteCustomer(id) {
    //     const response = await fetch((`http://localhost:3001/api/customers/:${id}`), {
          
    //         method: 'DELETE',
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
      
    //     // Awaiting for the resource to be deleted
    //     console.error(error)
  
    //     // Return response data 
    //     return resData;
    // }
