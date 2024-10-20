function selectDifficulty(difficulty) {
  window.location.href = `game.html?difficulty=${difficulty}`;
};


document.querySelectorAll('.difficulty-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('easy')) {
      selectDifficulty('easy');
    }
    else if (button.classList.contains('medium')) {
      selectDifficulty('medium');
    }
    else if (button.classList.contains('hard')) {
      selectDifficulty('hard');
    }

  })
});