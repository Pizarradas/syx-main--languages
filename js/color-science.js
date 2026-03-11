// ================================================
// COLOR SCIENCE — Base científica para paletas
// ================================================
// Referencias:
// - CIE 1931: Espectro visible 380–700 nm, locus cromático
// - OKLCH: Björn Ottosson, uniformidad perceptual (L, C, H)
// - Weber-Fechner: p ∝ log(S) — percepción de luminosidad
// - Teoría oponente (Hering): canales rojo-verde, azul-amarillo
// ================================================

/** Espectro visible (CIE): 380 nm (violeta) → 700 nm (rojo) */
const LAMBDA_MIN = 380;
const LAMBDA_MAX = 700;
const LAMBDA_RANGE = LAMBDA_MAX - LAMBDA_MIN;

/**
 * Convierte fingerprint [0,1) a longitud de onda (nm).
 * Base física: cada idioma mapea a una posición en el espectro electromagnético visible.
 */
export function fingerprintToWavelength(fingerprint) {
  return LAMBDA_MIN + (fingerprint % 1) * LAMBDA_RANGE;
}

/**
 * Convierte longitud de onda (nm) a hue OKLCH (0–360°).
 * Aproximación al locus espectral CIE 1931:
 * 380 nm ≈ violeta (≈270°), 470 nm ≈ azul (≈240°), 530 nm ≈ verde (≈140°),
 * 580 nm ≈ amarillo (≈90°), 650 nm ≈ rojo (≈25°), 700 nm ≈ rojo profundo (≈0°).
 */
export function wavelengthToHue(nm) {
  const t = (nm - LAMBDA_MIN) / LAMBDA_RANGE; // 0..1
  // Curva empírica que sigue el locus: violeta→azul→verde→amarillo→rojo
  if (t < 0.17) return 270 - t * 88;           // 380–434 nm: violeta→azul
  if (t < 0.42) return 240 - (t - 0.17) * 400; // 434–514 nm: azul→verde
  if (t < 0.58) return 140 - (t - 0.42) * 312; // 514–566 nm: verde→amarillo
  if (t < 0.83) return 90 - (t - 0.58) * 260;  // 566–646 nm: amarillo→naranja
  return 25 - (t - 0.83) * 147;                 // 646–700 nm: naranja→rojo
}

/**
 * Escala de chroma por hue para uniformidad perceptual (OKLCH).
 * El gamut sRGB varía por hue: amarillo/cian necesitan más C para saturación
 * percibida igual; azul/magenta menos. Basado en elipses de MacAdam.
 */
export function chromaScaleForHue(hue) {
  const rad = (hue - 90) * Math.PI / 180;
  return 0.86 + 0.28 * (0.5 + 0.5 * Math.cos(rad));
}

/**
 * Límite de chroma por hue y lightness (aproximación gamut sRGB en OKLCH).
 * Evita colores fuera de rango en displays estándar.
 */
export function maxChromaForHueLightness(hue, L) {
  const base = 0.4 - Math.abs(L - 0.5) * 0.5;
  return base * chromaScaleForHue(hue);
}

/**
 * Pasos de lightness perceptualmente uniformes.
 * OKLCH L es ya perceptual (CIE LAB); ΔL constante ≈ ΔE percibido.
 * Secuencia 0.04, 0.05, 0.05 em (≈ 0.09 total) para bg2–bg4.
 */
const LIGHTNESS_STEPS = [0.04, 0.05, 0.05];
export function perceptualLightnessStep(baseL, stepIndex) {
  const delta = LIGHTNESS_STEPS.slice(0, stepIndex).reduce((a, b) => a + b, 0);
  return baseL + delta;
}

/**
 * Contraste mínimo acorde a luminosidad relativa (CIE 1931 Y, WCAG).
 * Ratio (L1+0.05)/(L2+0.05) ≥ 3 para componentes UI (AA).
 */
export function minContrastRatio() {
  return 3;
}

/**
 * Lightness mínima del acento para legibilidad sobre fondo.
 * L_accent ≥ L_bg + Δ tal que ratio ≥ 3.
 */
export function minAccentLightness(bgLightness) {
  const r = minContrastRatio();
  return (bgLightness + 0.05) * r - 0.05;
}
