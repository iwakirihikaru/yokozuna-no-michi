(() => {
  const quick = document.querySelector('#quickBout');
  quick.onclick = () => {
    if (S.day >= 15) return settle();
    const start = S.day + 1, end = Math.min(15, S.day + 5), summaries = [];
    for (; S.day < end; S.day++) {
      const now = S.day + 1;
      S.rikishi.forEach(r => {
        const late = now >= 11 && (r.w >= 7 || r.w === now - 1), danger = Math.max(0, 8 - r.w) > 15 - now;
        const ability = r.body * .32 + r.skill * .36 + r.mind * .32 * (late ? 1.2 : 1) + (r.mot - 50) * 3 - r.fatigue * 3 + ((r.id === 'arashi' || r.id === 'hakuryu') ? 14 : 0);
        const opponent = 590 + Math.random() * 210 + (late ? 35 : 0);
        if (ability + Math.random() * 165 * (danger ? 1.18 : 1) > opponent + Math.random() * 165) r.w++; else r.l++;
        r.fatigue += 7 + (S.training === 'power' ? 4 : 0);
      });
    }
    S.rikishi.forEach(r => summaries.push(`${r.name} ${r.w}勝${r.l}敗`));
    S.log.unshift(`<b>${start}〜${end}日目・テンポ進行</b>　${summaries.join('　')}`);
    const exhausted = S.rikishi.filter(r => r.fatigue >= 82); render();
    if (exhausted.length) modal('まとめ進行の代償', `${exhausted.map(r => r.name).join('・')}が限界に近い。次の一番は通常進行で状態を見極めよう。`, [['確認', () => {}]], 'CONDITION ALERT');
  };
})();
