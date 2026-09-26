(() => {
  const sync = () => {
    const training = S.training || 'balanced';
    document.querySelectorAll('[data-dojo-train]').forEach(b => b.classList.toggle('on', b.dataset.dojoTrain === training));
    ['kitchen','dojo','clinic'].forEach(type => { const el = document.querySelector(`#${type}Level`); if (el) el.textContent = type === 'dojo' ? (S.facilities.includes(type) ? 2 : 1) : (S.facilities.includes(type) ? 1 : 0); });
  };
  document.querySelectorAll('[data-dojo-train]').forEach(b => b.onclick = () => { const source = document.querySelector(`[data-train="${b.dataset.dojoTrain}"]`); source?.click(); sync(); });
  document.querySelectorAll('[data-dojo-facility]').forEach(b => b.onclick = () => { const source = document.querySelector(`[data-facility="${b.dataset.dojoFacility}"]`); source?.click(); setTimeout(sync, 0); });
  document.addEventListener('click', () => setTimeout(sync, 0)); sync();
})();
