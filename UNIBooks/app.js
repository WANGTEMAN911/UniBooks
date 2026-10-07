/* ===== A. MOCK DATA: haqiqiy backend o'rniga ===== */
const CATS = ["Hammasi", "Kitoblar", "DTM / IELTS to‘plamlar", "Maktab darsliklari", "Konspektlar / Baza", "Badiiy adabiyot"];
const SEED = [
  { id: 1, t: "Matematika 10-sinf", a: "A. Abduhamidov", cat: "Maktab darsliklari", cond: 9, p: 35000, old: 60000, tag: ["Yangi kabi"], n: "Dilnoza", sch: "17-IDUM, 10-sinf", tg: "dilnoza_u" },
  { id: 2, t: "Cambridge IELTS 18", a: "Cambridge Press", cat: "DTM / IELTS to‘plamlar", cond: 8, p: 90000, old: 160000, tag: ["Arzon narx"], n: "Jasur", sch: "Toshkent, 11-sinf", tg: "jasur_k" },
  { id: 3, swap: true, t: "DTM testlar 2025", a: "Davlat test markazi", cat: "DTM / IELTS to‘plamlar", cond: 7, p: 45000, old: 80000, tag: ["Arzon narx"], n: "Madina", sch: "Samarqand, abituriyent", tg: "madina_s" },
  { id: 4, t: "O‘tkan kunlar", a: "Abdulla Qodiriy", cat: "Badiiy adabiyot", cond: 6, p: 25000, old: 40000, tag: [], n: "Sardor", sch: "Maktab 17-IDUM", tg: "sardor_b" },
  { id: 5, t: "Fizika konspekt-baza", a: "Qo‘lyozma, 120 bet", cat: "Konspektlar / Baza", cond: 8, p: 20000, old: 0, tag: ["Yangi kabi"], n: "Aziza", sch: "Andijon, 11-sinf", tg: "aziza_f" },
  { id: 6, swap: true, t: "Ingliz tili Grammar", a: "Raymond Murphy", cat: "Kitoblar", cond: 9, p: 70000, old: 120000, tag: ["Yangi kabi", "Arzon narx"], n: "Bekzod", sch: "Maktab 17-IDUM", tg: "bekzod_e" },
  { id: 7, t: "Kimyo 11-sinf", a: "Q. Ahmerov", cat: "Maktab darsliklari", cond: 5, p: 0, old: 0, tag: ["Arzon narx"], n: "Malika", sch: "Buxoro, 11-sinf", tg: "malika_k" },
  { id: 8, t: "Mehrobdan chayon", a: "Abdulla Qodiriy", cat: "Badiiy adabiyot", cond: 8, p: 30000, old: 0, tag: [], n: "Otabek", sch: "Namangan, 10-sinf", tg: "otabek_n" }
];

/* ===== A2. IKONKALAR (Lucide uslubidagi SVG), MUQOVA va AVATAR GENERATORI ===== */
const ic = p => `<svg class="ic" viewBox="0 0 24 24">${p}</svg>`;
const I = {
  heart: ic('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>'),
  cart: ic('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>'),
  user: ic('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  moon: ic('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>'),
  x: ic('<path d="M18 6 6 18M6 6l12 12"/>'),
  upload: ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'),
  book: ic('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>'), cap: ic('<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>'),
  school: ic('<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>'), zap: ic('<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'), filter: ic('<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>'),
  gift: ic('<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'),
  trophy: ic('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1.2 1.2C7.8 18.7 7 20.2 7 22M14 14.7V17c0 .6.5 1 1.2 1.2 1 .5 1.8 2 1.8 3.8M18 2H6v7a6 6 0 0 0 12 0z"/>'),
  pin: ic('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'), chev: ic('<path d="m6 9 6 6 6-6"/>'),
  swap: ic('<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),
  check: ic('<path d="M20 6 9 17l-5-5"/>'), info: ic('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
  trash: ic('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>'), logout: ic('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'),
  eye: ic('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>')
};
const TG = '<svg viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.3-.07-.47-.52-.16l-9.49 5.98-4.09-1.28c-.89-.28-.89-.89.19-1.32l15.95-6.15c.74-.33 1.45.18 1.17 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.06-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>';
document.querySelectorAll("[data-i]").forEach(e => e.outerHTML = I[e.dataset.i]);
const DROP = I.upload + "<br>Rasmni shu yerga tashlang yoki bosing";
const svgURI = x => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(x);
/* Kitob muqovasi: har bir kitob uchun noyob rangli SVG (tashqi rasm kerak emas) */
function bookSvg(b) {
  const P = [["#2d2a8c", "#7c3aed", "#a7f3d0"], ["#064e3b", "#10b981", "#fde68a"], ["#7c2d12", "#f59e0b", "#fff7ed"], ["#0f172a", "#2563eb", "#bfdbfe"], ["#831843", "#ec4899", "#fce7f3"], ["#312e81", "#06b6d4", "#cffafe"]];
  const [c1, c2, ac] = P[b.id % P.length], L = []; let s = "";
  b.t.split(" ").forEach(x => { if ((s + " " + x).trim().length > 13 && s) { L.push(s); s = x } else s = (s + " " + x).trim() }); L.push(s);
  const t = L.slice(0, 4).map((l, i) => `<text x="38" y="${150 + i * 34}" fill="#fff" font-family="Georgia,serif" font-size="27" font-weight="700">${esc(l)}</text>`).join("");
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="300" height="420" fill="url(#g)"/><circle cx="240" cy="70" r="90" fill="${ac}" opacity=".18"/><circle cx="270" cy="360" r="60" fill="#fff" opacity=".1"/><rect x="38" y="60" width="46" height="5" rx="2" fill="${ac}"/><rect width="18" height="420" fill="#000" opacity=".22"/><rect x="18" width="3" height="420" fill="#fff" opacity=".25"/>${t}<text x="38" y="385" fill="${ac}" font-family="Arial,sans-serif" font-size="15" letter-spacing="1">${esc(b.a)}</text></svg>`)
}
/* Avatar: ism bo'yicha doim bir xil chiqadigan illyustratsiya */
function avatar(name) {
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const bg = [["#c4b5fd", "#7c3aed"], ["#6ee7b7", "#059669"], ["#fcd34d", "#f59e0b"], ["#93c5fd", "#2563eb"], ["#f9a8d4", "#db2777"]][h % 5],
    skin = ["#f5cfa0", "#e0ac69", "#c68642", "#8d5524"][(h >> 3) % 4], hair = ["#2b1b12", "#4a2c17", "#111827", "#7c2d12"][(h >> 5) % 4], lg = (h >> 7) % 2;
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs><rect width="64" height="64" fill="url(#a)"/>${lg ? `<rect x="17" y="22" width="30" height="30" rx="12" fill="${hair}"/>` : ""}<path d="M8 64c2-14 12-18 24-18s22 4 24 18z" fill="#fff" opacity=".92"/><rect x="28" y="38" width="8" height="10" fill="${skin}"/><circle cx="32" cy="30" r="12" fill="${skin}"/><path d="M20 29c0-9 6-14 13-14s11 5 11 13c-4-1-8-4-10-7-2 4-8 7-14 8z" fill="${hair}"/></svg>`)
}

/* ===== B. STATE + localStorage (xavfsiz try/catch bilan) ===== */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } }
};
let items = [...store.get("ub_user", []).map(x => ({ ...x, mine: true })), ...SEED];
let profile = store.get("ub_profile", {});
const profAv = () => profile.avatar || avatar(profile.name || (user && user.name) || "Mehmon");
let wish = store.get("ub_wish", []), cart = store.get("ub_cart", []);
let cat = "Hammasi", query = "", onlySwap = false, onlyFree = false;
const $ = s => document.querySelector(s);
const som = n => !n ? "Bepul" : n.toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " so‘m";
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ===== C. TOAST ===== */
function toast(msg, type = "ok") {
  const box = $("#toasts"); while (box.children.length >= 3) box.firstChild.remove();
  const t = document.createElement("div"); t.className = "toast " + type; t.innerHTML = (type === "info" ? I.info : I.check) + `<span>${esc(msg)}</span>`;
  box.append(t); setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300) }, 2800)
}

