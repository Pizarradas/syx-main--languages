# QA Report — Language Identity Engine

## 1. Filosofía y coherencia conceptual

### ✅ Fortalezas

- **Visión clara:** "Un idioma no solo se lee. También se ve." — el pipeline está bien alineado: métricas → macro-indicadores → identidad visual → theme.
- **Separación de responsabilidades:** `data.js` (datos curatoriales), `identity.js` (cálculo), `theme.js` (aplicación), `charts.js` (visualización).
- **Dualidad softness/density:** La distinción entre "suavidad" (vocal, fluida, curva) y "densidad" (consonante, larga, compleja) es lingüísticamente coherente y genera contrastes visuales bien diferenciados.

### ⚠️ Puntos de atención

- **identityHue:** Es el único parámetro de color que no se deriva de métricas. Es una decisión editorial por idioma — correcto para la identidad cultural, pero **no hay criterio de distribución.** Varios idiomas comparten el mismo hue:
  - `355` (rojo): ru, tr, id, pl, hu — 5 idiomas colisionan.
  - `210` (azul): de, he
  - `120` (verde): sw, fa — 2 idiomas

- **Consecuencia:** Ruso, Turco, Indonesio, Polaco y Húngaro se verán casi idénticos en color. Se pierde la "apreciabilidad" de la identidad.

---

## 2. Auditoría matemática

### 2.1 Macro-indicadores (documentados en 5b-algorithm-spec.md)

| Fórmula | Implementación | Comentario |
|---------|----------------|------------|
| softness = 0.4·VCR + 0.35·PS + 0.25·CC | ✅ Correcta | Pesos suman 1.0. Coherente. |
| density = 0.3·AWL + 0.4·SD + 0.3·MC | ✅ Correcta | Pesos suman 1.0. Coherente. |

### 2.2 Color (OKLCH)

| Variable | Fórmula | Rango teórico | Validez |
|----------|---------|---------------|---------|
| chromaAccent | 0.09 + 0.07·soft + 0.09·dens | 0.09–0.25 | ✅ OKLCH chroma típico 0.05–0.25 |
| chromaBg | chromaAccent × 0.32 | — | ✅ Subducción correcta |
| bgL | 0.075 + (1−density)×0.035 | 0.075–0.11 | ✅ Fondos oscuros |
| accentL | 0.58 + softness×0.10 | 0.58–0.68 | ✅ Acento legible |
| secHue | (hue + 150) % 360 | — | ✅ Split-complementario correcto |

### 2.3 Tipografía

| Variable | Fórmula | Rango | Observación |
|----------|---------|-------|-------------|
| letterSpacing | -0.025 + 0.08·PS | -0.025 … +0.055em | ✅ PS puede ser 0–1 |
| lineHeight | 1.30 + 0.4·SR + 0.35·soft | 1.30–2.05 | ⚠️ Con softness≈0.65 y SR≈0.9: 1.30+0.36+0.23 = 1.89 — alto pero legible |
| radius | 0.2 + 1.0·soft | 0.2–1.2rem | ✅ |
| fontWeight | 300 + 400·MC | 300–700 | ✅ |
| wordSpacing | -0.015 + 0.065·AWL - 0.025·AG | -0.04 … +0.045em | ✅ Lógica correcta |

### 2.4 Posibles errores o inconsistencias

1. **animDuration:** `0.38 + (SD×0.38 + CC×0.62)×0.52`  
   - Rango: 0.38 … 0.90s  
   - Con SD=1, CC=1: 0.38 + 0.52 = 0.90s — máximo razonable.  
   - ✅ Correcto.

2. **glowPower:** `softness × (PS + CC)/2`  
   - Si softness=0.45, PS=0.42, CC=0.40 → 0.45×0.41 = 0.18 < 0.30 → no glow  
   - Si softness=0.65, PS=0.68, CC=0.62 → 0.65×0.65 = 0.42 > 0.30 → glow  
   - ✅ Umbral coherente.

3. **noiseOpacity:** `min(0.058, DF×0.042 + SD×0.018)`  
   - Con DF=0.85, SD=0.48: 0.036+0.009 = 0.045 → capado a 0.058  
   - ✅ Correcto.

4. **accentGlow:** Solo si `characterCurvature×20 > 4` → CC > 0.2  
   - Finlandés con CC=0.38 → 7.6px glow  
   - Inglés con CC=0.40 → 8px glow  
   - Chino con CC=0.78 → 15.6px glow  
   - ✅ Escala razonable.

---

## 3. Calidad de métricas por idioma

### 3.1 Métricas manuales vs. lingüística real

Las métricas están **curatoradas a mano** (no derivadas de corpus). Riesgos:

- **Inconsistencias:** Ej. `agglutinationIndex` en Japonés (0.85) vs. Turco (0.94) vs. Húngaro (0.98) — correcto. Pero el Japonés tiene aglutinación más moderada que el Turco; el valor 0.85 es razonable.
- **Falta de trazabilidad:** No hay fuente para validar ni actualizar.

### 3.2 Colisiones de hue

| Hue | Idiomas | Recomendación |
|-----|---------|---------------|
| 355 | ru, tr, id, pl, hu | Separar: ru 355, tr 15, id 280, pl 320, hu 340 |
| 210 | de, he | Separar: de 210, he 260 |
| 120 | sw, fa | Separar: sw 120, fa 95 |

---

## 4. Bases de datos open source recomendadas

### 4.1 WALS (World Atlas of Language Structures)

