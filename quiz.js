document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-btn');
  const form = document.getElementById('quiz-form');
  const inputs = form.querySelectorAll('input[type="radio"]');

  function checkCompletion() {
    const answered = new Set();
    inputs.forEach(i => {
      if (i.checked) answered.add(i.name);
    });
    submitBtn.disabled = answered.size !== 5;
  }

  form.addEventListener('change', checkCompletion);

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
      window.location.href = 'resultat.html';
    }
  });
});
