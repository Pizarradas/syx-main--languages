// ================================================
// ANALYTICS — Dataset analysis for all languages
// ================================================
// Computes identities for every language and provides
// aggregated data for charts: warm vs cold, typography, scripts.
// ================================================
import { LANGUAGES } from './data.js';
import { computeIdentity } from './identity.js';

/** All languages with computed identity. */
export function getAllIdentities() {
  return Object.entries(LANGUAGES).map(([id, lang]) => ({
    id,
    lang,
    identity: computeIdentity(lang)
  }));
}

/** Hue temperature: warm (0–60°), neutral (60–200°), cold (200–360°). */
export function getHueTemperature(hue) {
  if (hue >= 0 && hue < 60) return 'warm';
  if (hue >= 60 && hue < 200) return 'neutral';
  return 'cold';
}

/**
 * Temperatura cromática continua: -1 = más cálido (rojo/amarillo), +1 = más frío (azul).
 * Permite ordenar idiomas por percepción de calor/frío, no por hue crudo.
 */
export function getChromaticTemperature(hue) {
  return Math.cos((hue - 240) * Math.PI / 180);
}

/** Count by temperature for doughnut chart. */
export function getTemperatureDistribution() {
  const data = getAllIdentities();
  const counts = { warm: 0, neutral: 0, cold: 0 };
  data.forEach(({ identity }) => {
    counts[getHueTemperature(identity.hue)]++;
  });
  return [
    { label: 'Cálidos (0–60°)', value: counts.warm, color: 'oklch(0.65 0.18 25)' },
    { label: 'Neutros (60–200°)', value: counts.neutral, color: 'oklch(0.65 0.15 150)' },
    { label: 'Fríos (200–360°)', value: counts.cold, color: 'oklch(0.65 0.15 250)' }
  ];
}

/** Typography family counts for bar chart. */
export function getTypographyDistribution() {
  const data = getAllIdentities();
  const counts = {};
  data.forEach(({ lang }) => {
    const name = lang.fontName || 'Unknown';
    counts[name] = (counts[name] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ label: name, value: count }));
}

/** Script distribution for pie chart. */
export function getScriptDistribution() {
  const data = getAllIdentities();
  const counts = {};
  data.forEach(({ lang }) => {
    const script = lang.script || 'Other';
    counts[script] = (counts[script] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([script, count]) => ({ label: script, value: count }));
}

/** Hue values for all languages (for histogram or scatter). */
export function getHueByLanguage() {
  return getAllIdentities().map(({ id, lang, identity }) => ({
    id,
    name: lang.name,
    hue: identity.hue,
    softness: identity.softness,
    density: identity.density,
    temperature: getHueTemperature(identity.hue),
    chromaticTemp: getChromaticTemperature(identity.hue)
  }));
}

/** Hierarchy profile: weight distribution (bg%, accent%, etc.) per language. */
export function getHierarchyProfile() {
  return getAllIdentities().map(({ id, lang, identity }) => {
    const h = identity.paletteHierarchy || [];
    const bg = h.filter(s => s.label.startsWith('bg')).reduce((a, s) => a + s.weight, 0);
    const acc = h.filter(s => s.label.startsWith('acc')).reduce((a, s) => a + s.weight, 0);
    const comp = h.filter(s => ['sec', 'ter'].includes(s.label)).reduce((a, s) => a + s.weight, 0);
    const other = h.filter(s => !s.label.startsWith('bg') && !s.label.startsWith('acc') && !['sec', 'ter'].includes(s.label)).reduce((a, s) => a + s.weight, 0);
    return { id, name: lang.name, bg, accent: acc, complementary: comp, other, segments: h };
  });
}
