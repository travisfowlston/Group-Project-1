var loganAlphaKey = "O1GHS9U2N3JN93J1"
var marketAuxAPIKey = "0q9h2RqrW3R4xzDRc1WADtChaNPpwLUPxY2z6bJf"
var travisAlphaKey = "IT2CROV94Q2OSDII"

var newsURL = "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=YOUR_API_TOKEN"

var submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
    /* Prevents default action of submit button. */
    event.preventDefault();
   
    /* Uses the user input to generate the url path by inserting the company name or symbol. */
    var searchByCompany = document.getElementById("userInput").value;
    var stocksURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchByCompany}&apikey=${travisAlphaKey}`
    
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
    console.log(data); // Log the response data to inspect its structure
    var bestMatch = data.bestMatches;
    let btnCard = document.getElementById('tickers');

    for (var i = 0; i < bestMatch.length; i++) {
      var symbolResponse = bestMatch[i];
      console.log(symbolResponse['1. symbol'] + ", " + symbolResponse['2. name']); // Log the name property to check if it's defined

      let buttonEl = document.createElement('button');
      buttonEl.classList.add("btn-small");
      buttonEl.innerHTML = symbolResponse['1. symbol'] + ", " + symbolResponse['2. name'];
      btnCard.append(buttonEl);
    }
  })
  // Step 1: Create the event handler function
function handleClick(event) {
  // Perform the desired action
  var symbol = event.target.textContent.split(",")[0].trim();
  var getDailyStock = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${travisAlphaKey}`
  
  fetch(getDailyStock)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error: " + response.status);
    }
  })
  .then(function (data) {
    console.log(data);
   let openPrice = data.times_series_daily
   console.log(openPrice)
})
}

// Step 2: Target the parent element
var parentElement = document.getElementById("tickers");

// Step 3: Attach the event listener to the parent element
parentElement.addEventListener("click", function(event) {
  // Step 4: Check if the clicked element matches the dynamically generated buttons
  if (event.target.matches("button")) {
    // Step 5: Perform the desired action
    handleClick(event);
  }
});
})