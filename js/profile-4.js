function initProfile4Page() {
  const quiz = document.getElementById('p4-quiz');
  if (!quiz) return;

  const questions = [
    { prompt: '¿Qué tecnología estructura el contenido de una página web?', answer: 'HTML' },
    { prompt: '¿Qué propiedad CSS cambia el color del texto?', answer: 'color' },
    { prompt: '¿Qué método de JavaScript permite escuchar un clic?', answer: 'addEventListener' }
  ];
  const progress = document.getElementById('p4-quiz-progress');
  const questionText = document.getElementById('p4-quiz-question');
  const feedback = document.getElementById('p4-quiz-feedback');
  const options = quiz.querySelectorAll('[data-answer]');
  const restartButton = document.getElementById('p4-quiz-restart');
  let currentQuestion = 0;
  let score = 0;

  const showQuestion = () => {
    progress.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
    questionText.textContent = questions[currentQuestion].prompt;
    feedback.textContent = '';
    options.forEach((button, index) => {
      button.disabled = false;
      button.hidden = false;
      button.textContent = currentQuestion === 0
        ? ['HTML', 'CSS', 'JavaScript'][index]
        : currentQuestion === 1
          ? ['background', 'color', 'font-size'][index]
          : ['querySelector', 'addEventListener', 'setTimeout'][index];
      button.dataset.answer = button.textContent;
    });
  };

  const finishQuiz = () => {
    progress.textContent = 'QUIZ COMPLETADO';
    questionText.textContent = `Puntaje final: ${score} de ${questions.length}`;
    feedback.textContent = score === questions.length
      ? '¡Excelente partida!'
      : '¡Gracias por jugar! Inténtalo otra vez.';
    quiz.querySelector('.quiz-options').hidden = true;
    restartButton.hidden = false;
    restartButton.focus();
    ArcadeAudio.playPowerUp();
  };

  options.forEach(button => {
    button.addEventListener('click', () => {
      if (button.disabled) return;
      options.forEach(option => { option.disabled = true; });
      const correct = button.dataset.answer === questions[currentQuestion].answer;
      if (correct) score += 1;
      feedback.textContent = correct ? '¡Respuesta correcta!' : 'Respuesta incorrecta.';
      if (correct) ArcadeAudio.playSelect();

      window.setTimeout(() => {
        currentQuestion += 1;
        if (currentQuestion < questions.length) showQuestion();
        else finishQuiz();
      }, 650);
    });
  });

  restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    restartButton.hidden = true;
    quiz.querySelector('.quiz-options').hidden = false;
    showQuestion();
    options[0].focus();
  });

  showQuestion();
}

document.addEventListener('DOMContentLoaded', initProfile4Page);
