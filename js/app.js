/*
 * Create a list that holds all of your cards
 */
const cardList = ["qrcode", "qrcode", "apple", "apple", "camera-retro", "camera-retro", "git", "git", "level-up", "level-up", "puzzle-piece", "puzzle-piece", "bullseye", "bullseye", "thumbs-down", "thumbs-down"];

// Define important variables
let openCards = [];
let nbMoves = 0;
let stars = 3;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Set the timer - credits: https://github.com/albert-gonzalez/easytimer.js by Albert Gonzalez
var timer = new Timer();
timer.addEventListener('secondsUpdated', function (e) {
    $('time').html(timer.getTimeValues().toString());
});

// Initialize the game
function init() {
    shuffleDeck();
    checkGameFinished();
    initMoves();
    initStars();
}

// Initialize the game in page load
document.addEventListener("DOMContentLoaded", init());

// Restart the game in restart click and trigger
$('.restart').on('click', function (event) {
    timer.reset();
    init();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle function
function shuffleDeck    () {
    // shuffle cards and store it into a variable
    let newDeck = shuffle(cardList); 
    // reset open cards list
    openCards = []; 
    // reset card deck 
    const deck = $('.deck').empty();
    
    // Loop through each card and create its HTML
    for (var card of newDeck) {
        // Set HTML content of each card
        var htmlTextToAdd = $('<li class="card"><i class="fa"></i></li>'); 
        // Append deck and add each card to the deck
        $('.deck').append(htmlTextToAdd);
        // Display card icon class of the card
        var icon = "fa-" + card; 
        // Add icon class to the card
        htmlTextToAdd.find('.fa').addClass(icon); 
    }
}

// Define a display function and tag opened card 
function showCard(card) {
    card.addClass("open show");
    openCards.push(card);
}

// Verify if there is a match
function checkCards(card) {
    // Compare first card and second card stored in openCards tocheck if there is a match
    if (openCards.length > 0 && openCards[0][0].firstChild.className == openCards[1][0].firstChild.className ) {
        // Add class "match" to each card
        openCards[0].addClass("match");    
        openCards[1].addClass("match");    
        // Reset openCards
        openCards = [];
        // Verify if all cards have been found and matched
        checkGameFinished();
        // Modify the class if there is no match
        } else if (openCards.length >0 && openCards[0][0].firstChild.className !== openCards[1][0].firstChild.className )  {
        openCards[0].addClass("no-match");
        openCards[1].addClass("no-match");
        // Reset class of unmatched cards
        setTimeout(function () {
                openCards[0].removeClass("open show no-match");
                openCards[1].removeClass("open show no-match");
                openCards = [];
            }, 400);
        }
    countMoves();
}

// Trigger the showCard and checkCards functions on a card click to edit their classes and verify if there is a match
$('.deck').on('click', '.card', function (event) {
    var lastClickedCard = $(event.target);
    // Start timer on first click
    timer.start();
    showCard(lastClickedCard);
    setTimeout(function () {
        checkCards(lastClickedCard);
    }, 300);
});

// Check if all cards matched and show the winning page if the 
function checkGameFinished() {
    var numberOfMatched = cardList.length;
    if(numberOfMatched === $('.match').length){
        timer.stop();
        $(".container").hide();
        $(".win-container").show();
    } else{
        $(".container").show();
        $(".win-container").hide();
    }
}
// Initialize the number of moves
function initMoves() {
    nbMoves = 0;
    $('.moves').text(nbMoves);
}

// Keep the number of moves up to date
function countMoves() {
    nbMoves++;
    $('.moves').text(nbMoves);
    updateStars();
}

// Initialize the number of stars
function initStars() {
    stars = 3;
    $('.stars i').removeClass("fa-star-o");
    $('.stars i').addClass("fa-star");
    updateStars();
}

// Set the level of stars depending on the number of moves used to finish
function updateStars() {
    if (nbMoves <= 15) {
        $('.stars .fa').addClass("fa-star");
        stars = 3;
    } else if(nbMoves >= 16 && nbMoves <= 18){
        $('.stars li:last-child .fa').removeClass("fa-star");
        $('.stars li:last-child .fa').addClass("fa-star-o");
        stars = 2;
    } else if (nbMoves >= 19 && nbMoves <=21){
        $('.stars li:nth-child(2) .fa').removeClass("fa-star");
        $('.stars li:nth-child(2) .fa').addClass("fa-star-o");
        stars = 1;
    } else if (nbMoves >=22){
        $('.stars li .fa').removeClass("fa-star");
        $('.stars li .fa').addClass("fa-star-o");
        stars = 0;
    }
    $('.win-container .stars-number').text(stars);

}


