function fetchAPI() {
    fetch("server.js")
      .then((res) => res.json())
      .then((data) => {
        customersList = data;
        for (var i = 0; i < customersList.length; i++) {
          var latestCustomersList = document.createElement("li");
          latestCustomersList.textContent = customersList[i];
          ul.appendChild(latestCustomersList);
        }
        divUl.appendChild(ul);
        document.body.appendChild(divUl);
        document.querySelector("#ulContainer").style.visibility = "visible";
      })
      .catch((err) => console.log(err));
  }