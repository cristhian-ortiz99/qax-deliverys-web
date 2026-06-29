# Mission 1 QAX Shop - Automatización Web con Playwright

## Objetivo

Automatizar el flujo de compra en la aplicación **QAX Shop**, validando que un producto buscado por el usuario pueda ser agregado correctamente al carrito de compras y que la información del producto se mantenga durante el proceso para posterior a ello se realicé el correcto registro de la compra.

---

## Historia de Usuario

**Como** usuario de la tienda QAX Shop,

**Quiero** buscar un producto, agregarlo al carrito y completar la compra

**Para** recibir una confirmación de mi pedido.

---

## Criterios de Aceptación

- El catálogo muestra 12 productos en la página principal
- Al buscar "café", solo se muestran productos que contengan esa palabra
- Al hacer clic en "Agregar al Carrito", el badge del carrito se actualiza
- El carrito muestra los productos agregados con nombre y precio
- El botón "Ir a Checkout" navega al formulario de compra
- El formulario de checkout solicita nombre, email, teléfono y dirección
- Al completar el checkout, se muestra un número de orden QAX-ORDER-XXXXX

---

# Estrategia de Prueba

## Tipo de prueba

- Automatización Web
- Prueba funcional End-to-End (E2E)

## Herramientas

- Playwright
- TypeScript
- Node.js

## Flujo automatizado

1. Abrir la página principal de QAX Shop.
2. Verificar el título de la aplicación.
3. Ingresar el texto **"Ca"** en el buscador.
4. Obtener el primer producto mostrado.
5. Capturar el nombre del producto.
6. Agregar el producto al carrito.
7. Acceder al carrito de compras.
8. Validar que el nombre del producto agregado coincida con el capturado previamente.
9. Continuar al proceso de compra.

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

- La búsqueda devuelve resultados relacionados con el criterio ingresado.
- El primer producto es agregado correctamente al carrito.
- El carrito muestra el mismo producto que fue seleccionado.
- El usuario puede continuar hacia la compra sin errores.