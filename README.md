# Language Identity Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Un idioma no solo se lee. También se ve.

Genera identidades visuales dinámicas a partir de métricas lingüísticas. Cada idioma obtiene una paleta de colores, tipografía, espaciado y animaciones derivados de su perfil fonológico, morfológico y tipográfico.

---

## Tabla de contenidos

- [Inicio rápido](#-inicio-rápido)
- [¿Para qué?](#-para-qué)
- [Tecnologías](#-tecnologías)
- [Estructura](#-estructura)
- [Desarrollo](#-desarrollo)
- [Documentación](#-documentación)

---

## Inicio rápido

```bash
git clone https://github.com/Pizarradas/syx-main--languages.git
cd syx-main--languages
npm install
npm run build:css
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

| Comando | Descripción |
|---------|-------------|
| `npm run build:css` | Compila SCSS → CSS |
| `npm run build:css:watch` | Compilación en modo watch |
| `npm start` | Sirve la app (puerto 3000) |

---

## ¿Para qué?

- **Diseño multilingüe** — Identidades visuales coherentes con la naturaleza de cada idioma
- **Investigación** — Relación entre estructura lingüística y percepción visual
- **Exportación** — Tokens CSS y JSON para integrar en sistemas de diseño
- **Comparación** — Dos idiomas lado a lado (paletas, métricas, radar)

---

## Tecnologías

| Área | Stack |
|------|-------|
| Frontend | HTML5, CSS (SCSS), JavaScript (ES modules) |
| Sistema de diseño | SYX Design System |
| Gráficos | Chart.js 4.x |
| Animaciones | GSAP 3.x |
| Colores | OKLCH, CIE 1931, Weber-Fechner |

---

## Estructura

```
├── index.html              # Página única (Explorar, Comparar, Análisis)
├── js/                     # Módulos ES (main, identity, charts, export…)
├── syx-main--languages/
│   ├── css/                # styles-languages.css (compilado)
│   ├── scss/               # Fuentes SCSS
│   └── img/flags/          # Banderas SVG (34 idiomas)
├── docs/                   # Documentación del proyecto
├── package.json
└── README.md
```

---

## Desarrollo

1. **Clonar** el repositorio
2. **Instalar** dependencias: `npm install`
3. **Compilar** estilos: `npm run build:css`
4. **Servir** localmente: `npm start`

**Despliegue:** Compatible con GitHub Pages, Netlify, Vercel. La raíz del repo es la raíz del sitio.

---

## Documentación

<details>
<summary><b>Pipeline visual</b></summary>

```
12 métricas lingüísticas → macro-indicators (softness · density)
    → fingerprint λ (380–700 nm) → hue OKLCH · chroma · lightness
    → paleta (bg, accent, secondary, tertiary) → tipografía · espaciado · animación
    → SYX theme aplicado
```

</details>

<details>
<summary><b>Métricas lingüísticas (12)</b></summary>

| Métrica | Descripción |
|---------|-------------|
| Vowel Ratio | Proporción vocálica |
| Syllabic Reg. | Regularidad silábica |
| Phonetic Soft. | Suavidad fonética |
| Avg Word Len. | Longitud media de palabra |
| Morphology | Complejidad morfológica |
| Agglutination | Índice de aglutinación |
| Sentence Len. | Longitud de oración |
| Word Order | Rigidez del orden |
| Syntax Depth | Profundidad sintáctica |
| Script Density | Densidad del script |
| Char. Curvature | Curvatura de caracteres |
| Diacritic Freq. | Frecuencia de diacríticos |

</details>

<details>
<summary><b>Idiomas soportados (34)</b></summary>

Español, English, 日本語, العربية, Suomi, 中文, 한국어, हिन्दी, Deutsch, Français, Português, Русский, Italiano, Ελληνικά, Türkçe, עברית, ภาษาไทย, Tiếng Việt, Bahasa Indonesia, Kiswahili, Polski, Nederlands, Svenska, Magyar, فارسی, ქართული, தமிழ், Cymraeg, Euskara, Te Reo Māori, Tagalog, Íslenska, Gaeilge, Հայերեն, Lietuvių, Malti, Eesti.

</details>

<details>
<summary><b>Base científica del color</b></summary>

- **CIE 1931** — Espectro visible 380–700 nm, locus cromático
- **OKLCH** — Espacio perceptual (Björn Ottosson)
- **Chroma por hue** — Escala según gamut y elipses de MacAdam
- **Weber-Fechner** — Pasos de luminosidad perceptualmente uniformes
- **WCAG** — Contraste mínimo 3:1 para componentes UI

</details>

---

## Filosofía

1. **Una sola página** — Toda la app es una única HTML; no hay rutas ni layouts separados
2. **Métricas → identidad** — 12 métricas alimentan el motor; no hay paletas manuales
3. **Base científica** — Colores basados en espectro visible, OKLCH, Weber-Fechner
4. **SYX theming** — Tokens aplicados vía variables CSS

---

## Licencia

MIT — ver [LICENSE](syx-main--languages/LICENSE) en el subproyecto SYX.
