(() => {
  const title=document.querySelector('#titleScreen');
  const enter=()=>{
    /* 全画面APIの完了を待つと、Android版Braveで背景だけ残る場合がある。 */
    title.classList.add('hidden');
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
  };
  document.querySelector('#newGame').addEventListener('click',()=>{
    localStorage.removeItem('yokozuna-save-v1');
    enter();
  });
  document.querySelector('#continueGame').addEventListener('click',enter);
})();
