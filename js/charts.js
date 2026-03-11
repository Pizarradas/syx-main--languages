// ================================================
// CHARTS — Radar/spider chart via Chart.js
// ================================================
// Requires window.Chart (loaded globally via CDN).
// Renders all 12 linguistic metrics on a radar chart
// that updates smoothly on language switch.
// ================================================
import { METRIC_INFO } from './data.js';

let radarChart = null;
let currentLang = null;

// ── HELPERS ─────────────────────────────────────────────────────────────────

/** Converts hue (0-360, computed from metrics) to an HSL color string. */
function hslColor(hue, saturation, lightness, alpha = 1) {
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
}

/** Extracts ordered axis labels from METRIC_INFO. */
function getAxisLabels(metrics) {
  return Object.keys(metrics).map(k => METRIC_INFO[k]?.axisLabel ?? k);
}

/** Builds Chart.js dataset from language metrics. */
function buildDataset(lang, hue) {
  const values = Object.values(lang.metrics);
  return {
    data: values,
    backgroundColor:      hslColor(hue, 65, 62, 0.14),
    borderColor:          hslColor(hue, 72, 65, 1),
    pointBackgroundColor: hslColor(hue, 72, 65, 1),
    pointBorderColor:     'transparent',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor:     hslColor(hue, 72, 65, 1),
    borderWidth: 1.5,
    pointRadius: 3,
    pointHoverRadius: 5,
  };
}

// ── PUBLIC API ───────────────────────────────────────────────────────────────

/**
 * Initialises the radar chart (first call) or updates it (subsequent calls).
 * Safe to call before Chart.js is loaded — bails out gracefully.
 *
 * @param {object} lang     - Language profile from LANGUAGES
 * @param {object} identity - Computed identity from computeIdentity()
 */
export function initChart(lang, identity) {
  if (!window.Chart) return;

  currentLang = lang;
  const canvas = document.getElementById('metrics-radar');
  if (!canvas) return;

  if (radarChart) {
    updateChart(lang, identity);
    return;
  }

  const hue = identity?.hue ?? 0;

  // Chart.js global defaults (dark theme)
  Chart.defaults.color              = 'rgba(255,255,255,0.40)';
  Chart.defaults.font.family        = "'Google-Space-Grotesk--regular', 'Space Grotesk', system-ui, sans-serif";
  Chart.defaults.font.size          = 9.5;

  radarChart = new Chart(canvas, {
    metricKeys: Object.keys(lang.metrics),
    type: 'radar',
    data: {
      labels: getAxisLabels(lang.metrics),
      datasets: [buildDataset(lang, hue)]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 700,
        easing: 'easeInOutQuart',
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        r: {
          min: 0,
          max: 1,
          ticks: {
            stepSize: 0.25,
            display: false,
          },
          grid: {
            color: 'rgba(255,255,255,0.055)',
            lineWidth: 1,
          },
          angleLines: {
            color: 'rgba(255,255,255,0.07)',
            lineWidth: 1,
          },
          pointLabels: {
            font: { size: 9, weight: '500' },
            color: 'rgba(255,255,255,0.42)',
            padding: 5,
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(18, 18, 22, 0.95)',
          titleColor: 'rgba(255, 255, 255, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.75)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: (items) => {
              const idx = items[0]?.dataIndex ?? 0;
              const keys = radarChart?.metricKeys ?? [];
              const info = METRIC_INFO[keys[idx]];
              return info ? `${info.icon} ${info.label}` : '';
            },
            label: (ctx) => `${(ctx.raw * 100).toFixed(0)}%`,
            afterLabel: (ctx) => {
              const keys = radarChart?.metricKeys ?? [];
              const info = METRIC_INFO[keys[ctx.dataIndex]];
              return info?.visual ? `→ ${info.visual}` : '';
            },
          },
        },
      }
    }
  });
}

/**
 * Updates chart data and colors for the new language.
 * Animates the transition smoothly.
 */
export function updateChart(lang, identity) {
  if (!radarChart) {
    initChart(lang, identity);
    return;
  }

  currentLang = lang;
  const hue = identity?.hue ?? 0;
  const dataset = buildDataset(lang, hue);

  radarChart.data.labels      = getAxisLabels(lang.metrics);
  radarChart.data.datasets[0] = dataset;
  radarChart.metricKeys       = Object.keys(lang.metrics);
  radarChart.update();
}

/**
 * Returns the current language stored in this module (for tooltip use).
 */
export function getCurrentLang() {
  return currentLang;
}

// ── COMPARE RADAR (superpuesto) ───────────────────────────────────────────────

let compareRadarChart = null;

/**
 * Inicializa o actualiza el radar superpuesto en la vista Comparar.
 * Muestra dos datasets (A y B) con colores según el hue de cada idioma.
 *
 * @param {object} langA - Idioma A
 * @param {object} identityA - Identidad A
 * @param {object} langB - Idioma B
 * @param {object} identityB - Identidad B
 */
export function initCompareRadar(langA, identityA, langB, identityB) {
  if (!window.Chart) return;

  const canvas = document.getElementById('compare-radar');
  if (!canvas) return;

  const hueA = identityA?.hue ?? 0;
  const hueB = identityB?.hue ?? 240;

  const datasetA = {
    ...buildDataset(langA, hueA),
    label: langA?.name ?? 'A',
  };
  const datasetB = {
    ...buildDataset(langB, hueB),
    label: langB?.name ?? 'B',
    borderDash: [4, 3],
    backgroundColor: hslColor(hueB, 65, 62, 0.08),
  };

  if (compareRadarChart) {
    compareRadarChart.data.labels = getAxisLabels(langA.metrics);
    compareRadarChart.data.datasets = [datasetA, datasetB];
    compareRadarChart.update();
    return;
  }

  Chart.defaults.color              = Chart.defaults.color ?? 'rgba(255,255,255,0.40)';
  Chart.defaults.font.family        = Chart.defaults.font?.family ?? "'Space Grotesk', system-ui";
  Chart.defaults.font.size          = Chart.defaults.font?.size ?? 9.5;

  compareRadarChart = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: getAxisLabels(langA.metrics),
      datasets: [datasetA, datasetB],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.2,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        r: {
          min: 0,
          max: 1,
          ticks: { stepSize: 0.25, display: false },
          grid: { color: 'rgba(255,255,255,0.055)', lineWidth: 1 },
          angleLines: { color: 'rgba(255,255,255,0.07)', lineWidth: 1 },
          pointLabels: {
            font: { size: 9, weight: '500' },
            color: 'rgba(255,255,255,0.42)',
            padding: 5,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(18, 18, 22, 0.95)',
          titleColor: 'rgba(255, 255, 255, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.75)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: (items) => {
              const idx = items[0]?.dataIndex ?? 0;
              const keys = Object.keys(langA.metrics);
              const info = METRIC_INFO[keys[idx]];
              return info ? `${info.icon} ${info.label}` : '';
            },
            label: (ctx) => `${ctx.dataset.label}: ${(ctx.raw * 100).toFixed(0)}%`,
          },
        },
      },
    },
  });
}

/**
 * Destruye el radar de comparación (al salir de la vista).
 */
export function destroyCompareRadar() {
  if (compareRadarChart) {
    compareRadarChart.destroy();
    compareRadarChart = null;
  }
}
