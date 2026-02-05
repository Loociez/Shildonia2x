const spinBtn = document.getElementById("spinBtn");
const namesInput = document.getElementById("names");
const selectorDisplay = document.getElementById("selector");
const winnerDisplay = document.getElementById("winner");

let players = [];
let spinning = false;
let spinInterval = null;
let spinDuration = 6000; // spin time in ms

// Intro screen fade after 4 seconds
setTimeout(() => {
  document.getElementById("intro").remove();
  document.getElementById("app").classList.remove("hidden");
}, 4000);

// Enable/disable spin button based on input
namesInput.addEventListener("input", () => {
  players = namesInput.value.trim().split("\n").map(n => n.trim()).filter(n => n);
  spinBtn.disabled = players.length < 2;
  winnerDisplay.classList.add("hidden");
  selectorDisplay.textContent = "";
});

// Start spinning animation
function startSpin() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  winnerDisplay.classList.add("hidden");

  let currentIndex = 0;
  let startTime = performance.now();

  spinInterval = setInterval(() => {
    // Cycle highlight
    selectorDisplay.textContent = players[currentIndex];
    currentIndex = (currentIndex + 1) % players.length;

    // Check if spin duration ended
    if (performance.now() - startTime > spinDuration) {
      clearInterval(spinInterval);
      finishSpin();
    }
  }, 80); // change highlight every 80ms
}

// Finish spinning and select winner
function finishSpin() {
  // Random winner index
  const winnerIndex = Math.floor(Math.random() * players.length);
  const winner = players[winnerIndex];

  // Show winner highlight
  selectorDisplay.textContent = winner;
  winnerDisplay.textContent = `🏆 WINNER: ${winner}`;
  winnerDisplay.classList.remove("hidden");

  spinning = false;
  spinBtn.disabled = false;
}
