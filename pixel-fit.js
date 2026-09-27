(() => {
  const game=document.querySelector('#pixelGame'),shell=document.querySelector('.game-shell');
 function fit(){
   const portrait=window.innerHeight>window.innerWidth;
   if(portrait){
     shell.style.width='100vw';shell.style.height='100dvh';
     game.style.setProperty('width','100vw','important');
     game.style.setProperty('height','100dvh','important');
     game.style.transform='none';
     return;
   }
   const virtualWidth=1280,scale=Math.min(1,(window.innerWidth-8)/(virtualWidth+32),(window.innerHeight-8)/744);
   shell.style.width=`${(virtualWidth+32)*scale}px`;shell.style.height=`${744*scale}px`;game.style.setProperty('width',`${virtualWidth}px`,'important');game.style.setProperty('height','720px','important');game.style.transform=`scale(${scale})`;
 }
  addEventListener('resize',fit);fit();
})();
