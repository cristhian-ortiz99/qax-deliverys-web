# Challengue2_Stage 1 QAX Lab - Identificación de Localizadores con Playwright

## Objetivo

Identificar y documentar los localizadores más adecuados para los elementos presentes en los diferentes laboratorios de **QAX Lab**, utilizando las estrategias de localización recomendadas por Playwright y priorizando la accesibilidad y la estabilidad de los selectores.

---

# Descripción

Durante este ejercicio se realizó el análisis de diferentes páginas web del laboratorio con el propósito de identificar los elementos de la interfaz y definir el localizador más apropiado para cada uno.

No se implementó automatización de pruebas; el objetivo fue construir una matriz de localizadores que sirva como base para futuras pruebas automatizadas.

---

# Objetivos Específicos

* Identificar elementos interactivos de las aplicaciones.
* Aplicar las estrategias de localización recomendadas por Playwright.
* Diferenciar cuándo utilizar `getByRole()`, `getByLabel()`, `getByPlaceholder()` y `locator()`.

---

# Aplicaciones Analizadas

* QAX Clinic
* QAX Shop
* QAX Bank Dashboard

---

# Estrategia de Identificación

Para cada elemento se siguió el siguiente orden de prioridad:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `locator()` mediante atributos únicos (`id`, `name`, etc.)
