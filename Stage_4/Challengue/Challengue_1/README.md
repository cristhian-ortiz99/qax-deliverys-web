# QAX Marketplace - Automatización Web con Playwright

## Descripción

Proyecto de automatización web desarrollado con **Playwright + TypeScript** utilizando el patrón **Page Object Model (POM)**.

Como parte del ejercicio se utilizó inicialmente **Playwright Codegen** para registrar los flujos de navegación. Posteriormente, el código generado fue refactorizado para implementar el patrón **Page Object Model**, centralizando los localizadores y separando la lógica de negocio de los casos de prueba.

La automatización contempla dos historias de usuario principales:

- Compra de productos como comprador.
- Gestión de productos como vendedor.

---

# Objetivo

Automatizar los principales flujos del Marketplace aplicando buenas prácticas de automatización mediante Playwright.

Los objetivos del ejercicio fueron:

- Utilizar Playwright Codegen.
- Refactorizar el código generado.
- Implementar Page Object Model.
- Reutilizar datos de prueba.
- Organizar la automatización por Historias de Usuario.

---

# Tecnologías utilizadas

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

# Historias de Usuario Automatizadas

| HU | Descripción | Estado |
|----|-------------|--------|
| HU01 | Compra de producto como comprador | ✅ |
| HU02 | Gestión de productos como vendedor | ✅ |

---

# Casos de Prueba Implementados

## HU01 | Compra de producto

### CP01 – Comprar un producto de manera exitosa

**Objetivo**

Validar que un comprador pueda realizar correctamente el proceso completo de compra de un producto.

**Flujo automatizado**

- Ingresar al Marketplace como comprador.
- Seleccionar el producto **Samsung Galaxy S23**.
- Agregar el producto al carrito.
- Acceder al Checkout.
- Completar los datos de envío:
  - Nombre
  - Dirección
  - Teléfono
  - Ciudad
- Completar la información de pago:
  - Número de tarjeta
  - Fecha de vencimiento
  - CVV
- Confirmar el pedido.
- Validar que el pedido quede registrado correctamente en la sección **Mis Órdenes**.

**Resultado esperado**

El pedido es creado exitosamente y aparece registrado para el comprador.

**Estado**

✅ Automatizado

---

## HU02 | Gestión de productos como vendedor

### CP01 – Publicar un producto correctamente

**Objetivo**

Validar que un vendedor pueda registrar y publicar correctamente un nuevo producto en el Marketplace.

**Flujo automatizado**

- Ingresar al Marketplace como vendedor.
- Abrir el formulario para registrar un nuevo producto.
- Completar la información del producto utilizando datos dinámicos.
- Publicar el producto.
- Acceder a la sección de órdenes recibidas.
- Validar que la página de órdenes cargue correctamente.

**Resultado esperado**

El producto queda publicado exitosamente y el vendedor puede acceder correctamente a la página de órdenes recibidas.

**Estado**

✅ Automatizado

---

# Implementación de Page Object Model

La solución fue desarrollada siguiendo el patrón **Page Object Model (POM)**.

Cada página encapsula:

- Localizadores.
- Métodos de interacción.
- Validaciones.
- Acciones de negocio.

Ejemplo de páginas implementadas:

- HomePage
- MarketplacePage
- CartPage
- CheckoutPage
- OrdersPage
- ProductsPage
- OrderProductsPage

---

# Datos de prueba

Para evitar valores estáticos durante la ejecución se implementaron clases de apoyo:

## CheckoutData

Contiene la información utilizada durante el proceso de compra.

Ejemplo:

- Nombre
- Dirección
- Ciudad
- Teléfono
- Tarjeta
- Fecha de vencimiento
- CVV

---

## ProductData

Genera la información utilizada para registrar nuevos productos como vendedor.

Ejemplo:

- Nombre del producto
- Descripción
- Precio
- Categoría

---

# Ejecución

Instalar dependencias

```bash
pnpm install
pnpm add @playwright/test
pnpm add @faker-js/faker
```

Ejecutar todas las pruebas

```bash
pnpm playwright test
```

Modo UI

```bash
pnpm playwright test --ui
```

---

# Buenas prácticas implementadas

- Uso de Playwright Codegen como punto de partida.
- Refactorización del código generado.
- Implementación de Page Object Model.
- Separación entre lógica de negocio y pruebas.
- Centralización de localizadores.
- Reutilización de datos de prueba mediante clases utilitarias.
- Uso de `test.step()` para mejorar la trazabilidad de la ejecución.
- Código modular, reutilizable y mantenible.

---

# Autor

**Cristhian Ortiz Ysla**