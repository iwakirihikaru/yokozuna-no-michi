(() => {
  const names = { kitchen: 'ちゃんこ場', dojo: '稽古場', clinic: '医務室' };
  const effects = { kitchen: '体重・回復が上昇。ただし膝と腰への負担も増える。', dojo: '心技体の成長が上昇。信頼の低い弟子は反発する。', clinic: '疲労と怪我を軽減。毎月の維持費がかかる。' };
  const draw = () => {
    const map = document.querySelector('#stableMap'); if (!map) return;
    const active = type => S.facilities.includes(type) ? ' built' : ' locked';
    const workers = S.rikishi.slice(0, 4).map((r, i) => `<i class="map-rikishi r${i}" title="${r.name}" style="--sprite:${r.color}"><b>${r.name}</b></i>`).join('');
    map.innerHTML = `<button class="map-room dojo${active('dojo')}" data-room="dojo"><span>稽古場</span><small>${S.facilities.includes('dojo') ? '稽古中！' : '改装予定地'}</small>${workers}</button><button class="map-room kitchen${active('kitchen')}" data-room="kitchen"><span>ちゃんこ場</span><small>${S.facilities.includes('kitchen') ? '湯気が立つ' : '標準設備'}</small><i class="pot">♨</i></button><button class="map-room clinic${active('clinic')}" data-room="clinic"><span>医務室</span><small>${S.facilities.includes('clinic') ? '診療中' : '空き部屋'}</small><i class="cross">+</i></button><div class="map-gate">春風部屋<br><small>玄関</small></div><div class="map-tree t1">●</div><div class="map-tree t2">●</div>`;
    map.querySelectorAll('[data-room]').forEach(button => button.onclick = () => { const type = button.dataset.room; document.querySelector('#mapHint').textContent = `${names[type]}：${effects[type]}`; });
  };
  draw();
  document.addEventListener('click', () => setTimeout(draw, 0));
})();
