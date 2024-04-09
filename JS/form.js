import { sendEmail } from "./enviarEmail.js";

export const user = {
  name: "",
  lastname: "",
  email: "",
  answers: [],
};

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentQuestion = 1;
const totalQuestions = document.querySelectorAll(".question-card").length;
let timeLeft = 900;
const timerDisplay = document.getElementById("timer");

// Função para iniciar o timer
function startTimer() {
  const countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    // Atualize o elemento HTML do timer
    timerDisplay.textContent = `Tempo restante: ${minutes}:${seconds}`;

    // Se o tempo acabou, pare o timer
    if (timeLeft <= 0) {
      clearInterval(countdown);
      Swal.fire({
        title: "O tempo acabou!",
        text: "Você será redirecionado para o início.",
        icon: "error",
      });
    window.location.href = "https://grupo-novaes.github.io/Treinamento-Seguranca-Trabalho/index.html";
      // window.location.href = "../index.html";
    }

    // Atualize o tempo restante
    timeLeft--;
  }, 1000); // Atualize o timer a cada segundo
}

// Chame a função para iniciar o timer quando o formulário for carregado
window.addEventListener("DOMContentLoaded", () => {
  startTimer();
});

// Resto do seu código aqui...

export function showQuestion(questionNumber) {
  const questions = document.querySelectorAll(".question-card");
  questions.forEach((question) => {
    question.classList.remove("active");
  });
  document.querySelector(`#question${questionNumber}`).classList.add("active");
}

export function nextQuestion() {
  if (!validateCurrentQuestion()) {
    Swal.fire({
      title: "Responda a pergunta antes de avançar!",
      text: "Verifique sua resposta",
      icon: "warning",
    });
    return;
  }
  if (currentQuestion < totalQuestions + 1) {
    guardarResposta();
    guardarRespostaTexto();
    currentQuestion++;
    if (currentQuestion === totalQuestions + 1) {
      goToFinal();
    } else {
      showQuestion(currentQuestion);
    }
  }
}

export function prevQuestion() {
  console.log(currentQuestion)
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
    swalWithBootstrapButtons
      .fire({
        title: "Cancelar questionário?",
        text: "Se você clicar em 'Sim', o questionário será anulado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
        window.location.href = "https://grupo-novaes.github.io/Treinamento-Seguranca-Trabalho/HTML/videos.html";
         //window.location.href = "../HTML/videos.html";
        }
      });
      currentQuestion++;
      showQuestion(currentQuestion);
  }
}

export function validateCurrentQuestion() {
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

export function guardarResposta() {
  const respostaSelecionada = document.querySelector(
    `input[name="${currentQuestion}"]:checked`
  );
  if (respostaSelecionada) {
    const resposta = respostaSelecionada.value;
    const idResposta = respostaSelecionada.getAttribute("name");
    console.log(user.answers);
    user.answers.push({ id: "Pergunta" + idResposta, resposta: resposta });
  }
}

export function guardarRespostaTexto() {
  const respostaTexto = document.querySelector(
    `textarea[name="${currentQuestion}"]`
  );
  if (respostaTexto) {
    const resposta = respostaTexto.value;
    const idResposta = respostaTexto.getAttribute("name");
    user.answers.push({ id: `questao${currentQuestion}`, resposta: resposta });
    console.log(user.answers.toString());
  }
}

export function goToFinal() {
  guardarResposta();

  console.log(user.answers);
  Swal.fire({
    title: "Deseja finalizar?",
    text: "Se você clicar em 'Finalizar', o questionário será finalizado.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Finalizar",
  }).then((result) => {
    if (result.isConfirmed) {
      // window.location.href = "../HTML/thanks.html";
    sendEmail();
    window.location.href = "https://grupo-novaes.github.io/Treinamento-Seguranca-Trabalho/HTML/thanks.html";
    }
  });
}

showQuestion(currentQuestion);

prevBtn.addEventListener("click", prevQuestion);
nextBtn.addEventListener("click", nextQuestion);
