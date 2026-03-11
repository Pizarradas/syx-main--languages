// ================================================
// MAIN — Language Identity Engine entry point
// ================================================
// GSAP and Chart.js are loaded as globals via CDN
// <script> tags in index.html. ES modules are deferred.
// ================================================
import { LANGUAGES, METRIC_INFO } from './data.js';
import { computeIdentity }         from './identity.js';
import { applyTheme, updateContent } from './theme.js';
import { initChart, updateChart, initCompareRadar, destroyCompareRadar } from './charts.js';
import { renderComparePanel, buildCompareSelectOptions } from './compare.js';
import { initAnalyticsCharts, destroyAnalyticsCharts } from './analytics-charts.js';
import { exportCss, exportJson, downloadFile } from './export.js';

// ── GSAP defensive wrapper ───────────────────────────────────────────────────
if (typeof gsap === 'undefined') {
  console.error('[Language Identity Engine] GSAP not found. Animations disabled.');
}
const G = typeof gsap !== 'undefined' ? gsap : {
  timeline: () => ({ to: () => {}, fromTo: () => {}, call: () => {}, from: () => {} }),
  fromTo: () => {}, from: () => {}, to: () => {}, set: () => {}
};

let isTransitioning = false;
let currentLangId   = 'es';

// ── LANGUAGE SELECTOR ────────────────────────────────────────────────────────
const langSelector    = document.getElementById('lang-selector');
const selectorTrigger = document.getElementById('lang-selector-trigger');
const selectorPanel   = document.getElementById('lang-selector-panel');

function openSelector() {
  langSelector.classList.add('mol-lang-selector--open');
  selectorTrigger.setAttribute('aria-expanded', 'true');
  const active = selectorPanel.querySelector('.mol-lang-selector__option--active');
  if (active) active.focus();
}

function closeSelector() {
  langSelector.classList.remove('mol-lang-selector--open');
  selectorTrigger.setAttribute('aria-expanded', 'false');
}

function updateSelectorTrigger(lang) {
  document.getElementById('selector-code').textContent = lang.id.toUpperCase();
  document.getElementById('selector-name').textContent = lang.name;
  selectorTrigger.setAttribute('aria-label', `Language: ${lang.name}`);
  const flagImg = document.getElementById('selector-flag');
  if (flagImg && lang.flagCode) {
    flagImg.src = `syx-main--languages/img/flags/${lang.flagCode}.svg`;
    flagImg.alt = lang.name;
  }
}

selectorTrigger.addEventListener('click', e => {
  e.stopPropagation();
  langSelector.classList.contains('mol-lang-selector--open') ? closeSelector() : openSelector();
});

document.addEventListener('click', e => {
  if (!langSelector.contains(e.target)) closeSelector();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && langSelector.classList.contains('mol-lang-selector--open')) {
    closeSelector();
    selectorTrigger.focus();
  }
});

selectorPanel.querySelectorAll('.mol-lang-selector__option').forEach(option => {
  option.addEventListener('click', () => {
    const newLang = option.dataset.lang;
    if (newLang === currentLangId) { closeSelector(); return; }

    selectorPanel.querySelectorAll('.mol-lang-selector__option').forEach(opt => {
      opt.classList.remove('mol-lang-selector__option--active');
      opt.setAttribute('aria-selected', 'false');
      opt.tabIndex = -1;
    });
    option.classList.add('mol-lang-selector__option--active');
    option.setAttribute('aria-selected', 'true');
    option.tabIndex = 0;

    updateSelectorTrigger(LANGUAGES[newLang]);
    closeSelector();
    transitionToLanguage(newLang);
  });

  option.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); option.click(); return; }
    const options = [...selectorPanel.querySelectorAll('.mol-lang-selector__option')];
    const idx = options.indexOf(option);
    if (e.key === 'ArrowDown')  { e.preventDefault(); options[(idx + 1) % options.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); options[(idx - 1 + options.length) % options.length].focus(); }
    else if (e.key === 'Escape') { closeSelector(); selectorTrigger.focus(); }
  });
});