- **URL:** https://wals.info/download | https://github.com/cldf-datasets/wals  
- **Formato:** CLDF (CSV/JSON)  
- **Licencia:** CC BY 4.0  

**Features relevantes para mapear a nuestras métricas:**

| WALS Feature | Nuestra métrica | Mapeo |
|--------------|-----------------|-------|
| 1A (consonant-vowel ratio) | vowelConsonantRatio | Invertir: VCR = 1 − (consonants/(C+V)) |
| 3A (word order) | wordOrderRigidity | SOV/SVO/VO/V2 → escala 0–1 |
| 20A (fusion) | morphologyComplexity | Fusional vs. agglutinative vs. isolating |
| 22A (agglutination) | agglutinationIndex | Directo |
| 49A (number of cases) | morphologyComplexity | Contribuir al índice |
| 81A (order of subject-verb) | wordOrderRigidity | SOV=0.3, SVO=0.7, etc. |

**Uso sugerido:** Script de preprocesamiento que lea `cldf/values.csv` y `cldf/parameters.csv`, mapee por ISO 639-3, y genere un JSON de métricas para importar en `data.js` o para validar las actuales.

### 4.2 PHOIBLE

- **URL:** https://phoible.github.io/ | https://github.com/phoible/dev  
- **Formato:** CLDF  
- **Contenido:** Inventarios fonológicos (consonantes, vocales, tonos)  

**Uso para:**

- `vowelConsonantRatio` — calcular proporción real V/(V+C) por idioma  
- `phoneticSoftness` — inferir de presencia de líquidas, nasales, vocales abiertas vs. oclusivas, fricativas  

### 4.3 Grambank

- **URL:** https://grambank.clld.org/  
- **Contenido:** Rasgos gramaticales binarios (morfología, sintaxis)  

**Uso para:** `morphologyComplexity`, `syntacticDepth`, `agglutinationIndex` — validar o reemplazar valores manuales.

### 4.4 CLDR (Unicode Common Locale Data Repository)

- **URL:** https://github.com/unicode-org/cldr-json  
- **Contenido:** `direction`, `script`, `layout` por locale  

**Uso para:** Validar `direction` y `script` por idioma; evitar duplicar datos manuales.

### 4.5 Glottolog

- **URL:** https://glottolog.org/  
- **Contenido:** Clasificación genética, familias  

**Uso para:** Agrupar idiomas por familia (Romance, Germanic, etc.) y aplicar `font-style: italic` u otras reglas por familia en lugar de solo por script.

---

## 5. Recomendaciones de afinado

### 5.1 Inmediatas (sin dependencias externas)

1. **Descolisionar identityHue** — asignar hue único por idioma (o al menos 15–20° de separación).  
2. **Documentar fuentes** — añadir en cada métrica un comentario o campo `source` (ej. "WALS 1A", "estimado", "PHOIBLE").  
3. **Normalizar métricas** — asegurar que todas estén en [0, 1] y documentar el significado de los extremos.

### 5.2 Corto plazo (con datos externos)

1. **Integrar WALS** — script que importe features 1A, 3A, 20A, 22A, 49A, 81A y genere/actualice métricas.  
2. **Integrar PHOIBLE** — para `vowelConsonantRatio` y `phoneticSoftness` basados en inventarios reales.  
3. **Cache local** — JSON preprocesado en `data/` para no depender de CDN en runtime.

### 5.3 Ajustes de fórmula

1. **softness** — considerar `syllabicRegularity` como factor adicional (ritmo más regular → más "suave").  
   - Propuesta: `0.35·VCR + 0.30·PS + 0.25·CC + 0.10·SR`  
   - Requiere renormalizar pesos.

2. **density** — considerar `syntacticDepth` (sintaxis profunda → más densidad).  
   - Propuesta: `0.25·AWL + 0.35·SD + 0.25·MC + 0.15·synDepth`  

3. **poemScale** — actualmente `1.06 - 0.14·scriptDensity`  
   - Chino (SD=1): 0.92  
   - Latín (SD=0.45): 1.00  
   - Podría amplificar: `1.0 - 0.18·scriptDensity` para mayor contraste.

### 5.4 Nuevas métricas derivadas de datos

1. **syllableCount** (de PHOIBLE) — número medio de sílabas por palabra.  
2. **caseCount** (de WALS 49A) — número de casos gramaticales.  
3. **wordOrder** (de WALS 81A) — SOV, SVO, etc., para mapear a `wordOrderRigidity`.

---

## 6. Resumen ejecutivo

| Aspecto | Estado | Acción prioritaria |
|---------|--------|--------------------|
| Filosofía | ✅ Bien | — |
| Macro-indicadores | ✅ Correctos | — |
| Fórmulas OKLCH | ✅ Correctas | — |
| Fórmulas tipográficas | ✅ Correctas | — |
| Colisiones hue | ❌ 5 idiomas en 355° | Descolisionar |
| Fuentes de métricas | ⚠️ Manuales | Integrar WALS/PHOIBLE |
| Trazabilidad | ⚠️ Baja | Documentar fuente por métrica |

**Prioridad 1:** Descolisionar `identityHue` para que cada idioma sea visualmente distintivo.  
**Prioridad 2:** Crear pipeline de importación WALS/PHOIBLE para validar y enriquecer métricas.  
**Prioridad 3:** Ajustar fórmulas de softness/density con `syllabicRegularity` y `syntacticDepth` si se valida tras pruebas A/B.
