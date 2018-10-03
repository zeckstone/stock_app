// Initial array of stocks
let stocksList = ['AMZN', 'GOOG', 'TSLA', 'AAPL'];

// Function for dumping the JSON content for each button into the div
const displayStockInfo = function () {

  const stock = $(this).attr('data-name');
  const queryURLname = `https://api.iextrading.com/1.0/stock/${stock}/quote`;
  const queryURLprice = `https://api.iextrading.com/1.0/stock/${stock}/quote`;
  const queryURLogo = `https://api.iextrading.com/1.0/stock/${stock}/logo.png`;
  const queryURLarticles = `https://api.iextrading.com/1.0/stock/${stock}/news/last`;

  $.ajax({
    url: queryURLname,
    method: 'GET'
  }).then(function(response) {
    $('#stocks-view').append(`<h5>Company Name:</h5>  ${response.companyName}<br/><br/>`);
  });

  $.ajax({
    url: queryURLprice,
    method: 'GET'
  }).then(function(response) {
    $('#stocks-view').append(`<h6>Latest Price:</h6> ${response.latestPrice}</br><br/>`);
  });

  $.ajax({
    url: queryURLogo,
    method: 'GET'
  }).then(function(response) {
    $('#stocks-view').append(`<h6>Logo:</h6> ${response}<br/><br/>`);
  });

  $.ajax({
    url: queryURLarticles,
    method: 'GET'
  }).then(function(response) {
    for (i = 0; i < 10; i++)
    {
    $('#stocks-view').append(`<h6>Article:</h6> ${response[i].headline}<br/><br/>`);
    }
  });

    $('#stocks-view').append('<hr/><hr/>')

}

// Function for displaying stock data
function render() {

  // Deleting the buttons prior to adding new stocks
  // (this is necessary otherwise you will have repeat buttons)
  $('#buttons-view').empty();

  // Looping through the array of stocks
  for (let i = 0; i < stocksList.length; i++) {

    // Then dynamically generating buttons for each stock in the array
    // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
    let newButton = $('<button>');

    // Adding a class of stock to our button
    newButton.addClass('stock');

    // Adding a data-attribute
    newButton.attr('data-name', stocksList[i]);

    // Providing the initial button text
    newButton.text(stocksList[i]);

    // Adding the button to the buttons-view div
    $('#buttons-view').append(newButton);
  }
}

// This function handles events where one button is clicked
const addButton = function(event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  const stock = $('#stock-input').val().trim();
  
  // The stock from the textbox is then added to our array
  stocksList.push(stock);

  // Deletes the contents of the former input
  $('#stock-input').val('');

  // calling render which handles the processing of our stock array
  render();
}

$('#add-stock').on('click', addButton);

// Function for displaying the stock info
// Using $(document).on instead of $('.stock').on to add event listeners to dynamically generated elements
$('#buttons-view').on('click', '.stock', displayStockInfo);

// Calling the renderButtons function to display the initial buttons
render();







