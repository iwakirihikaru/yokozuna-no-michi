(() => {
  document.querySelector('.pg-dialogue').insertAdjacentHTML('afterend','<nav class="pg-mobile-actions"><button id="mobileAdvance">進行</button><button id="mobileProfile">力士</button><button id="mobileBasho">本場所</button></nav>');
  document.querySelector('#mobileAdvance').onclick=()=>document.querySelector('#pgPrimary').click();
  document.querySelector('#mobileProfile').onclick=()=>document.querySelector('[data-pg-view="profile"]').click();
  document.querySelector('#mobileBasho').onclick=()=>document.querySelector('[data-pg-view="basho"]').click();
})();
