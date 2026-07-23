# Mission 4 - QAX Travel | Automatización E2E Web

## Descripción

Automatización End-to-End del flujo completo de reserva de vuelos de la aplicación **QAX Travel**, utilizando Playwright con TypeScript bajo el patrón **Page Object Model (POM)**.

La solución cubre desde la búsqueda de vuelos hasta la validación de la reserva mediante API, incluyendo pruebas UI, integración con APIs y ejecución Responsive.

---

# Objetivo

Automatizar las principales historias de usuario del sistema de reservas de vuelos validando:

- Flujo completo de reserva.
- Persistencia de información.
- Integración UI + API.
- Validaciones funcionales.
- Ejecución Responsive.

---

# Tecnologías

- Playwright
- TypeScript
- Node.js
- Faker JS
- Page Object Model
- REST API Testing
- Playwright Fixtures
- Responsive Testing

---

# Historias de Usuario Automatizadas

| HU | Descripción | Estado |
|----|-------------|---------|
| HU01 | Buscar vuelos | ✅ |
| HU02 | Registro de pasajeros | ✅ |
| HU03 | Selección de asientos | ✅ |
| HU04 | Equipaje | ✅ |
| HU05 | Pago | ✅ |
| HU06 | Mis viajes | ✅ |
| HU07 | Check-In | ✅ |
| HU08 | Validación Post Reserva vía API | ✅ |

---

# 📑 Casos de Prueba Implementados

## HU01 | Buscar vuelos disponibles

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Buscar vuelos disponibles. | ✅ |
| CP02 | Filtrar vuelos por aerolinea. | ✅ |
| CP03 | Ordenar vuelos por precio menor a mayor. | ✅ |
| CP04 | Buscar vuelos sin resultados. | ✅ |

---

## HU02 | Ingresar datos de pasajeros

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Registrar correctamente los datos de pasajeros. | ✅ |
| CP02 | Mostrar mensaje cuando existen campos obligatorios vacíos. | ✅ |
| CP03 | Mostrar exactamente tres formularios para tres pasajeros. | ✅ |
| CP04 | Generar identificadores únicos para cada pasajero. | ✅ |
| CP05 | Navegar al paso de selección de asientos. | ✅ |

---

## HU03 | Seleccionar asientos

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Seleccionar correctamente la cantidad de asientos requerida. | ✅ |
| CP02 | No permitir seleccionar más asientos que pasajeros. | ✅ |
| CP03 | Deseleccionar un asiento previamente seleccionado. | ✅ |

---

## HU04 | Selección de equipaje

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Seleccionar múltiples servicios de equipaje. | ✅ |
| CP02 | Continuar sin seleccionar servicios adicionales. | ✅ |
| CP03 | Deseleccionar un servicio previamente seleccionado. | ✅ |

---

## HU05 | Pago de la reserva

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Realizar pago exitoso y confirmar reserva. | ✅ |
| CP02 | Validar resumen del pedido. | ✅ |
| CP03 | Validar tarjeta inválida. | ✅ |


---

## HU06 | Mis Viajes

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Visualizar reservas existentes. | ✅ |
| CP02 | Visualizar reservas pasadas. | ✅ |
| CP03 | Visualizar E-Ticket de una reserva. | ✅ |

---

## HU07 | Web Check-In

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Consultar una reserva existente. | ✅ |
| CP02 | Cambiar asiento del pasajero. | ✅ |
| CP03 | Visualizar Boarding Pass. | ✅ |

---

## HU08 | Validación Post-Reserva vía API

| Caso | Descripción | Estado |
|------|-------------|--------|
| CP01 | Validar persistencia de la reserva en backend. | ✅ |

---

# Responsive Testing

Se configuraron los siguientes dispositivos en Playwright:

| Dispositivo | Navegador | Resolución |
|--------------|-----------|------------|
| Desktop Chrome | Chromium | Default |
| iPad Mini | Safari | 768 x 1024 |
| iPhone 14 | Safari | 390 x 844 |
| Pixel 7 | Chrome | 412 x 915 |

Configuración realizada mediante:

```ts
devices['Desktop Chrome']
devices['iPad Mini']
devices['iPhone 14']
devices['Pixel 7']
```

---

# Integración API

Se automatizaron las siguientes APIs:

## Flights

GET /api/flights

GET /api/flights/{id}

---

## Bookings

GET /api/bookings

GET /api/bookings/{id}

POST /api/bookings

---

# Ejecución

Instalar dependencias

```bash
pnpm install
```

Instalar navegadores

```bash
pnpm playwright install
```

Ejecutar toda la suite

```bash
pnpm playwright test
```

Ejecutar una historia

```bash
pnpm playwright test tests/HU05
```

Ejecutar un caso

```bash
pnpm playwright test payment.spec.ts
```

Modo UI

```bash
pnpm playwright test --ui
```

---

# Ejecución Responsive

Desktop

```bash
npx playwright test --project="Desktop Chrome"
```

iPad Mini

```bash
npx playwright test --project="iPad Mini"
```

iPhone 14

```bash
npx playwright test --project="iPhone 14"
```

Pixel 7

```bash
npx playwright test --project="Pixel 7"
```

---


# Buenas prácticas implementadas

- Page Object Model
- Reutilización mediante Helpers
- Separación UI/API
- Uso de Fixtures
- Uso de test.step()
- Localizadores centralizados
- Esperas automáticas de Playwright
- Código reutilizable
- Responsive Testing
- Integración UI + API
- Validaciones End-to-End

---

# Autor

**Cristhian Ortiz Ysla**
