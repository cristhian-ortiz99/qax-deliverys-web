# Challengue1_Stage1 QAX Clinic - Automatización Web con Playwright

## Objetivo

Automatizar el proceso de autenticación de un paciente en la aplicación **QAX Clinic**, verificando que el inicio de sesión sea exitoso y que el sistema redirija correctamente al formulario de reserva de citas médicas.

---

# Historia de Usuario

**Como** paciente registrado de QAX Clinic,

**Quiero** iniciar sesión con mi número de documento y contraseña,

**Para** acceder al formulario de reserva de citas médicas.

---

# Criterios de Aceptación

* La página de login https://qaxpert.com/lab/sites/stage-1/clinic/index.html carga correctamente
* El título de la página es QAX Clinic - Login
* El campo de documento solo acepta caracteres numéricos
* Al hacer login con 1234567890 / paciente123, el sistema redirige a appointment.html
* El formulario de reserva de cita muestra los campos: centro médico, fecha, programa y comentarios
* El encabezado "Reservar Cita" es visible en la nueva página
---

# Estrategia de Prueba

## Tipo de prueba

* Automatización Web
* Prueba Funcional End-to-End (E2E)

## Herramientas

* Playwright
* TypeScript
* Node.js

## Flujo automatizado

1. Abrir la página de inicio de sesión de QAX Clinic.
2. Verificar el título de la página.
3. Ingresar el documento del paciente.
4. Ingresar la contraseña.
5. Hacer clic en el botón **Ingresar**.
6. Validar la redirección a la página de reserva de citas.
7. Validar el título de la nueva página.
8. Verificar que el formulario de reserva contenga:

   * Centro Médico.
   * Programa de Salud.
   * Fecha de Visita.

---

# Validaciones realizadas

* Se valida el título de la página de login.
* Se valida que el inicio de sesión sea exitoso.
* Se valida la URL de la página de reserva.
* Se valida el título de la página de reserva.
* Se valida la visibilidad del campo **Centro Médico**.
* Se valida la visibilidad del campo **Programa de Salud**.
* Se valida la visibilidad del campo **Fecha de Visita**.

---

# Ejecución

## Instalar dependencias

```bash
pnpm install

pnpm add @playwright/test

pnpm playwright install
```

## Ejecutar todas las pruebas

```bash
pnpm playwright test
```

---

# Resultados Esperados

* El paciente inicia sesión correctamente utilizando credenciales válidas.
* El sistema redirige automáticamente al formulario de reserva de citas.
* El formulario de reserva presenta correctamente los campos:

  * Centro Médico.
  * Programa de Salud.
  * Fecha de Visita.

---