/* ===== D. RENDER: filtr + qidiruv ===== */
function filtered() {
  const q = query.trim().toLowerCase();
  return items.filter(b => !b.sold && (!onlyFree || b.p === 0) && (!onlySwap || b.swap) && fltOK(b) && (cat === "Hammasi" || b.cat === cat) && (!q || [b.t, b.a, b.cat].some(x => x.toLowerCase().includes(q))))
}
function card(b, i = 0) {
  const on = wish.includes(b.id), disc = b.old ? Math.round((1 - b.p / b.old) * 100) : 0;
  return `<article class="card glass rise" data-id="${b.id}" style="--i:${i}"><div class="cover"><img class="bk" src="${b.img || bookSvg(b)}" alt="Muqova: ${esc(b.t)}" loading="lazy">
    <div class="badges">${b.p === 0 ? FREEB : ""}${b.swap ? `<span class="badge sw">${I.swap}Barter / Almashtirish</span>` : ""}${b.tag.map(x => `<span class="badge">${esc(x)}</span>`).join("")}<span class="badge s">${esc(b.sch.split(",")[0])}</span></div>
    <button class="heart ${on ? "on" : ""}" data-w="${b.id}" aria-label="Saqlash">${I.heart}</button></div>
    <div class="info"><h3>${esc(b.t)}</h3><span class="muted">${esc(b.a)}</span>
    <div class="muted">Holati: ${b.cond}/10</div><div class="meter"><i style="width:${b.cond * 10}%"></i></div>
    <div class="price">${som(b.p)}${b.old ? `<s>${som(b.old)}</s>` : ""}${disc > 0 ? ` <span class="badge">-${disc}%</span>` : ""}</div>
    <button class="seller" data-seller="${esc(b.tg)}"><img class="ava" src="${b.mine ? profAv() : avatar(b.n)}" alt=""><span>${esc(b.n)} · <span class="muted">${esc(b.sch)}</span></span></button>${starRow(b.tg)}<div class="bdg">${sellerBadges(b.tg).map(x => `<span class="sb" title="${x.n}">${x.i}</span>`).join("")}</div>
    <div class="acts"><button class="btn tg" style="flex:1;font-size:13px" data-tg="${esc(b.tg)}">${TG}Telegram orqali bog‘lanish</button>
    <button class="btn ghost" data-c="${b.id}" aria-label="Savatga">${I.cart}</button></div></div></article>`
}
function render() {
  const l = filtered(); paintFlt();
  $("#grid").innerHTML = l.length ? l.map(card).join("") : `<div class="empty">Hech narsa topilmadi.<br>Boshqa kalit so‘z, kategoriya yoki viloyatni sinab ko‘ring.</div>`;
  $("#cWish").textContent = wish.length; $("#cCart").textContent = cart.length
}
function skeleton() { $("#grid").innerHTML = '<div class="skel"></div>'.repeat(8) }

/* ===== E. PILLS: kategoriya + "Faqat almashtiriladiganlar" ===== */
function pills() { $("#pills").innerHTML = CATS.map(c => `<button class="pill ${c === cat ? "on" : ""}" data-cat="${c}">${c}</button>`).join("") + `<button class="pill swp ${onlySwap ? "on" : ""}" data-swap>${I.swap}Faqat almashtiriladiganlar</button><button class="pill swp fr ${onlyFree ? "on" : ""}" data-free>${I.gift}Bepul kitoblar</button>` }
$("#pills").onclick = e => {
  const p = e.target.closest(".pill"); if (!p) return;
  if (p.dataset.swap !== undefined) onlySwap = !onlySwap; else if (p.dataset.free !== undefined) onlyFree = !onlyFree; else cat = p.dataset.cat;
  pills(); skeleton(); setTimeout(render, 350)
};
pills();
$("#fCat").innerHTML = CATS.slice(1).map(c => `<option>${c}</option>`).join("");

