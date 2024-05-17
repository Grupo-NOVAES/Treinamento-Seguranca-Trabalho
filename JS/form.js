import { sendEmail } from './enviarEmail.js';

const numerosSorteados = [];

function sorteioUnico() {


  return function() {
    if (numerosSorteados.length === 9) {
      return 10;
    }

    let numero;
    do {
      numero = Math.floor(Math.random() * 9) + 1;
    } while (numerosSorteados.includes(numero));

    numerosSorteados.push(numero);
    return numero;
  };
}

export const user = {
  name: "",
  lastname: "",
  email: "",
  answers: ["", "", "", "", "", "", "", "", "", ""],
  initHour: "",
  finalHour: "",
};

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentQuestion = 1;
const totalQuestions = document.querySelectorAll(".question-card").length;

function showQuestion() {
  const questionNumberGenerator = sorteioUnico();
  const questionNumber = questionNumberGenerator(); // Chamada correta da função
  currentQuestion = questionNumber;
  const questions = document.querySelectorAll(".question-card");
  questions.forEach((question) => {
    question.classList.remove("active");
  });
  document.querySelector(`#question${questionNumber}`).classList.add("active");
}




function nextQuestion() {
  if (!validateCurrentQuestion()) {
    Swal.fire({
      title: "Responda a pergunta antes de avançar!",
      text: "Verifique sua resposta",
      icon: "warning",
    });
    return;
  }
  console.log("currentQuestion: "+currentQuestion)
  if (currentQuestion < 11) {
    guardarResposta();
    guardarRespostaTexto();
    currentQuestion++;
    console.log("total de questoes: "+totalQuestions)
    console.log("Questao atual: "+currentQuestion)

    if (currentQuestion === 11) {
      goToFinal();
    } else {
      showQuestion(currentQuestion);
    }
  }
}

function prevQuestion() {
  currentQuestion--;
  if (currentQuestion > 0) {
    showQuestion(currentQuestion);
  }
  if (currentQuestion === 0) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
      Swal.fire({
        title: "Anular questionário?",
        text: "Se você clicar em 'Sim, anular', o questionário será anulado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, anular",
        cancelButtonText: "Não, continuar a responder"
      }).then((result) => {
        if(result.isConfirmed){
          window.location.href = "https://grupo-novaes.github.io/Treinamento-Seguranca-Trabalho/HTML/videos.html";
        }else if(result.isDenied){
          console.log("RECUSADO!")
        }
      });
    currentQuestion++;
    showQuestion(currentQuestion);
  }
}

function validateCurrentQuestion() {
  const currentQuestionCard = document.querySelector(
    `#question${currentQuestion}`
  );
  const radioInputs = currentQuestionCard.querySelectorAll(
    'input[type="radio"]'
  );
  const checkboxInputs = currentQuestionCard.querySelectorAll(
    'input[type="checkbox"]'
  );
  const textareaInput = currentQuestionCard.querySelector("textarea");

  if (radioInputs.length > 0) {
    const checkedRadio = Array.from(radioInputs).some((input) => input.checked);
    if (!checkedRadio) return false;
  }

  if (checkboxInputs.length > 0) {
    const checkedCheckbox = Array.from(checkboxInputs).some(
      (input) => input.checked
    );
    if (!checkedCheckbox) return false;
  }

  if (textareaInput) {
    if (!textareaInput.value.trim()) return false;
  }

  return true;
}

function guardarResposta() {
  const respostaSelecionada = document.querySelector(
    `input[name="${currentQuestion}"]:checked`
  );
  if (respostaSelecionada) {
    const resposta = respostaSelecionada.value;
    user.answers[currentQuestion - 1] = `Resposta${currentQuestion}: ${resposta}`;
  }
  console.log(user.answers);
}

function guardarRespostaTexto() {
  const respostaTexto = document.querySelector(
    `textarea[name="${currentQuestion}"]`
  );
  if (respostaTexto) {
    const resposta = respostaTexto.value;
    user.answers[currentQuestion-1] = `Resposta${currentQuestion}: ${resposta}`;
  }
}

function goToFinal() {
  guardarResposta();
  Swal.fire({
    title: "Deseja finalizar?",
    text: "Se você clicar em 'Sim, finalizar', o questionário será finalizado.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, finalizar",
    cancelButtonText: "Não"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await sendEmail();
      window.location.href = "https://grupo-novaes.github.io/Treinamento-Seguranca-Trabalho/HTML/thanks.html";
    }
  });
}



function startTimer() {
  let timeLeft = 600;
  const timerDisplay = document.getElementById("timer");
  const countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    timerDisplay.textContent = `Tempo restante: ${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      Swal.fire({
        title: "O tempo acabou!",
        text: "Você será redirecionado para o início.",
        icon: "error",
      });
      window.location.href = "https://grupo-novaes.github.io/Treinamento-Seguranca-Trabalho/index.html";
      //window.location.href = "../index.html";
    }

    timeLeft--;
  }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
  startTimer();
});

showQuestion();

prevBtn.addEventListener("click", prevQuestion);
nextBtn.addEventListener("click", nextQuestion);
