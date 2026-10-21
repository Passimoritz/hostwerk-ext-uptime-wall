// Uptime-Wand – Seite und Kachel
const { html, t } = Hostwerk;
const U = Uptime;
const CLS = { up: 'ok', down: 'err', pending: '' };
const pct = (n) => (n == null ? '–' : `${Hostwerk.fmt.number(n)} %`);

function failed(e) {
  // Fehler nie als leeres „–“ stehen lassen: kurz sagen, was los ist, und „Erneut versuchen“ anbieten
  Hostwerk.render('#app', html`<div class="empty"><h3>${t('loadFailed')}</h3><p class="small muted">${(e && e.message) || ''}</p><div class="empty-action"><button type="button" class="btn" id="retry">${t('retry')}</button></div></div>`);
  document.getElementById('retry').addEventListener('click', load);
}

async function load() {
  let d; try { d = await Hostwerk.get('/live/uptime'); } catch (e) { failed(e); return; }
  const checks = Array.isArray(d && d.checks) ? d.checks : [];
  const o = U.overall(checks);
  if (!checks.length) {
    Hostwerk.render('#app', html`<div class="empty"><h3>${t('emptyTitle')}</h3><p>${t('emptyText')}</p><div class="empty-action"><button type="button" class="btn primary" id="add">${t('addCheck')}</button></div></div>`);
    document.getElementById('add').addEventListener('click', () => Hostwerk.navigate('/live/monitor'));
    return;
  }
  const tile = (c, big) => {
    const st = U.state(c);
    const out = U.outages(c.history);
    const label = U.describe(c, { pct, outages: (n) => t('outages', { n }), avg: (ms) => t('avg', { ms: Hostwerk.fmt.number(ms) }), uptime: t('uptime') });
    return html`<div class="card card-pad up-tile ${st}">
      <div class="row-tight"><span class="badge ${CLS[st]}">${t('state.' + st)}</span><b class="grow ellipsis">${c.name}</b></div>
      ${big ? html`<div class="up-num">${pct(c.uptime24)}</div><div class="tiny muted">${t('uptime')}${c.avgMs != null ? ' · ' + t('avg', { ms: Hostwerk.fmt.number(c.avgMs) }) : ''}${out ? html` · <span class="c-err">${t('outages', { n: out })}</span>` : ''}</div>
      <svg class="up-spark" viewBox="0 0 120 28" preserveAspectRatio="none" role="img" aria-label="${label}"><title>${label}</title><polyline points="${U.spark(c.history)}" /></svg>${c.error ? html`<div class="tiny c-err ellipsis" title="${c.error}">${c.error}</div>` : ''}` : ''}
    </div>`;
  };
  if (Hostwerk.embed === 'widget') { Hostwerk.render('#app', html`<div class="stack" style="gap: var(--sp-2, 8px)"><div class="small ${o.down ? 'c-err' : 'c-ok'}">${o.down ? t('someDown', { n: o.down }) : t('allUp')}</div>${checks.slice(0, 6).map((c) => tile(c, false))}</div>`); return; }
  Hostwerk.render('#app', html`<div class="callout ${o.down ? 'err' : 'ok'}" style="margin-bottom: var(--sp-3, 12px)"><div class="callout-body"><b class="callout-title">${o.down ? t('someDown', { n: o.down }) : t('allUp')}</b>${t('summary', { up: o.up, total: o.total })}</div></div>
    <div class="grid grid-3">${checks.map((c) => tile(c, true))}</div>`);
}
// Alle 30 s nachladen – nicht, solange Seite oder Übersicht verborgen sind; beim Zurückkommen sofort
Hostwerk.ready().then(() => {
  load();
  setInterval(() => { if (!document.hidden) load(); }, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
  Hostwerk.on('lang', load);
});
