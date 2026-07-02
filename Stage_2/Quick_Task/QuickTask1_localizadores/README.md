# Quicktask2_Stage 2 - Shadow DOM, IFrame, Popup e Interacciones con Playwright

## Objetivo

Desarrollar ejercicios prácticos para reforzar el uso de Playwright mediante:

- Identificación de localizadores para elementos ubicados dentro de Shadow DOM, IFrame y Popup.
- Automatización de diferentes tipos de interacción disponibles en aplicaciones web utilizando Playwright.

---

# Parte 1 - Localizando elementos

## Historia de Usuario

Como QA Automation Engineer,
quiero identificar los localizadores necesarios para interactuar con elementos que se encuentran dentro de Shadow DOM, IFrame y Popup,
para comprender la estrategia adecuada de acceso a estos componentes especiales.

## Entregable

Archivo:

```
shadow-iframe-popup.md
```

Contenido:

- Localizadores para Shadow DOM.
- Localizadores para IFrame.
- Localizadores para Popup.
- Ejemplos de acceso utilizando Playwright.

---

# Parte 2 - Automatización de Interacciones

## Historia de Usuario

Como QA Automation Engineer,
quiero automatizar diferentes tipos de interacción disponibles en una aplicación web,
para conocer las principales funcionalidades que ofrece Playwright para la automatización de pruebas.

## Casos implementados

### Caso 1 - Click Forzado

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/get-user-media.html

**Given**
- El usuario accede a la página Get User Media.

**When**
- Realiza un clic forzado sobre el botón **Start**.

**Then**
- Se verifica que el botón se encontraba disponible para la interacción y el clic se ejecuta correctamente.

---

### Caso 2 - Mouse Over

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/mouse-over.html

**Given**
- El usuario accede a la página Mouse Over.

**When**
- Posiciona el cursor sobre la imagen **Compass**.

**Then**
- Se visualiza el texto **Compass** correspondiente a la imagen.

---

### Caso 3 - Click Izquierdo

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html

**Given**
- El usuario accede a la página Dropdown Menu.

**When**
- Realiza clic izquierdo sobre el botón **Use left-click here**.

**Then**
- Se muestra el menú desplegable.

---

### Caso 4 - Click Derecho

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html

**Given**
- El usuario accede a la página Dropdown Menu.

**When**
- Realiza clic derecho sobre el botón **Use right-click here**.

**Then**
- Se muestra el menú desplegable.

---

### Caso 5 - Doble Click

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html

**Given**
- El usuario accede a la página Dropdown Menu.

**When**
- Realiza doble clic sobre el botón **Use double-click here**.

**Then**
- Se muestra el menú desplegable.

---

### Caso 6 - Drag & Drop

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/drag-and-drop.html

**Given**
- El usuario accede a la página Drag and Drop.

**When**
- Arrastra el panel hacia el área destino.

**Then**
- Se verifica que el panel cambió de posición.

---

### Caso 7 - Simulación de Teclas

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/slow-calculator.html

**Given**
- El usuario accede a la calculadora.

**When**
- Modifica el valor del campo **Delay** utilizando únicamente el teclado.

**Then**
- Se valida que el nuevo valor fue registrado correctamente.

---

### Caso 8 - Alert

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html

**Given**
- El usuario accede a la página Dialog Boxes.

**When**
- Abre el cuadro de diálogo Alert y lo acepta.

**Then**
- Se valida el tipo de diálogo y el mensaje mostrado antes de aceptarlo.

---

### Caso 9 - Confirm

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html

**Given**
- El usuario accede a la página Dialog Boxes.

**When**
- Abre el cuadro Confirm y selecciona **Aceptar**.

**Then**
- Se muestra el mensaje **"You chose: true"**.

---

### Caso 10 - Prompt

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html

**Given**
- El usuario accede a la página Dialog Boxes.

**When**
- Ingresa el nombre **Cristhian** en el Prompt y confirma.

**Then**
- Se muestra el mensaje **"You typed: Cristhian"**.

---

### Caso 11 - Modal

**Sitio:**
https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html

**Given**
- El usuario accede a la página Dialog Boxes.

**When**
- Abre el Modal y selecciona **Close** o **Save changes**.

**Then**
- Se muestra el mensaje correspondiente a la opción seleccionada.

---

### Caso 12 - Manejo de Pestañas

**Sitio:**
https://demo.automationtesting.in/Windows.html

**Given**
- El usuario accede a la página Windows.

**When**
- Selecciona el botón **click** para abrir una nueva pestaña.

**Then**
- Se valida que la nueva pestaña corresponde al sitio oficial de Selenium mediante su URL y título.

---

### Caso 13 - IFrame

**Sitio:**
https://demo.automationtesting.in/Frames.html

**Given**
- El usuario accede a la página Frames.

**When**
- Ingresa texto dentro del iframe principal.

**Then**
- Se verifica que el texto fue ingresado correctamente en el campo del iframe.
---

# Criterios de aceptación

- Se identifica correctamente la estrategia de acceso para Shadow DOM.
- Se identifica correctamente la estrategia de acceso para IFrame.
- Se identifica correctamente la estrategia de acceso para Popup.
- Cada interacción se automatiza mediante un caso de prueba independiente.
- Los casos siguen la estructura Given - When - Then.
- Se utilizan localizadores propios de Playwright.
- Cada prueba contiene al menos una validación mediante `expect()`.

---

# Estrategia de prueba

## Tipo

- Pruebas funcionales.
- Automatización Web.
- Interacción con elementos del DOM.

## Herramientas

- Playwright
- TypeScript
- Visual Studio Code
- Node.js

## Cobertura

Se validan las siguientes interacciones:

- Click Forzado
- Mouse Hover
- Click Izquierdo
- Click Derecho
- Doble Click
- Drag & Drop
- Upload de archivos
- Simulación de teclado
- Scroll
- Alert
- Confirm
- Prompt
- Modal
- Manejo de pestañas
- Manejo de IFrame

---

# Ejecución

Instalar dependencias:

```bash
npm install -g pnpm
pnpm init
pnpm add @playwright/test
```

Ejecutar todas las pruebas:

```bash
pnpm playwright test
```

Ejecutar una prueba específica:

```bash
pnpm playwright test nombre-del-archivo.spec.ts
```
---

# Resultados esperados

- Se identifican correctamente los localizadores de Shadow DOM, IFrame y Popup.
- Todas las pruebas finalizan satisfactoriamente.
- Las validaciones (`expect`) confirman el comportamiento esperado de cada interacción.