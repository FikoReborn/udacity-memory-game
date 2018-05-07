/*
 * Create a list that holds all of your cards
 */

const cardsList = [
    'swg-xwing',
    'swg-xwing',
    'swg-atat',
    'swg-atat',
    'swg-tie',
    'swg-tie',
    'swg-reball',
    'swg-reball',
    'swg-r2d2-3',
    'swg-r2d2-3',
    'swg-darthvader',
    'swg-darthvader',
    'swg-stormtrooper',
    'swg-stormtrooper',
    'swg-deathstar',
    'swg-deathstar'
];

// New variable to store cards clicked/matched
let cardShown = [];

// Timer variables
let realSeconds = 0;
let seconds = 0;
let minutes = 0;
let textSeconds = '';
let textMinutes = '';
let timer = setInterval(gameTimer, 1000);

//  Variables to track moves/score
let moves = 0;
let score = 3;

// Element selector variables
const deck = document.querySelector('.deck');
const card = deck.querySelector('.card');
const cardIcon = deck.querySelectorAll('.swg');
const restart = document.querySelector('.restart');
const minutesCls = document.querySelector('.minutes');
const secondsCls = document.querySelector('.seconds');
const movesCls = document.querySelector('.moves');
const starsCls = document.querySelector('.stars');

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
    let newCards = shuffle(cardsList);
    for (let i = 0; i < cardIcon.length; i++) {
        cardIcon[i].setAttribute('class', 'swg');
        cardIcon[i].parentElement.classList.remove('match', 'open', 'show', 'animated', 'rubberBand');
    }
    for (let i = 0; i < cardIcon.length; i++) {
        cardIcon[i].classList.add(newCards[i]);
    }
    moves = 0;
    realSeconds = 0;
    seconds = 0;
    minutes = 0;
    cardShown = [];
    clearInterval(timer);
    timer = setInterval(gameTimer, 1000);
    minutesCls.textContent = '0';
    secondsCls.textContent = '00';
    movesCls.textContent = moves;
    starsCls.innerHTML = calculateScore();
}

function gameTimer() {
    if (cardShown.length !== cardsList.length && moves !== 0) {
        realSeconds += 1;
        if (realSeconds / 60 % 1 === 0) {
            minutes += 1;
            seconds = 0;
        } else {
            seconds += 1;
        }
        textSeconds = seconds.toString();
        if (seconds < 10) {
            textSeconds = `0${textSeconds}`
        }
        minutesCls.textContent = minutes;
        secondsCls.textContent = textSeconds;
    }
}

function displayCard() {
    event.target.classList.add('show', 'open');
}

function addCardToList() {
    cardShown.push(event.target.firstElementChild.id);
}

function incrementMove() {
    moves += 1;
    movesCls.textContent = moves;
}

function calculateScore() {
    let scoreHTML = '';
    const starHTML = '<li><i class="fa fa-star"></i></li>';
    if (moves >= 20 && moves < 50) {
        score = 2;
    } else if (moves >= 50) {
        score = 1;
    } else {
        score = 3;
    }
    for (let i = 1; i <= score; i++) {
        scoreHTML += starHTML;
    }
    return scoreHTML;
}

function matchingCards() {
    const firstCard = document.querySelector('#' + cardShown[cardShown.length - 1]).parentElement;
    const secondCard = document.querySelector('#' + cardShown[cardShown.length - 2]).parentElement;
    firstCard.classList.add('match', 'animated', 'rubberBand');
    secondCard.classList.add('match', 'animated', 'rubberBand');
}

function notMatchingCards() {
    const cardOne = document.querySelector('#' + cardShown[cardShown.length - 1]).parentElement;
    const cardTwo = document.querySelector('#' + cardShown[cardShown.length - 2]).parentElement;
    cardShown.splice(cardShown.length - 2, 2);
    cardOne.classList.add('unmatch', 'animated', 'wobble', 'blink');
    cardTwo.classList.add('unmatch', 'animated', 'wobble', 'blink');
    window.setTimeout(function () {
        cardOne.classList.remove('show', 'open', 'unmatch', 'animated', 'wobble', 'blink');
        cardTwo.classList.remove('show', 'open', 'unmatch', 'animated', 'wobble', 'blink');
    }, 1000);
}

function gameOver() {
    clearInterval(timer);
    let winner = document.createElement('div');
    winner.innerHTML = '<div class="game-over-text">' +
                            '<h2>Congratulations!!! You won!</h2>' +
                            '<div class="final-stats score-panel">' +
                                '<p class="final-score">Score:</p>' +
                                    '<ul class="stars">' +
                                        calculateScore() +
                                    '</ul>' +
                                '<div class="timer">' +
                                    'Time: <span class="minutes">' + minutes + '</span>:<span class="seconds">' + textSeconds + '</span>' +
                                '</div>' +
                            '</div>' +
                            '<button class="play-again">Play Again?</button>' +
                        '</div>';
    winner.classList = 'game-over';
    document.body.appendChild(winner);
    document.querySelector('.game-over-text').classList.add('animated', 'bounceInDown');
    document.querySelector('.play-again').addEventListener('click', function () {
        document.querySelector('.game-over').remove();
        reloadCards();
    });
}

// Shuffle and load cards on page load
reloadCards();

// Add a click listener to the refresh button
restart.addEventListener('click', reloadCards);

// Add a listener to the game board
deck.addEventListener('click', function (event) {
    const targetClass = event.target.classList;
    const targetChildClass = event.target.firstElementChild.classList;
    if (targetClass[0] === "card" && targetClass[1] !== 'show') {
        displayCard();
        addCardToList();
        if (cardShown.length % 2 === 0) {
            const firstClick = document.querySelector('#' + cardShown[cardShown.length - 1]).classList[1];
            const secondClick = document.querySelector('#' + cardShown[cardShown.length - 2]).classList[1];
            if (targetChildClass[1] === firstClick && targetChildClass[1] === secondClick) {
                matchingCards();
            } else {
                notMatchingCards();
            }
        }
        incrementMove();
        if (cardShown.length === cardsList.length) {
            gameOver();
        }
        document.querySelector('.stars').innerHTML = calculateScore();
        timer;
    }
});