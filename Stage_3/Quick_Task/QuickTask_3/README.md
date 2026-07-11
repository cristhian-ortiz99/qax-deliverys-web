# Quicktask - Stage 3 | QAX PayLater

## Título de la entrega

Automatización Web - Validación de aserciones y anotaciones con Playwright sobre la aplicación **QAX PayLater**.

---

# Objetivo / Historia de Usuario

Como **QA Automation**,

Quiero validar el correcto funcionamiento del formulario de solicitud de crédito utilizando distintos tipos de aserciones y anotaciones de Playwright,

Para asegurar que el comportamiento de la interfaz sea consistente y cumpla con los criterios de aceptación definidos.

---

# Criterios de aceptación

Se automatizaron los siguientes escenarios solicitados:

* Validar que el título de la página contenga **"QAX PayLater"**.
* Validar que la sección del formulario de solicitud de crédito sea visible.
* Validar el estado inicial del botón de acción.
* Validar el comportamiento del botón al completar los campos obligatorios.
* Validar que al enviar el formulario aparezca un mensaje de confirmación.
* Validar que el mensaje de confirmación contenga el texto esperado.
* Validar que un campo mantenga el valor ingresado.
* Validar que un campo sea editable.
* Validar que un campo acepte un formato numérico válido..
* Utilizar aserciones **Auto-Retrying**.
* Utilizar una aserción **Non-Retrying** para el título.
* Utilizar **Soft Assertions** para validar múltiples atributos del formulario.
* Utilizar la anotación **test.skip()** para el escenario solicitado.


---

## Técnicas utilizadas

* Automatización Web con Playwright.
* Patrón Given / When / Then mediante `test.step()`.
* Localizadores basados principalmente en:

  * `getByRole()`
  * `getByLabel()`
  * `locator()`
* Uso de:

  * Auto-Retry Assertions.
  * Non-Retry Assertions.
  * Soft Assertions.
  * `test.skip()`.
* Validación de navegación y mensajes de confirmación.

---

## Precondiciones

* Node.js instalado.
* Playwright instalado.
* Proyecto configurado correctamente.
* Acceso a la URL del laboratorio QAX PayLater.
* Navegador Chromium disponible.

---

# Ejecución

Instalar dependencias:

```bash
pnpm init
```

Ejecutar todas las pruebas:

```bash
pnpm playwright test
```

---

# Observaciones

Durante la revisión funcional se identificaron diferencias entre algunos criterios de aceptación y la implementación actual de la aplicación:

* El botón **"Continuar a Verificación"** permanece habilitado desde la carga inicial del formulario, por lo que no es posible validar el flujo de habilitación/deshabilitación indicado en los criterios.
* El formulario muestra mensajes de error para los campos obligatorios, pero no aplica un borde rojo a los controles vacíos, comportamiento esperado según la especificación.

