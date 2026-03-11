// ================================================
// COMPARE — Side-by-side language comparison
// ================================================
// Renders two language identities in parallel panels.
// Each panel gets its own theme via CSS custom properties.
// ================================================
import { LANGUAGES } from './data.js';
import { computeIdentity } from './identity.js';

/**
 * Applies a language's identity to a compare panel element.
 * Sets CSS vars on the panel and populates its DOM.
 */
export function renderComparePanel(panelEl, langId, slot) {
  const lang = LANGUAGES[langId];
  if (!lang || !panelEl) return;

  const identity = computeIdentity(lang);
  const { softness, density, hue, chroma, colors: c, typography: t, secondary, tertiary } = identity;

  // Apply theme vars to this panel (scoped)
  panelEl.style.setProperty('--app-bg', c.bgPrimary);
  panelEl.style.setProperty('--app-bg-2', c.bgSecondary);
  panelEl.style.setProperty('--app-bg-3', c.bgTertiary);
  panelEl.style.setProperty('--app-bg-4', c.bgElevated);
  panelEl.style.setProperty('--app-accent', c.accent);
  panelEl.style.setProperty('--app-accent-dim', c.accentDim);
  panelEl.style.setProperty('--app-accent-subtle', c.accentSubtle);
  panelEl.style.setProperty('--app-text', c.textPrimary);
  panelEl.style.setProperty('--app-text-2', c.textSecondary);
  panelEl.style.setProperty('--app-text-3', c.textMuted);
  panelEl.style.setProperty('--app-border', c.border);
  panelEl.style.setProperty('--app-border-2', c.border2);
  panelEl.style.setProperty('--app-secondary', secondary);
  panelEl.style.setProperty('--app-tertiary', tertiary);
  panelEl.style.setProperty('--lang-font-family', lang.fontFamily);
  panelEl.style.setProperty('--lang-font-size', t.fontSize);
  panelEl.style.setProperty('--app-poem-scale', t.poemScale);
  panelEl.style.setProperty('--lang-line-height', t.lineHeight);
  panelEl.style.setProperty('--lang-font-weight', t.fontWeight);
  panelEl.style.setProperty('--app-poem-line-gap', t.poemLineGap + 'em');
  panelEl.style.setProperty('--app-poem-layout-justify', t.poemLayoutJustify);
  const nameEl = panelEl.querySelector('.mol-compare-panel__name');
  const scriptEl = panelEl.querySelector('.mol-compare-panel__script');
  const flagImg = panelEl.querySelector('.mol-compare-panel__flag');
  const softVal = panelEl.querySelector('.mol-compare-panel__softness-val');
  const softFill = panelEl.querySelector('.mol-compare-panel__softness-fill');
  const densVal = panelEl.querySelector('.mol-compare-panel__density-val');
  const densFill = panelEl.querySelector('.mol-compare-panel__density-fill');
  const hueEl = panelEl.querySelector('.mol-compare-panel__hue');
  const chromaEl = panelEl.querySelector('.mol-compare-panel__chroma');
  const poemBody = panelEl.querySelector('.mol-compare-panel__poem');
  const paletteStrip = panelEl.querySelector('.mol-compare-panel__palette');
  const typeSample = panelEl.querySelector('.mol-compare-panel__typo-sample');
  const typeName = panelEl.querySelector('.mol-compare-panel__typo-name');

  if (nameEl) nameEl.textContent = lang.name;
  if (scriptEl) scriptEl.textContent = `${lang.script} · ${lang.direction.toUpperCase()}`;
  if (flagImg && lang.flagCode) {
    flagImg.src = `syx-main--languages/img/flags/${lang.flagCode}.svg`;
    flagImg.alt = lang.name;
  }
  if (softVal) softVal.textContent = softness.toFixed(2);
  if (softFill) softFill.style.width = (softness * 100).toFixed(1) + '%';
  if (densVal) densVal.textContent = density.toFixed(2);
  if (densFill) densFill.style.width = (density * 100).toFixed(1) + '%';
  if (hueEl) hueEl.textContent = hue.toFixed(0) + '°';
  if (chromaEl) chromaEl.textContent = chroma.toFixed(2);

  if (poemBody) {
    poemBody.innerHTML = '';
    lang.poem.lines.slice(0, 3).forEach(line => {
      const div = document.createElement('div');
      div.className = 'mol-compare-panel__poem-line';
      div.textContent = line;
      div.style.fontFamily = lang.fontFamily;
      poemBody.appendChild(div);
    });
  }

  if (paletteStrip) {
    const palette = [
      c.bgPrimary, c.bgSecondary, c.bgTertiary, c.bgElevated,
      c.border, c.accentSubtle, c.accentDim, c.accent,
      secondary, tertiary, c.textPrimary
    ];
    paletteStrip.innerHTML = '';
    palette.forEach(color => {
      const swatch = document.createElement('div');
      swatch.className = 'mol-compare-panel__swatch';
      swatch.style.background = color;
      paletteStrip.appendChild(swatch);
    });
  }

  const sampleChar = { ja: '詩', ar: 'شعر', zh: '诗', ko: '시', hi: 'क', th: 'ก', fa: 'شع', he: 'שיר' };
  if (typeSample) {
    typeSample.textContent = sampleChar[lang.id] ?? 'Aa';
    typeSample.style.fontFamily = lang.fontFamily;
  }
  if (typeName) typeName.textContent = lang.fontName;

  // Update selector
  const selectEl = panelEl.querySelector('.mol-compare-panel__select');
  if (selectEl) {
    selectEl.value = langId;
    selectEl.dataset.slot = slot;
  }
}

/** Builds select options for compare dropdowns. */
export function buildCompareSelectOptions(selectEl, excludeId = null) {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  Object.entries(LANGUAGES).forEach(([id, lang]) => {
    if (id === excludeId) return;
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = lang.name;
    selectEl.appendChild(opt);
  });
}
