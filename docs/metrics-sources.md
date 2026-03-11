# Fuentes de las métricas lingüísticas

Referencia para validar o ajustar métricas manualmente. Consultar WALS/PHOIBLE al añadir idiomas o revisar valores.

## Mapeo métrica ↔ base de datos

| Métrica | Fuente principal | Cómo obtener / validar |
|---------|------------------|------------------------|
| **vowelConsonantRatio** | PHOIBLE | V/(V+C) del inventario fonológico. Feature: inventario de consonantes y vocales. |
| **syllabicRegularity** | PHOIBLE (estimado) | Estructura silábica: CV dominante → alto; CCVCC, clusters → bajo. |
| **phoneticSoftness** | PHOIBLE | Proporción líquidas+nasales+vocales abiertas vs. oclusivas+fricativas. |
| **avgWordLength** | Estimado / WALS 20A | Sílabas por palabra. Aglutinantes → alto; aislantes → bajo. |
| **morphologyComplexity** | WALS 20A, 49A, Grambank | 20A: fusion; 49A: number of cases. Fusional/agglutinative → alto. |
| **agglutinationIndex** | WALS 22A | Exponence of selected inflectional formatives. Agglutinative → 1. |
| **avgSentenceLength** | Estimado / Grambank | Oraciones largas con subordinación → alto. |
| **wordOrderRigidity** | WALS 81A, 3A | 81A: S-V order; 3A: SOV/SVO. SVO fijo → alto; orden libre → bajo. |
| **syntacticDepth** | Grambank | Subordination, embedding, relative clauses. |
| **scriptDensity** | Estimado | Tamaño del inventario de grafemas. CJK → 1; Latín básico → ~0.4. |
| **characterCurvature** | Estimado | Análisis visual: Thai, Árabe, Devanagari → curvo; Latín nórdico → angular. |
| **diacriticFrequency** | PHOIBLE (tonos), Unicode | Tonos, vocalizaciones, tildes. Vietnamita, Árabe → alto. |

## Enlaces rápidos

- **WALS:** https://wals.info/feature — buscar por ID (1A, 3A, 20A, 22A, 49A, 81A)
- **PHOIBLE:** https://phoible.github.io/ — inventarios fonológicos por idioma
- **Grambank:** https://grambank.clld.org/ — rasgos gramaticales
- **CLDR:** https://github.com/unicode-org/cldr-json — script, direction por locale

## Convención de valores

Todas las métricas están normalizadas en **[0, 1]**:

- **0** = extremo "bajo" (ej. Chino en agglutination)
- **1** = extremo "alto" (ej. Chino en scriptDensity)
- Valores intermedios = posición relativa entre idiomas de referencia

Al añadir un idioma, comparar con idiomas similares ya en el catálogo y con los datos de WALS/PHOIBLE cuando existan.
