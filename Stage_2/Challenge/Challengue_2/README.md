# Stage 2 - QAXpert Forms

## Objetivo

Automatizar los principales comportamientos avanzados de la aplicación **QAXpert Forms** utilizando **Playwright**, validando componentes como alertas nativas, modales personalizados, iframes y cambios de contexto de acuerdo con las Historias de Usuario propuestas.

---

# Historias de Usuario Automatizadas

## HU-01: Cobertura total de alertas nativas

Como	QA de QAX Forms
Quiero	probar todas las variantes de alertas del navegador
Para	garantizar que el sistema responde correctamente en cada situación


---

## HU-02: Modales personalizados

Como	QA de QAX Forms
Quiero	validar que los modales se abren, muestran contenido correcto y se cierran por cualquier mecanismo
Para	asegurar que la experiencia de usuario con modales es consistente

---

## HU-03: Iframes — simple y anidados

Como	QA de QAX Forms
Quiero	validar la interacción con iframes de distintos niveles de anidamiento
Para	garantizar que el sistema mantiene el contexto correcto en cada nivel


---

## HU-04: Flujo combinado de cambios de contexto


Como	QA de QAX Forms
Quiero	probar una secuencia real que combine alertas, modales e iframes
Para	detectar regresiones en el manejo de contexto al alternar entre componentes

---

# Criterios de aceptación

## HU-01

* Alerta simple: se muestra y se cierra al aceptar
* Confirmar (Aceptar): muestra mensaje "You pressed Ok"
* Confirmar (Cancelar): muestra mensaje "You Pressed Cancel"
* Prompt con texto: el mensaje incluye el texto ingresado
* Prompt cancelado: no ingresa texto, el resultado se maneja como null

## HU-02

* Modal se abre y el contenido es visible
* Título y cuerpo del modal contienen los textos esperados
* Botón Cancelar cierra el modal y no ejecuta la acción
* Botón Confirmar cierra el modal y ejecuta la acción
* Modal no está visible en pantalla después de cerrarse


## HU-03

* Iframe simple: el contenido del iframe es visible y accesible
* Iframe anidado: se puede navegar al iframe hijo y escribir en su input
* Cambio de contexto: después del iframe, se vuelve al contexto principal sin errores
* Validación de texto: el mensaje generado dentro del iframe es correcto

## HU-04

* Abrir una alerta, luego un modal, luego un iframe en secuencia
* Volver al contexto principal después de cada interacción
* El estado de la página no se corrompe al alternar contextos
* Todas las validaciones pasan en cada paso de la secuencia


---

# Estrategia de prueba

## Casos automatizados

* Validación de alerta simple.
* Validación de confirmaciones aceptando y cancelando.
* Validación de prompt ingresando información.
* Validación del resultado mostrado después de cada alerta.
* Apertura y cierre de modales.
* Validación de títulos y contenido del modal.
* Cambio de contexto hacia un iframe.
* Validación de contenido dentro del iframe.
* Flujo combinado entre alertas, modales y navegación.

---

## Precondiciones

* Node.js instalado.
* Playwright instalado.
* Dependencias del proyecto instaladas mediante **pnpm install**.
* Acceso a la aplicación QAXpert Forms.
* Navegador Chromium disponible.

---

# Ejecución

## Instalar dependencias

```bash
pnpm install
```

## Ejecutar todas las pruebas

```bash 
pnpm playwright test
```

## Ejecutar en modo headed

```bash 
pnpm playwright test --headed
```

---

# Resultados

Durante la ejecución de las pruebas se valida que:

* Las alertas nativas del navegador funcionan correctamente.
* Los diálogos **Alert**, **Confirm** y **Prompt** muestran el comportamiento esperado.
* Los modales personalizados presentan el contenido correcto y se cierran adecuadamente.
* El contenido de los iframes es accesible mediante cambio de contexto.
* La aplicación mantiene correctamente el contexto durante un flujo combinado entre alertas, modales, iframes y navegación.

---


# Tecnologías utilizadas

* Playwright
* Typescript
* Node.js
* Visual Studio Code

---

# Autor

Cristhian Ortiz
