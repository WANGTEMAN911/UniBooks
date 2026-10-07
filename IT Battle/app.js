/* ===== 1. SUPABASE ===== */
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Natijani yuborish: bir nik = bir qator, faqat rekord oshsa yangilanadi
async function submitScore({ username, avatar_id, tech_stack, score, streak }) {
  const { data: old } = await sb.from('leaderboard')
    .select('id, high_score, max_streak').eq('username', username).eq('tech_stack', tech_stack).maybeSingle();
  const row = {
    username, avatar_id, tech_stack,
    high_score: Math.max(score, old?.high_score ?? 0),
    max_streak: Math.max(streak, old?.max_streak ?? 0),
    updated_at: new Date().toISOString(),
  };
  const q = old ? sb.from('leaderboard').update(row).eq('id', old.id)
    : sb.from('leaderboard').insert(row);
  const { error } = await q;
  if (error) console.error('submitScore:', error.message);
}

// Top-100 (range: 'all' | 'week')
async function fetchTop(range = 'all') {
  let q = sb.from('leaderboard').select('*').order('high_score', { ascending: false }).limit(100);
  if (range === 'week') q = q.gte('updated_at', new Date(Date.now() - 7 * 864e5).toISOString());
  const { data, error } = await q;
  if (error) { console.error(error.message); return []; }
  return data;
}

// Foydalanuvchi foizi (Flex Card uchun): ballari sizdan past bo'lganlar ulushi
async function fetchPercentile(score, tech_stack) {
  const { count: total } = await sb.from('leaderboard').select('*', { count: 'exact', head: true }).eq('tech_stack', tech_stack);
  const { count: below } = await sb.from('leaderboard').select('*', { count: 'exact', head: true }).eq('tech_stack', tech_stack).lt('high_score', score);
  return total ? Math.max(1, Math.round(100 - (below / total) * 100)) : 1;
}

// Realtime: jadval o'zgarganda reytingni yangilash
let channel;
function subscribeLeaderboard(onChange) {
  channel = sb.channel('lb-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard' }, onChange)
    .subscribe();
}

/* ===== 2. MA'LUMOTLAR ===== */
const AVATARS = ['🦊', '🐺', '🤖', '👾', '🦉', '🐉', '🧙', '🥷'];
const TITLES = ['Junior Intern', 'Mid-level Wizard', 'Senior Architect', 'Bug Hunter', 'God Mode'];
const STACKS = ['Frontend', 'Backend', 'Mobile', 'QA', 'CyberSecurity'];

