var loganAlphaKey = "O1GHS9U2N3JN93J1"
var travisAlphaKey = "C4QRQCGFI8VC6NQI"

/* This section was completed by Travis Fowlston and Logan Fullerton */
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
    btnCard.innerHTML = "";

    for (var i = 0; i < bestMatch.length; i++) {
      var symbolResponse = bestMatch[i];
      console.log(symbolResponse['1. symbol'] + ", " + symbolResponse['2. name']); // Log the name property to check if it's defined

      let buttonEl = document.createElement('button');
      buttonEl.classList.add("btn-small");
      buttonEl.innerHTML = symbolResponse['1. symbol'] + ", " + symbolResponse['2. name'];

      // Attach the event listener to the button
      buttonEl.addEventListener("click", function(event) {
        event.preventDefault();
        handleClick(event);
      });
      btnCard.append(buttonEl);
    }
  })
})

// Step 1: Create the event handler function
function handleClick(event) {
  event.preventDefault()
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
var openPrice = data["Time Series (Daily)"];
  console.log(openPrice);
var keys = Object.keys(openPrice);
var sortedKeys = keys.sort(); // Sort the keys in ascending order
var lastKey = sortedKeys[sortedKeys.length - 1]; // Retrieve the last key
var lastEntry = openPrice[lastKey]; // Access the value corresponding to the last key
  console.log(lastEntry);

let heading = document.getElementById('symbol-header');
heading.textContent = "Symbol: " + symbol;

let dateEl = document.getElementById('dateEl');
dateEl.classList.add("collection-item");
dateEl.textContent = "Date: " + lastKey;


let openEl = document.getElementById('openEl');
openEl.classList.add("collection-item");
openEl.textContent = "Open Price: " + lastEntry["1. open"];


let highEl = document.getElementById('highEl');
highEl.classList.add("collection-item");
highEl.textContent = "Highest Price: " + lastEntry["2. high"];


let lowEl = document.getElementById('lowEl');
lowEl.classList.add("collection-item");
lowEl.textContent = "Lowest Price: " + lastEntry["3. low"];


let closeEl = document.getElementById('closeEl');
closeEl.classList.add("collection-item");
closeEl.textContent = "Closing Price: " + lastEntry["4. close"];


let volumeEl = document.getElementById('volumeEl');
volumeEl.classList.add("collection-item");
volumeEl.textContent = "Volume: " + lastEntry["5. volume"];

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
/* Clears the user input using the close icon in the search bar. */
document.getElementById('close-icon').addEventListener('click', function() {
  document.getElementById('userInput').value = '';
});
/* Clears the saved input from the localStorage. */
var clearFavoritesButton = document.getElementById('clear-favorites');
clearFavoritesButton.addEventListener("click", function() {
  localStorage.removeItem('favoriteStocks');
  favoriteStocksSection.innerHTML = "";
});


/* This section was completed by Neilson Zulueta */
// Wait for the document to fully load before executing the script.
document.addEventListener('DOMContentLoaded', function () {
  var newsButton = document.querySelector("#newsButton");

  // Event listener to the newsButton to retrieve articles when clicked.
  newsButton.addEventListener("click", retrieve);

  // Function to fetch articles.
  function retrieve(e) {
    e.preventDefault();

    var apiKey = '0q9h2RqrW3R4xzDRc1WADtChaNPpwLUPxY2z6bJf';
    let newsURL = `https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=${apiKey}`;

    // Fetch request to get news articles.
    fetch(newsURL)
        .then(res => {
            // Check if the response is successful, otherwise throw an error.
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            // Convert the response to JSON format.
            return res.json();
        })
        .then(responseData => {
          // Log the data for debugging purposes.
          console.log(responseData);
      
          // Extract articles from the response data.
          let articles = responseData.data;
          
          // Check if the articles data is in the correct format.
          if (!Array.isArray(articles)) {
              throw new Error('Invalid articles data received');
          }
      
          var newsList = document.querySelector(".news-list");
          newsList.innerHTML = ''; 
          
          // Loop through each article and display it in the newsList.
          articles.forEach(article => {
              let li = document.createElement('li');
              let a = document.createElement('a');
              
              // Set the URL and target attributes for the article link.
              a.setAttribute('href', article.url); 
              a.setAttribute('target', '_blank');
              // Set the text content of the link to the article's title.
              a.textContent = article.title;
              li.appendChild(a);
              newsList.appendChild(li);
          });
      })
    }
  })