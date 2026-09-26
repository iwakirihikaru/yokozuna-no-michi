(() => {
  const mini=(name,color,kind)=>`<div class="mini-rikishi ${kind}" style="--mawashi:${color}"><i class="hair"></i><i class="head"></i><i class="arm a1"></i><i class="arm a2"></i><i class="torso"></i><i class="leg l1"></i><i class="leg l2"></i><b>${name}</b></div>`;
  function paint(){const dojo=document.querySelector('.dojo-scene');if(!dojo||dojo.querySelector('.retro-team'))return;dojo.insertAdjacentHTML('beforeend',`<div class="retro-team">${mini('嵐山','#2866a5','shiko')}${mini('白龍','#b8463f','push p1')}${mini('岩尾','#518044','push p2')}${mini('蒼天','#815bb4','watch')}</div>`);}
  setInterval(paint,300);document.addEventListener('click',()=>setTimeout(paint,0));
})();
