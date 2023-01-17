const startButton = document.querySelector("#start");
const questionEl = document.querySelector("#questions");
const startScreen = document.querySelector("#start-screen");
const questionTitle = document.querySelector("#question-title");
const choicesEl = document.querySelector("#choices");
const timeEl = document.querySelector("#time");

const questions = [
  {
    question: "quest-1",
    choices: ["q1-an1", "q1-an2", "q1-an3", "q1-an4"],
    correctChoice: 3,
  },
  {
    question: "quest-2",
    choices: ["q2-an1", "q2-an2", "q2-an3", "q2-an4"],
    correctChoice: 2,
  },
];

const timePenalty = 5; 
let currentQuestion = 0;
let time = 10;

function displayTime() {
  timeEl.textContent = time;
}

function startTimer() {
  const oneSecond = 1000;
  const timeInterval = setInterval(() => {
    time--;
    displayTime();

    if (time <= 0) {
      clearInterval(timeInterval);
    }
  }, oneSecond);
}

startButton.addEventListener("click", (e) => {
  questionEl.classList.remove("hide");
  startScreen.classList.add("hide");
  startTimer();
  displayQuestion();
});

function displayQuestion() {
  const curQuestion = questions[currentQuestion];
  questionTitle.textContent = curQuestion.question;

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
  displayQuestion();
}

choicesEl.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // checkCorrect
    if (e.target.dataset.correctChoice === "false") {
      time -= timePenalty;
      displayTime();
    }
    nextQuestion();
  }
});