/* ===== F. WISHLIST / CART ===== */
function toggle(arr, id) { const i = arr.indexOf(id); i > -1 ? arr.splice(i, 1) : arr.push(id); return i === -1 }
$("#grid").onclick = e => {
  const cd = e.target.closest(".card"); if (cd && !e.target.closest("button,a")) return openQV(cd.dataset.id);
  const w = e.target.closest("[data-w]"), c = e.target.closest("[data-c]");
  if (w) gate(() => { const added = toggle(wish, +w.dataset.w); store.set("ub_wish", wish); toast(added ? "Kitob wishlist’ga saqlandi." : "Wishlist’dan olib tashlandi."); render() });
  if (c) { const added = toggle(cart, +c.dataset.c); store.set("ub_cart", cart); toast(added ? "Savatga qo‘shildi!" : "Savatdan olib tashlandi"); render() }
};

/* ===== G. DRAWER ===== */
function openDrawer(kind) {
  const ids = kind === "wish" ? wish : cart, list = items.filter(b => ids.includes(b.id));
  $("#dTitle").textContent = kind === "wish" ? "Saqlanganlar" : "Savat";
  const total = list.reduce((s, b) => s + b.p, 0);
  $("#dBody").innerHTML = (list.length ? list.map(b => `<div class="item"><div><b>${esc(b.t)}</b><div class="muted">${som(b.p)}</div></div><button class="btn tg" style="padding:8px 12px" data-tg="${esc(b.tg)}">${TG}Yozish</button></div>`).join("")
    + (kind === "cart" ? `<p style="margin-top:14px"><b>Jami: ${som(total)}</b></p>` : "") : `<p class="empty">Bu yerda hali hech narsa yo‘q.</p>`);
  $("#drawer").classList.add("on"); $("#dVeil").classList.add("on")
}
$("#bWish").onclick = () => openDrawer("wish"); $("#bCart").onclick = () => openDrawer("cart");
document.addEventListener("click", e => {
  if (e.target.closest("[data-close]") || e.target.classList.contains("veil")) {
    document.querySelectorAll(".veil").forEach(v => v.classList.remove("on")); $("#drawer").classList.remove("on")
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll("[data-close]")[0]?.click() });

/* ===== H. INSTANT LIVE SEARCH ===== */
$("#q").oninput = e => {
  query = e.target.value; const r = $("#live"), l = query.trim() ? filtered().slice(0, 5) : [];
  r.classList.toggle("on", !!l.length);
  r.innerHTML = l.map(b => `<button data-s="${esc(b.t)}"><img src="${bookSvg(b)}" alt="" style="width:32px;height:44px;border-radius:6px;object-fit:cover"> <span>${esc(b.t)}<br><span class="muted">${esc(b.a)}</span></span></button>`).join("");
  render()
};
$("#live").onclick = e => { const b = e.target.closest("[data-s]"); if (b) { $("#q").value = query = b.dataset.s; $("#live").classList.remove("on"); render() } };

/* ===== I. THEME ===== */
const root = document.documentElement;
$("#bTheme").onclick = () => {
  const dark = root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches);
  root.dataset.theme = dark ? "light" : "dark"; store.set("ub_theme", root.dataset.theme)
};
if (store.get("ub_theme")) root.dataset.theme = store.get("ub_theme");

/* ===== J. ADD PRODUCT MODAL ===== */
let img = "";
function openAdd() { ["#fName", "#fTg", "#fSchool"].forEach((q, i) => { const el = $(q); if (!el.value) el.value = [profile.name, profile.tg ? "@" + profile.tg : "", profile.school][i] || "" }); $("#addVeil").classList.add("on") }
$("#bAdd").onclick = () => gate(openAdd);
$("#fCond").oninput = e => $("#condV").textContent = e.target.value;
const drop = $("#drop"), file = $("#file");
function preview(f) {
  if (!f || !f.type.startsWith("image/")) return toast("Faqat rasm yuklang");
  const r = new FileReader(); r.onload = () => { img = r.result; drop.innerHTML = `<img src="${img}" alt="Prevyu">` }; r.readAsDataURL(f)
}
drop.onclick = () => file.click(); file.onchange = () => preview(file.files[0]);
["dragover", "dragenter"].forEach(n => drop.addEventListener(n, e => { e.preventDefault(); drop.classList.add("over") }));
["dragleave", "drop"].forEach(n => drop.addEventListener(n, e => { e.preventDefault(); drop.classList.remove("over") }));
drop.addEventListener("drop", e => preview(e.dataTransfer.files[0]));
function step(n) { $("#step1").hidden = n !== 1; $("#step2").hidden = n !== 2; $("#s2").classList.toggle("on", n === 2) }
$("#next").onclick = () => { if (!$("#fTitle").value.trim() || !$("#fPrice").value) return toast("Nom va narxni kiriting"); step(2) };
$("#back").onclick = () => step(1);
$("#publish").onclick = () => {
  const tg = $("#fTg").value.trim().replace(/^@/, ""), n = $("#fName").value.trim();
  if (!tg || !n) return toast("Ism va Telegram username kerak");
  const b = {
    id: Date.now(), t: $("#fTitle").value.trim(), a: "Sotuvchi e’loni", cat: $("#fCat").value, cond: +$("#fCond").value,
    p: +$("#fPrice").value, old: 0, img, tag: ["Yangi e’lon"], swap: $("#fSwap").checked, note: $("#fNote").value.trim(), mine: true, sold: false, g: $("#fGrade").value, s: $("#fSubj2").value, rg: $("#fReg").value, d: $("#fDist").value, n, sch: $("#fSchool").value.trim() || "Maktab ko‘rsatilmagan", tg
  };
  items.unshift(b); saveMine(); if (!profile.name) { profile = { name: n, school: $("#fSchool").value.trim(), tg }; store.set("ub_profile", profile) }
  document.querySelectorAll(".veil").forEach(v => v.classList.remove("on"));
  step(1); img = ""; drop.innerHTML = DROP;
  ["#fTitle", "#fPrice"].forEach(s => $(s).value = ""); $("#fSwap").checked = false; $("#fNote").value = ""; render(); toast("E’loningiz joylandi!")
};

