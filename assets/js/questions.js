const startButton = document.querySelector('#start');
const questionDiv = document.querySelector('#questions');
const startScreen = document.querySelector('#start-screen');
const questionTitle = document.querySelector('#question-title');
const choicesDiv = document.querySelector('#choices');


const questions = [
  {question: "quest-1", answers:["q1-an1", "q1-an2", "q1-an3", "q1-an4"], correctAnswer: 3},
  {question: "quest-2", answers:["q2-an1", "q2-an2", "q2-an3", "q2-an4"], correctAnswer: 2}
]

let currentQuestion = 0;

startButton.addEventListener('click', function (e) {
  questionDiv.classList.remove('hide');
  startScreen.classList.add('hide');
  displayQuestion();
});

function displayQuestion() {
  questionTitle.textContent = questions[currentQuestion].question;

  for (let i = 0; i < questions.answers.length; i++) {
    const question = questions.answers[i];
    
    const li = document.createElement('li');
  }
}
