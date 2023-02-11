"use strict";

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current-score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

let activePlayer, currentScore, scores, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");

  diceEl.classList.add("hidden");
};

const player0El = document.querySelector(".player0");
const player1El = document.querySelector(".player1");

const score0El = document.getElementById("score0");
const score1El = document.getElementById("score1");

const current0El = document.getElementById("current-score-0");
const current1El = document.getElementById("current-score-1");

const diceEl = document.querySelector(".img");

const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const btnAgain = document.querySelector(".game-state");

// initial conditons
init();

btnRoll.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      player0El.classList.remove("player-active");
      player1El.classList.remove("player-active");
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("player-winner");
      document.querySelector(`.player-heading${activePlayer}`).style.color =
        "#ec3383";
    } else {
      switchPlayer();
    }
  }
});

btnAgain.addEventListener("click", function () {
  init();

  document.querySelector(".player-heading0").style.color = "#333";
  document.querySelector(".player-heading1").style.color = "#333";
});