// ── METRIC TOOLTIP ───────────────────────────────────────────────────────────
const tooltip     = document.getElementById('metrics-tooltip');
const ttIcon      = document.getElementById('tt-icon');
const ttTitle     = document.getElementById('tt-title');
const ttDesc      = document.getElementById('tt-desc');
const ttVisual    = document.getElementById('tt-visual');
const ttFill      = document.getElementById('tt-fill');
const ttMarker    = document.getElementById('tt-marker');
const ttValue     = document.getElementById('tt-value');
const ttLow       = document.getElementById('tt-low');
const ttHigh      = document.getElementById('tt-high');
const ttSource    = document.getElementById('tt-source');

let tooltipHideTimer = null;

function showTooltip(btn, metricKey) {
  if (!METRIC_INFO || !METRIC_INFO[metricKey]) return;
  clearTimeout(tooltipHideTimer);

  const info = METRIC_INFO[metricKey];
  const lang = LANGUAGES[currentLangId];
  const val  = lang?.metrics?.[metricKey] ?? 0;

  // Populate
  ttIcon.textContent   = info.icon ?? '?';
  ttTitle.textContent  = info.label ?? metricKey;
  ttDesc.textContent   = info.desc ?? '';
  ttVisual.textContent = info.visual ?? '';
  ttValue.textContent  = val.toFixed(2);
  ttLow.textContent    = info.low  ?? '—';
  ttHigh.textContent   = info.high ?? '—';
  ttSource.textContent = info.source ? `Fuente: ${info.source}` : '';

  const pct = (val * 100).toFixed(1) + '%';
  ttFill.style.width   = pct;
  ttMarker.style.left  = pct;

  // Position near the button
  const rect   = btn.getBoundingClientRect();
  const tipW   = 268;
  const margin = 8;
  const vpW    = window.innerWidth;

  let left = rect.right + margin;
  if (left + tipW > vpW - margin) left = rect.left - tipW - margin;
  if (left < margin) left = margin;

  const top = Math.min(
    rect.top,
    window.innerHeight - tooltip.offsetHeight - margin
  );

  tooltip.style.left = `${left}px`;
  tooltip.style.top  = `${Math.max(margin, top)}px`;

  tooltip.setAttribute('aria-hidden', 'false');
  tooltip.classList.add('atom-tooltip--visible');
}

function hideTooltip() {
  tooltipHideTimer = setTimeout(() => {
    tooltip.classList.remove('atom-tooltip--visible');
    tooltip.setAttribute('aria-hidden', 'true');
  }, 120);
}

// Delegated event — works on dynamically generated rows
document.getElementById('metrics-list').addEventListener('mouseover', e => {
  const btn = e.target.closest('.mol-metric-row__info-btn');
  if (btn) showTooltip(btn, btn.dataset.metric);
});

document.getElementById('metrics-list').addEventListener('mouseout', e => {
  const btn = e.target.closest('.mol-metric-row__info-btn');
  if (btn) hideTooltip();
});

// Keep visible when hovering the tooltip itself
tooltip.addEventListener('mouseenter', () => clearTimeout(tooltipHideTimer));
tooltip.addEventListener('mouseleave', hideTooltip);

// ── PALETTE TOOLTIP ───────────────────────────────────────────────────
const paletteTooltip  = document.getElementById('palette-tooltip');
const paletteInfoBtn  = document.getElementById('palette-info-btn');
let paletteTooltipTimer = null;

