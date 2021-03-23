const container = document.getElementById('js-quote-container');
const quote = document.getElementById('js-quote-text');
const author = document.getElementById('js-quote-author');
const twitterBtn = document.getElementById('js-twitter');
const newQuoteBtn = document.getElementById('js-new-quote');
const loader = document.getElementById('js-loader');

// Show Loading
function loading() {
    loader.hidden = false;
    container.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
  loading();
  const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === '') {
      author.innerText = 'Unknown';
    } else {
      author.innerText = `— ${data.quoteAuthor}`;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quote.classList.add('small-text');
    } else {
      quote.classList.remove('small-text');
    }
    quote.innerText = data.quoteText;

    // Stop Loader, Show Quote
    complete();
  } catch (error) {
    console.log('error: ', error);
    getQuote();
  }
}

// Tweet Quote
const tweetQuote = () => {
    const quoteText = quote.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${twitterUrl}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

