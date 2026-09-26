(() => {
  function mark() {
    document.querySelectorAll('[data-select]').forEach(card => card.classList.toggle('focus-target', !!S.loop?.focusId && card.dataset.select === S.loop.focusId));
  }
  document.addEventListener('click', () => setTimeout(mark, 0));
  mark();
})();
