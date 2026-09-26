(() => {
  const title=document.querySelector('#titleScreen');
  const enter=async()=>{
    try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch (_) { /* ブラウザが許可しない場合も通常表示で続行 */ }
    title.classList.add('hidden');
  };
  document.querySelector('#newGame').addEventListener('click',()=>{
    localStorage.removeItem('yokozuna-save-v1');
    enter();
  });
  document.querySelector('#continueGame').addEventListener('click',enter);
})();
