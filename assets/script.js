var loganAlphaKey = "O1GHS9U2N3JN93J1"
var travisAlphaKey = "C4QRQCGFI8VC6NQI"

/* This section was completed by Travis Fowlston and Logan Fullerton */
var userInput = document.getElementById("userInput");
userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSubmit()
  }
});

var submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", function () {
    /* Prevents default action of submit button. */
    event.preventDefault();
    handleSubmit()
});
   
function handleSubmit() {
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
    console.log(data);
    var bestMatch = data.bestMatches;
    let btnCard = document.getElementById('tickers');
    btnCard.innerHTML = "";

    for (var i = 0; i < bestMatch.length; i++) {
      var symbolResponse = bestMatch[i];
      console.log(symbolResponse['1. symbol'] + ", " + symbolResponse['2. name']);

      let buttonEl = document.createElement('button');
      buttonEl.classList.add("btn-small");
      buttonEl.innerHTML = symbolResponse['1. symbol'] + ", " + symbolResponse['2. name'];

      /* Attaches an event listener on the button. */
      buttonEl.addEventListener("click", function(event) {
        event.preventDefault();
        handleClick(event);
      });
      buttonEl.addEventListener("click", saveButtonToLocalStorage);
      btnCard.append(buttonEl);
    }
  })
}


/* Create a function that handles and displays the stock that was clicked */
function handleClick(event) {
  event.preventDefault()
var symbol = event.target.textContent.split(",")[0].trim();
var getDailyStock = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${travisAlphaKey}`
/* Fetches the daily stock information from the API and throws an error if with that status if it can't retrieve the info. */
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
/* Uses the openPrice variable to sort the keys in ascending order, retrieve only the last key, and then access that last key */
var keys = Object.keys(openPrice);
var sortedKeys = keys.sort();
var lastKey = sortedKeys[sortedKeys.length - 1];
var lastEntry = openPrice[lastKey];
  console.log(lastEntry);
/* Takes the found symbol and displays it in the container */
let heading = document.getElementById('symbol-header');
heading.textContent = "Symbol: " + symbol;
/* Uses the sorted keys and displays it in the container */
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
/* Targets the parent element "tickers" */
var parentElement = document.getElementById("tickers");

/* Attaches the event listener to the parent element */
parentElement.addEventListener("click", function(event) {
  if (event.target.matches("button")) {
  handleClick(event);
  }
});
/* Clears the user input using the close icon in the search bar. */
document.getElementById('close-icon').addEventListener('click', function() {
  document.getElementById('userInput').value = '';
});
/* Clears the saved input from the localStorage. */
var clearFavoritesBtn = document.getElementById('clear-favorites');
clearFavoritesBtn.addEventListener("click", function() {
  localStorage.removeItem('favoriteStocks');
  favoriteStocksSection.innerHTML = "";
});

var favoriteStocksSection = document.getElementById('favoriteStocksSection');
/* Created a function to save the clicked stock to localStorage in the Favorite Stocks Section as an array. */
function saveButtonToLocalStorage(event) {
  event.preventDefault();
  var symbolAndName = event.target.textContent;
  var favoriteStocks = JSON.parse(localStorage.getItem('favoriteStocks')) || [];
  if (!favoriteStocks.includes(symbolAndName)) {
    favoriteStocks.push(symbolAndName);
    localStorage.setItem('favoriteStocks', JSON.stringify(favoriteStocks));
    displayFavoriteStock();
  }
}
/* Creates and displays a button using the localeStorage with the saved array. */
function displayFavoriteStock() {
  var favoriteStocks = JSON.parse(localStorage.getItem('favoriteStocks')) || [];
  favoriteStocksSection.innerHTML = '';
  favoriteStocks.forEach(function(stock) {
    var buttonEl = document.createElement('button');
    buttonEl.classList.add("btn-small");
    buttonEl.textContent = stock;
    favoriteStocksSection.appendChild(buttonEl);
    /* Uses the handleClick function to request the info back from the API. */
    buttonEl.addEventListener('click', handleClick)
  });
}
displayFavoriteStock();

/* The section was completed by Neilson Zulueta */
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