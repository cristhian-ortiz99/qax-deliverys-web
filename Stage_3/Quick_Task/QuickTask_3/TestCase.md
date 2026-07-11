# Feature: Validación del formulario de solicitud de crédito - QAX PayLater

Como QA Automation

Quiero validar el comportamiento del formulario de solicitud de crédito utilizando diferentes tipos de aserciones y anotaciones de Playwright

Para asegurar que la aplicación funcione correctamente y cumpla con los criterios de aceptación establecidos.

---

## HU-01 Validación del formulario de solicitud de crédito

### CP-01 Validar que el título de la página contenga "QAX PayLater"

```gherkin
Scenario: Validar el título de la página

Given que el usuario ingresa a la aplicación QAX PayLater
When la página termina de cargar
Then el título contiene "QAX PayLater"
```

---

### CP-02 Validar que la sección del simulador de crédito esté visible

```gherkin
Scenario: Visualizar el formulario de solicitud

Given que el usuario se encuentra en la página de solicitud de crédito
When observa el contenido principal
Then la sección "Información Personal" es visible
```

---

### CP-03 Validar que el botón de acción esté deshabilitado inicialmente

```gherkin
Scenario: Estado inicial del botón Continuar

Given que el usuario abre el formulario sin ingresar información
When observa el botón "Continuar a Verificación"
Then el botón permanece deshabilitado
```

> **Observación:** Durante la ejecución manual se identificó que la implementación actual mantiene el botón habilitado desde el inicio.

---

### CP-04 Validar que al llenar los campos obligatorios el botón se habilite

```gherkin
Scenario: Habilitación del botón al completar el formulario

Given que el usuario completa todos los campos obligatorios
When finaliza el ingreso de información
Then el botón "Continuar a Verificación" se encuentra habilitado
```

> **Observación:** La implementación actual mantiene el botón habilitado desde el inicio del formulario.

---

### CP-05 Validar que al enviar el formulario aparezca un mensaje de confirmación

```gherkin
Scenario: Mostrar mensaje de confirmación

Given que el usuario completa correctamente el formulario
When presiona "Continuar a Verificación"
Then se muestra el mensaje de confirmación
```

---

### CP-06 Validar que el mensaje de confirmación contenga el texto esperado

```gherkin
Scenario: Validar contenido del mensaje de confirmación

Given que el formulario fue enviado correctamente
When aparece el mensaje de confirmación
Then el mensaje contiene el texto "Datos guardados correctamente"
```

---

### CP-07 Validar que un campo de entrada mantenga el valor ingresado

```gherkin
Scenario: Mantener el valor ingresado

Given que el usuario escribe información en el formulario
When consulta nuevamente el contenido del campo
Then el valor ingresado permanece sin modificaciones
```

---

### CP-08 Validar que un campo sea editable

```gherkin
Scenario: Campo editable

Given que el usuario accede al formulario
When selecciona un campo de entrada
Then el campo permite ingresar información
```

---

### CP-09 Validar que un campo acepte un formato numérico válido

```gherkin
Scenario: Ingreso de formato numérico

Given que el usuario completa el campo "Ingreso Mensual"
When ingresa un valor numérico válido
Then el sistema conserva correctamente el valor ingresado
```

---

### CP-10 Validar que al enviar sin llenar campos obligatorios aparezca un borde rojo

```gherkin
Scenario: Validar campos obligatorios vacíos

Given que el usuario no completa los campos obligatorios
When intenta enviar el formulario
Then los campos obligatorios muestran un borde rojo indicando error
```