function showPaletteTooltip() {
  clearTimeout(paletteTooltipTimer);
  if (!paletteTooltip || !paletteInfoBtn) return;

  const rect   = paletteInfoBtn.getBoundingClientRect();
  const tipW   = 280;
  const margin = 8;
  const vpW    = window.innerWidth;

  let left = rect.right + margin;
  if (left + tipW > vpW - margin) left = rect.left - tipW - margin;
  if (left < margin) left = margin;

  const top = Math.min(rect.top, window.innerHeight - paletteTooltip.offsetHeight - margin);

  paletteTooltip.style.left = `${left}px`;
  paletteTooltip.style.top  = `${Math.max(margin, top)}px`;

  paletteTooltip.setAttribute('aria-hidden', 'false');
  paletteTooltip.classList.add('atom-tooltip--visible');
}

function hidePaletteTooltip() {
  paletteTooltipTimer = setTimeout(() => {
    if (paletteTooltip) {
      paletteTooltip.classList.remove('atom-tooltip--visible');
      paletteTooltip.setAttribute('aria-hidden', 'true');
    }
  }, 120);
}

if (paletteInfoBtn) {
  paletteInfoBtn.addEventListener('mouseenter', showPaletteTooltip);
  paletteInfoBtn.addEventListener('mouseleave', hidePaletteTooltip);
}
if (paletteTooltip) {
  paletteTooltip.addEventListener('mouseenter', () => clearTimeout(paletteTooltipTimer));
  paletteTooltip.addEventListener('mouseleave', hidePaletteTooltip);
}

// ── EXPORT ────────────────────────────────────────────────────────────────────
const exportBtn   = document.getElementById('export-btn');
const exportMenu  = document.getElementById('export-menu');

function openExportMenu() {
  if (!exportMenu) return;
  exportMenu.setAttribute('aria-hidden', 'false');
  if (exportBtn) exportBtn.setAttribute('aria-expanded', 'true');
}

function closeExportMenu() {
  if (!exportMenu) return;
  exportMenu.setAttribute('aria-hidden', 'true');
  if (exportBtn) exportBtn.setAttribute('aria-expanded', 'false');
}

function doExport(format) {
  let langId = currentLangId;
  if (format === 'css-a' || format === 'json-a') langId = compareLangA;
  else if (format === 'css-b' || format === 'json-b') langId = compareLangB;

  const lang = LANGUAGES[langId];
  if (!lang) return;
  const identity = computeIdentity(lang);
  const safeName = lang.name.replace(/\s+/g, '-').toLowerCase();
  const isCss = format === 'css' || format === 'css-a' || format === 'css-b';

  if (isCss) {
    const css = exportCss(lang, identity);
    downloadFile(css, `identity-${lang.id}-${safeName}.css`, 'text/css');
  } else {
    const json = exportJson(lang, identity);
    downloadFile(json, `identity-${lang.id}-${safeName}.json`, 'application/json');
  }
  closeExportMenu();
}

if (exportBtn) {
  exportBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = exportMenu?.getAttribute('aria-hidden') === 'false';
    isOpen ? closeExportMenu() : openExportMenu();
  });
}

if (exportMenu) {
  exportMenu.querySelectorAll('[role="menuitem"]').forEach(btn => {
    btn.addEventListener('click', () => doExport(btn.dataset.format));
  });
}

document.addEventListener('click', (e) => {
  if (exportMenu && exportBtn && !exportMenu.contains(e.target) && !exportBtn.contains(e.target)) {
    closeExportMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && exportMenu?.getAttribute('aria-hidden') === 'false') {
    closeExportMenu();
    exportBtn?.focus();
  }
});

// ── TRANSITION ───────────────────────────────────────────────────────────────
// Entrance animations are created INSIDE the exit timeline's onComplete
// callback — this guarantees the new DOM elements exist before GSAP targets them.

