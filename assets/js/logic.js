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

// display time to user
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

// EVENT LISTENERS ------------------------------------------------------------- //
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
    // dynamically create a button and add it to the DOM
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
  // Allow a pause for user to see if they answered correctly
  // and don't allow them to click in that time
  if (e.target.matches("button") && questionReady) {
    const milliseconds = 1800;
    // check answer
    let resultText;
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
    displayFeedback("Please enter your initials");
    setTimeout(() => {
      hideFeedback();
    }, 200);

    return;
  }

  // get the highscores or an empty array if there aren't any
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const score = {
    initials,
    time,
  };

  // push the score into highscores
  highscores.push(score);
  // store highscores in local storage
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // redirect to highscores page
  location.href = "highscores.html";
});
