var alphaAPIKey = "O1GHS9U2N3JN93J1"
var marketAuxAPIKey = "0q9h2RqrW3R4xzDRc1WADtChaNPpwLUPxY2z6bJf"

/* var userInput = document.getElementbyId("userInput").value; */

var newsURL = "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=YOUR_API_TOKEN"
/* var stocksURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${alphaAPIKey}` */
var stocksURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=${alphaAPIKey}`

var submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
    /* Prevents default action of submit button. */
    event.preventDefault();
   
    /* Uses the user input to generate the url path by inserting the city name. */
    var searchByCompany = document.getElementById("userInput").value;
    var stocksURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchByCompany}&apikey=${alphaAPIKey}`
    
    /* Fetches and parses the response using json. */
    fetch(stocksURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(function (data) {
        console.log(data)
      })
    })