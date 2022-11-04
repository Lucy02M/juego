let winners = [];
const choices = ["piedra", "papel", "tijera"];

function resetGame(){
  winners = [];
  document.querySelector(".playerScore").textContent = "0";
  document.querySelector(".computerScore").textContent = "0";
  document.querySelector(".winner").textContent = "";
  document.querySelector(".playerChoice").textContent = "Tus Armas";
  document.querySelector(".computerChoice").textContent = "Armas de la Computadora";
  document.querySelector(".reset").style.display = "none";
}

function startGame() {
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => 
  img.addEventListener("click", () => {
    if (img.id){
      playRound(img.id);
    }
  })
  );
}

function playRound(playerChoice) {
  let wins = checkWins();
  if (wins >= 5){return;}
  const computerChoice = computerSelect();
  const winner = checkWinner(playerChoice, computerChoice);
  winners.push(winner);
  tallyWins();
  displayRound(playerChoice, computerChoice, winner);
  wins = checkWins();
  if (wins == 5){
    displayEnd();
  }
}

function displayEnd(){
  let playerWins =  winners.filter((item) => item == "Player").length;
    if (playerWins == 5){
      document.querySelector(".winner").textContent = "Ganaste! :)";}
    else {
      document.querySelector(".winner").textContent = "Perdiste :(";}
    document.querySelector(".reset").style.display = "flex";
}

function displayRound(playerChoice, computerChoice, winner){
  document.querySelector(".playerChoice").textContent = `Elegiste:${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;
  document.querySelector(".computerChoice").textContent = `Computadora eligio:${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`;
  displayRoundWinner(winner);
}

function displayRoundWinner(winner){
  if (winner == "Player"){
    document.querySelector(".winner").textContent = "Ganaste la Ronda!";
  } else if (winner == "Computer"){
    document.querySelector(".winner").textContent = "Computadora gana la ronda!";
  } else {
    document.querySelector(".winner").textContent = "Empate";
  }
}

function tallyWins(){
  const pWinCount = winners.filter((item) => item == "Player").length;
  const cWinCount = winners.filter((item) => item == "Computer").length;
  const ties = winners.filter((item) => item == "Tie").length;
  document.querySelector(".playerScore").textContent = `${pWinCount}`;
  document.querySelector(".computerScore").textContent = `${cWinCount}`;
}


function computerSelect() {
  const choice = choices[Math.floor(Math.random() * choices.length)];
    document.querySelector(`.${choice}`).classList.add("active");
    setTimeout(() => {
    document.querySelector(`.${choice}`).classList.remove("active");}, 900);
  return choice;
}

function checkWins() {
  const pWinCount = winners.filter((item) => item == "Player").length;
  const cWinCount = winners.filter((item) => item == "Computer").length;
  return Math.max(pWinCount, cWinCount);
}

function checkWinner(choice1, choice2) {
  if (
    (choice1 == "piedra" && choice2 == "tijera") ||
    (choice1 == "papel" && choice2 == "piedra") ||
    (choice1 == "tijera" && choice2 == "papel")
  ) {
    return "Player";
  } else if (choice1 === choice2) {
    return "Tie";
  } else {
    return "Computer";
  }
}

function setWins() {
  const pWinCount = winners.filter((item) => item == "Player").length;
  const cWinCount = winners.filter((item) => item == "Computer").length;
}

startGame();

