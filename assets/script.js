var alphaAPIKey = "O1GHS9U2N3JN93J1"
var marketAuxAPIKey = "0q9h2RqrW3R4xzDRc1WADtChaNPpwLUPxY2z6bJf"
var otherAlphaKey = "IT2CROV94Q2OSDII"

var newsURL = "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=YOUR_API_TOKEN"
var stocksURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=${alphaAPIKey}`

var submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
    /* Prevents default action of submit button. */
    event.preventDefault();
   
    /* Uses the user input to generate the url path by inserting the company name or symbol. */
    var searchByCompany = document.getElementById("userInput").value;
    var stocksURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchByCompany}&apikey=${otherAlphaKey}`
    
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
      console.log(symbolResponse.name); // Log the name property to check if it's defined

      let buttonEl = document.createElement('button');
      buttonEl.classList.add("btn-small");
      buttonEl.innerHTML = symbolResponse.name;
      btnCard.append(buttonEl);
    }
  })
})