/* ===== N. NISHONLAR, REYTING, SHARHLAR, FILTRLAR, TOP MAKTABLAR ===== */
/* Namuna sotuvchi reytingi (r = o'rtacha, n = sharhlar soni, extra = qo'shimcha joylangan kitoblar) */
const SM = { dilnoza_u: { r: 4.9, n: 12 }, jasur_k: { r: 4.7, n: 8 }, madina_s: { r: 5, n: 3 }, sardor_b: { r: 4.5, n: 6 }, aziza_f: { r: 4.8, n: 9 }, bekzod_e: { r: 4.9, n: 21, extra: 3 }, malika_k: { r: 4.2, n: 4 }, otabek_n: { r: 4.6, n: 5 } };
const REV0 = ["Kitob e’londagidek chiqdi, tez kelishdik.", "Muloqoti yaxshi, tavsiya qilaman."];
let reviews = store.get("ub_reviews", {}), rv = 0;
const BADGES = [
  { n: "Top Kitobxon", d: "3 tadan ortiq kitob joylang", i: I.book, ok: (l, x) => l.length + x > 3 },
  { n: "Abituriyent Do‘sti", d: "DTM yoki IELTS kitobini joylang", i: I.cap, ok: l => l.some(b => b.cat === "DTM / IELTS to‘plamlar") },
  { n: "Saxiy O‘quvchi", d: "Kitobni bepul yoki barter qiling", i: I.heart, ok: l => l.some(b => b.swap || b.p === 0) }];
