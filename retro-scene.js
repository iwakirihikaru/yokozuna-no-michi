(() => {
 const mini=(name,color,kind,variant)=>`<div class="mini-rikishi ${kind} v${variant}" style="--mawashi:${color}"><i class="hair"></i><i class="head"></i><i class="arm a1"></i><i class="arm a2"></i><i class="torso"></i><i class="leg l1"></i><i class="leg l2"></i><b>${name}</b></div>`;
 function paint(){const dojo=document.querySelector('.dojo-scene');if(!dojo||dojo.querySelector('.retro-team'))return;const v=(id,fallback)=>S.rikishi.find(r=>r.id===id)?.avatar?.variant??fallback;dojo.insertAdjacentHTML('beforeend',`<div class="retro-team">${mini('嵐山','#2866a5','shiko',v('arashi',0))}${mini('白龍','#b8463f','push p1',v('hakuryu',1))}${mini('岩尾','#518044','push p2',v('iwao',2))}${mini('蒼天','#815bb4','watch',v('sora',3))}</div>`);}
  setInterval(paint,300);document.addEventListener('click',()=>setTimeout(paint,0));
})();