const QUESTIONS = {
  Frontend: [
    { q: 'CSS da qaysi xossa elementni flex konteynerga aylantiradi?', o: ['display: flex', 'position: flex', 'flex: container', 'float: flex'], a: 0 },
    { q: 'JS da `typeof null` nimani qaytaradi?', o: ['"null"', '"object"', '"undefined"', '"number"'], a: 1 },
    { q: 'React da holatni saqlash uchun qaysi hook?', o: ['useRef', 'useMemo', 'useState', 'useCallback'], a: 2 },
    { q: 'Qaysi tag semantik hisoblanadi?', o: ['<div>', '<span>', '<article>', '<b>'], a: 2 },
    { q: '`===` va `==` farqi nima?', o: ['Farqi yo\'q', '=== turni ham tekshiradi', '== qattiqroq', '=== faqat sonlar uchun'], a: 1 },
  ],
  Backend: [
    { q: 'HTTP da resursni yaratish uchun odatda qaysi metod?', o: ['GET', 'POST', 'HEAD', 'TRACE'], a: 1 },
    { q: 'SQL da takrorlanmas qiymatlarni tanlash?', o: ['UNIQUE SELECT', 'SELECT DISTINCT', 'SELECT ONLY', 'SELECT SINGLE'], a: 1 },
    { q: '404 status kodi nimani bildiradi?', o: ['Server xatosi', 'Ruxsat yo\'q', 'Topilmadi', 'Muvaffaqiyatli'], a: 2 },
    { q: 'REST da idempotent metod qaysi?', o: ['POST', 'PUT', 'PATCH (har doim)', 'CONNECT'], a: 1 },
    { q: 'Indeks asosan nimani tezlashtiradi?', o: ['INSERT', 'Qidiruv (SELECT)', 'Backup', 'DROP'], a: 1 },
  ],
  Mobile: [
    { q: 'Flutter qaysi tilda yoziladi?', o: ['Kotlin', 'Swift', 'Dart', 'Java'], a: 2 },
    { q: 'Android uchun rasmiy zamonaviy til?', o: ['Kotlin', 'Ruby', 'PHP', 'Go'], a: 0 },
    { q: 'React Native asosida qaysi til?', o: ['C#', 'JavaScript', 'Perl', 'Rust'], a: 1 },
    { q: 'iOS ilovalar do\'koni?', o: ['Play Market', 'App Store', 'AppGallery', 'F-Droid'], a: 1 },
    { q: 'APK nima?', o: ['iOS paketi', 'Android paketi', 'Web arxiv', 'Dizayn fayl'], a: 1 },
  ],
  QA: [
    { q: 'Regression testing maqsadi?', o: ['Yangi funksiya yozish', 'Eski funksiyalar buzilmaganini tekshirish', 'UI chizish', 'Deploy'], a: 1 },
    { q: 'Qaysi biri avtomatlashtirish vositasi?', o: ['Figma', 'Selenium', 'Notion', 'Trello'], a: 1 },
    { q: 'Bug lifecycle ning birinchi bosqichi?', o: ['Closed', 'New', 'Fixed', 'Verified'], a: 1 },
    { q: 'Black-box testda nima ma\'lum bo\'lmaydi?', o: ['Talablar', 'Ichki kod', 'Kirish', 'Chiqish'], a: 1 },
    { q: 'Smoke test nima?', o: ['Chuqur test', 'Tezkor asosiy tekshiruv', 'Yuklama testi', 'Xavfsizlik auditi'], a: 1 },
  ],
  CyberSecurity: [
    { q: 'SQL Injection dan himoya?', o: ['Parametrlangan so\'rov', 'Katta harflar', 'Cookie o\'chirish', 'Fayl siqish'], a: 0 },
    { q: 'XSS nimani nishonga oladi?', o: ['Brauzerdagi foydalanuvchini', 'Faqat routerni', 'BIOS ni', 'Printerni'], a: 0 },
    { q: 'HTTPS da "S" nimani anglatadi?', o: ['Speed', 'Secure', 'Server', 'Static'], a: 1 },
    { q: 'Ikki faktorli autentifikatsiya nima beradi?', o: ['Tezlik', 'Qo\'shimcha himoya qatlami', 'Kamroq parol', 'Reklama'], a: 1 },
    { q: 'Phishing nima?', o: ['Aldov orqali ma\'lumot o\'g\'irlash', 'Tarmoq kabeli', 'Antivirus', 'Shifrlash usuli'], a: 0 },
  ],
};

/* ===== 3. HOLAT ===== */
const TIME_LIMIT = 15000;
const state = {
  nick: '', avatar: AVATARS[0], title: TITLES[0], stack: STACKS[0],
  queue: [], i: 0, score: 0, streak: 0, maxStreak: 0, correct: 0, wrong: 0,
  locked: false, tick: null, deadline: 0,
};
const $ = (s) => document.querySelector(s);
const show = (id) => {
  document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
  if (id === 'leaderboard') renderLeaderboard('all');
};
document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => show(b.dataset.go)));

/* Welcome */
function pickable(hostId, items, key, render) {
  const host = $(hostId);
  host.innerHTML = '';
  items.forEach((v) => {
    const el = document.createElement('button');
    el.className = hostId === '#avatars' ? 'avatar' : 'chip';
    el.textContent = render ? render(v) : v;
    if (state[key] === v) el.classList.add('on');
    el.onclick = () => { state[key] = v; pickable(hostId, items, key, render); };
    host.appendChild(el);
  });
}
pickable('#avatars', AVATARS, 'avatar');
pickable('#titles', TITLES, 'title');
pickable('#stacks', STACKS, 'stack');

$('#startBtn').onclick = () => {
  const nick = $('#nick').value.trim();
  if (nick.length < 2) { $('#nick').classList.add('shake'); setTimeout(() => $('#nick').classList.remove('shake'), 500); return; }
  state.nick = nick;
  startGame();
};

/* Arena */
function startGame() {
  const pool = [...QUESTIONS[state.stack]].sort(() => Math.random() - 0.5);
  Object.assign(state, { queue: pool, i: 0, score: 0, streak: 0, maxStreak: 0, correct: 0, wrong: 0 });
  $('#qTotal').textContent = pool.length;
  show('arena');
  nextQuestion();
}

function nextQuestion() {
  if (state.i >= state.queue.length) return endGame();
  const q = state.queue[state.i];
  state.locked = false;
  $('#qNum').textContent = state.i + 1;
  $('#qText').textContent = q.q;
  $('#score').textContent = state.score;
  $('#streakBadge').classList.toggle('hidden', state.streak < 3);
  const box = $('#options');
  box.innerHTML = '';
  q.o.forEach((text, idx) => {
    const b = document.createElement('button');
    b.className = 'btn opt';
    b.textContent = text;
    b.onclick = () => answer(idx, b);
    box.appendChild(b);
  });
  startTimer();
}