function sellerBadges(tg, mine) { const l = items.filter(b => mine ? b.mine : b.tg === tg), x = mine ? 0 : (SM[tg] || {}).extra || 0; return BADGES.filter(b => b.ok(l, x)) }
const star = f => `<svg class="ic st ${f ? "f" : ""}" viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`;
function rating(tg) { const m = SM[tg] || { r: 0, n: 0 }, rs = reviews[tg] || [], n = m.n + rs.length; return { n, avg: n ? (m.r * m.n + rs.reduce((a, x) => a + x.r, 0)) / n : 0 } }
function starRow(tg) { const r = rating(tg); return `<button class="rate" data-seller="${esc(tg)}">${star(1)}<b>${r.n ? r.avg.toFixed(1) : "—"}</b><span class="muted">${r.n ? r.n + " ta sharh" : "Sharh yo‘q"}</span></button>` }
/* Sotuvchi profili modali: nishonlar, reyting, sharhlar va baho berish formasi */
function openSeller(tg) {
  const b = items.find(x => x.tg === tg); if (!b) return; const r = rating(tg);
  const list = [...(reviews[tg] || []).slice().reverse(), ...(SM[tg] ? REV0.map((t, i) => ({ r: 5 - i, txt: t, by: ["Ali", "Nilufar"][i] })) : [])];
  $("#revBody").innerHTML = `<div class="avrow" style="margin-top:12px"><img class="ava" style="width:64px;height:64px" src="${b.mine ? profAv() : avatar(b.n)}" alt=""><div><h3>${esc(b.n)}</h3><div class="muted">${esc(b.sch)}</div>
  <div class="bdg" style="margin-top:6px">${sellerBadges(tg).map(x => `<span class="sb on" title="${x.n}">${x.i}<em>${x.n}</em></span>`).join("") || '<span class="muted">Hali nishon yo‘q</span>'}</div></div></div>
  <p style="margin:14px 0 4px" class="rate">${[1, 2, 3, 4, 5].map(i => star(i <= Math.round(r.avg))).join("")}<b>${r.n ? r.avg.toFixed(1) : "—"}</b><span class="muted">/ ${r.n} ta sharh</span></p>
  ${list.map(x => `<div class="rv"><span class="rate">${[1, 2, 3, 4, 5].map(i => star(i <= x.r)).join("")}<b>${esc(x.by)}</b></span><div class="muted">${esc(x.txt || "Izohsiz baho")}</div></div>`).join("") || '<p class="empty">Hali sharhlar yo‘q.</p>'}
  <label>Sotuvchiga baho bering</label><div class="pick">${[1, 2, 3, 4, 5].map(i => `<button data-v="${i}" aria-label="${i} yulduz">${star(0)}</button>`).join("")}</div>
  <label for="rtxt">Qisqa izoh</label><input class="in" id="rtxt" maxlength="140" placeholder="Masalan: tez va halol sotuvchi">
  <div class="row"><button class="btn primary" style="width:100%" data-send="${esc(tg)}">Baho yuborish</button></div>`;
  rv = 0; document.querySelectorAll(".veil").forEach(v => v.classList.remove("on")); $("#revVeil").classList.add("on")
}
$("#revBody").onclick = e => {
  const p = e.target.closest("[data-v]"), sd = e.target.closest("[data-send]");
  if (p) { rv = +p.dataset.v; document.querySelectorAll(".pick button").forEach(x => x.classList.toggle("f", +x.dataset.v <= rv)) }
  if (sd) gate(() => {
    const tg = sd.dataset.send; if (!rv) return toast("Avval yulduzcha tanlang.", "info");
    if (items.some(b => b.tg === tg && b.mine)) return toast("O‘zingizga baho bera olmaysiz.", "info");
    (reviews[tg] = reviews[tg] || []).push({ r: rv, txt: $("#rtxt").value.trim().slice(0, 140), by: profile.name || (user && user.name) || "Foydalanuvchi" });
    store.set("ub_reviews", reviews); render(); openSeller(tg); toast("Baho va izoh yuborildi. Rahmat!")
  })
};
document.addEventListener("click", e => { const s = e.target.closest("[data-seller]"); if (s) openSeller(s.dataset.seller) });
/* Reyting ma'lumotlari: maktablar (kitoblar soni) va sotuvchilar */
const SCH0 = { "17-IDUM": { rg: "Toshkent sh.", b: 42 }, "Samarqand 3-maktab": { rg: "Samarqand", b: 31 }, "Toshkent 110-maktab": { rg: "Toshkent sh.", b: 27 }, "Andijon 21-maktab": { rg: "Andijon", b: 22 }, "Namangan 12-maktab": { rg: "Namangan", b: 17 }, "Buxoro 8-maktab": { rg: "Buxoro", b: 14 } };
const ALIAS = { "Toshkent": "Toshkent 110-maktab", "Samarqand": "Samarqand 3-maktab", "Andijon": "Andijon 21-maktab", "Buxoro": "Buxoro 8-maktab", "Namangan": "Namangan 12-maktab" };
function schoolList() { const m = JSON.parse(JSON.stringify(SCH0)); items.forEach(b => { let k = b.sch.split(",")[0].trim().replace(/^Maktab\s+/i, ""); k = ALIAS[k] || k; (m[k] = m[k] || { rg: b.rg || "", b: 0 }).b++ }); return Object.entries(m).sort((a, b) => b[1].b - a[1].b).slice(0, 8) }
function userList() {
  const m = {}; items.forEach(b => { const k = b.tg || "__me"; (m[k] = m[k] || { tg: b.tg || "", n: b.n, sch: b.sch, mine: b.mine, c: (SM[k] || {}).extra || 0 }).c++ });
  return Object.values(m).map(u => ({ ...u, r: rating(u.tg).avg, bd: sellerBadges(u.tg, u.mine) })).sort((a, b) => b.c - a.c || b.r - a.r).slice(0, 8)
}
function lbTab(t) {
  document.querySelectorAll("#lbVeil .tabs button").forEach(x => x.classList.toggle("on", x.dataset.lt === t)); const box = $("#lbBody");
  if (t === "sch") { const l = schoolList(), mx = l[0][1].b; box.innerHTML = l.map(([k, v], i) => `<div class="lb"><span class="rk">${i + 1}</span><div style="flex:1"><b>${esc(k)}</b> <span class="muted">${esc(v.rg)}</span><div class="meter"><i style="width:${v.b / mx * 100}%"></i></div></div><b>${v.b}</b><span class="muted">kitob</span></div>`).join("") }
  else box.innerHTML = userList().map((u, i) => `<button class="lb" data-seller="${esc(u.tg)}" style="width:100%;text-align:left"><span class="rk">${i + 1}</span><img class="ava" src="${u.mine ? profAv() : avatar(u.n)}" alt=""><div style="flex:1;min-width:0"><b>${esc(u.n)}</b><div class="muted">${esc(u.sch)}</div></div><div class="bdg">${u.bd.map(x => `<span class="sb" title="${x.n}">${x.i}</span>`).join("")}</div><div style="text-align:right"><b>${u.c}</b> <span class="muted">kitob</span><div class="rate" style="justify-content:flex-end">${star(1)}${u.r ? u.r.toFixed(1) : "—"}</div></div></button>`).join("")
}
$("#bLb").onclick = () => { lbTab("sch"); $("#lbVeil").classList.add("on") };
document.querySelector("#lbVeil .tabs").onclick = e => { const b = e.target.closest("[data-lt]"); if (b) lbTab(b.dataset.lt) };
/* BEPUL / BARTER badge'lari */
const FREEB = `<span class="badge free">${I.gift}BEPUL</span>`, SWB = `<span class="badge sw">${I.swap}Barter / Almashtirish</span>`;
/* Lokatsiya: tanlangan hudud kitoblari ro'yxatda birinchi chiqadi */
let loc = store.get("ub_loc", "Toshkent sh.");
function paintLoc() { $("#locT").textContent = loc ? loc.replace(" sh.", "") : "Barcha viloyatlar"; $("#locM").innerHTML = ["", ...Object.keys(REG)].map(r => `<button class="${r === loc ? "on" : ""}" data-loc="${r}">${r || "Barcha viloyatlar"}</button>`).join("") }
$("#bLoc").onclick = e => { e.stopPropagation(); $("#locM").classList.toggle("on") };
/* Viloyat tanlash: tugma matni o'zgaradi va kitoblar shu hudud bo'yicha filtrlanadi */
function setLoc(v) {
  loc = v; F.d = ""; store.set("ub_loc", loc); paintLoc(); skeleton(); setTimeout(() => { render(); if ($("#fltVeil").classList.contains("on")) paintF() }, 250);
  toast(loc ? "Hudud: " + loc.replace(" sh.", "") + " kitoblari ko‘rsatilmoqda." : "Barcha viloyatlar ko‘rsatilmoqda.", "info")
}
$("#locM").onclick = e => { const b = e.target.closest("[data-loc]"); if (!b) return; $("#locM").classList.remove("on"); setLoc(b.dataset.loc) };
document.addEventListener("click", () => $("#locM").classList.remove("on"));
/* QUICK VIEW: kitobning to'liq tafsilotlari */
const NOTES = { 1: "Yozuvlari yo‘q, muqovasi toza.", 2: "Listening CD ilova qilinmagan, qolgan hammasi joyida.", 3: "Ichida ozgina qalam izlari bor.", 4: "Sahifalari butun, eski nashr.", 5: "Qo‘lyozma, tartibli va tushunarli.", 6: "Faqat bir marta o‘qilgan.", 7: "Muqovasi eskirgan, ichi toza.", 8: "Klassik nashr, yaxshi holatda." };
function openQV(id) {
  const b = items.find(x => x.id == id); if (!b) return; const on = wish.includes(b.id), disc = b.old ? Math.round((1 - b.p / b.old) * 100) : 0;
  $("#qvBody").innerHTML = `<div class="qvg"><div class="qvc"><img src="${b.img || bookSvg(b)}" alt="Muqova: ${esc(b.t)}"></div><div class="qvi">
  <div class="bds">${b.p === 0 ? FREEB : ""}${b.swap ? SWB : ""}${b.tag.map(x => `<span class="badge">${esc(x)}</span>`).join("")}</div>
  <h2>${esc(b.t)}</h2><div class="muted">${esc(b.a)}</div>
  <div class="price" style="margin:6px 0">${som(b.p)}${b.old ? `<s>${som(b.old)}</s>` : ""}${disc > 0 ? ` <span class="badge">-${disc}%</span>` : ""}</div>
  <div class="dl"><div><span class="muted">Sinf</span><b>${esc(b.g || "—")}</b></div><div><span class="muted">Fan</span><b>${esc(b.s || b.cat)}</b></div><div><span class="muted">Kategoriya</span><b>${esc(b.cat)}</b></div><div><span class="muted">Hudud</span><b>${esc([b.rg, b.d].filter(Boolean).join(", ") || "—")}</b></div></div>
  <div class="muted" style="margin-top:8px">Holati: ${b.cond}/10</div><div class="meter"><i style="width:${b.cond * 10}%"></i></div>
  <p class="note">${esc(b.note || NOTES[b.id] || "Sotuvchi izoh qoldirmagan.")}</p>
  <button class="seller sellerbox" data-seller="${esc(b.tg)}"><img class="ava" style="width:40px;height:40px" src="${b.mine ? profAv() : avatar(b.n)}" alt=""><span><b>${esc(b.n)}</b><br><span class="muted">${esc(b.sch)}</span></span></button>
  ${starRow(b.tg)}<div class="bdg">${sellerBadges(b.tg, b.mine).map(x => `<span class="sb on" title="${x.n}">${x.i}<em>${x.n}</em></span>`).join("")}</div>
  <div class="acts" style="padding-top:12px"><button class="btn tg" style="flex:1;padding:14px" data-tg="${esc(b.tg)}">${TG}Telegramda bog‘lanish</button><button class="btn ghost heart2 ${on ? "on" : ""}" data-qw="${b.id}" aria-label="Saqlash">${I.heart}</button><button class="btn ghost" data-qc="${b.id}" aria-label="Savat">${I.cart}</button></div>
  </div></div>`; $("#qvVeil").classList.add("on")
}
$("#qvBody").onclick = e => {
  const w = e.target.closest("[data-qw]"), c = e.target.closest("[data-qc]");
  if (w) gate(() => { const id = +w.dataset.qw, added = toggle(wish, id); store.set("ub_wish", wish); toast(added ? "Kitob wishlist’ga saqlandi." : "Wishlist’dan olib tashlandi."); render(); openQV(id) });
  if (c) { const id = +c.dataset.qc, added = toggle(cart, id); store.set("ub_cart", cart); toast(added ? "Savatga qo‘shildi!" : "Savatdan olib tashlandi"); render(); openQV(id) }
};
/* Filtrlar */
const REG = { "Toshkent sh.": ["Chilonzor", "Yunusobod", "Mirzo Ulug‘bek", "Yakkasaroy"], "Toshkent v.": ["Chirchiq", "Angren", "Zangiota"], "Samarqand": ["Samarqand sh.", "Urgut", "Kattaqo‘rg‘on"], "Farg‘ona": ["Farg‘ona sh.", "Marg‘ilon", "Qo‘qon"], "Andijon": ["Andijon sh.", "Asaka", "Xonobod"], "Namangan": ["Namangan sh.", "Chust", "Pop"], "Buxoro": ["Buxoro sh.", "G‘ijduvon", "Kogon"], "Xorazm": ["Urganch", "Xiva", "Shovot"], "Qashqadaryo": ["Qarshi", "Shahrisabz"], "Surxondaryo": ["Termiz", "Denov"], "Navoiy": ["Navoiy sh.", "Zarafshon"], "Jizzax": ["Jizzax sh.", "Zomin"], "Sirdaryo": ["Guliston", "Yangiyer"], "Qoraqalpog‘iston": ["Nukus", "Qo‘ng‘irot"] };
const GRADES = ["5-9 sinf", "10-11 sinf", "Abituriyent"], SUBJ = ["Aniq fanlar", "Tillar", "Badiiy", "DTM/IELTS"];
const META = { 1: { g: "10-11 sinf", s: "Aniq fanlar", rg: "Toshkent sh.", d: "Chilonzor" }, 2: { g: "Abituriyent", s: "DTM/IELTS", rg: "Toshkent sh.", d: "Yunusobod" }, 3: { g: "Abituriyent", s: "DTM/IELTS", rg: "Samarqand", d: "Samarqand sh." }, 4: { g: "10-11 sinf", s: "Badiiy", rg: "Toshkent sh.", d: "Chilonzor" }, 5: { g: "10-11 sinf", s: "Aniq fanlar", rg: "Andijon", d: "Andijon sh." }, 6: { g: "10-11 sinf", s: "Tillar", rg: "Toshkent sh.", d: "Chilonzor" }, 7: { g: "10-11 sinf", s: "Aniq fanlar", rg: "Buxoro", d: "Buxoro sh." }, 8: { g: "5-9 sinf", s: "Badiiy", rg: "Namangan", d: "Namangan sh." } };
SEED.forEach(b => Object.assign(b, META[b.id]));
let F = { g: "", s: "", rg: "", d: "", min: 0, max: 300000 };
const fltOK = b => (!F.g || b.g === F.g) && (!F.s || b.s === F.s) && (!loc || b.rg === loc) && (!F.d || b.d === F.d) && b.p >= F.min && (F.max >= 300000 || b.p <= F.max);
const opts = (a, all) => (all ? `<option value="">${all}</option>` : "") + a.map(x => `<option>${x}</option>`).join("");
const dists = r => r ? REG[r] : Object.values(REG).flat();
const nf = n => n.toLocaleString("ru-RU");
function paintFlt() { const c = [F.g, F.s, F.rg, F.d].filter(Boolean).length + (F.min > 0 || F.max < 300000 ? 1 : 0); $("#cFlt").style.display = c ? "grid" : "none"; $("#cFlt").textContent = c }
function paintF() {
  const chip = (k, a) => a.map(x => `<button class="pill ${F[k] === x ? "on" : ""}" data-f="${k}" data-x="${x}">${x}</button>`).join("");
  $("#fG").innerHTML = chip("g", GRADES); $("#fS").innerHTML = chip("s", SUBJ);
  $("#xReg").innerHTML = opts(Object.keys(REG), "Barcha viloyatlar"); $("#xReg").value = loc;
  $("#xDist").innerHTML = opts(dists(loc), "Barcha tumanlar"); $("#xDist").value = F.d;
  $("#pMin").value = F.min; $("#pMax").value = F.max; $("#xPrice").textContent = nf(F.min) + " — " + nf(F.max) + (F.max >= 300000 ? "+" : "") + " so‘m";
  $("#fApply").textContent = filtered().length + " ta natijani ko‘rish"; paintFlt()
}
const applyF = () => { paintF(); render() };
$("#bFlt").onclick = () => { paintF(); $("#fltVeil").classList.add("on") };
$("#fltVeil").addEventListener("click", e => {
  const c = e.target.closest("[data-f]"); if (c) { F[c.dataset.f] = F[c.dataset.f] === c.dataset.x ? "" : c.dataset.x; applyF() }
  if (e.target.id === "fClear") { F = { g: "", s: "", rg: "", d: "", min: 0, max: 300000 }; applyF(); toast("Filtrlar tozalandi.", "info") }
});
$("#xReg").onchange = e => setLoc(e.target.value); $("#xDist").onchange = e => { F.d = e.target.value; applyF() };
$("#pMin").oninput = e => { F.min = +e.target.value; if (F.min > F.max) F.max = F.min; applyF() }; $("#pMax").oninput = e => { F.max = +e.target.value; if (F.max < F.min) F.min = F.max; applyF() };
paintLoc();
/* E'lon formasidagi yangi maydonlar */
$("#fGrade").innerHTML = opts(GRADES); $("#fSubj2").innerHTML = opts(SUBJ); $("#fReg").innerHTML = opts(Object.keys(REG)); $("#fDist").innerHTML = opts(REG[Object.keys(REG)[0]]);
$("#fReg").onchange = e => $("#fDist").innerHTML = opts(REG[e.target.value]);


