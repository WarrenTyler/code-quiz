const startButtonEl = document.querySelector("#start");
const questionEl = document.querySelector("#questions");
const startScreenEl = document.querySelector("#start-screen");
const questionTitleEl = document.querySelector("#question-title");
const choicesEl = document.querySelector("#choices");
const timeEl = document.querySelector("#time");
const endScreenEl = document.querySelector("#end-screen");
const feedbackEl = document.querySelector("#feedback");
const enterScoreButtonEl = document.querySelector("#submit");

// when the question is first displayed and no answer attempted,
// then questionReady will be true
let questionReady = true;

const timePenalty = 10;
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
  displayTime();
  startTimer();
  displayQuestion();
});

function displayQuestion() {
  const curQuestion = questions[currentQuestion];
  questionTitleEl.textContent = curQuestion.question;

  // questions contain buttons for each answer.
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

// function displayFeedback(msg, milliseconds) {
//   feedbackEl.textContent = msg;
//   feedbackEl.classList.remove("hide");
//   setTimeout(() => {
//     feedbackEl.classList.add("hide");
//   }, milliseconds);
// }

function displayFeedback(feedbackText) {
  feedbackEl.textContent = feedbackText;
  feedbackEl.classList.remove("hide");
}

function hideFeedback() {
  feedbackEl.classList.add("hide");
}
function questionTransition(milliseconds, feedback) {
  displayFeedback(feedback);
  questionReady = false;

  setTimeout(() => {
    nextQuestion();
    questionReady = true;
    hideFeedback();
  }, milliseconds);
}

function displayEndScreen() {
  questionEl.classList.add("hide");
  endScreenEl.classList.remove("hide");
}

choicesEl.addEventListener("click", (e) => {
  if (e.target.matches("button") && questionReady) {
    const milliseconds = 1800;
    let resultText;
    // check answer
    if (e.target.dataset.correctChoice === "false") {
      updateTimer(timePenalty);
      resultText = "Wrong!";
    } else {
      resultText = "Correct!";
    }
    questionTransition(milliseconds, resultText);
  }
});

enterScoreButtonEl.addEventListener("click", () => {
  const initialsEl = document.querySelector("#initials");
  const initials = initialsEl.value;
  // don't allow empty input values
  if (!initials) {
    return;
  }

  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const score = {
    initials,
    time,
  };

  highscores.push(score);
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // redirect to highscores page
  location.href = "highscores.html";
});
