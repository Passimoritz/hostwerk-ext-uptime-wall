// Uptime-Wand – Seite und Kachel
const { html, t, raw } = Hostwerk;
const U = Uptime;
const CLS = { up: 'ok', down: 'err', pending: '' };
async function load() {
  let d; try { d = await Hostwerk.get('/live/uptime'); } catch (e) { Hostwerk.render('#app', html`<div class="empty"><p>${e.message}</p></div>`); return; }
  const o = U.overall(d.checks);
  if (!d.checks.length) { Hostwerk.render('#app', html`<div class="empty"><h3>${t('emptyTitle')}</h3><p>${t('emptyText')}</p></div>`); return; }
  const tile = (c, big) => html`<div class="card card-pad up-tile ${U.state(c)}">
      <div class="row-tight"><span class="badge ${CLS[U.state(c)]}">${t('state.' + U.state(c))}</span><b class="grow ellipsis">${c.name}</b></div>
      ${big ? html`<div class="up-num">${c.uptime24 == null ? '–' : c.uptime24 + ' %'}</div><div class="tiny muted">${t('uptime')}${c.avgMs != null ? ' · ' + t('avg', { ms: c.avgMs }) : ''}</div>
      <svg class="up-spark" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"><polyline points="${U.spark(c.history)}" /></svg>${c.error ? html`<div class="tiny c-err ellipsis">${c.error}</div>` : ''}` : ''}
    </div>`;
  if (Hostwerk.embed === 'widget') { Hostwerk.render('#app', html`<div class="stack" style="gap:6px"><div class="small ${o.down ? 'c-err' : 'c-ok'}">${o.down ? t('someDown', { n: o.down }) : t('allUp')}</div>${d.checks.slice(0, 6).map((c) => tile(c, false))}</div>`); return; }
  Hostwerk.render('#app', html`<div class="callout ${o.down ? 'err' : 'ok'}" style="margin-bottom:14px"><div class="callout-body"><b class="callout-title">${o.down ? t('someDown', { n: o.down }) : t('allUp')}</b>${t('summary', { up: o.up, total: o.total })}</div></div>
    <div class="grid grid-3">${d.checks.map((c) => tile(c, true))}</div>`);
  void raw;
}
Hostwerk.ready().then(() => { load(); setInterval(load, 30000); Hostwerk.on('lang', load); });