function transitionToLanguage(newLangId) {
  if (isTransitioning || newLangId === currentLangId) return;
  isTransitioning = true;

  hideTooltip();
  hidePaletteTooltip();

  const lang     = LANGUAGES[newLangId];
  const identity = computeIdentity(lang);
  const ease     = lang.gsapEase || 'power2.out';
  const isRTL    = lang.direction === 'rtl';

  const exitLines = [...document.querySelectorAll('.mol-poem-display__line')];

  const exitTl = G.timeline({
    onComplete() {
      applyTheme(lang, identity);
      updateContent(lang, identity);
      updateChart(lang, identity);
      currentLangId = newLangId;
      isTransitioning = false;

      // Build entrance timeline AFTER new elements exist in DOM
      const newLines = [...document.querySelectorAll('.mol-poem-display__line')];
      const enterTl  = G.timeline();

      enterTl.fromTo(newLines,
        { opacity: 0, x: isRTL ? -16 : 16, y: 4 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 0.55, ease,
          stagger: { each: 0.08, from: isRTL ? 'end' : 'start' }
        }
      );
      enterTl.fromTo(['#poem-author', '#poem-title'],
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease, stagger: 0.06 },
        '<+0.1'
      );
      enterTl.fromTo('#poem-accent-line',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease, transformOrigin: isRTL ? 'right' : 'left' },
        '<+0.15'
      );
      enterTl.fromTo('.mol-metric-row__fill, .atom-macro-bar__fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power2.out', stagger: 0.02, transformOrigin: 'left' },
        '<-0.2'
      );
      enterTl.fromTo('.atom-palette-swatch',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', stagger: 0.04 },
        '<+0.1'
      );
      enterTl.fromTo('.org-identity-panel__palette-hierarchy-segment',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', stagger: 0.03, transformOrigin: 'left' },
        '<+0.05'
      );
      enterTl.fromTo('.mol-identity-num__value',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease, stagger: 0.05 },
        '<'
      );
    }
  });

  if (exitLines.length) {
    exitTl.to(exitLines, {
      opacity: 0, x: isRTL ? 12 : -12,
      duration: 0.25, ease: 'power2.in',
      stagger: { each: 0.04, from: isRTL ? 'end' : 'start' }
    });
  }

  exitTl.to(['#poem-author', '#poem-title', '#poem-accent-line'], {
    opacity: 0, duration: 0.2, ease: 'power2.in'
  }, '<');
}

// ── INITIAL RENDER ───────────────────────────────────────────────────────────
function initApp() {
  const lang     = LANGUAGES['es'];
  const identity = computeIdentity(lang);

  applyTheme(lang, identity);
  updateContent(lang, identity);

  // Defer chart init slightly so Chart.js is ready (CDN load order)
  setTimeout(() => initChart(lang, identity), 50);

  const lines = [...document.querySelectorAll('.mol-poem-display__line')];

  G.fromTo(lines,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.3 }
  );
  G.fromTo(['#poem-author', '#poem-title', '#poem-accent-line'],
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 0.15 }
  );
  G.fromTo('.atom-macro-bar__fill, .mol-metric-row__fill',
    { scaleX: 0 },
    { scaleX: 1, duration: 1.0, ease: 'power2.out', stagger: 0.025, delay: 0.4, transformOrigin: 'left' }
  );
  G.fromTo('.atom-palette-swatch',
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.06, delay: 0.6 }
  );
  G.fromTo('.org-identity-panel__palette-hierarchy-segment',
    { opacity: 0, scaleX: 0 },
    { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04, transformOrigin: 'left', delay: 0.7 }
  );
  G.from('.mol-identity-num',
    { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out', stagger: 0.07, delay: 0.5 }
  );
}

// ── VIEW SWITCHING (Explorar | Comparar | Análisis) ───────────────────────────
const appCanvas     = document.getElementById('app-canvas');
const compareView   = document.getElementById('compare-view');
const analyticsView = document.getElementById('analytics-view');
const viewTabs      = document.querySelectorAll('.mol-view-tab');
const comparePanelA = document.getElementById('compare-panel-a');
const comparePanelB = document.getElementById('compare-panel-b');
const compareSelectA = document.getElementById('compare-select-a');
const compareSelectB = document.getElementById('compare-select-b');

let compareLangA = 'es';
let compareLangB = 'en';

