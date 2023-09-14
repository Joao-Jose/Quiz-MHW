const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const timerMinutes = document.querySelector(".timerMinutes");
const timerSeconds = document.querySelector(".timerSeconds");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let timer;
let elapsedTime = 0;

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  elapsedTime = 0;
  timerMinutes.textContent = "0";
  timerSeconds.textContent = "0";
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    clearInterval(timer);
    finish();
  }
}

function startTimer() {
  timer = setInterval(function () {
    elapsedTime++;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
  }, 1000); // O temporizador atualiza a cada segundo (1000 milissegundos)
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });

  if (currentIndex === 0) {
    startTimer();
  }
}

loadQuestion();
