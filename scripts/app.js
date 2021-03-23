const quote = document.getElementById('quoteText');
const author = document.getElementById('quoteAuthor');
const twitterBtn = document.getElementById('twitterBtn');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const loader = document.getElementById('loader');
const container = document.getElementById('quote-container');

const loading = () => {
  loader.hidden = false
  container.hidden = true
}

const complete = () => {
  if (!loader.hidden) {
    loader.hidden = true
    container.hidden = false;
  }
}

// Get quote from api
async function getQuote() {
  loading();
  const proxUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxUrl + apiUrl);
    const data = await response.json();

    // If quote author from API is empty replace with 'Unknown Author'
    const authorQuote = data.quoteAuthor;
    const authorQuoteText = author.innerText;

    if (authorQuote === '') {
      authorQuoteText = 'Unknown Author';
    } else {
      authorQuoteText = `— ${authorQuote}`;
    }

    // Reduce the font size if the quote have more than 120 characters
    if ( data.quoteText.length > 120 ) {
      quote.classList.add('small-text');
    } else {
      quote.classList.remove('small-text');
    }
    quote.innerText = data.quoteText;
    // Hidden the page loader animation
    complete()
  } catch (error) {
    getQuote();
  }
}

const twitterQuote = () => {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}${author}`;
  window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitterQuote);

// On load
getQuote()