function setView(view) {
  viewTabs.forEach(tab => {
    const isActive = tab.dataset.view === view;
    tab.classList.toggle('mol-view-tab--active', isActive);
    tab.setAttribute('aria-selected', isActive);
  });

  const showSingle = view === 'single';
  const showCompare = view === 'compare';
  const showAnalytics = view === 'analytics';

  appCanvas.hidden = !showSingle;
  langSelector.closest('nav').hidden = !showSingle;

  if (compareView) {
    compareView.hidden = !showCompare;
    compareView.setAttribute('aria-hidden', !showCompare);
  }

  const exportCompareDivider = document.getElementById('export-compare-divider');
  const exportCompareItems = document.querySelectorAll('.atom-export-menu__compare-item');
  if (exportCompareDivider) exportCompareDivider.hidden = !showCompare;
  exportCompareItems.forEach(el => { el.hidden = !showCompare; });
  if (analyticsView) {
    analyticsView.hidden = !showAnalytics;
    analyticsView.setAttribute('aria-hidden', !showAnalytics);
  }

  if (showCompare) {
    buildCompareSelectOptions(compareSelectA, compareLangB);
    buildCompareSelectOptions(compareSelectB, compareLangA);
    if (compareSelectA) compareSelectA.value = compareLangA;
    if (compareSelectB) compareSelectB.value = compareLangB;
    renderComparePanel(comparePanelA, compareLangA, 'a');
    renderComparePanel(comparePanelB, compareLangB, 'b');
    const langA = LANGUAGES[compareLangA];
    const langB = LANGUAGES[compareLangB];
    if (langA && langB) {
      const identityA = computeIdentity(langA);
      const identityB = computeIdentity(langB);
      initCompareRadar(langA, identityA, langB, identityB);
      document.documentElement.style.setProperty('--compare-hue-a', String(identityA.hue));
      document.documentElement.style.setProperty('--compare-hue-b', String(identityB.hue));
    }
    const legendA = document.getElementById('compare-legend-a');
    const legendB = document.getElementById('compare-legend-b');
    if (legendA) legendA.textContent = `A — ${langA?.name ?? ''}`;
    if (legendB) legendB.textContent = `B — ${langB?.name ?? ''}`;
  } else {
    destroyCompareRadar();
  }

  if (showAnalytics) {
    setTimeout(() => initAnalyticsCharts(), 80);
  } else {
    destroyAnalyticsCharts();
  }
}

viewTabs.forEach(tab => {
  tab.addEventListener('click', () => setView(tab.dataset.view));
});

function updateCompareRadar() {
  const langA = LANGUAGES[compareLangA];
  const langB = LANGUAGES[compareLangB];
  if (langA && langB && compareView && !compareView.hidden) {
    const identityA = computeIdentity(langA);
    const identityB = computeIdentity(langB);
    initCompareRadar(langA, identityA, langB, identityB);
    document.documentElement.style.setProperty('--compare-hue-a', String(identityA.hue));
    document.documentElement.style.setProperty('--compare-hue-b', String(identityB.hue));
    const legendA = document.getElementById('compare-legend-a');
    const legendB = document.getElementById('compare-legend-b');
    if (legendA) legendA.textContent = `A — ${langA.name}`;
    if (legendB) legendB.textContent = `B — ${langB.name}`;
  }
}

if (compareSelectA) {
  compareSelectA.addEventListener('change', e => {
    compareLangA = e.target.value;
    buildCompareSelectOptions(compareSelectB, compareLangA);
    renderComparePanel(comparePanelA, compareLangA, 'a');
    updateCompareRadar();
  });
}
if (compareSelectB) {
  compareSelectB.addEventListener('change', e => {
    compareLangB = e.target.value;
    buildCompareSelectOptions(compareSelectA, compareLangB);
    renderComparePanel(comparePanelB, compareLangB, 'b');
    updateCompareRadar();
  });
}

// ── BOOT ─────────────────────────────────────────────────────────────────────
initApp();
