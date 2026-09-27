(() => {
  const $ = s => document.querySelector(s);
  const fmt = n => '¥' + n.toLocaleString('ja-JP');
  const days = ['月','火','水','木','金','土','日'];
  const plans = ['四股','ぶつかり','休養','技術'];
  const get = () => {
    const z = S.pennant || (S.pennant = { prep:1, phase:'prep', schedule:['四股','ぶつかり','休養','技術','四股','ぶつかり','休養'], news:[] });
    z.fac ??= { dojo:1, chanko:1, bath:0, gym:0 };
    z.trust ??= 52; z.mood ??= 68;
    return z;
  };
  const man = () => S.rikishi[0];
  const bg = () => '<img class="scene-bg" src="assets/stable-living-v1.png" aria-hidden="true">';
  function header(){ const z=get(); return `<div class="mg-top"><b>${S.year}年 一月 ${z.prep}週</b><span>本場所まで あと <strong>${Math.max(0,13-z.prep)}日</strong></span><i>所持金　${fmt(S.money)}</i><i>部屋の評判　${S.rep}</i><i>雰囲気　${z.mood}</i></div>`; }
  function facility(){
    const z=get(), list=[['dojo','土俵','立ち合い・基礎稽古の効果アップ',300000,'◯'],['chanko','ちゃんこ場','体力・スタミナの回復アップ',300000,'♨'],['bath','浴場','疲労回復の効果アップ',300000,'♨'],['gym','トレーニング設備','筋力・技術の成長アップ',500000,'✦']];
    return `<section class="pg-scene mg-scene">${bg()}${header()}<aside class="mg-side"><b>⌂ 施設・部屋経営</b><button class="on">⌂ 施設</button><button data-mg="schedule">▣ スケジュール</button><button data-mg="event">♟ 出来事</button><button data-mg="record">★ 成績・番付</button></aside><main class="mg-main"><h2>施設・部屋経営</h2><p>施設を強化して、育成環境を整えよう。</p><nav><button class="on">施設</button><button>資金</button><button>部屋の伝統</button></nav><div class="mg-facilities">${list.map(v=>`<article><div class="mg-fac-icon">${v[4]}</div><div><h3>${v[1]} <small>Lv.${z.fac[v[0]]}</small></h3><b>${v[2]}</b><p>部屋の成長を支える大切な設備。強化するほど効果が高まる。</p></div><button data-up="${v[0]}">強化する<br><strong>${fmt(v[3]*(z.fac[v[0]]+1))}</strong></button></article>`).join('')}</div></main></section>`;
  }
  function schedule(){
    const z=get();
    return `<section class="pg-scene mg-scene mg-schedule">${bg()}${header()}<main class="mg-main wide"><h2>今週の予定</h2><p>1週間の予定を組み、力士の成長を図りましょう。気になる日だけ変更できます。</p><div class="mg-week">${z.schedule.map((v,i)=>`<button data-day="${i}" class="${i===0?'today':''}"><b>${days[i]}</b><i>${v==='四股'?'♨':v==='ぶつかり'?'✦':v==='技術'?'◇':'☾'}</i><strong>${v}</strong><small>${v==='四股'?'足腰を鍛える':v==='ぶつかり'?'立合いを磨く':v==='技術'?'技を学ぶ':'疲労を抜く'}</small></button>`).join('')}</div><div class="mg-advance"><button data-go="1">▶ 1日進める<small>今日の予定を実行</small></button><button data-go="3">▶▶ 3日進める<small>3日分まとめて実行</small></button><button data-go="7">▶▶▶ 1週間進める<small>今週を一気に進める</small></button></div></main></section>`;
  }
  function recruit(){
    const z=get();
    z.candidates ??= [
      {name:'相原 大輝',from:'青森県',height:'182cm',weight:'98kg',trait:'真面目',appetite:'S',move:'A',body:'S',guts:'B',food:'S',note:'まっすぐで努力家な青年。基礎がしっかりしており、将来のエース候補として期待できる。'},
      {name:'中川 翔太',from:'大阪府',height:'170cm',weight:'112kg',trait:'負けず嫌い',appetite:'A',move:'B',body:'A',guts:'A',food:'A',note:'明るく元気で負けず嫌い。稽古量を重ねれば大きく化ける可能性を秘めている。'},
      {name:'山本 龍成',from:'鹿児島県',height:'175cm',weight:'90kg',trait:'おっとり',appetite:'B',move:'A',body:'B',guts:'B',food:'B',note:'穏やかで素直な性格。粘り強さと技のセンスがあり、鍛えれば上位を狙える。'}
    ];
    return `<section class="pg-scene mg-scene mg-recruit">${bg()}${header()}<main class="recruit-main"><h2>新弟子スカウト</h2><p>有望な若者を見つけて、部屋に迎え入れよう。素材や性格を見極め、将来の力士を育てよう。</p><button class="recruit-refresh" data-refresh="1">⌕ 候補者の更新<br><small>今週あと1回</small></button><div class="recruit-list">${z.candidates.map((c,i)=>`<article><i class="candidate-face f${i}"></i><div class="candidate-name"><b>${c.name}</b><small>出身　${c.from}<br>身長　${c.height}　体重　${c.weight}</small></div><div class="candidate-trait">😊 性格　<b>${c.trait}</b><br>🍚 食欲　<b>${c.appetite}</b></div><div class="candidate-skill">素質<br>💪 運動能力 <b>${c.move} ★★★★☆</b><br>♟ 体格 <b>${c.body} ★★★★★</b><br>🔥 根性 <b>${c.guts} ★★★☆☆</b><br>🍚 食欲 <b>${c.food} ★★★★☆</b></div><p>${c.note}</p><button data-sign="${i}">${z.reserved===i?'入門予約済':'入門予約'}</button></article>`).join('')}</div><footer>親方メモ：部屋の評判と資金を踏まえて、慎重に選ぶのじゃ。</footer></main></section>`;
  }
  function event(){ const x=man(); return `<section class="pg-scene mg-scene mg-event">${bg()}${header()}<main class="event-card"><h2>出来事</h2><div class="event-people"><i>親方</i><b>${x.name}</b></div><p>親方…！ もっと強くなりたいんです！<br>ぶつかり稽古を、もう少し増やせませんか？</p><aside>この選択の主な効果<br>😊 やる気　↑<br>😣 疲労　↑<br>🤝 信頼度　↑</aside><div><button data-choice="push"><b>増やしてやる</b><small>成長を優先する</small></button><button data-choice="adjust"><b>今は調整だ</b><small>次の場所へ備える</small></button><button data-choice="watch"><b>様子を見る</b><small>変化を確認する</small></button></div></main></section>`; }
  function draw(markup){
    $('#pgViewport').innerHTML=markup;
    $('#pgMoney').textContent=fmt(S.money); $('#pgRep').textContent=S.rep;
    $('#pgPrimary').textContent='メニューへ';
    $('#pgDialogue').textContent=get().news[0] || '春風部屋を切り盛りしよう。';
    bind();
  }
  function advance(n){
    const z=get(), x=man();
    for(let i=0;i<n;i++){
      const v=z.schedule[i%7];
      if(v==='四股'){x.body+=2;x.fatigue+=3;}
      if(v==='ぶつかり'){x.body+=4;x.skill+=1;x.fatigue+=7;x.mot=Math.max(0,x.mot-1);}
      if(v==='技術'){x.skill+=4;x.fatigue+=4;}
      if(v==='休養'){x.fatigue=Math.max(0,x.fatigue-10);x.mot=Math.min(100,x.mot+4);}
      z.prep++;
    }
    z.mood=Math.max(20,Math.min(100,70-x.fatigue/2+x.mot/3));
    z.news.unshift(`${n}日分の稽古を実行。${x.name}の疲労は${x.fatigue}。`);
    if(x.fatigue>38 || z.prep===5) draw(event());
    else if(z.prep>13){z.phase='basho';document.querySelector('[data-pg-view="basho"]')?.click();}
    else draw(schedule());
  }
  function route(v){
    if(v==='schedule') draw(schedule());
    else if(v==='event') draw(event());
    else if(v==='record') document.querySelector('[data-pg-view="history"]')?.click();
    else if(v==='recruit') draw(recruit());
    else draw(facility());
  }
  function bind(){
    document.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{
      const z=get(), k=b.dataset.up, base={dojo:300000,chanko:300000,bath:300000,gym:500000}[k], cost=base*(z.fac[k]+1);
      if(S.money<cost) z.news.unshift('資金が足りない。場所で結果を出し、後援会の期待に応えよう。');
      else {S.money-=cost;z.fac[k]++;if(k==='dojo'){man().caps.body+=15;man().caps.skill+=15;}if(k==='chanko')man().fatigue=Math.max(0,man().fatigue-8);if(k==='bath')man().fatigue=Math.max(0,man().fatigue-12);z.news.unshift(`${b.parentElement.querySelector('h3').textContent}を強化した。`);}
      draw(facility());
    });
    document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{const z=get(),i=+b.dataset.day;z.schedule[i]=plans[(plans.indexOf(z.schedule[i])+1)%plans.length];draw(schedule());});
    document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>advance(+b.dataset.go));
    document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{
      const z=get(),x=man();
      if(b.dataset.choice==='push'){x.body+=4;x.fatigue+=8;x.mot+=6;z.trust+=6;z.news.unshift(`${x.name}の願いを聞き入れた。気迫がみなぎっている。`);}
      if(b.dataset.choice==='adjust'){x.fatigue=Math.max(0,x.fatigue-6);z.trust+=2;z.news.unshift('親方は、次の場所を見据えて調整を選んだ。');}
      if(b.dataset.choice==='watch')z.news.unshift('親方は静かに見守った。');
      draw(schedule());
    });
    document.querySelectorAll('[data-sign]').forEach(b=>b.onclick=()=>{const z=get(),i=+b.dataset.sign,c=z.candidates[i];z.reserved=i;z.news.unshift(`${c.name}と面談した。将来、春風部屋へ迎える約束を交わした。`);draw(recruit());});
    document.querySelectorAll('[data-refresh]').forEach(b=>b.onclick=()=>{const z=get();z.candidates.reverse();z.news.unshift('スカウト網から、新しい候補情報が届いた。');draw(recruit());});
    document.querySelectorAll('[data-mg]').forEach(b=>b.onclick=()=>route(b.dataset.mg));
  }
  document.querySelector('[data-pg-view="facility"]').onclick=()=>route('facility');
  document.querySelector('[data-pg-view="scout"]').onclick=()=>route('schedule');
  window.openRecruit=()=>route('recruit');
  $('#pgPrimary').onclick=()=>document.querySelector('[data-pg-view="dojo"]')?.click();
})();
