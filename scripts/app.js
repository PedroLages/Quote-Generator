const quote = document.getElementById("quoteText");
const author = document.getElementById("quoteAuthor");
const twitterBtn = document.getElementById("twitterBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");

// Get quote from api
async function getQuote() {
  const proxUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxUrl + apiUrl);
    const data = await response.json()

    // If quote author from API is empty replace with 'Unknown'
    if (data.quoteAuthor === '') {
      author.innerText = 'Unknown Author'
    } else {
      author.innerText = `— ${data.quoteAuthor}`;
    }

    // Reduce the font size if the quote have more than 120 characters
    if (data.quoteText.length > 120) {
      quote.classList.add("long-quote");
    } else {
      quote.classList.remove("long-quote");
    }
    quote.innerText = data.quoteText
  } catch (error) {
    getQuote()
  }
}

const twitterQuote = () => {
  const quote = quoteText.innerText
  const author = quoteAuthor.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", twitterQuote);

// On load
getQuote()
