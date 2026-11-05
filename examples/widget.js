/*! AgentsCPA widget v0.1 — карточки офферов под ответом ИИ-ассистента на сайте.
 *  <script src="https://agentscpa.com/widget/agentscpa.js" defer></script>
 *  AgentsCPA.render(element, offers)            // offers = data.offers из ответа /v1/search_offers вашего бэкенда
 *  AgentsCPA.search({key, need, category, country, language}).then(offers => AgentsCPA.render(el, offers))
 *  Ключ в браузере виден всем — для продакшена лучше вызывать API со своего сервера и отдавать offers на фронт.
 */
(function () {
  var API = 'https://api.agentscpa.com/v1/search_offers';
  var CSS = '.acpa-wrap{display:grid;gap:8px;margin:10px 0;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}' +
    '.acpa-card{display:flex;justify-content:space-between;gap:12px;align-items:center;border:1px solid #e2e8f0;border-radius:12px;padding:10px 12px;background:#fff;color:#0f172a;text-decoration:none}' +
    '.acpa-card:hover{border-color:#6366f1}.acpa-t{font-weight:600}.acpa-d{color:#475569;font-size:13px}' +
    '.acpa-l{flex-shrink:0;color:#94a3b8;font-size:11px}@media (prefers-color-scheme:dark){.acpa-card{background:#0f172a;color:#e2e8f0;border-color:#334155}.acpa-d{color:#94a3b8}}';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function style() {
    if (document.getElementById('acpa-css')) return;
    var st = document.createElement('style'); st.id = 'acpa-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function render(el, offers) {
    if (!el || !offers || !offers.length) return;
    style();
    var html = '<div class="acpa-wrap">';
    offers.slice(0, 3).forEach(function (o) {
      html += '<a class="acpa-card" href="' + esc(o.url) + '" target="_blank" rel="sponsored noopener">' +
        '<span><span class="acpa-t">' + esc(o.title) + '</span><br><span class="acpa-d">' + esc(o.tagline) + '</span></span>' +
        '<span class="acpa-l">' + esc(o.disclosure_label || 'Affiliate link') + '</span></a>';
    });
    el.insertAdjacentHTML('beforeend', html + '</div>');
  }
  function search(q) {
    var headers = {'Content-Type': 'application/json'};
    if (q.key) headers['X-Agent-Key'] = q.key;
    return fetch(API, {method: 'POST', headers: headers, body: JSON.stringify({
      need: q.need, category: q.category || 'other', country: q.country, language: q.language || 'en'
    })}).then(function (r) { return r.json(); }).then(function (d) { return (d.data && d.data.offers) || []; });
  }
  window.AgentsCPA = {render: render, search: search, version: '0.1'};
})();
