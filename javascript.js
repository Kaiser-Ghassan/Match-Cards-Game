const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
var moves = 0;

var gameWon = false;
var flippedCards = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // Prevent double-clicking the same card

  this.classList.add("flip");
  moves++;

  movesCounter.innerHTML = `Moves ${moves}`;
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;

    // Check for a match
    if (firstCard.dataset.image === secondCard.dataset.image) {
      
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      reset();
      flippedCards++;
      if (flippedCards == 8) {
                // Delay the win function by 500 milliseconds
                setTimeout(() => {
                  gameWon = true;
                  win(); // Trigger win function if all cards are matched
                }, 500);
        
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        if (secondCard) {
          // Check if secondCard is not null
          secondCard.classList.remove("flip");
        }
        if (firstCard) {
          // Check if secondCard is not null
          firstCard.classList.remove("flip");
        }
        reset();
      }, 1000);
    }
  }
}
function reset() {
  lockBoard = false;
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach((card) => {
    let randomOrder = Math.floor(Math.random() * 16);
    card.style.order = randomOrder;
  });
}
shuffle();

cards.forEach((card) => card.addEventListener("click", flipCard));

const resetBtn = document.getElementById("reset-button");
resetBtn.addEventListener("click", function () {
  cards.forEach((card) => {
    card.style.display = "none";
  });
  resetBoard();
  shuffle();
  moves = 0;
  setTimeout(() => {
    cards.forEach((card) => {
      card.style.display = "flex";
    });
  }, 25);
});

function resetBoard() {
  cards.forEach((card) => {
    card.classList.remove("flip"); // Remove the "flip" class from all cards
    card.addEventListener("click", flipCard);
    moves = 0;
    movesCounter.innerHTML = `Moves ${moves}`;
  });

  reset();
}
//prevent drag and drop

document.body.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

document.body.addEventListener("drop", (event) => {
  event.preventDefault();
});


var movesCounter = document.getElementById("moves-counter");
movesCounter.innerHTML = `Moves ${moves}`;

/*  Winning div  */
$(window).on("load",function(){
	
	setTimeout(function(){$('.done').addClass("drawn");},500)
	
});



function win() {
  const winContainer = document.getElementById("contain");
  winContainer.style.visibility = "visible";
}