function startTimer() {
  clearInterval(state.tick);
  state.deadline = Date.now() + TIME_LIMIT;
  const bar = $('#timerBar');
  bar.style.width = '100%';
  bar.classList.remove('low');
  state.tick = setInterval(() => {
    const left = Math.max(0, state.deadline - Date.now());
    bar.style.width = (left / TIME_LIMIT) * 100 + '%';
    bar.classList.toggle('low', left < 5000);
    if (left === 0) answer(-1, null);
  }, 100);
}

function answer(idx, btn) {
  if (state.locked) return;
  state.locked = true;
  clearInterval(state.tick);
  const q = state.queue[state.i];
  const ok = idx === q.a;
  const opts = [...$('#options').children];
  opts[q.a].classList.add('ok');
  if (ok) {
    state.correct++; state.streak++; state.maxStreak = Math.max(state.maxStreak, state.streak);
    const timeBonus = Math.ceil((state.deadline - Date.now()) / 1000);
    state.score += (100 + timeBonus * 5) * (state.streak >= 3 ? 2 : 1);
    beep(880);
  } else {
    state.wrong++; state.streak = 0;
    btn?.classList.add('bad');
    $('#app').classList.add('shake');
    document.body.classList.add('flash-bad');
    beep(180);
    setTimeout(() => { $('#app').classList.remove('shake'); document.body.classList.remove('flash-bad'); }, 450);
  }
  $('#score').textContent = state.score;
  $('#streakBadge').classList.toggle('hidden', state.streak < 3);
  setTimeout(() => { state.i++; nextQuestion(); }, 900);
}

// Oddiy ovoz effekti (WebAudio, fayl kerak emas)
function beep(freq) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = freq; o.type = 'square'; g.gain.value = 0.05;
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.12);
  } catch (_) { }
}

/* Game Over */
async function endGame() {
  clearInterval(state.tick);
  show('gameover');
  $('#finalScore').textContent = state.score;
  $('#stats').textContent = `✅ ${state.correct}  ❌ ${state.wrong}  🔥 Eng uzun streak: ${state.maxStreak}`;
  await submitScore({ username: state.nick, avatar_id: AVATARS.indexOf(state.avatar), tech_stack: state.stack, score: state.score, streak: state.maxStreak });
  const pct = await fetchPercentile(state.score, state.stack);
  const text = `Men IT Battle da ${state.stack} bo'yicha TOP-${pct}% dasturchilar qatoriga kirdim!`;
  $('#cardPreview').textContent = text;
  $('#fcAvatar').textContent = state.avatar;
  $('#fcNick').textContent = state.nick;
  $('#fcTitle').textContent = state.title;
  $('#fcText').textContent = text;
  $('#fcScore').textContent = state.score + ' XP';
}
$('#againBtn').onclick = () => show('welcome');

$('#dlBtn').onclick = async () => {
  const canvas = await html2canvas($('#flexCard'), { width: 1080, height: 1920, scale: 1, backgroundColor: '#090d16' });
  const a = document.createElement('a');
  a.download = `it-battle-${state.nick}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
};

/* Leaderboard */
async function renderLeaderboard(range) {
  document.querySelectorAll('[data-range]').forEach((c) => c.classList.toggle('on', c.dataset.range === range));
  const rows = await fetchTop(range);
  $('#lbList').innerHTML = rows.length ? rows.map((r, i) => `
    <li class="flex items-center gap-3 p-3 rounded-lg border ${i < 3 ? 'border-yellow-400 shadow-[0_0_14px_rgba(251,191,36,.4)]' : 'border-slate-700'}">
      <b class="orb w-8 ${i < 3 ? 'text-yellow-300' : 'text-slate-400'}">${i + 1}</b>
      <span class="text-2xl">${AVATARS[r.avatar_id] ?? '👾'}</span>
      <span class="flex-1">${escapeHtml(r.username)} <small class="text-slate-400">${escapeHtml(r.tech_stack)}</small></span>
      <b class="text-cyan-400">${r.high_score}</b>
    </li>`).join('') : '<p class="text-slate-400">Hozircha hech kim yo\'q. Birinchi bo\'l!</p>';
}
document.querySelectorAll('[data-range]').forEach((c) => c.addEventListener('click', () => renderLeaderboard(c.dataset.range)));
subscribeLeaderboard(() => { if ($('#leaderboard').classList.contains('active')) renderLeaderboard(document.querySelector('[data-range].on').dataset.range); });

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
