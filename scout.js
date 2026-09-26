(() => {
  const candidates = [
    { name: '雷童', cost: 700000, body: 610, skill: 470, mind: 500, color: '#b17a39', note: '体格は一級品。粗削りだが、化ける可能性がある。' },
    { name: '海ノ花', cost: 420000, body: 480, skill: 590, mind: 540, color: '#3f7890', note: '小柄だが技が立つ。関取までの道は細い。' },
    { name: '常盤', cost: 180000, body: 530, skill: 510, mind: 440, color: '#7b5841', note: '素直な努力家。ただし潜在能力は未知数。' }
  ];
  document.querySelector('#scoutButton').onclick = () => {
    if (S.day) return modal('場所中の勧誘はできない', 'まずは土俵に集中する時期です。', [['戻る', () => {}]]);
    const c = candidates[Math.floor(Math.random() * candidates.length)];
    modal(`新弟子候補：${c.name}`, `${c.note}\n支度金 ${fmt(c.cost)}。今の部屋に、もう一人を抱える余裕はあるか。`, [
      ['見送る', () => { S.history.unshift(['スカウト', `${c.name}の入門を見送った。`]); render(); }],
      ['入門させる', () => {
        if (S.money < c.cost) return modal('資金不足', '支度金を用意できない。信用を落とした。', [['戻る', () => { S.rep = Math.max(0, S.rep - 2); render(); }]]);
        S.money -= c.cost;
        S.rikishi.push({ id: `r${Date.now()}`, name: c.name, rank: '序ノ口十五枚目', w: 0, l: 0, body: c.body, skill: c.skill, mind: c.mind, fatigue: 4, mot: 72, trust: 52, color: c.color, rival: null });
        S.rep += 1;
        S.history.unshift(['新弟子入門', `${c.name}が入門。部屋に新しい息吹と、重い責任が加わった。`]);
        render();
      }]
    ], 'SCOUT REPORT');
  };
})();
