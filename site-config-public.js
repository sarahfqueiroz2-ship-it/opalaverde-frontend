/* Public site settings. Safe DOM updates; no HTML injection. */
(function () {
  const endpoint = 'http://127.0.0.1:8000/api/accounts/site-settings/public/';
  function text(el, value) { if (el && typeof value === 'string' && value.trim()) el.textContent = value; }
  function apply(data) {
    if (!data || typeof data !== 'object') return;
    document.querySelectorAll('[data-site-field]').forEach(el => {
      const field = el.getAttribute('data-site-field');
      if (Object.prototype.hasOwnProperty.call(data, field)) text(el, data[field]);
    });
    // Replace the brand in page titles, not within articles, reviews or user content.
    if (data.site_name && document.title.includes('OpalaVerde')) document.title = document.title.replace(/OpalaVerde/g, data.site_name);
    document.querySelectorAll('h1').forEach(el => {
      if (el.textContent.trim() === 'OpalaVerde') text(el, data.site_name);
    });
  }
  function init() {
    fetch(endpoint, {headers: {'Accept': 'application/json'}})
      .then(r => {if (!r.ok) throw Error('HTTP ' + r.status); return r.json();})
      .then(apply)
      .catch(err => console.warn('Configurações públicas indisponíveis; exibindo valores padrão.', err));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
