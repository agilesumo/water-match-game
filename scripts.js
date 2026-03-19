const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matched = 0;
let score = 0;
let highest = 999;

const intro = document.getElementById( 'intro' ); 
const fullGame = document.getElementById( 'game' ); 
const scoreBoard = document.getElementById( 'score-board' ); 
const scoreText = document.getElementById('resizable-span');
const bestText = document.getElementById('best-span');

const overScreen = document.getElementById( 'game-over' ); 
const finishedScore = document.getElementById( 'score-finished' ); 




	document.getElementById( 'game' ).style.display = 'none';
	document.getElementById( 'score-board' ).style.display = 'none';
	document.getElementById( 'game-over' ).style.display ='none';


function startGame(){
	
	intro.style.display = 'none';
	fullGame.style.display = '';
    scoreBoard.style.display = '';
	overScreen.style.display = 'none';	

}

function replayGame(){

    matched = 0;
    score = 0;
	scoreText.innerText = " Turns: " + score;
	
	if(localStorage.getItem("high")!=null){
	    highest = localStorage.getItem("high");
	    bestText.innerText = "Best: " + highest;
}

	resetBoard();

	shuffle();
	startGame();
	cards.forEach(card => card.addEventListener('click', flipCard))

}

	//localStorage.setItem("high", highest);

if(localStorage.getItem("high")!=null){
	highest = localStorage.getItem("high");
	bestText.innerText = "Best: " + highest;
}


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  score++;
  scoreText.innerText = " Turns: " + score;
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.tip === secondCard.dataset.tip;

  isMatch ? disableCards() : unflipCards();
  
  if(isMatch){
	matched++;
  }
  if(matched === 6){
	fullGame.style.display = 'none';
    scoreBoard.style.display = 'none';
	overScreen.style.display ='';
	finishedScore.innerText = "You scored: " + score;
    console.log("log output " + score+"   "+highest);
	if(score==highest){
		document.getElementById("heigh-score").innerText = "Well Done! You equaled your best score";

	}
	if(score < highest){
		localStorage.setItem("high", score);
		document.getElementById("heigh-score").innerText = "Well Done! You got a new best score";

		highest = score;
	}

	
	matched = 0;
  
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
	card.classList.remove('flip');
  });
})();

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
	card.classList.remove('flip');
  });
}

cards.forEach(card => card.addEventListener('click', flipCard))



