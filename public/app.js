
  var body = document.querySelector("body");
  var h1 = document.getElementById("secondH1");
  var divUl = document.getElementById("ulContainer");
  var divMeme = document.getElementById("memeContainer");
  var ul = document.createElement("ul");
  var button = document.getElementById("roomsBtn");
  //var divForm = document.getElementsByClassName("center-hideform");
  // const visitorsBtn = document.querySelector("#visitorsBtn");
  // console.log(visitorsBtn)
  document.getElementById("visitorsBtn").addEventListener("click", getData);
  //document.getElementById("close").addEventListener("click", closeForm);

    function openForm() {
    document.getElementById("myForm").style.display = "block ";
    console.log("Working");
  }
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

async function getData() {
    try {
        const result = await fetch("http://localhost:3001/api/customers");//CHANGE WHEN DEPLOYED
        const data = await result.json();
        console.log(data);
        const customers = document.createElement("customers")
        customers.append(data)
    } catch (error) {
        console.error(error)
    }
}

// function fetchAPI() {
//     fetch("https://localhost:3001/api/customers")
  

// function getBestQuote() {
    
    // document.querySelector("body").style.visibility = "hidden";
    // document.querySelector("#secondH1").style.visibility = "visible";
    // var button = document.getElementById("refreshBtn");
    // document.getElementById("refreshBtn").style.visibility = "visible";
    // document.querySelector("#memeContainer").style.visibility = "visible";
    // document.querySelector("#ulContainer").style.visibility = "hidden";


  // function closeForm() {
  //   divForm.style.visibility = "hidden";
  // }
//     $('#show').on('click', function () {
//     $('.center').show();
//     $(this).hide();
// })

$('#close').on('click', function () {
    $('.center').hide();
    $('#show').show();
})
