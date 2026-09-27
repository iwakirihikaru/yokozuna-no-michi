(() => {
  S.loop = { active: false, policy: 'balanced' };
  const tab = id => { document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === id)); document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === id)); };
  const policy = {
    balanced: { title: '基礎を固める', copy: '全員を穏やかに伸ばす。大勝ちは狙いにくいが、部屋を壊しにくい。' },
    power: { title: '関取を取りに行く', copy: '成長と気迫を優先する猛稽古。怪我と不満を覚悟する。' },
    recovery: { title: '立て直しを優先', copy: '疲労を抜いて次の飛躍を待つ。今場所の上積みは小さい。' }
  };
  function updateButtons() {
    const started = S.loop.active;
    document.querySelector('#advanceMonth').innerHTML = started ? '本場所の最中です' : '場所前ミーティング <span>›</span>';
    document.querySelector('#advanceMonth').disabled = started;
    document.querySelector('#nextBout').textContent = S.day >= 15 ? '千秋楽を締める' : '一日ずつ見る';
    document.querySelector('#quickBout').textContent = S.day >= 15 ? '場所結果を見る' : '▶ 5日まとめて進行';
  }
  function meeting() {
    if (S.loop.active) return;
    modal('場所前ミーティング', '今場所、部屋は何を優先するか。選ばなかったものには、必ず代償がある。', Object.entries(policy).map(([key, p]) => [p.title, () => {
      chooseFocus(key, p);
    }]), 'PRE-BASHO MEETING');
  }
  function chooseFocus(key, p) {
      const r=S.rikishi.find(x=>x.id===S.selected)||S.rikishi[0];
      S.loop = { active: true, policy: key, focusId: r.id }; S.training = key;
      S.rikishi.forEach(x => { const growth = key === 'power' ? 11 : key === 'recovery' ? 2 : 6; x.body += growth + (x.id === r.id ? 7 : 0); x.skill += growth + (x.id === r.id ? 7 : 0); x.mot = Math.max(0, Math.min(100, x.mot + (x.id === r.id ? 7 : -1))); x.fatigue = Math.max(0, x.fatigue + (key === 'power' ? 10 : key === 'recovery' ? -10 : 2)); if (key === 'power' && x.trust < 50) x.mot = Math.max(0, x.mot - 7); });
      S.history.unshift([`${document.querySelector('#month').textContent} 場所前`, `方針は「${p.title}」。重点指導は${r.name}。`]); tab('tournament'); render(); updateButtons();
  }
  function resolve(days) {
    if (!S.loop.active) return meeting();
    if (S.day >= 15) return closeBasho();
    const from = S.day + 1, to = Math.min(15, S.day + days), notes = [];
    while (S.day < to) {
      S.day++;
      const late = S.day >= 11;
      S.rikishi.forEach(r => {
        const needed = Math.max(0, 8 - r.w), cliff = needed > 15 - S.day;
        const special = late && (r.w >= 7 || r.w === S.day - 1);
        const power = r.body * .36 + r.skill * .36 + r.mind * .28 * (special ? 1.25 : 1) + (r.mot - 50) * 2.2 - r.fatigue * 2.4 + (r.id === S.loop.focusId ? 34 : 0) + ((r.id === 'arashi' || r.id === 'hakuryu') ? 14 : 0);
        /* 初期力士でも五分、重点指導と稽古で勝ち越しを狙える基準値。 */
        const foe = 500 + Math.random() * 145 + (late ? 18 : 0);
        if (power + Math.random() * 105 * (cliff ? 1.15 : 1) > foe + Math.random() * 105) r.w++; else r.l++;
        r.fatigue += 6 + (S.loop.policy === 'power' ? 3 : 0) + (r.id === S.loop.focusId ? 1 : 0);
      });
    }
    S.rikishi.forEach(r => notes.push(`${r.name} ${r.w}勝${r.l}敗`));
    S.log.unshift(`<b>${from}〜${to}日目</b>　${notes.join('　')}`);
    render(); updateButtons();
    const hurt = S.rikishi.find(r => r.fatigue > 78 && r.w >= 6);
    if (hurt) return decision(hurt);
    const cliff = S.rikishi.find(r => Math.max(0, 8 - r.w) >= 15 - S.day && S.day >= 10);
    if (cliff) modal('崖っぷちの星勘定', `${cliff.name}は${cliff.w}勝${cliff.l}敗。残り${15 - S.day}日、勝ち越しには後がない。`, [['気持ちを託す', () => { cliff.mind += 10; }]], 'CLUTCH MOMENT');
  }
  function decision(r) {
    modal('休場か、強行か', `${r.name}は勝ち越し圏だが、疲労は${r.fatigue}。今場所を取るか、力士の未来を取るか。`, [
      ['休場させる', () => { r.l += Math.min(2, 15 - S.day); r.fatigue = Math.max(0, r.fatigue - 30); r.trust += 8; S.log.unshift(`<b>親方判断</b>　${r.name}を休場させた。`); render(); }],
      ['強行させる', () => { r.mind += 12; r.fatigue += 13; r.trust = Math.max(0, r.trust - 5); S.log.unshift(`<b>親方判断</b>　${r.name}は痛みを抱え、土俵へ向かう。`); render(); }]
    ], 'CRITICAL DECISION');
  }
  function closeBasho() {
    const result = [];
    S.rikishi.forEach(r => {
      if (r.w >= 10) { r.rank = '十両昇進圏'; S.money += 300000; S.rep += 5; result.push(`${r.name}が${r.w}勝で関取へ前進`); }
      else if (r.w >= 8) { result.push(`${r.name}が勝ち越し`); r.mot = Math.min(100, r.mot + 6); }
      else if (r.w <= 5) { result.push(`${r.name}は負け越し`); r.mot = Math.max(0, r.mot - 10); }
      r.fatigue = Math.max(0, r.fatigue - 22); r.w = 0; r.l = 0;
    });
    S.loop.active = false; S.day = 0; S.log = []; S.practiceDay = 1; S.practiceCount = 0; S.month++; if (S.month > 6) { S.month = 1; S.year++; }
    S.support ??= 28; S.food ??= 64; S.staff ??= 1;
    const foodUse = S.rikishi.length * 6;
    S.food = Math.max(0, S.food - foodUse);
    if (S.food < 20) S.rikishi.forEach(r=>r.mot=Math.max(0,r.mot-5));
    const costs = 165000 + S.staff * 45000 + (S.facilities.includes('clinic') ? 90000 : 0);
    const income = 70000 + S.rep * 1500 + S.support * 9000;
    S.money += income - costs;
    S.history.unshift(['千秋楽・番付発表', `${result.join('。')}。後援会${S.support}、食材残${S.food}。場所後の収支は${fmt(income - costs)}。`]);
    render(); updateButtons();
    modal('場所を終えて', result.join('。') + '。\n次の場所へ向け、また親方の判断が始まる。', [['部屋へ戻る', () => tab('stable')]], 'BASHO RESULT');
  }
  document.querySelector('#advanceMonth').onclick = meeting;
  document.querySelector('#nextBout').onclick = () => resolve(1);
  document.querySelector('#quickBout').onclick = () => resolve(5);
  document.addEventListener('click', () => setTimeout(updateButtons, 0));
  updateButtons();
})();
