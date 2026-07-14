# Mission - Stage 3 - QAXTickets - Automatización Web con Playwright

## Descripción

Proyecto de automatización End-to-End desarrollado con **Playwright + TypeScript** utilizando el patrón **Page Object Model (POM)**.

La automatización cubre el flujo principal de compra de entradas de la aplicación **QAXTickets**, incluyendo la exploración de eventos, selección de asientos y proceso de checkout mediante un iframe de pago.

Durante el desarrollo se identificaron algunas incidencias funcionales de la aplicación que impidieron automatizar completamente la última historia de usuario.

---

# Objetivo

Automatizar los procesos principales de compra de entradas validando la navegación, la selección de eventos, la reserva de asientos y el proceso de pago utilizando Playwright y el patrón POM.

---

# Historias de Usuario

## HU-01 - Explorar eventos

**Como** usuario de QAXTickets

**Quiero** filtrar eventos por categoría

**Para** encontrar rápidamente el tipo de espectáculo que me interesa.

### Criterios de aceptación

- La página muestra 6 eventos.
- Cada evento contiene:
  - Nombre
  - Fecha
  - Lugar
  - Precio
- El filtro "Fútbol" muestra únicamente dicha categoría.
- El filtro activo cambia visualmente.
- El botón "Comprar Entradas" redirecciona a la selección de asientos.

---

## HU-02 - Selección de asientos

**Como** usuario

**Quiero** seleccionar hasta cuatro asientos

**Para** asistir al evento.

### Criterios de aceptación

- Existen tres zonas:
  - VIP
  - Platea
  - General
- Los asientos libres aparecen en verde.
- Los ocupados aparecen en rojo.
- Los seleccionados aparecen en dorado.
- No es posible seleccionar más de cuatro asientos.
- El panel flotante muestra:
  - Asientos
  - Precio
  - Total
- El botón "Continuar a Pago" permanece deshabilitado cuando no existen asientos seleccionados.

---

## HU-03 - Checkout y pago

**Como** usuario

**Quiero** ingresar mis datos personales y pagar mediante tarjeta

**Para** completar la compra.

### Criterios de aceptación

- Formulario del comprador.
- Activación del iframe de pago.
- Validación del formulario del iframe.
- Pago exitoso.
- Generación del ID de reserva.
- Redirección hacia Mis Tickets.

---

## HU-04 - Mis Tickets

**Como** usuario

**Quiero** visualizar mis entradas compradas

**Para** presentarlas el día del evento.

### Criterios de aceptación

- Mostrar tickets comprados.
- Mostrar:
  - Evento
  - ID
  - Fecha
- Mostrar código QR.
- Mostrar tarjetas resumen.
- Mostrar estado vacío cuando no existan tickets.

---

#  Estrategia de pruebas

Se implementó una estrategia de pruebas End-to-End automatizando el flujo principal de negocio.

Las pruebas contemplan:

- Navegación entre páginas.
- Validaciones funcionales.
- Validación de estados.
- Validación de colores.
- Validación de elementos visibles.
- Manejo de iframes.
- Flujo completo de compra.

---


## Smoke Test

Se implementó un Smoke Test que ejecuta el flujo principal:

Eventos

↓

Seleccionar evento

↓

Seleccionar asientos

↓

Checkout

↓

Pago


---

# Tecnologías utilizadas

- Playwright
- TypeScript
- PNPM
- Node.js

---

# Instalación


Instalar dependencias

```bash
pnpm install
```

---

# Ejecución

Ejecutar todas las pruebas

```bash
pnpm playwright test
```

Ejecutar en modo Headed

```bash
pnpm playwright test --headed
```

---

# Validaciones implementadas

## Eventos

- Cantidad de eventos.
- Información de cada evento.
- Funcionamiento de filtros.
- Navegación hacia selección de asientos.

## Asientos

- Colores de disponibilidad.
- Colores de selección.
- Límite máximo de cuatro asientos.
- Actualización del panel flotante.
- Cálculo del total.
- Habilitación del botón Continuar.

## Checkout

- Datos del comprador.
- Validación del resumen de compra.
- Interacción con iframe.
- Validación del formulario de pago.
- Confirmación del proceso de pago.

---

# Observaciones encontradas

Durante la automatización se identificaron los siguientes comportamientos funcionales de la aplicación:

## HU-02

- El botón **"Continuar a Pago"** nunca inicia deshabilitado, a pesar de que el criterio de aceptación indica que debería permanecer deshabilitado cuando no existen asientos seleccionados.

- Los divisores de zonas (**VIP, Platea y General**) son generados dinámicamente y no siempre están presentes en el DOM, por lo que fue necesario adaptar la estrategia de validación.

---

## HU-03

Se identificaron inconsistencias durante el proceso de pago:

- El iframe recibe inicialmente el monto **COP $0**, aunque el pedido posee un valor diferente.

- Después de completar exitosamente el formulario del iframe y mostrar el mensaje **"Pago exitoso"**, la aplicación no registra correctamente la compra.

- No siempre se genera la reserva esperada.

---

## HU-04

No fue posible automatizar esta historia debido a problemas funcionales detectados en la aplicación.

Las principales incidencias fueron:

- Después del pago exitoso no se crea correctamente el registro dentro de la pestaña **Mis entradas**.

- La página **Mis entradas** no recibe información de la compra realizada.

- El estado vacío no se muestra correctamente cuando no existen tickets.

- El resumen de entradas no se actualiza.

- El código QR nunca llega a visualizarse debido a la ausencia de datos registrados.

Debido a estas limitaciones funcionales, únicamente fue posible automatizar hasta la validación del proceso de pago.

---

# Buenas prácticas implementadas

- Page Object Model (POM)
- BasePage reutilizable
- Separación entre acciones y verificaciones
- Métodos reutilizables
- Localizadores centralizados
- Uso de `frameLocator()` para el manejo del iframe
- Validaciones de estados
- Validaciones visuales
- Validación de colores mediante CSS
- Uso de `test.step()`
- Smoke Test independiente
- Código modular y mantenible

---

#  Autor

Cristhian Ortiz

**Nota:** La Historia de Usuario 4 no pudo automatizarse debido a defectos funcionales identificados en la aplicación durante la ejecución del flujo completo de compra.