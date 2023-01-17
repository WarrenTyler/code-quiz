const startButton = document.querySelector("#start");
const questionDiv = document.querySelector("#questions");
const startScreen = document.querySelector("#start-screen");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");

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

let currentQuestion = 0;

startButton.addEventListener("click", (e) => {
  questionDiv.classList.remove("hide");
  startScreen.classList.add("hide");
  displayQuestion();
});

function displayQuestion() {
  const curQuestion = questions[currentQuestion];
  questionTitle.textContent = curQuestion.question;

  // Questions contain buttons for each answer.
  curQuestion.choices.forEach((choice, i) => {
    const button = document.createElement("button");
    button.innerText = `${i + 1}. ${choice}`;
    choicesDiv.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestion++;
  displayQuestion();
}

choicesDiv.addEventListener("click", (e) => {
  alert(e.target.matches("button"));
  if (e.target.matches("button")) {
    // checkCorrect
    nextQuestion();
  }
});
