# QuickTask - Stage 4 - Codegen + Servidor Mock con Express y Postman

## Objetivo

Desarrollar un proyecto que combine automatización web y pruebas de servicios REST.

La entrega incluye:

- Automatización de un flujo en Mercado Libre utilizando Playwright Codegen.
- Generación de datos dinámicos mediante Faker.
- Implementación de un servidor Mock utilizando Express.
- Creación y ejecución de una colección de Postman para validar los servicios REST.

---

### Servicios implementados

### Users

- GET /api/users
- GET /api/users/:id
- POST /api/users
- DELETE /api/users/:id

### Products

- GET /api/products
- POST /api/products
- DELETE /api/products/:id

### Orders

- GET /api/orders
- POST /api/orders
- PUT /api/orders/:id

---

# Estrategia de pruebas

## Automatización Web

Se utilizó:

- Playwright
- Codegen
- Faker

El flujo automatizado consiste en:

1. Ingresar a Mercado Libre.
2. Seleccionar Perú.
3. Buscar un producto.
4. Abrir el detalle.
5. Presionar "Comprar ahora".
6. Acceder al registro.
7. Completar el formulario con datos dinámicos.

---

## API Testing

Las validaciones realizadas fueron:

### Users

- Obtener todos los usuarios.
- Obtener usuario por ID.
- Crear usuario.
- Eliminar usuario.
- Validar recurso inexistente (404).

### Products

- Obtener productos.
- Crear producto.
- Eliminar producto.

### Orders

- Obtener órdenes.
- Crear orden.
- Actualizar estado de una orden.

---

# ⚙️ Instalación

## Clonar repositorio

```bash
git clone <url-del-repositorio>
```

Instalar dependencias

```bash
pnpm install
```

---

# Levantar el servidor Mock

Ejecutar:

```bash
node server.js
```

Servidor disponible en:

```
http://localhost:4001
```

---

# Ejecutar Playwright

Ejecutar:

```bash
pnpm playwright test
```

Ejecutar con interfaz gráfica

```bash
pnpm playwright test --headed
```

---

# Colección Postman

La colección incluida contiene:

## Users

- GET /api/users
- GET /api/users/:id
- POST /api/users
- DELETE /api/users/:id

## Products

- GET /api/products
- POST /api/products
- DELETE /api/products/:id

## Orders

- GET /api/orders
- POST /api/orders
- PUT /api/orders/:id

---

# Evidencias

Se incluyen capturas para los siguientes escenarios:

## Users

- GET exitoso (200)
- POST exitoso (201)
- DELETE exitoso
- Error 404

## Products

- GET exitoso
- POST exitoso
- DELETE exitoso

## Orders

- GET exitoso
- POST exitoso
- PUT exitoso

---

# 🛠 Tecnologías utilizadas

- TypeScript
- Playwright
- Faker
- Express
- Node.js
- Postman
- pnpm

---

# 📝 Observaciones

- El flujo de Mercado Libre fue generado utilizando Playwright Codegen.
- Los datos del formulario se generan dinámicamente mediante Faker.
- El código generado por Codegen se mantuvo sin refactorización, agregando únicamente la utilidad para datos dinámicos.
- El servidor Mock utiliza almacenamiento en memoria; por lo tanto, la información se pierde al reiniciar el servidor.
- La colección de Postman incluye operaciones CRUD sobre Users, Products y Orders.
- Las evidencias corresponden a ejecuciones exitosas y escenarios de error solicitados (404).