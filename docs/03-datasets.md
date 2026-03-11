# Datasets

## Tipos de datos necesarios

- metadatos de idioma (script, direction, ISO 639)
- métricas lingüísticas (12 dimensiones normalizadas 0–1)
- poema (título, autor, líneas)
- perfil tipográfico (fontFamily, fontName)

## Fuentes recomendadas

### WALS (World Atlas of Language Structures)

- **URL:** https://wals.info/download | https://github.com/cldf-datasets/wals
- **Formato:** CLDF (CSV/JSON)
- **Licencia:** CC BY 4.0

**Mapeo a nuestras métricas:**

| WALS Feature | Descripción | Nuestra métrica |
|--------------|-------------|-----------------|
| 1A | Consonant-vowel ratio | vowelConsonantRatio (invertir) |
| 3A | Order of subject, object, verb | wordOrderRigidity |
| 20A | Fusion of selected inflectional formatives | morphologyComplexity |
| 22A | Exponence of selected inflectional formatives | agglutinationIndex |
| 49A | Number of cases | morphologyComplexity (contribución) |
| 81A | Order of subject and verb | wordOrderRigidity |

### PHOIBLE

- **URL:** https://phoible.github.io/ | https://github.com/phoible/dev
- **Formato:** CLDF
- **Contenido:** Inventarios fonológicos (consonantes, vocales, tonos)

**Mapeo:**

- `vowelConsonantRatio` — V/(V+C) por idioma
- `phoneticSoftness` — inferir de líquidas, nasales, vocales abiertas vs. oclusivas

### Grambank

- **URL:** https://grambank.clld.org/
- **Contenido:** Rasgos gramaticales binarios

**Uso:** Validar `morphologyComplexity`, `syntacticDepth`, `agglutinationIndex` — validar o reemplazar valores manuales.

### CLDR (Unicode)

- **URL:** https://github.com/unicode-org/cldr-json
- **Contenido:** `direction`, `script`, `layout` por locale

**Uso:** Validar `direction` y `script` por idioma.

### Glottolog

- **URL:** https://glottolog.org/
- **Contenido:** Clasificación genética, familias

**Uso:** Agrupar por familia (Romance, Germanic, etc.) para reglas tipográficas por familia.

## Estado actual

- Métricas: **curatoradas manualmente** en `js/data.js`
- Sin integración automática con bases externas
- Ver `docs/QA-REPORT.md` para prioridades de integración
