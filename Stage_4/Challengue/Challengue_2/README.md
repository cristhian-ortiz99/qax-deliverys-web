# QAX SUT - Automatización End-to-End API + UI con Playwright

## Descripción

Proyecto de automatización desarrollado con **Playwright + TypeScript**, cuyo objetivo es validar un flujo End-to-End (E2E) combinando pruebas de **API** y **UI**.

La automatización implementa una estrategia híbrida donde los datos necesarios para la prueba son creados mediante servicios REST y posteriormente validados desde la interfaz web de **QAXAdmin**.

Adicionalmente, el proyecto hace uso de la funcionalidad **Projects** de Playwright para ejecutar la misma prueba sobre distintos dispositivos y configuraciones.

---

# Objetivo

Implementar una prueba End-to-End que combine la automatización de API y UI para validar el proceso completo de creación y consulta de una orden.

Los objetivos principales fueron:

- Consumir APIs para preparar los datos de prueba.
- Automatizar la interfaz web utilizando Playwright.
- Validar la consistencia entre Backend y Frontend.
- Configurar múltiples Projects para ejecutar la misma prueba sobre distintos dispositivos.
- Crear scripts de ejecución independientes por Project.

---

# Tecnologías utilizadas

- Playwright
- TypeScript
- Node.js
- REST API
- Page Object Model (POM)

---

# Configuración de Projects

Se implementó la funcionalidad **Projects** de Playwright para ejecutar la misma prueba sobre distintos dispositivos y navegadores.

---

# Caso de Prueba Implementado

## CP01 – Crear una orden por API y validarla desde la interfaz web

### Objetivo

Validar el flujo End-to-End donde la información utilizada durante la prueba es creada mediante APIs y posteriormente consultada desde la interfaz web.

### Precondiciones

- API disponible.
- Aplicación web disponible.
- Usuario administrador existente.

---

### Flujo automatizado

#### Preparación mediante API

1. Crear un usuario utilizando **UsersApi**.
2. Crear un producto utilizando **ProductsApi**.
3. Crear una orden utilizando **OrdersApi**.
4. Validar que la orden fue creada correctamente.

#### Validación mediante UI

5. Abrir la aplicación QAXAdmin.
6. Iniciar sesión como administrador.
7. Navegar al módulo de órdenes.
8. Buscar la orden creada previamente.
9. Validar:

- Cliente
- Producto
- Precio
- Estado de la orden

---

### Resultado esperado

La orden creada mediante la API debe visualizarse correctamente en la interfaz web con la misma información registrada en el backend.

### Estado

✅ Automatizado

---

# Integración API + UI

El proyecto utiliza tres capas de servicios REST para preparar el ambiente antes de iniciar la automatización web.

## UsersApi

Responsable de crear usuarios utilizados durante la prueba.

## ProductsApi

Responsable de registrar productos dinámicamente.

## OrdersApi

Responsable de crear órdenes que posteriormente serán consultadas desde la interfaz.

Esta estrategia evita depender de datos existentes en el sistema y permite que cada ejecución sea completamente independiente.

---

# Scripts de ejecución

## Ejecutar todas las pruebas

```bash
pnpm run test
```

---

## Ejecutar únicamente Desktop

```bash
pnpm run test:desktop
```

---

## Ejecutar únicamente Mobile

```bash
pnpm run test:mobile
```

---

## Ejecutar únicamente Tablet

```bash
pnpm run test:tablet
```

---

## Ejecutar únicamente Chrome

```bash
pnpm run test:chrome
```

---

## Ejecutar únicamente Firefox

```bash
pnpm run test:firefox
```

---

## Ejecutar únicamente Android

```bash
pnpm run test:mobile
```

---

## Ejecutar únicamente Iphone

```bash
pnpm run test:iphone
```

---

## Ejecutar todos los Projects

```bash
pnpm run test:all
```

---

# Instalación

Instalar dependencias

```bash
pnpm install
```
---

# Buenas prácticas implementadas

- Integración API + UI.
- Preparación automática de datos mediante APIs.
- Implementación de Page Object Model.
- Separación entre lógica de negocio y pruebas.
- Reutilización de clases de servicios.
- Configuración de múltiples Projects.
- Scripts independientes por dispositivo.
- Validaciones mediante assertions de Playwright.
- Código modular, reutilizable y mantenible.

---

# Autor

**Cristhian Ortiz Ysla**

Proyecto desarrollado como práctica de automatización utilizando **Playwright + TypeScript**, implementando un flujo **End-to-End API + UI**, aplicando el patrón **Page Object Model (POM)** y utilizando la funcionalidad **Projects** de Playwright para ejecutar la misma prueba sobre múltiples navegadores y dispositivos.