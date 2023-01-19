const startButtonEl = document.querySelector("#start");
const questionEl = document.querySelector("#questions");
const startScreenEl = document.querySelector("#start-screen");
const questionTitleEl = document.querySelector("#question-title");
const choicesEl = document.querySelector("#choices");
const timeEl = document.querySelector("#time");
const endScreenEl = document.querySelector("#end-screen");
const feedbackEl = document.querySelector("#feedback");
const enterScoreButtonEl = document.querySelector("#submit");

const timePenalty = 5;
const timePerQuestion = 10;

let currentQuestion = 0;
// set time based on amount of questions
let time = timePerQuestion * questions.length;
let timeInterval;

function displayTime() {
  timeEl.textContent = time;
}

function startTimer() {
  const oneSecond = 1000;
  timeInterval = setInterval(() => {
    updateTimer(1);
    displayTime();
  }, oneSecond);
}

startButtonEl.addEventListener("click", (e) => {
  questionEl.classList.remove("hide");
  startScreenEl.classList.add("hide");
  startTimer();
  displayQuestion();
});

function displayQuestion() {
  const curQuestion = questions[currentQuestion];
  questionTitleEl.textContent = curQuestion.question;

  // Questions contain buttons for each answer.
  choicesEl.innerText = ""; // clear before populating
  curQuestion.choices.forEach((choice, i) => {
    const button = document.createElement("button");
    button.innerText = `${i + 1}. ${choice}`;
    button.dataset.correctChoice = curQuestion.correctChoice === i;
    choicesEl.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    clearInterval(timeInterval); // stop timer
    displayEndScreen();
  } else {
    displayQuestion();
  }
}

function updateTimer(secondsToDeduct) {
  time -= secondsToDeduct;

  if (time <= 0) {
    clearInterval(timeInterval);
    time = 0;
    displayEndScreen();
  }
  displayTime();
}

function displayFeedback(msg) {
  const feedbackDisplayTime = 100; //ms

  feedbackEl.textContent = msg;
  feedbackEl.classList.remove("hide");
  setTimeout(() => {
    feedbackEl.classList.add("hide");
  }, feedbackDisplayTime);
}

function displayEndScreen() {
  questionEl.classList.add("hide");
  endScreenEl.classList.remove("hide");
}

choicesEl.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // check answer
    if (e.target.dataset.correctChoice === "false") {
      updateTimer(timePenalty);
      displayFeedback("Wrong!");
    } else {
      displayFeedback("Correct!");
    }
    nextQuestion();
  }
});

enterScoreButtonEl.addEventListener("click", () => {
  const initialsEl = document.querySelector("#initials");
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const score = {
    initials: initialsEl.value,
    time: time,
  };

  highscores.push(score);
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // redirect to highscores page
  location.href = "highscores.html";
});
