// ================================================
// EXPORT — Design tokens (CSS / JSON)
// ================================================
// Genera CSS custom properties y JSON del perfil de identidad
// para uso en design systems o integración externa.
// ================================================
import { computeIdentity } from './identity.js';

/**
 * Genera bloque CSS :root con todas las variables del tema.
 * @param {Object} lang - Objeto idioma de LANGUAGES
 * @param {Object} identity - Resultado de computeIdentity(lang)
 * @returns {string} CSS
 */
export function exportCss(lang, identity) {
  const { colors: c, typography: t, secondary, tertiary, paletteHierarchy } = identity;

  const vars = [
    '/* Language Identity Engine — CSS tokens */',
    `/* ${lang.name} (${lang.id}) — ${lang.script} · ${lang.direction} */`,
    '',
    ':root {',
    '  /* Palette */',
    `  --app-bg: ${c.bgPrimary};`,
    `  --app-bg-2: ${c.bgSecondary};`,
    `  --app-bg-3: ${c.bgTertiary};`,
    `  --app-bg-4: ${c.bgElevated};`,
    `  --app-accent: ${c.accent};`,
    `  --app-accent-dim: ${c.accentDim};`,
    `  --app-accent-subtle: ${c.accentSubtle};`,
    `  --app-accent-muted: ${c.accentMuted};`,
    `  --app-text: ${c.textPrimary};`,
    `  --app-text-2: ${c.textSecondary};`,
    `  --app-text-3: ${c.textMuted};`,
    `  --app-text-accent: ${c.textAccent};`,
    `  --app-border: ${c.border};`,
    `  --app-border-2: ${c.border2};`,
    `  --app-border-subtle: ${c.borderSubtle};`,
    `  --app-secondary: ${secondary};`,
    `  --app-tertiary: ${tertiary};`,
    '',
    '  /* Typography */',
    `  --lang-font-family: ${lang.fontFamily};`,
    `  --lang-letter-spacing: ${t.letterSpacing};`,
    `  --lang-line-height: ${t.lineHeight};`,
    `  --lang-radius: ${t.radius};`,
    `  --lang-font-weight: ${t.fontWeight};`,
    `  --lang-font-size: ${t.fontSize};`,
    `  --lang-font-style: ${t.fontStyle};`,
    `  --lang-word-spacing: ${t.wordSpacing};`,
    `  --lang-font-feature-settings: ${t.fontFeatureSettings};`,
    '',
    '  /* Motion & space */',
    `  --app-anim-duration: ${t.animDuration};`,
    `  --app-gap-scale: ${t.gapScale};`,
    `  --app-shadow-blur: ${t.shadowBlur};`,
    `  --app-border-width: ${t.borderWidth};`,
    '',
    '  /* Poem & effects */',
    `  --app-poem-text-align: ${t.poemTextAlign};`,
    `  --app-poem-align-items: ${t.poemAlignItems};`,
    `  --app-poem-scale: ${t.poemScale};`,
    `  --app-poem-line-gap: ${t.poemLineGap}em;`,
    `  --app-poem-layout-justify: ${t.poemLayoutJustify};`,
    `  --lang-text-shadow: ${t.textShadow};`,
    `  --app-accent-glow: ${t.accentGlow};`,
    `  --app-backdrop-blur: ${t.backdropBlur};`,
    `  --app-noise-opacity: ${t.noiseOpacity};`,
  ];

  if (paletteHierarchy?.length) {
    const wAcc = paletteHierarchy.find(s => s.label === 'acc')?.weight ?? 8;
    const wBg2 = paletteHierarchy.find(s => s.label === 'bg2')?.weight ?? 20;
    const wBg3 = paletteHierarchy.find(s => s.label === 'bg3')?.weight ?? 12;
    vars.push('', '  /* Palette hierarchy */', `  --palette-w-accent: ${wAcc};`, `  --palette-w-bg2: ${wBg2};`, `  --palette-w-bg3: ${wBg3};`);
  }

  vars.push('}', '');
  return vars.join('\n');
}

/**
 * Genera JSON del perfil completo (identidad + metadata).
 * @param {Object} lang - Objeto idioma
 * @param {Object} identity - Resultado de computeIdentity(lang)
 * @returns {string} JSON formateado
 */
export function exportJson(lang, identity) {
  const payload = {
    meta: {
      id: lang.id,
      name: lang.name,
      script: lang.script,
      direction: lang.direction,
      fontFamily: lang.fontFamily,
      fontName: lang.fontName,
    },
    macro: {
      softness: identity.softness,
      density: identity.density,
      hue: identity.hue,
      chroma: identity.chroma,
    },
    colors: identity.colors,
    secondary: identity.secondary,
    tertiary: identity.tertiary,
    paletteHierarchy: identity.paletteHierarchy,
    typography: identity.typography,
    metrics: lang.metrics,
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Descarga un archivo con el contenido dado.
 * @param {string} content - Contenido del archivo
 * @param {string} filename - Nombre del archivo
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Copia texto al portapapeles.
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