/* ===== M. PROFIL: ma'lumotlar, e'lonlarim (Sotildi/O'chirish), saqlanganlar, statistika ===== */
const saveMine = () => store.set("ub_user", items.filter(b => b.mine));
const SEEDS = ["ali", "zilola", "kamol", "nigora", "shaxzod", "dildora"];
let ptab = "info", pAv = "";
const setAv = u => { pAv = u; $("#pImg").src = u };
/* Katta rasmni 96x96 ga kichraytirib saqlaymiz (localStorage hajmi cheklangan) */
function shrink(f) {
  const r = new FileReader(); r.onload = () => {
    const im = new Image(); im.onload = () => {
      const c = document.createElement("canvas"); c.width = c.height = 96; const m = Math.min(im.width, im.height);
      c.getContext("2d").drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, 96, 96); setAv(c.toDataURL("image/jpeg", .8))
    }; im.src = r.result
  }; r.readAsDataURL(f)
}
const mini = (b, x) => `<div class="item"><img src="${b.img || bookSvg(b)}" alt="" style="width:48px;height:66px;border-radius:8px;object-fit:cover;flex:none"><div style="flex:1;min-width:0"><b>${esc(b.t)}</b>${b.swap ? ` <span class="badge sw">${I.swap}Barter</span>` : ""}${b.sold ? ` <span class="badge s">Sotilgan</span>` : ""}<div class="muted">${som(b.p)} · Holati ${b.cond}/10</div></div>${x}</div>`;
function openProfile() { pAv = profile.avatar || ""; $("#profVeil").classList.add("on"); tab(ptab) }
function tab(t) {
  ptab = t; document.querySelectorAll("#profVeil .tabs button").forEach(x => x.classList.toggle("on", x.dataset.t === t));
  const mine = items.filter(b => b.mine), box = $("#pBody");
  if (t === "info") box.innerHTML = `<div class="avrow"><img class="ava" id="pImg" style="width:72px;height:72px" src="${pAv || profAv()}" alt="Avatar"><div class="avs">${SEEDS.map(x => `<button data-av="${x}" aria-label="Avatar ${x}"><img class="ava" src="${avatar(x)}" alt=""></button>`).join("")}</div></div>
  <label for="pUrl">Avatar URL (ixtiyoriy)</label><div class="row" style="margin:0"><input class="in" id="pUrl" placeholder="https://..."><button class="btn ghost" id="pUp">${I.upload}Yuklash</button></div><input type="file" id="pFile" accept="image/*" hidden>
  <label for="pName">Ism-familiya</label><input class="in" id="pName" value="${esc(profile.name || "")}">
  <label for="pSchool">Maktab / tuman</label><input class="in" id="pSchool" value="${esc(profile.school || "")}">
  <label for="pTg">Telegram username</label><input class="in" id="pTg" value="${esc(profile.tg ? "@" + profile.tg : "")}" placeholder="@username">
  <div class="row"><button class="btn ghost" id="pOut">${I.logout}Chiqish</button><button class="btn primary" id="pSave">Saqlash</button></div>`;
  if (t === "mine") box.innerHTML = mine.length ? mine.map(b => mini(b, `<div class="pa"><button class="btn ghost" data-sold="${b.id}">${b.sold ? "Qaytarish" : "Sotildi"}</button><button class="btn ghost" data-del="${b.id}" aria-label="O‘chirish">${I.trash}</button></div>`)).join("") : `<p class="empty">Hali e’lon joylamadingiz.</p>`;
  if (t === "wish") { const l = items.filter(b => wish.includes(b.id)); box.innerHTML = l.length ? l.map(b => mini(b, `<div class="pa"><button class="btn tg" data-tg="${esc(b.tg)}" aria-label="Telegram">${TG}</button><button class="btn ghost" data-unw="${b.id}" aria-label="Olib tashlash">${I.x}</button></div>`)).join("") : `<p class="empty">Saqlangan kitoblar yo‘q.</p>` }
  if (t === "stat") { const sold = mine.filter(b => b.sold); box.innerHTML = `<div class="stats">${[["E’lon joylangan", mine.length], ["Sotilgan / almashtirilgan", sold.length], ["Faol e’lonlar", mine.length - sold.length], ["Barter e’lonlar", mine.filter(b => b.swap).length], ["Saqlanganlar", wish.length], ["Sotuv summasi", som(sold.reduce((n, b) => n + b.p, 0))]].map(([k, v]) => `<div class="stat"><b>${v}</b><span class="muted">${k}</span></div>`).join("")}</div><h3 style="margin:18px 0 8px">Nishonlar</h3><div class="bgrid">${BADGES.map(x => `<div class="bcard ${x.ok(mine, 0) ? "on" : ""}">${x.i}<div><b>${x.n}</b><span class="muted">${x.d}</span></div></div>`).join("")}</div>` }
}
document.querySelector("#profVeil .tabs").onclick = e => { const b = e.target.closest("[data-t]"); if (b) tab(b.dataset.t) };
$("#pBody").onchange = e => { if (e.target.id === "pFile" && e.target.files[0]) shrink(e.target.files[0]) };
$("#pBody").onclick = e => {
  const g = q => e.target.closest(q);
  if (g("[data-av]")) setAv(avatar(g("[data-av]").dataset.av));
  else if (g("#pUp")) $("#pFile").click();
  else if (g("#pSave")) {
    profile = { name: $("#pName").value.trim(), school: $("#pSchool").value.trim(), tg: $("#pTg").value.trim().replace(/^@/, ""), avatar: $("#pUrl").value.trim() || pAv };
    store.set("ub_profile", profile); paintUser(); render(); toast("Profil ma’lumotlari yangilandi!")
  }
  else if (g("#pOut")) { user = null; store.set("ub_auth", null); paintUser(); $("#profVeil").classList.remove("on"); toast("Hisobdan chiqdingiz", "info") }
  else if (g("[data-sold]")) {
    const b = items.find(x => x.id == g("[data-sold]").dataset.sold); b.sold = !b.sold; saveMine(); tab("mine"); render();
    toast(b.sold ? "Tabriklaymiz! Kitobingiz sotilganlar ro‘yxatiga o‘tdi." : "Kitob qayta sotuvga chiqarildi.", b.sold ? "ok" : "info")
  }
  else if (g("[data-del]")) {
    const d = g("[data-del]");/* ikki bosqichli o'chirish: tasodifiy bosishdan himoya */
    if (d.dataset.armed) { const id = d.dataset.del; items = items.filter(x => x.id != id); wish = wish.filter(x => x != id); cart = cart.filter(x => x != id); saveMine(); store.set("ub_wish", wish); store.set("ub_cart", cart); tab("mine"); render(); toast("E’lon o‘chirildi.", "info") }
    else { d.dataset.armed = 1; d.classList.add("danger"); toast("O‘chirish uchun yana bosing.", "info"); setTimeout(() => { delete d.dataset.armed; d.classList.remove("danger") }, 3000) }
  }
  else if (g("[data-unw]")) { toggle(wish, +g("[data-unw]").dataset.unw); store.set("ub_wish", wish); tab("wish"); render(); toast("Wishlist’dan olib tashlandi.", "info") }
};

