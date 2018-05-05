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
    moves = 0;
    document.querySelector('.moves').textContent = moves;
}

function displayCard() {
    event.target.classList.add('show','open');
}

function addCardToList() {
    console.log(event.target.firstElementChild.id);
    cardShown.push(event.target.firstElementChild.id);
}

function matchingCards() {
    const firstCard = document.querySelector('#' + cardShown[cardShown.length-1]).parentElement;
    const secondCard = document.querySelector('#' + cardShown[cardShown.length-2]).parentElement;
    firstCard.classList.add('match');
    secondCard.classList.add('match');
}

function notMatchingCards() {
    const cardOne = document.querySelector('#' + cardShown[cardShown.length-1]).parentElement;
    const cardTwo = document.querySelector('#' + cardShown[cardShown.length-2]).parentElement;
    cardShown.splice(cardShown.length-2, 2);
    cardOne.classList.add('unmatch');
    cardTwo.classList.add('unmatch');
    window.setTimeout(function() {
        cardOne.classList.remove('show','open','unmatch');
        cardTwo.classList.remove('show','open','unmatch');
    }, 1000);
}

function incrementMove() {
    moves += 1;
    document.querySelector('.moves').textContent = moves;    
}

function gameOver() {
    let winner = document.createElement('div');
    winner.innerHTML = '<div class="game-over-text"><h2>Congratulations!!! You won!</h2>' +
                    '<button class="play-again">Play Again?</button></div>';
    winner.classList = 'game-over';
    winner.classList.add('game-over');
    document.body.appendChild(winner);
    window.setTimeout(function(){
        document.querySelector('.game-over').classList.add('fade-in');
    }, 100);
    document.querySelector('.play-again').addEventListener('click', function() {
        document.querySelector('.game-over').remove();
        reloadCards();
    });
}

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
let moves = 0;

reloadCards();

 // Refresh button listener
restart.addEventListener('click', reloadCards);

// Card click listener
deck.addEventListener('click', function(event) {
    if (event.target.classList[0] === "card" && event.target.classList[1] !== 'show') {
        displayCard();
        addCardToList();
        if (cardShown.length%2 == 0) {
            if(event.target.firstElementChild.classList[1] === document.querySelector('#' + cardShown[cardShown.length -1]).classList[1] && event.target.firstElementChild.classList[1] === document.querySelector('#' + cardShown[cardShown.length -2]).classList[1]) {
                matchingCards();
            } else {
                notMatchingCards();
            }
        }
        incrementMove();
        if (cardShown.length === cardsList.length) {
            gameOver();
        }
    }
});