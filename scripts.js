const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matched = 0;
let score = 0;
let highest = 99;

const intro = document.getElementById( 'intro' ); 
//const fullGame = document.getElementById( 'game' ); 
const fullGame = document.getElementById( 'game' ); 
const scoreBoard = document.getElementById( 'score-board' ); 

function startGame(){
	intro.style.display = 'none';
	fullGame.style.display = '';
    scoreBoard.style.display = '';

	

}

//const full-game = 
fullGame.style.display = 'none';
scoreBoard.style.display = 'none';



//const heading = document.querySelector('h1');
//heading.innerText = " Score = " + score;



if(localStorage.getItem("high")===null){
	highest = 101;
	localStorage.setItem("high", highest);
}
else{
	highest = localStorage.getItem("high");
}


//const heading2 = document.querySelector('h2');
//heading2.innerText = "   \n\n Best Score = " + highest;





function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  score++;
//  heading.innerText = " score = " + score;
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
	heading.innerText = " FINISHED";
	if(score < highest){
		localStorage.setItem("high", score);
		highest = localStorage.getItem("high");
	}
  
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
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard))



