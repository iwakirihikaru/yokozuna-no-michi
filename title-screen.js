(() => {
  const title=document.querySelector('#titleScreen');
  const enter=()=>{
    /* 全画面APIの完了を待つと、Android版Braveで背景だけ残る場合がある。 */
    title.classList.add('hidden');
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
  };
  const newGame=()=>{
    localStorage.removeItem('yokozuna-save-v1');
    enter();
  };
  const bindTap=(node,action)=>{
    node.addEventListener('pointerup',event=>{ event.preventDefault(); action(); });
    node.addEventListener('click',action);
  };
  bindTap(document.querySelector('#newGame'),newGame);
  bindTap(document.querySelector('#continueGame'),enter);
})();