/* ===== L. AUTH (DEMO): Google/Telegram tugmalari hozircha tizimga kirishni simulyatsiya qiladi.
   Haqiqiy ulanish: Supabase Auth (Google OAuth) va Telegram Login Widget (backend tekshiruvi bilan). ===== */
let user = store.get("ub_auth", null), pending = null;
const openAuth = () => $("#authVeil").classList.add("on");
/* gate(): faqat kirgan foydalanuvchi uchun amalni bajaradi, aks holda modalni ochadi */
function gate(fn) { if (user && user.type !== "guest") return fn(); pending = fn; openAuth() }
function paintUser() { $("#bUser").innerHTML = user && user.type !== "guest" ? `<img class="ava" style="width:34px;height:34px" src="${profAv()}" alt="Profil">` : I.user }
function login(type) {
  user = { type, name: { google: "Aziza Karimova", telegram: "Jasur Tursunov", guest: "Mehmon" }[type] }; store.set("ub_auth", user);
  if (type !== "guest" && !profile.name) { profile.name = user.name; store.set("ub_profile", profile) }
  $("#authVeil").classList.remove("on"); paintUser();
  toast(type === "guest" ? "Mehmon rejimi: faqat ko‘rish mumkin" : "Xush kelibsiz!");
  const f = pending; pending = null; if (type !== "guest" && f) f()
}
$("#authVeil").onclick = e => { const b = e.target.closest("[data-login]"); if (b) login(b.dataset.login) };
$("#bUser").onclick = () => user && user.type !== "guest" ? openProfile() : openAuth();
document.addEventListener("click", e => { const t = e.target.closest("[data-tg]"); if (t) gate(() => window.open("https://t.me/" + t.dataset.tg, "_blank", "noopener")) });
paintUser(); if (!user) setTimeout(openAuth, 1200);

/* ===== K. START: skeleton -> kartochkalar ===== */
skeleton(); setTimeout(render, 700);

/* Logotip bosilganda sahifa tepasiga silliq qaytish */
const brand = document.querySelector(".logo-brand");
if (brand) brand.onclick = e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) };

/* ===== Dinamik tab sarlavhasi: boshqa tabga o'tilganda o'zgaradi, qaytganda tiklanadi ===== */
const TITLE_MAIN = document.title, TITLE_AWAY = "📚 Kitoblaringiz sizni kutmoqda! — UniBooks";
document.addEventListener("visibilitychange", () => { document.title = document.hidden ? TITLE_AWAY : TITLE_MAIN });
