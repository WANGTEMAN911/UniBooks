/* ================= storage ================= */
// Saqlash qatlami: faqat localStorage. Kalit: "YYYY-MM-DD" -> {text, mood, score, updatedAt}
window.Diary = window.Diary || {};

Diary.dateKey = (d = new Date()) => {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

Diary.Storage = (() => {
  const KEY = 'aiDiary.entries.v1';
  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }            // buzilgan JSON bo'lsa bo'sh ob'ekt
  };
  const write = data => localStorage.setItem(KEY, JSON.stringify(data));
  return {
    all: read,
    get: date => read()[date] || null,
    save(date, entry) { const d = read(); d[date] = entry; write(d); },
    remove(date) { const d = read(); delete d[date]; write(d); }
  };
})();

/* ================= sentiment ================= */
// Lug'atga asoslangan kayfiyat tahlili (o'zbek lotin + inglizcha). Server yoki API kerak emas.
window.Diary = window.Diary || {};

Diary.Moods = {
  positive: { label: 'Xursand', emoji: '😊', color: '#7bd3a4' },
  negative: { label: 'Xafa', emoji: '😔', color: '#ee8f8f' },
  neutral: { label: 'Neytral', emoji: '😐', color: '#9db0d8' }
};

Diary.Sentiment = (() => {
  // So'z o'zaklari (prefix). Qiymat: +ijobiy / -salbiy, kuchi 1..2
  const LEX = {
    // ijobiy
    'xursand': 2, 'quvon': 2, 'quvnoq': 2, 'yaxshi': 1, 'ajoyib': 2, 'zo\'r': 2, 'a\'lo': 2, 'baxtli': 2, 'baxt': 1,
    'sevin': 2, 'muvaffaqiyat': 2, 'g\'alaba': 2, 'rohat': 1, 'tinch': 1, 'maroqli': 2, 'chiroyli': 1, 'mamnun': 2,
    'ilhom': 2, 'umid': 1, 'sog\'lom': 1, 'kuchli': 1, 'rahmat': 1, 'mehr': 1, 'yoqimli': 1, 'yoqdi': 1, 'bayram': 1,
    'kul': 1, 'tabassum': 1, 'foydali': 1, 'omad': 1, 'faxrl': 2, 'hayajon': 1, 'orom': 1,
    'happy': 2, 'great': 2, 'good': 1, 'love': 2, 'excellent': 2, 'joy': 2, 'wonderful': 2, 'calm': 1, 'proud': 2,
    // salbiy
    'xafa': -2, 'yomon': -2, 'g\'am': -2, 'qayg\'u': -2, 'afsus': -1, 'charch': -1, 'jahl': -2, 'achin': -1, 'og\'ir': -1,
    'qo\'rq': -2, 'xavotir': -2, 'yolg\'iz': -2, 'dard': -1, 'kasal': -1, 'muammo': -1, 'stress': -2, 'hafsala': -2,
    'yig\'l': -2, 'baxtsiz': -2, 'tashvish': -2, 'ranj': -2, 'alam': -1, 'nafrat': -2, 'mag\'lub': -2, 'ezil': -2,
    'siqil': -1, 'zerik': -1, 'xato': -1, 'muvaffaqiyatsiz': -2, 'battar': -2, 'iztirob': -2, 'umidsiz': -2,
    'sad': -2, 'bad': -2, 'angry': -2, 'hate': -2, 'terrible': -2, 'tired': -1, 'lonely': -2, 'anxious': -2
  };
  const NEGATORS = new Set(['emas', 'yo\'q', 'not', 'no', 'never', 'hech']);

  const normalize = s => s.toLowerCase().replace(/[’ʻʼ‘`´]/g, '\'');
  const tokenize = s => normalize(s).match(/[a-z\u0400-\u04ff']+/g) || [];

  // Eng uzun mos keluvchi o'zakni topadi ("baxtsiz" > "baxt")
  function weightOf(token) {
    let best = null;
    for (const stem in LEX) {
      if (token.startsWith(stem) && (!best || stem.length > best.length)) best = stem;
    }
    return best ? LEX[best] : 0;
  }

  function analyze(text) {
    const tokens = tokenize(text);
    let score = 0, hits = 0;
    tokens.forEach((tok, i) => {
      let w = weightOf(tok);
      if (!w) return;
      // Inkor: "yaxshi emas", "not good" -> ishora teskari
      const near = tokens.slice(Math.max(0, i - 2), i).concat(tokens.slice(i + 1, i + 3));
      if (near.some(t => NEGATORS.has(t))) w = -w;
      score += w; hits++;
    });
    let mood = 'neutral';
    if (score >= 1) mood = 'positive';
    else if (score <= -1) mood = 'negative';
    return { mood, score, hits, words: tokens.length };
  }

  return { analyze };
})();

/* ================= calendar ================= */
// Oylik taqvim: har kunda kayfiyat rangli nuqtasi
window.Diary = window.Diary || {};

Diary.Calendar = (() => {
  const MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
  const DOW = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  function render({ grid, title, year, month, entries, selected, onSelect }) {
    title.textContent = `${MONTHS[month]} ${year}`;
    grid.innerHTML = '';
    DOW.forEach(d => grid.insertAdjacentHTML('beforeend', `<div class="dow">${d}</div>`));

    const offset = (new Date(year, month, 1).getDay() + 6) % 7;   // hafta dushanbadan boshlanadi
    const days = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < offset; i++) grid.appendChild(document.createElement('div'));

    const today = Diary.dateKey();
    for (let d = 1; d <= days; d++) {
      const key = Diary.dateKey(new Date(year, month, d));
      const btn = document.createElement('button');
      btn.className = 'day' + (key === today ? ' today' : '') + (key === selected ? ' sel' : '');
      btn.textContent = d;
      if (entries[key]) btn.insertAdjacentHTML('beforeend', `<span class="dot" data-mood="${entries[key].mood}"></span>`);
      btn.addEventListener('click', () => onSelect(key));
      grid.appendChild(btn);
    }
  }
  return { render, MONTHS };
})();

/* ================= charts ================= */
// Chart.js: tanlangan davrda har bir kayfiyat necha kun bo'lgani
window.Diary = window.Diary || {};

Diary.Charts = (() => {
  let chart = null;

  function counts(entries, range) {
    const c = { positive: 0, negative: 0, neutral: 0 };
    const now = new Date();
    for (let i = 0; i < range; i++) {
      const e = entries[Diary.dateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i))];
      if (e) c[e.mood]++;
    }
    return c;
  }

  function render(canvas, entries, range) {
    const c = counts(entries, range);
    const keys = ['positive', 'neutral', 'negative'];
    const data = {
      labels: keys.map(k => Diary.Moods[k].label),
      datasets: [{
        data: keys.map(k => c[k]),
        backgroundColor: keys.map(k => Diary.Moods[k].color),
        borderRadius: 8, maxBarThickness: 64
      }]
    };
    if (chart) { chart.data = data; chart.update(); return; }   // qayta chizmasdan yangilaydi (animatsiya bilan)
    Chart.defaults.color = '#8b91a8';
    chart = new Chart(canvas, {
      type: 'bar', data,
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#262b3d' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
  return { render };
})();

/* ================= app ================= */
// Asosiy boshqaruv: holat, hodisalar, chizish
(() => {
  const $ = id => document.getElementById(id);
  const el = {
    editor: $('editor'), badge: $('moodBadge'), dateTitle: $('dateTitle'), toast: $('toast'),
    list: $('entryList'), grid: $('calGrid'), monthTitle: $('monthTitle'), chart: $('moodChart')
  };
  const now = new Date();
  const state = { selected: Diary.dateKey(), year: now.getFullYear(), month: now.getMonth(), range: 7 };

  const prettyDate = key => {
    const [y, m, d] = key.split('-').map(Number);
    return `${d} ${Diary.Calendar.MONTHS[m - 1].toLowerCase()} ${y}`;
  };
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function showMood(text) {
    if (!text.trim()) { el.badge.dataset.mood = 'none'; el.badge.textContent = 'Kayfiyat: —'; return null; }
    const r = Diary.Sentiment.analyze(text);
    const m = Diary.Moods[r.mood];
    el.badge.dataset.mood = r.mood;
    el.badge.textContent = `${m.emoji} ${m.label}`;
    return r;
  }

  function renderList(entries) {
    const keys = Object.keys(entries).sort().reverse();
    el.list.innerHTML = keys.length ? '' : '<li class="empty">Hozircha yozuv yo‘q.</li>';
    keys.forEach(k => {
      const li = document.createElement('li');
      li.innerHTML = `<button><span class="d">${prettyDate(k)}</span><span class="t">${Diary.Moods[entries[k].mood].emoji} ${esc(entries[k].text.slice(0, 60))}</span></button>`;
      li.firstChild.addEventListener('click', () => select(k));
      el.list.appendChild(li);
    });
  }

  function refresh() {
    const entries = Diary.Storage.all();
    Diary.Calendar.render({
      grid: el.grid, title: el.monthTitle, year: state.year, month: state.month,
      entries, selected: state.selected, onSelect: select
    });
    renderList(entries);
    Diary.Charts.render(el.chart, entries, state.range);
  }

  function select(key) {
    state.selected = key;
    const [y, m] = key.split('-').map(Number);
    state.year = y; state.month = m - 1;
    const entry = Diary.Storage.get(key);
    el.editor.value = entry ? entry.text : '';
    el.dateTitle.textContent = key === Diary.dateKey() ? `Bugun, ${prettyDate(key)}` : prettyDate(key);
    showMood(el.editor.value);
    refresh();
  }

  function toast(msg) {
    el.toast.textContent = msg; el.toast.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => el.toast.classList.remove('show'), 2000);
  }

  // Yozish paytida tahlil (debounce: har tugmada emas, 300ms to'xtagandan keyin)
  let timer;
  el.editor.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => showMood(el.editor.value), 300);
  });

  $('saveBtn').addEventListener('click', () => {
    const text = el.editor.value.trim();
    if (!text) { toast('Avval biror narsa yozing.'); return; }
    const r = Diary.Sentiment.analyze(text);
    Diary.Storage.save(state.selected, { text, mood: r.mood, score: r.score, updatedAt: Date.now() });
    showMood(text); refresh(); toast('Saqlandi');
  });

  $('deleteBtn').addEventListener('click', () => {
    if (!Diary.Storage.get(state.selected)) { toast('Bu kunda yozuv yo‘q.'); return; }
    if (!confirm('Bu kundagi yozuvni o‘chirasizmi?')) return;
    Diary.Storage.remove(state.selected);
    el.editor.value = ''; showMood(''); refresh(); toast('O‘chirildi');
  });

  const shiftMonth = n => {
    const d = new Date(state.year, state.month + n, 1);
    state.year = d.getFullYear(); state.month = d.getMonth(); refresh();
  };
  $('prevMonth').addEventListener('click', () => shiftMonth(-1));
  $('nextMonth').addEventListener('click', () => shiftMonth(1));

  document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.seg button').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); state.range = Number(b.dataset.range); refresh();
  }));

  select(state.selected);
})();

