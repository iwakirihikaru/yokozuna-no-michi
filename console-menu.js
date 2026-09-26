(() => {
  const show = id => { document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === id)); document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === id)); };
  document.querySelectorAll('[data-console]').forEach(b => b.onclick = () => {
    const to = b.dataset.console;
    if (to === 'scout') return document.querySelector('#scoutButton').click();
    if (to === 'profile') { show('stable'); return document.querySelector('#openProfile').click(); }
    if (to === 'facility') { show('stable'); document.querySelector('.dojo-command').scrollIntoView({behavior:'smooth',block:'center'}); return; }
    show(to);
  });
})();
