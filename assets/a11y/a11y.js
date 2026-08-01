/* COLORS OF HAVEN — ווידג'ט נגישות. עצמאי: מזריק CSS ו-DOM משלו, שומר העדפות ב-localStorage. */
(function () {
  if (window.__cohA11y) return; window.__cohA11y = true;
  var KEY = 'coh-a11y-v1';
  var D = { zoom: 1, contrast: 0, links: 0, motion: 0, cursor: 0, font: 0, spacing: 0 };
  var S = load();

  function load() { try { return Object.assign({}, D, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return Object.assign({}, D); } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  var css = document.createElement('style');
  css.textContent = [
    '.a11y-skip{position:fixed;top:-100px;right:20px;z-index:9999;background:#0F2233;color:#F2EADF;padding:12px 20px;border-radius:6px;font:600 14px Rubik,system-ui,sans-serif;text-decoration:none;transition:top 220ms cubic-bezier(.16,1,.3,1)}',
    '.a11y-skip:focus{top:20px}',
    '.a11y-btn{position:fixed;left:20px;bottom:84px;z-index:2400;width:52px;height:52px;border:0;border-radius:50%;background:#123A5C;color:#F2EADF;cursor:pointer;box-shadow:0 10px 26px rgba(15,34,51,.3);display:grid;place-items:center;transition:transform 220ms cubic-bezier(.16,1,.3,1),background 200ms}',
    '.a11y-btn:hover{background:#0F2233;transform:scale(1.06)}',
    '.a11y-btn svg{width:26px;height:26px;fill:currentColor}',
    '.a11y-wrap{position:fixed;inset:0;z-index:2500;display:none;background:rgba(15,34,51,.34)}',
    '.a11y-wrap.open{display:block}',
    '.a11y-panel{position:absolute;top:0;left:0;bottom:0;width:min(340px,88vw);background:#FFFFFF;box-shadow:18px 0 46px rgba(15,34,51,.3);padding:24px 22px 32px;overflow-y:auto;transform:translateX(-100%);transition:transform 460ms cubic-bezier(.16,1,.3,1);font-family:Rubik,system-ui,sans-serif;direction:rtl;text-align:right}',
    '.a11y-wrap.open .a11y-panel{transform:none}',
    '.a11y-panel h2{margin:0 0 4px;font-size:19px;font-weight:700;color:#0F2233}',
    '.a11y-panel p.sub{margin:0 0 20px;font-size:13px;line-height:1.6;color:#5C7183}',
    '.a11y-close{position:absolute;top:18px;left:18px;width:34px;height:34px;border:0;border-radius:50%;background:#F4F6F8;color:#0F2233;font-size:18px;cursor:pointer;line-height:1}',
    '.a11y-close:hover{background:#E6EBF0}',
    '.a11y-grp{margin-bottom:20px}',
    '.a11y-grp h3{margin:0 0 9px;font-size:12px;letter-spacing:.1em;font-weight:700;color:#8CA0AF}',
    '.a11y-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.a11y-opt{flex:1 1 auto;min-width:74px;min-height:46px;padding:9px 12px;border:1px solid rgba(15,34,51,.16);border-radius:8px;background:#fff;color:#284559;font:600 13px inherit;cursor:pointer;transition:background 180ms,border-color 180ms,color 180ms}',
    '.a11y-opt:hover{background:#F4F6F8}',
    '.a11y-opt[aria-pressed="true"]{background:#0F2233;border-color:#0F2233;color:#F2EADF}',
    '.a11y-reset{width:100%;min-height:48px;margin-top:6px;border:1px solid rgba(15,34,51,.2);border-radius:999px;background:#fff;color:#0F2233;font:600 14px inherit;cursor:pointer}',
    '.a11y-reset:hover{background:#F4F6F8}',
    '.a11y-note{margin:18px 0 0;font-size:12px;line-height:1.7;color:#8CA0AF}',
    '.a11y-panel a{color:#123A5C}',
    /* --- applied modes --- */
    'html.a11y-contrast-1{filter:contrast(1.4) saturate(1.25)}',
    'html.a11y-contrast-2{filter:invert(1) hue-rotate(180deg)}',
    'html.a11y-contrast-2 img,html.a11y-contrast-2 video,html.a11y-contrast-2 canvas,html.a11y-contrast-2 .leaflet-container{filter:invert(1) hue-rotate(180deg)}',
    'html.a11y-contrast-3{filter:grayscale(1) contrast(1.15)}',
    'html.a11y-links a{text-decoration:underline !important;text-underline-offset:3px;outline:1px dashed currentColor;outline-offset:3px}',
    'html.a11y-motion *,html.a11y-motion *::before,html.a11y-motion *::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}',
    'html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 48 48\'%3E%3Cpath d=\'M6 2l30 20-13 3 7 15-6 3-7-15-11 9z\' fill=\'%23fff\' stroke=\'%23000\' stroke-width=\'2.5\'/%3E%3C/svg%3E") 4 2,auto !important}',
    'html.a11y-font body,html.a11y-font body *:not(.a11y-panel):not(.a11y-panel *){font-family:Arial,Helvetica,system-ui,sans-serif !important;letter-spacing:.01em}',
    'html.a11y-spacing body p,html.a11y-spacing body li,html.a11y-spacing body small,html.a11y-spacing body figcaption{line-height:2 !important;letter-spacing:.03em !important;word-spacing:.1em !important}',
    'html.a11y-open{overflow:hidden}',
    ':focus-visible{outline:3px solid #C9AE87 !important;outline-offset:3px}',
    '@media (max-width:720px){.a11y-btn{left:14px;bottom:76px;width:46px;height:46px}}'
  ].join('');
  document.head.appendChild(css);

  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M20.5 7.4c-2.7.9-5.5 1.4-8.5 1.4s-5.8-.5-8.5-1.4a1.1 1.1 0 0 0-.7 2.1c2.2.8 4.5 1.3 6.9 1.5l-1.1 4.1-2.2 6.2a1.15 1.15 0 0 0 2.2.8l2.4-6.7h.1l2.4 6.7a1.15 1.15 0 0 0 2.2-.8l-2.2-6.2-1.1-4.1c2.4-.2 4.7-.7 6.9-1.5a1.1 1.1 0 0 0-.7-2.1z"/></svg>';

  var skip = document.createElement('a');
  skip.className = 'a11y-skip'; skip.href = '#services'; skip.textContent = 'דלג לתוכן הראשי';

  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'a11y-btn'; btn.setAttribute('aria-label', 'אפשרויות נגישות');
  btn.setAttribute('aria-expanded', 'false'); btn.innerHTML = ICON;

  var wrap = document.createElement('div');
  wrap.className = 'a11y-wrap'; wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', 'אפשרויות נגישות');

  function group(title, opts) {
    return '<div class="a11y-grp"><h3>' + title + '</h3><div class="a11y-row">' +
      opts.map(function (o) { return '<button type="button" class="a11y-opt" data-k="' + o[0] + '" data-v="' + o[1] + '" aria-pressed="false">' + o[2] + '</button>'; }).join('') +
      '</div></div>';
  }

  wrap.innerHTML = '<div class="a11y-panel">' +
    '<button type="button" class="a11y-close" aria-label="סגירה">✕</button>' +
    '<h2>נגישות</h2><p class="sub">ההעדפות נשמרות בדפדפן שלכם וימשיכו לעבוד בביקור הבא.</p>' +
    group('גודל תצוגה', [['zoom', 1, '100%'], ['zoom', 1.15, '115%'], ['zoom', 1.3, '130%'], ['zoom', 1.5, '150%']]) +
    group('צבעים וניגודיות', [['contrast', 0, 'רגיל'], ['contrast', 1, 'ניגודיות גבוהה'], ['contrast', 2, 'רקע כהה'], ['contrast', 3, 'גווני אפור']]) +
    group('קריאות', [['font', 1, 'פונט קריא'], ['spacing', 1, 'ריווח שורות'], ['links', 1, 'הדגשת קישורים']]) +
    group('תנועה וסמן', [['motion', 1, 'עצירת אנימציות'], ['cursor', 1, 'סמן גדול']]) +
    '<button type="button" class="a11y-reset">איפוס כל ההגדרות</button>' +
    '<p class="a11y-note">האתר נבנה בהתאם לתקן הישראלי 5568 ברמה AA. נתקלתם בבעיית נגישות? כתבו לנו ל־<a href="mailto:barakfid88@gmail.com">barakfid88@gmail.com</a> או התקשרו <a href="tel:+972587808908" style="direction:ltr;display:inline-block">058-780-8908</a> ונטפל בזה.</p>' +
    '</div>';

  function mount() {
    document.body.insertBefore(skip, document.body.firstChild);
    document.body.appendChild(btn);
    document.body.appendChild(wrap);
    wrap.querySelectorAll('.a11y-opt').forEach(function (o) {
      o.addEventListener('click', function () {
        var k = o.dataset.k, v = parseFloat(o.dataset.v);
        S[k] = (k === 'zoom' || k === 'contrast') ? v : (S[k] ? 0 : 1);
        apply(); save();
      });
    });
    wrap.querySelector('.a11y-reset').addEventListener('click', function () { S = Object.assign({}, D); apply(); save(); });
    wrap.querySelector('.a11y-close').addEventListener('click', function () { open(false); });
    wrap.addEventListener('click', function (e) { if (e.target === wrap) open(false); });
    btn.addEventListener('click', function () { open(!wrap.classList.contains('open')); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('open')) open(false); });
    apply();
  }

  function open(on) {
    wrap.classList.toggle('open', on);
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    document.documentElement.classList.toggle('a11y-open', on);
    if (on) wrap.querySelector('.a11y-close').focus(); else btn.focus();
  }

  function apply() {
    var h = document.documentElement;
    var b = document.body;
    if (S.zoom !== 1) { b.style.zoom = S.zoom; b.style.overflowX = 'hidden'; }
    else { b.style.zoom = ''; b.style.overflowX = ''; }
    h.style.zoom = '';
    [1, 2, 3].forEach(function (n) { h.classList.toggle('a11y-contrast-' + n, S.contrast === n); });
    h.classList.toggle('a11y-links', !!S.links);
    h.classList.toggle('a11y-motion', !!S.motion);
    h.classList.toggle('a11y-cursor', !!S.cursor);
    h.classList.toggle('a11y-font', !!S.font);
    h.classList.toggle('a11y-spacing', !!S.spacing);
    if (S.motion) { document.querySelectorAll('video').forEach(function (v) { try { v.pause(); } catch (e) {} }); }
    wrap.querySelectorAll('.a11y-opt').forEach(function (o) {
      var k = o.dataset.k, v = parseFloat(o.dataset.v);
      o.setAttribute('aria-pressed', String(S[k] === v));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
