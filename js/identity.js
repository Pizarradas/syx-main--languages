// ================================================
// IDENTITY ENGINE — v3
// ================================================
// Pipeline: linguistic metrics → macro-indicators → visual tokens
//
// COLOR: Base científica (color-science.js)
// - Espectro visible CIE 380–700 nm → hue
// - OKLCH: uniformidad perceptual (Ottosson)
// - Chroma por hue: elipses MacAdam / gamut
// - Weber-Fechner: pasos de luminosidad
// - WCAG: contraste mínimo
// ================================================
import {
  fingerprintToWavelength,
  wavelengthToHue,
  chromaScaleForHue,
  maxChromaForHueLightness,
  perceptualLightnessStep,
  minAccentLightness
} from './color-science.js';

export function computeIdentity(lang) {
  const m = lang.metrics;

  // ── MACRO-INDICATORS ────────────────────────────────────────────────
  // Rebalanced toward script (character curvature) for "visual synesthesia":
  // how the language looks when written/read. Phonetics still capture
  // reading rhythm; curvature captures the visual flow of strokes.
  const softness = 0.30 * m.vowelConsonantRatio
                 + 0.30 * m.phoneticSoftness
                 + 0.40 * m.characterCurvature;

  const density  = 0.3 * m.avgWordLength
                 + 0.4 * m.scriptDensity
                 + 0.3 * m.morphologyComplexity;

  // ── HUE (base espectral CIE) ───────────────────────────────────────────
  // Fingerprint → longitud de onda 380–700 nm → hue OKLCH.
  // Referencia: CIE 1931 locus cromático, espectro electromagnético visible.
  const hueFingerprint = (
    m.vowelConsonantRatio * 0.113 +
    m.syllabicRegularity * 0.127 +
    m.phoneticSoftness * 0.131 +
    m.avgWordLength * 0.137 +
    m.morphologyComplexity * 0.139 +
    m.agglutinationIndex * 0.149 +
    m.avgSentenceLength * 0.151 +
    m.wordOrderRigidity * 0.157 +
    m.syntacticDepth * 0.163 +
    m.scriptDensity * 0.167 +
    m.characterCurvature * 0.173 +
    m.diacriticFrequency * 0.179 +
    (softness - density) * 0.32
  ) % 1;

  const wavelength = fingerprintToWavelength(hueFingerprint);
  const hueBase = wavelengthToHue(wavelength);
  const hueBias = (softness - density) * 28; // semántico: suave→cálido, denso→frío
  const hue = ((hueBase + hueBias) % 360 + 360) % 360;

  // ── COLOR TOKENS (OKLCH + gamut) ─────────────────────────────────────
  // Chroma: softness/density + escala perceptual por hue (MacAdam).
  const chromaBase = 0.08 + (softness * 0.12) + (density * 0.06);
  const chromaScale = chromaScaleForHue(hue);
  const chromaAccentRaw = chromaBase * chromaScale;
  const chromaMax = maxChromaForHueLightness(hue, 0.6) * 0.85;
  const chromaAccent = Math.min(chromaMax, chromaAccentRaw, 0.22);
  const chromaBg     = chromaAccent * 0.32;

  // Lightness: Weber-Fechner — pasos perceptualmente uniformes en fondos.
  const bgL  = Math.max(0.07, 0.075 + (1 - density) * 0.035);
  const bg2L = perceptualLightnessStep(bgL, 1);
  const bg3L = perceptualLightnessStep(bgL, 2);
  const bg4L = perceptualLightnessStep(bgL, 3);
  const accentLBase = 0.58 + softness * 0.10;
  const accentLMin = minAccentLightness(bgL);
  const accentL = Math.max(accentLMin, accentLBase);

  const ok = (l, c, h) => `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h})`;

  const colors = {
    bgPrimary:     ok(bgL,            chromaBg,            hue),
    bgSecondary:   ok(bg2L,           chromaBg * 1.1,      hue),
    bgTertiary:    ok(bg3L,           chromaBg * 1.2,      hue),
    bgElevated:    ok(bg4L,           chromaBg * 1.25,     hue),
    accent:        ok(accentL,        chromaAccent,        hue),
    accentDim:     ok(accentL - 0.12, chromaAccent * 0.65, hue),
    accentSubtle:  ok(accentL - 0.18, chromaAccent * 0.40, hue),
    accentMuted:   ok(accentL - 0.08, chromaAccent * 0.55, hue),
    textPrimary:   ok(0.95,           0.015,               hue),
    textSecondary: ok(0.68,           Math.min(0.045, 0.02 + chromaAccent * 0.18), hue),
    textMuted:     ok(0.45,           0.020,               hue),
    textAccent:    ok(accentL - 0.05, chromaAccent * 0.85, hue),
    border:        ok(bgL + 0.15,     chromaBg * 1.6,      hue),
    border2:       ok(bgL + 0.08,     chromaBg * 0.9,      hue),
    borderSubtle:  ok(bgL + 0.11,     chromaBg * 0.7,     hue),
  };

  // Secundario: split-complementario (+150°). Terciario: triádico (+120°).
  // Ambos derivan L y C de softness para coherencia.
  const secHue = (hue + 150) % 360;
  const terHue = (hue + 120) % 360;
  const secL   = 0.55 + softness * 0.10;
  const secC   = 0.06 + softness * 0.07;
  const terL   = 0.50 + softness * 0.08;
  const terC   = 0.05 + softness * 0.05;
  const secondary = ok(secL, secC, secHue);
  const tertiary  = ok(terL, terC, terHue);

  // ── PALETTE HIERARCHY (proporciones adaptativas) ──────────────────────
  // softness ↑ → más peso en acentos (idiomas suaves "brillan" más)
  // density ↑  → más peso en fondos (idiomas densos ocupan más superficie)
  const baseW = { bg: 30, bg2: 17, bg3: 10, bg4: 3, bdr: 4, accSub: 2, accDim: 3, acc: 8, sec: 6, ter: 4, txt: 4 };
  const softShift = (softness - 0.5) * 10;
  const densShift = (density - 0.5) * 8;
  const w = {
    bg:   Math.max(22, baseW.bg  - softShift + densShift),
    bg2:  Math.max(12, baseW.bg2 + densShift * 0.5),
    bg3:  Math.max(6,  baseW.bg3),
    bg4:  baseW.bg4,
    bdr:  baseW.bdr + density * 1.5,
    accSub: Math.max(1, baseW.accSub + softShift * 0.3),
    accDim: Math.max(2, baseW.accDim + softShift * 0.4),
    acc:   Math.max(5, baseW.acc + softShift),
    sec:   Math.max(3, baseW.sec + softShift * 0.5),
    ter:   Math.max(2, baseW.ter + softShift * 0.3),
    txt:   Math.max(3, baseW.txt - densShift * 0.2)
  };
  const total = w.bg + w.bg2 + w.bg3 + w.bg4 + w.bdr + w.accSub + w.accDim + w.acc + w.sec + w.ter + w.txt;
  const scale = 100 / total;
  const paletteHierarchy = [
    { color: colors.bgPrimary,    label: 'bg',   weight: Math.round(w.bg * scale) },
    { color: colors.bgSecondary,  label: 'bg2',  weight: Math.round(w.bg2 * scale) },
    { color: colors.bgTertiary,   label: 'bg3',  weight: Math.round(w.bg3 * scale) },
    { color: colors.bgElevated,   label: 'bg4',  weight: Math.round(w.bg4 * scale) },
    { color: colors.border,       label: 'bdr',  weight: Math.round(w.bdr * scale) },
    { color: colors.accentSubtle, label: 'acc~', weight: Math.round(w.accSub * scale) },
    { color: colors.accentDim,    label: 'acc−', weight: Math.round(w.accDim * scale) },
    { color: colors.accent,       label: 'acc',  weight: Math.round(w.acc * scale) },
    { color: secondary,           label: 'sec',  weight: Math.round(w.sec * scale) },
    { color: tertiary,            label: 'ter',  weight: Math.round(w.ter * scale) },
    { color: colors.textPrimary,  label: 'txt',  weight: Math.round(w.txt * scale) }
  ];

  // ── v2 TYPOGRAPHY ────────────────────────────────────────────────────
  const lsVal         = (-0.025 + m.phoneticSoftness * 0.08).toFixed(3);
  const letterSpacing = `${lsVal}em`;
  // lineHeight: syllabicRegularity + softness + avgSentenceLength (oraciones largas → más respiro)
  const lineHeight    = (1.30 + m.syllabicRegularity * 0.4 + softness * 0.35 + m.avgSentenceLength * 0.25).toFixed(2);
  const radius        = `${(0.2 + softness * 1.0).toFixed(2)}rem`;
  const fontWeight    = Math.round(300 + m.morphologyComplexity * 400);
  // Font size: prosodic intensity — idiomas "más fuertes" (phoneticSoftness bajo) → mayor escala
  // phoneticSoftness alto (JA, ES) → más suave/contained → 0.92–0.98
  // phoneticSoftness bajo (EN, DE, RU) → más intenso → 1.02–1.12
  const fontSize      = (0.92 + (1 - m.phoneticSoftness) * 0.20).toFixed(2); // 300–700

  // ── v2 MOTION ────────────────────────────────────────────────────────
  const animRaw     = 0.38 + (m.scriptDensity * 0.38 + m.characterCurvature * 0.62) * 0.52;
  const animDuration = `${animRaw.toFixed(2)}s`;

  // ── v2 SPACE ─────────────────────────────────────────────────────────
  // wordOrderRigidity: orden rígido → más separación entre elementos (layout estructurado)
  const gapScale   = (0.75 + m.avgWordLength * 0.50 + m.wordOrderRigidity * 0.20).toFixed(2);

  // ── v2 DEPTH ─────────────────────────────────────────────────────────
  const shadowBlur  = `${Math.round(6 + m.syntacticDepth * 34)}px`;
  const borderWidth = `${(0.75 + m.agglutinationIndex * 1.5).toFixed(2)}px`;

  // ── v3 POEM STYLE: italic for soft Latin languages ───────────────────
  // Romantic languages (ES/FR/IT/PT/SW…) — softness > 0.56 AND Latin script
  const fontStyle = (softness > 0.56 && lang.script === 'Latin') ? 'italic' : 'normal';

  // ── v3 POEM GLOW (text-shadow) ───────────────────────────────────────
  // Power = softness × mean(phoneticSoftness, characterCurvature)
  // High for JA/TH/AR/IT/ES; zero for DE/PL/FI/EN
  const glowPower = softness * (m.phoneticSoftness + m.characterCurvature) / 2;
  let textShadow = 'none';
  if (glowPower > 0.30) {
    const g1 = Math.round(glowPower * 36);
    const g2 = Math.round(glowPower * 68);
    const a1 = (glowPower * 0.50).toFixed(2);
    const a2 = (glowPower * 0.22).toFixed(2);
    textShadow = `0 0 ${g1}px hsla(${hue},72%,64%,${a1}), 0 0 ${g2}px hsla(${hue},65%,54%,${a2})`;
  }

  // ── v3 ACCENT GLOW (box-shadow for decorative accents) ───────────────
  const glowSpread = Math.round(m.characterCurvature * 20);
  const glowAlpha  = (m.characterCurvature * 0.35).toFixed(2);
  const accentGlow = glowSpread > 4
    ? `0 0 ${glowSpread}px hsla(${hue},70%,64%,${glowAlpha})`
    : 'none';

  // ── v3 BACKDROP BLUR (frosted glass for complex languages) ───────────
  // Driven by syntactic depth — deep nested syntax ≈ layered visual depth
  const backdropBlur = `${(m.syntacticDepth * 10).toFixed(1)}px`;

  // ── v3 GRAIN / NOISE ─────────────────────────────────────────────────
  // Ancient/diacritic-heavy + dense scripts → more film grain
  const noiseOpacity = Math.min(0.058,
    m.diacriticFrequency * 0.042 + m.scriptDensity * 0.018
  ).toFixed(3);

  // ── v3 POEM ALIGNMENT ────────────────────────────────────────────────
  // CJK scripts → centered (classic CJK poetry form)
  // RTL scripts → end
  // Default   → start
  let poemTextAlign  = 'start';
  let poemAlignItems = 'flex-start';
  if (lang.script === 'CJK' || lang.script === 'Hangul') {
    poemTextAlign  = 'center';
    poemAlignItems = 'center';
  } else if (lang.direction === 'rtl') {
    poemTextAlign  = 'end';
    poemAlignItems = 'flex-end';
  }

  // ── v3 LAYOUT (wordOrderRigidity) ─────────────────────────────────────
  // Orden rígido (EN, ZH) → estructura más marcada, mayor separación entre líneas
  // Orden flexible (FI, HU, TR) → flujo más continuo
  const poemLineGap     = (0.5 + m.wordOrderRigidity * 0.75).toFixed(2); // 0.5–1.25em
  const poemLayoutJustify = m.wordOrderRigidity > 0.65 ? 'space-between' : 'flex-start';

  // ── v3 POEM FONT SIZE SCALE ──────────────────────────────────────────
  // Dense CJK scripts need a little less size; clean Latin gets full scale
  const poemScale = (1.06 - m.scriptDensity * 0.14).toFixed(2); // ~0.92–1.06

  // ── v3 WORD SPACING ──────────────────────────────────────────────────
  // Long-word languages (FI, HU, DE) need more inter-word breathing room.
  // Highly agglutinative languages partially cancel this (word boundary
  // is already marked by morpheme structure, not spacing).
  // Monosyllabic languages (ZH, TH, VI) benefit from minimal compression.
  const wsVal      = (-0.015 + m.avgWordLength * 0.065 - m.agglutinationIndex * 0.025);
  const wordSpacing = `${wsVal.toFixed(3)}em`; // range ≈ -0.04 … +0.045em

  // ── v3 OPENTYPE FEATURES ─────────────────────────────────────────────
  // Baseline: kern + standard ligatures (always on)
  // calt (contextual alternates) → morphologically complex languages
  //      produce more adjacent-glyph variations worth context-handling
  // dlig (discretionary ligatures) → diacritic-heavy / ancient scripts
  //      increase typographic elegance where the font supports it
  // hist (historical forms) → very high diacriticFrequency (AR/HE/VI)
  //      enable archaic glyph variants in supporting fonts
  const features = ['"kern" 1', '"liga" 1'];
  if (m.morphologyComplexity > 0.62) features.push('"calt" 1');
  if (m.diacriticFrequency    > 0.38) features.push('"dlig" 1');
  if (m.diacriticFrequency    > 0.60) features.push('"hist" 1');
  const fontFeatureSettings = features.join(', ');

  return {
    softness:  +softness.toFixed(3),
    density:   +density.toFixed(3),
    hue,
    wavelengthNm: Math.round(wavelength),
    chroma:    +chromaAccent.toFixed(3),
    colors,
    secondary,
    tertiary,
    paletteHierarchy,
    typography: {
      // v2
      letterSpacing, lineHeight, radius,
      fontWeight, fontSize, animDuration, gapScale, shadowBlur, borderWidth,
      // v3
      fontStyle, textShadow, accentGlow,
      backdropBlur, noiseOpacity,
      poemTextAlign, poemAlignItems, poemScale,
      poemLineGap, poemLayoutJustify,
      // v3 OpenType + spacing
      wordSpacing, fontFeatureSettings
    }
  };
}
