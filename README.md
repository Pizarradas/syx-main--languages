# Language Identity Engine

> Un idioma no solo se lee. También se ve.

**Language Identity Engine** genera identidades visuales dinámicas a partir de métricas lingüísticas. Cada idioma obtiene una paleta de colores, tipografía, espaciado y animaciones derivados de su perfil fonológico, morfológico y tipográfico.

---

## ¿Para qué?

- **Diseño multilingüe**: Aplicar identidades visuales coherentes con la naturaleza de cada idioma.
- **Investigación**: Explorar la relación entre estructura lingüística y percepción visual.
- **Exportación**: Obtener tokens CSS y JSON para integrar en sistemas de diseño.
- **Comparación**: Contrastar dos idiomas lado a lado (paletas, métricas, radar).

---

## ¿Por qué?

Los idiomas difieren en sonoridad, morfología, longitud de palabra, densidad de script, etc. Esas diferencias pueden traducirse en decisiones visuales: un idioma con muchas vocales y curvas suaves puede evocar colores cálidos y tipografía fluida; uno con consonantes densas y morfología compleja puede sugerir tonos fríos y estructuras más rígidas. El motor convierte esas intuiciones en un pipeline algorítmico y científicamente fundamentado.

---

## Filosofía

1. **Una sola página**: Toda la aplicación es una única HTML. No hay rutas ni layouts separados.
2. **Métricas → identidad**: Las 12 métricas lingüísticas alimentan el motor; no hay paletas manuales por idioma.
3. **Base científica**: Colores basados en espectro visible (CIE 1931), OKLCH, Weber-Fechner y contraste WCAG.
4. **SYX theming**: Los tokens generados se aplican vía variables CSS y el sistema de temas SYX.

---

## Tecnologías

| Área | Stack |
|-----|-------|
| **Frontend** | HTML5, CSS (SCSS), JavaScript (ES modules) |
| **Sistema de diseño** | SYX Design System |
| **Gráficos** | Chart.js 4.x (radar, barras, doughnut) |
| **Animaciones** | GSAP 3.x |
| **Fuentes** | Google Fonts (Lora, Noto Serif, Space Grotesk, etc.) |
| **Colores** | OKLCH, base espectral 380–700 nm |

---

## Estructura del proyecto

```
├── index.html              # Página única (Explorar, Comparar, Análisis)
├── js/
│   ├── main.js             # Entry point, selector, vistas
│   ├── data.js             # LANGUAGES (34 idiomas), METRIC_INFO
│   ├── identity.js         # computeIdentity() — motor principal
│   ├── color-science.js    # λ→hue, chroma, contraste (base científica)
│   ├── theme.js            # applyTheme(), updateContent()
│   ├── charts.js           # Radar explorar + radar comparar
│   ├── compare.js          # Vista Comparar
│   ├── analytics.js        # Datos para gráficos
│   ├── analytics-charts.js # Gráficos de análisis
│   └── export.js           # Exportar CSS / JSON
├── syx-main--languages/
│   ├── css/styles-languages.css   # Compilado desde scss/
│   ├── scss/
│   └── img/flags/                # Banderas SVG (ISO 3166-1)
├── package.json                  # Scripts de build y serve
├── .gitignore
└── README.md
```

---

## Pipeline visual

```
12 métricas lingüísticas
    ↓
macro-indicators (softness · density)
    ↓
fingerprint → longitud de onda λ (380–700 nm)
    ↓
hue OKLCH · chroma (gamut) · lightness (Weber-Fechner)
    ↓
paleta (bg, accent, secondary +150°, tertiary +120°)
    ↓
tipografía · espaciado · animación · sombras
    ↓
SYX theme aplicado
```

---

## Métricas lingüísticas (12)

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

---

## Idiomas soportados (34)

Español, English, 日本語, العربية, Suomi, 中文, 한국어, हिन्दी, Deutsch, Français, Português, Русский, Italiano, Ελληνικά, Türkçe, עברית, ภาษาไทย, Tiếng Việt, Bahasa Indonesia, Kiswahili, Polski, Nederlands, Svenska, Magyar, فارسی, ქართული, தமிழ், Cymraeg, Euskara, Te Reo Māori, Tagalog, Íslenska, Gaeilge, Հայերեն, Lietuvių, Malti, Eesti.

---

## Vistas

- **Explorar**: Un idioma, radar de métricas, poema, paleta, tipografía.
- **Comparar**: Dos idiomas lado a lado, radar superpuesto, exportación A/B.
- **Análisis**: Temperatura cromática, familias tipográficas, scripts, hue por idioma (ordenado por temperatura cromática), perfil de jerarquía.

---

## Exportación

- **CSS**: Variables OKLCH y tokens del tema.
- **JSON**: Identidad completa (colores, tipografía, métricas).

En modo Comparar: opciones separadas para idioma A y B.

---

## Base científica del color

- **CIE 1931**: Espectro visible 380–700 nm, locus cromático.
- **OKLCH**: Espacio perceptual (Björn Ottosson).
- **Chroma por hue**: Escala según gamut y elipses de MacAdam.
- **Weber-Fechner**: Pasos de luminosidad perceptualmente uniformes.
- **WCAG**: Contraste mínimo 3:1 para componentes UI.

---

## Desarrollo

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd language-identity-engine

# Compilar estilos (si modificas SCSS)
npm run build:css

# Servir localmente
npm start
# o: npx serve .
```

**Scripts disponibles:**
- `npm run build:css` — Compila `styles-languages.scss` → CSS
- `npm run build:css:watch` — Compilación en modo watch
- `npm start` — Sirve la raíz por HTTP (puerto 3000 por defecto)

**Despliegue:** Compatible con GitHub Pages, Netlify, Vercel, etc. La raíz del repo es la raíz del sitio; `index.html` y las rutas relativas funcionan sin configuración adicional.

---

## Regla crítica

La aplicación debe ser **una sola página HTML**. No hay múltiples páginas ni layouts por idioma. Todo se controla por estado (idioma seleccionado, vista activa) y actualización dinámica del DOM.
