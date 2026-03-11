// ================================================
// THEME + CONTENT — v3
// ================================================
// applyTheme  — writes computed identity to CSS custom properties
// updateContent — updates DOM elements with language data
// ================================================
import { METRIC_LABELS, METRIC_INFO } from './data.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function applyTheme(lang, identity) {
  const root = document.documentElement;
  const { colors: c, typography: t, secondary, tertiary, paletteHierarchy } = identity;

  // ── PALETTE ─────────────────────────────────────────────────────────
  root.style.setProperty('--app-bg',         c.bgPrimary);
  root.style.setProperty('--app-bg-2',       c.bgSecondary);
  root.style.setProperty('--app-bg-3',       c.bgTertiary);
  root.style.setProperty('--app-bg-4',      c.bgElevated);
  root.style.setProperty('--app-accent',     c.accent);
  root.style.setProperty('--app-accent-dim', c.accentDim);
  root.style.setProperty('--app-accent-subtle', c.accentSubtle);
  root.style.setProperty('--app-accent-muted',  c.accentMuted);
  root.style.setProperty('--app-text',       c.textPrimary);
  root.style.setProperty('--app-text-2',     c.textSecondary);
  root.style.setProperty('--app-text-3',     c.textMuted);
  root.style.setProperty('--app-text-accent', c.textAccent);
  root.style.setProperty('--app-border',     c.border);
  root.style.setProperty('--app-border-2',   c.border2);
  root.style.setProperty('--app-border-subtle', c.borderSubtle);
  root.style.setProperty('--app-secondary',  secondary);
  root.style.setProperty('--app-tertiary',   tertiary);

  // ── PALETTE HIERARCHY (adaptativa) ───────────────────────────────────
  if (paletteHierarchy?.length) {
    const wAcc = paletteHierarchy.find(s => s.label === 'acc')?.weight ?? 8;
    const wBg2 = paletteHierarchy.find(s => s.label === 'bg2')?.weight ?? 20;
    const wBg3 = paletteHierarchy.find(s => s.label === 'bg3')?.weight ?? 12;
    root.style.setProperty('--palette-w-accent', String(wAcc));
    root.style.setProperty('--palette-w-bg2', String(wBg2));
    root.style.setProperty('--palette-w-bg3', String(wBg3));
  } else {
    root.style.setProperty('--palette-w-accent', '8');
    root.style.setProperty('--palette-w-bg2', '20');
    root.style.setProperty('--palette-w-bg3', '12');
  }

  // ── v2 TYPOGRAPHY ────────────────────────────────────────────────────
  root.style.setProperty('--lang-font-family',    lang.fontFamily);
  root.style.setProperty('--lang-letter-spacing', t.letterSpacing);
  root.style.setProperty('--lang-line-height',    t.lineHeight);
  root.style.setProperty('--lang-radius',         t.radius);
  root.style.setProperty('--lang-font-weight',    t.fontWeight);
  root.style.setProperty('--lang-font-size',      t.fontSize);

  // ── v2 MOTION ────────────────────────────────────────────────────────
  root.style.setProperty('--app-anim-duration', t.animDuration);

  // ── v2 SPACE & DEPTH ─────────────────────────────────────────────────
  root.style.setProperty('--app-gap-scale',    t.gapScale);
  root.style.setProperty('--app-shadow-blur',  t.shadowBlur);
  root.style.setProperty('--app-border-width', t.borderWidth);

  // ── v3 POEM STYLE ────────────────────────────────────────────────────
  root.style.setProperty('--lang-font-style',       t.fontStyle);
  root.style.setProperty('--lang-text-shadow',      t.textShadow);
  root.style.setProperty('--app-accent-glow',       t.accentGlow);
  root.style.setProperty('--app-backdrop-blur',     t.backdropBlur);
  root.style.setProperty('--app-noise-opacity',     t.noiseOpacity);
  root.style.setProperty('--app-poem-text-align',     t.poemTextAlign);
  root.style.setProperty('--app-poem-align-items',    t.poemAlignItems);
  root.style.setProperty('--app-poem-scale',          t.poemScale);
  root.style.setProperty('--app-poem-line-gap',       t.poemLineGap + 'em');
  root.style.setProperty('--app-poem-layout-justify', t.poemLayoutJustify);
  root.style.setProperty('--lang-word-spacing',          t.wordSpacing);
  root.style.setProperty('--lang-font-feature-settings', t.fontFeatureSettings);

  // ── SYX SEMANTIC BRIDGE ──────────────────────────────────────────────
  root.style.setProperty('--semantic-color-bg-primary',      c.bgPrimary);
  root.style.setProperty('--semantic-color-bg-secondary',    c.bgSecondary);
  root.style.setProperty('--semantic-color-bg-tertiary',     c.bgTertiary);
  root.style.setProperty('--semantic-color-primary',         c.accent);
  root.style.setProperty('--semantic-color-secondary',       secondary);
  root.style.setProperty('--semantic-color-tertiary',         tertiary);
  root.style.setProperty('--semantic-color-text-primary',    c.textPrimary);
  root.style.setProperty('--semantic-color-text-secondary',  c.textSecondary);
  root.style.setProperty('--semantic-color-border-default',  c.border);
  root.style.setProperty('--semantic-border-radius-default', t.radius);
  root.style.setProperty('--reset-body-background-color',    c.bgPrimary);
  root.style.setProperty('--reset-body-color',               c.textPrimary);

  // ── ATTRIBUTES ───────────────────────────────────────────────────────
  root.lang             = lang.id;
  root.dir              = lang.direction;
  root.dataset.language = lang.id;
  // data-script drives CSS background patterns (see _script-decorations.scss)
  root.dataset.script   = lang.script.toLowerCase();
}

