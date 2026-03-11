// ================================================
// ANALYTICS CHARTS — Dashboard visualizations
// ================================================
// Warm vs cold, typography, scripts. Uses Chart.js.
// ================================================
import {
  getTemperatureDistribution,
  getTypographyDistribution,
  getScriptDistribution,
  getHueByLanguage,
  getHierarchyProfile
} from './analytics.js';

let tempChart = null;
let typoChart = null;
let scriptChart = null;
let hueChart = null;
let hierarchyChart = null;

const CHART_OPTS = {
  color: 'rgba(255,255,255,0.5)',
  font: { family: "'Space Grotesk', system-ui", size: 11 }
};

/** Hue to HSL for bar colors */
function hueToHsl(h) {
  return `hsla(${h}, 65%, 55%, 0.85)`;
}

export function initAnalyticsCharts() {
  if (!window.Chart) return;

  const tempData = getTemperatureDistribution();
  const typoData = getTypographyDistribution();
  const scriptData = getScriptDistribution();
  const hueData = getHueByLanguage();
  const hierarchyData = getHierarchyProfile();

  // 1. Temperature (warm/neutral/cold) — Doughnut
  const tempCanvas = document.getElementById('analytics-chart-temp');
  if (tempCanvas && !tempChart) {
    tempChart = new Chart(tempCanvas, {
      type: 'doughnut',
      data: {
        labels: tempData.map(d => d.label),
        datasets: [{
          data: tempData.map(d => d.value),
          backgroundColor: tempData.map(d => d.color),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom', labels: CHART_OPTS },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw} idiomas`
            }
          }
        }
      }
    });
  }

  // 2. Typography — Horizontal bar
  const typoCanvas = document.getElementById('analytics-chart-typo');
  if (typoCanvas && !typoChart) {
    typoChart = new Chart(typoCanvas, {
      type: 'bar',
      data: {
        labels: typoData.map(d => d.label),
        datasets: [{
          data: typoData.map(d => d.value),
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderColor: 'rgba(255,255,255,0.4)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw} idiomas usan ${ctx.label}`
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: Math.max(...typoData.map(d => d.value)) + 2,
            ticks: CHART_OPTS,
            grid: { color: 'rgba(255,255,255,0.06)' }
          },
          y: {
            ticks: CHART_OPTS,
            grid: { display: false }
          }
        }
      }
    });
  }

  // 3. Script — Doughnut
  const scriptCanvas = document.getElementById('analytics-chart-script');
  if (scriptCanvas && !scriptChart) {
    const scriptColors = [
      'oklch(0.65 0.15 280)',
      'oklch(0.65 0.15 180)',
      'oklch(0.65 0.15 50)',
      'oklch(0.65 0.12 320)',
      'oklch(0.65 0.12 200)',
      'oklch(0.65 0.12 140)'
    ];
    scriptChart = new Chart(scriptCanvas, {
      type: 'doughnut',
      data: {
        labels: scriptData.map(d => d.label),
        datasets: [{
          data: scriptData.map(d => d.value),
          backgroundColor: scriptData.map((_, i) => scriptColors[i % scriptColors.length]),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom', labels: CHART_OPTS },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw} idiomas`
            }
          }
        }
      }
    });
  }

  // 4. Hue spectrum — Bar (each language's hue, ordenado por temperatura cromática)
  const hueCanvas = document.getElementById('analytics-chart-hue');
  if (hueCanvas && !hueChart) {
    const sorted = [...hueData].sort((a, b) => a.chromaticTemp - b.chromaticTemp);
    hueChart = new Chart(hueCanvas, {
      type: 'bar',
      data: {
        labels: sorted.map(d => d.name),
        datasets: [{
          data: sorted.map(d => d.hue),
          backgroundColor: sorted.map(d => hueToHsl(d.hue)),
          borderColor: sorted.map(d => hueToHsl(d.hue)),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw.toFixed(0)}° (${ctx.raw < 60 ? 'cálido' : ctx.raw < 200 ? 'neutro' : 'frío'})`
            }
          }
        },
        scales: {
          x: {
            ticks: { ...CHART_OPTS, maxRotation: 45 },
            grid: { display: false }
          },
          y: {
            min: 0,
            max: 360,
            ticks: { ...CHART_OPTS, stepSize: 60 },
            grid: { color: 'rgba(255,255,255,0.06)' }
          }
        }
      }
    });
  }

  // 5. Hierarchy profile — Stacked horizontal bar (bg / accent / complementary / other)
  const hierarchyCanvas = document.getElementById('analytics-chart-hierarchy');
  if (hierarchyCanvas && !hierarchyChart && hierarchyData.length) {
    const sorted = [...hierarchyData].sort((a, b) => b.accent - a.accent);
    const labels = sorted.map(d => d.name);
    hierarchyChart = new Chart(hierarchyCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Fondos (bg)', data: sorted.map(d => d.bg), backgroundColor: 'oklch(0.45 0.06 240)' },
          { label: 'Acentos', data: sorted.map(d => d.accent), backgroundColor: 'oklch(0.65 0.15 30)' },
          { label: 'Complementarios (sec/ter)', data: sorted.map(d => d.complementary), backgroundColor: 'oklch(0.55 0.12 150)' },
          { label: 'Otros (bdr, txt)', data: sorted.map(d => d.other), backgroundColor: 'oklch(0.55 0.04 0)' }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom', labels: CHART_OPTS },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%`
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            max: 100,
            ticks: { ...CHART_OPTS, callback: v => v + '%' },
            grid: { color: 'rgba(255,255,255,0.06)' }
          },
          y: {
            stacked: true,
            ticks: CHART_OPTS,
            grid: { display: false }
          }
        }
      }
    });
  }
}

export function destroyAnalyticsCharts() {
  if (tempChart) { tempChart.destroy(); tempChart = null; }
  if (typoChart) { typoChart.destroy(); typoChart = null; }
  if (scriptChart) { scriptChart.destroy(); scriptChart = null; }
  if (hueChart) { hueChart.destroy(); hueChart = null; }
  if (hierarchyChart) { hierarchyChart.destroy(); hierarchyChart = null; }
}
