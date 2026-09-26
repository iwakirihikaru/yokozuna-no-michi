(() => {
  const game=document.querySelector('#pixelGame'),shell=document.querySelector('.game-shell');
  function fit(){const portrait=window.innerHeight>window.innerWidth,virtualWidth=portrait?960:1280,scale=Math.min(1,(window.innerWidth-8)/(virtualWidth+32));shell.style.width=`${(virtualWidth+32)*scale}px`;shell.style.height=`${744*scale}px`;game.style.setProperty('width',`${virtualWidth}px`,'important');game.style.transform=`scale(${scale})`;}
  addEventListener('resize',fit);fit();
})();