export function updateContent(lang, identity) {
  const { softness, density, hue, chroma, wavelengthNm, colors: c, typography: t, secondary, tertiary, paletteHierarchy } = identity;

  // Language name + script meta
  document.getElementById('lang-name').textContent    = lang.name;
  document.getElementById('script-name').textContent  = `${lang.script} Script`;
  document.getElementById('dir-badge').textContent    = lang.direction.toUpperCase();
  document.getElementById('script-badge').textContent = `${lang.script} · ${lang.direction.toUpperCase()}`;

  // Macro indicators
  document.getElementById('val-softness').textContent  = softness.toFixed(2);
  document.getElementById('val-density').textContent   = density.toFixed(2);
  document.getElementById('fill-softness').style.width = (softness * 100).toFixed(1) + '%';
  document.getElementById('fill-density').style.width  = (density * 100).toFixed(1) + '%';

  // Identity numbers (λ = longitud de onda espectral CIE)
  const numWl = document.getElementById('num-wavelength');
  if (numWl && wavelengthNm) numWl.textContent = `${wavelengthNm} nm`;
  document.getElementById('num-hue').textContent      = hue + '°';
  document.getElementById('num-chroma').textContent   = chroma.toFixed(2);
  document.getElementById('num-softness').textContent = softness.toFixed(2);
  document.getElementById('num-density').textContent  = density.toFixed(2);

  // Typography extra params chip
  const specimenParams = document.getElementById('typo-extra-params');
  if (specimenParams) {
    specimenParams.textContent = `W: ${t.fontWeight}  ·  S: ${t.fontSize}  ·  ${t.fontStyle === 'italic' ? 'italic' : 'normal'}`;
  }

  // Poem
  document.getElementById('poem-author').textContent = lang.poem.author;
  document.getElementById('poem-title').textContent  = lang.poem.title;

  const poemBody = document.getElementById('poem-body');
  poemBody.innerHTML = '';
  const hasWordBoundaries = /\s/.test(lang.poem.lines[0] || '');
  lang.poem.lines.forEach((line, i) => {
    const el = document.createElement('div');
    el.className = 'mol-poem-display__line';
    el.setAttribute('role', 'text');
    // First line, first word in accent (palette hierarchy: accent ≈ 8%)
    if (i === 0 && line && hasWordBoundaries) {
      const parts = line.split(/(\s+)/);
      const firstWord = parts.shift();
      const rest = parts.join('');
      el.innerHTML = `<span class="mol-poem-display__line-accent">${escapeHtml(firstWord)}</span>${escapeHtml(rest)}`;
    } else if (i === 0 && line && !hasWordBoundaries) {
      // CJK etc: accent first character
      const first = line.slice(0, 1);
      const rest = line.slice(1);
      el.innerHTML = `<span class="mol-poem-display__line-accent">${escapeHtml(first)}</span>${escapeHtml(rest)}`;
    } else {
      el.textContent = line;
    }
    poemBody.appendChild(el);
  });

  // Metrics list with info buttons
  const metricsList = document.getElementById('metrics-list');
  metricsList.innerHTML = '';
  Object.entries(lang.metrics).forEach(([key, val]) => {
    const info = METRIC_INFO?.[key];
    const row = document.createElement('div');
    row.className = 'mol-metric-row';
    row.innerHTML = `
      <button class="mol-metric-row__info-btn"
              data-metric="${key}"
              aria-label="Más info: ${METRIC_LABELS[key] || key}"
              type="button">
        <span aria-hidden="true">${info?.icon ?? '?'}</span>
      </button>
      <span class="mol-metric-row__label">${METRIC_LABELS[key] || key}</span>
      <div class="mol-metric-row__bar">
        <div class="mol-metric-row__fill" style="width: ${(val * 100).toFixed(0)}%"></div>
      </div>
      <span class="mol-metric-row__num">${val.toFixed(2)}</span>
    `;
    metricsList.appendChild(row);
  });

  // Palette strip (subcolores incluidos)
  const paletteStrip = document.getElementById('palette-strip');
  paletteStrip.innerHTML = '';
  const palette = [
    { color: c.bgPrimary,    label: 'bg'   },
    { color: c.bgSecondary,  label: 'bg2'  },
    { color: c.bgTertiary,   label: 'bg3'  },
    { color: c.bgElevated,   label: 'bg4'  },
    { color: c.border,       label: 'bdr'  },
    { color: c.accentSubtle, label: 'acc~' },
    { color: c.accentDim,    label: 'acc−' },
    { color: c.accent,       label: 'acc'  },
    { color: secondary,      label: 'sec'  },
    { color: tertiary,      label: 'ter'  },
    { color: c.textPrimary,  label: 'txt'  }
  ];
  palette.forEach(({ color, label }) => {
    const swatch = document.createElement('div');
    swatch.className = 'atom-palette-swatch';
    swatch.style.background = color;
    swatch.title = `${label}: ${color}`;
    swatch.setAttribute('aria-label', `Color ${label}`);
    paletteStrip.appendChild(swatch);
  });

  // Palette hierarchy bar — proporciones adaptativas (softness/density)
  const paletteHierarchyEl = document.getElementById('palette-hierarchy');
  if (paletteHierarchyEl && paletteHierarchy?.length) {
    paletteHierarchyEl.innerHTML = '';
    paletteHierarchy.forEach(({ color, label, weight }) => {
      const seg = document.createElement('div');
      seg.className = 'org-identity-panel__palette-hierarchy-segment';
      seg.style.background = color;
      seg.style.flex = `${weight} 1 0`;
      seg.title = `${label} (${weight}% superficie típica)`;
      seg.setAttribute('aria-label', `${label}: ${weight}%`);
      paletteHierarchyEl.appendChild(seg);
    });
    paletteHierarchyEl.dataset.segments = paletteHierarchy.length;
  }

  // Color tokens
  const colorSwatches = document.getElementById('color-swatches');
  colorSwatches.innerHTML = '';
  const swatchData = [
    { name: 'Background',   color: c.bgPrimary   },
    { name: 'Surface',      color: c.bgSecondary },
    { name: 'Card',         color: c.bgTertiary  },
    { name: 'Elevated',     color: c.bgElevated  },
    { name: 'Accent',       color: c.accent      },
    { name: 'Accent dim',   color: c.accentDim   },
    { name: 'Accent subtle', color: c.accentSubtle },
    { name: 'Secondary',    color: secondary     },
    { name: 'Tertiary',     color: tertiary     },
    { name: 'Text primary', color: c.textPrimary },
    { name: 'Text accent',  color: c.textAccent },
    { name: 'Border',       color: c.border      }
  ];
  swatchData.forEach(({ name, color }) => {
    const row = document.createElement('div');
    row.className = 'mol-color-swatch-row';
    const match    = color.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
    const shortVal = match ? `L${(+match[1] * 100).toFixed(0)} C${(+match[2]).toFixed(2)}` : color;
    row.innerHTML = `
      <div class="mol-color-swatch-row__block" style="background: ${color}"></div>
      <span class="mol-color-swatch-row__name">${name}</span>
      <span class="mol-color-swatch-row__value">${shortVal}</span>
    `;
    colorSwatches.appendChild(row);
  });

  // Typography specimen
  const sampleEl = document.getElementById('typo-sample');
  const sampleChar = { ja: '詩', ar: 'شعر', zh: '诗', ko: '시', hi: 'क', th: 'ก', fa: 'شع', he: 'שיר' };
  sampleEl.textContent = sampleChar[lang.id] ?? 'Aa';
  document.getElementById('typo-font-name').textContent = lang.fontName;
  document.getElementById('typo-ls').textContent        = `LS: ${t.letterSpacing}`;
  document.getElementById('typo-lh').textContent        = `LH: ${t.lineHeight}`;
  document.getElementById('typo-radius').textContent    = `R: ${t.radius}`;
}
