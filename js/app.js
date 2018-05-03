/*
 * Create a list that holds all of your cards
 */

 const cardsList = [
     'fa-diamond', 
     'fa-diamond',
     'fa-paper-plane-o',
     'fa-paper-plane-o',
     'fa-bolt', 
     'fa-bolt',
     'fa-cube', 
     'fa-cube',
     'fa-anchor', 
     'fa-anchor', 
     'fa-leaf', 
     'fa-leaf',
     'fa-bicycle',
     'fa-bicycle',
     'fa-bomb', 
     'fa-bomb'
];

// Element selector variables

const deck = document.querySelector('.deck');
const card = deck.querySelector('.card');
const cardIcon = deck.querySelectorAll('.fa'); 
const restart = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function reloadCards() {
    for (let i = 0; i < cardIcon.length; i++) {
        cardIcon[i].setAttribute('class', 'fa');
        cardIcon[i].parentElement.classList.remove('match', 'open', 'show');
    }

    let newCards = shuffle(cardsList);

    for (let i = 0; i < cardIcon.length; i++) {
        cardIcon[i].classList.add(newCards[i]);
    }
}

function displayCard() {
    return event.target.classList.add('show','open');
}

function addCardToList() {
    return cardShown.push(event.target.firstElementChild.classList[1]);
}

function matchingCards() {
    const firstCard = document.querySelectorAll('.' + event.target.firstElementChild.classList[1])[0].parentElement;
    const secondCard = document.querySelectorAll('.' + event.target.firstElementChild.classList[1])[1].parentElement;
    firstCard.classList.add('match');
    secondCard.classList.add('match');
}

function notMatchingCards() {
    document.querySelectorAll('.' + cardShown[cardShown.length - 1])[0].parentElement.classList = 'card';
    document.querySelectorAll('.' + cardShown[cardShown.length - 1])[1].parentElement.classList = 'card';
    document.querySelectorAll('.' + cardShown[cardShown.length - 2])[0].parentElement.classList = 'card';
    document.querySelectorAll('.' + cardShown[cardShown.length - 2])[1].parentElement.classList = 'card';
    cardShown.splice(cardShown.length-2, 2);
}

reloadCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cardShown = [];

 // Refresh button listener
restart.addEventListener('click', reloadCards);

// Card click listener
deck.addEventListener('click', function(event) {
    if (event.target.classList[0] === "card" && event.target.classList[1] !== 'show') {
        displayCard();
        addCardToList();
        if (cardShown.length%2 == 0) {
            if(event.target.firstElementChild.classList[1] == cardShown[cardShown.length -1] && event.target.firstElementChild.classList[1] == cardShown[cardShown.length - 2]) {
                matchingCards();
            } else {
                notMatchingCards();
            }
        }
    }
});