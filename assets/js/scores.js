const highscoresEl = document.querySelector("#highscores");
const clearButtonEl = document.querySelector("#clear");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscores.forEach((score) => {
  const scoreEl = document.createElement("li");
  scoreEl.innerHTML = `${score.initials} - ${score.time}`;
  highscoresEl.appendChild(scoreEl);
});

clearButtonEl.addEventListener("click", () => {
  localStorage.clear();
  highscoresEl.innerHTML = "";
});
