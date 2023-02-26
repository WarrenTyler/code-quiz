const highscoresEl = document.querySelector("#highscores");
const clearButtonEl = document.querySelector("#clear");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// sort the scores based on best time
highscores.sort((a, b) => b.time - a.time);

// display scores to user
highscores.forEach((score) => {
  const scoreEl = document.createElement("li");
  scoreEl.innerHTML = `${score.initials} - ${score.time}`;
  highscoresEl.appendChild(scoreEl);
});

// Allow user to clear local storage
clearButtonEl.addEventListener("click", () => {
  localStorage.clear();
  highscoresEl.innerHTML = "";
});
