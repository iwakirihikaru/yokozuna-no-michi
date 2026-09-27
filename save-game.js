(() => {
  const key='yokozuna-save-v1';
  try { const saved=localStorage.getItem(key); if(saved){const state=JSON.parse(saved);Object.keys(S).forEach(k=>{if(k in state)S[k]=state[k]});render();} } catch { localStorage.removeItem(key); }
  const persist=()=>{try{localStorage.setItem(key,JSON.stringify(S))}catch{}};
  addEventListener('beforeunload',persist);document.addEventListener('click',()=>setTimeout(persist,50));
})();
