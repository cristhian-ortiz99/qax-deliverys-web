# Challengue1 - Stage 3 - Hanguazon

## Título de la entrega

Automatización del flujo de compra completo desde carrito hasta confirmación de pedido utilizando Playwright con TypeScript y Page Object Model (POM).

---

# Objetivo / Historia de Usuario

**Historia de usuario:**

Como cliente de Haguazon  
Quiero completar el proceso de compra desde el carrito hasta la confirmación  
Para recibir mi pedido en la dirección indicada.

---

# Criterios de aceptación cubiertos

| ID | Criterio | Estado |
|---|---|---|
| CA01 | El carrito muestra productos agregados con nombre, precio y cantidad | ✅ Automatizado |
| CA02 | Al modificar la cantidad de un producto, el subtotal se recalcula | ✅ Automatizado |
| CA03 | Al hacer clic en "Proceder al Pago", navega al checkout | ✅ Automatizado |
| CA04 | El checkout muestra los 4 pasos: Dirección, Envío, Pago y Revisión | ✅ Automatizado |
| CA05 | Al completar Dirección, el paso Envío se habilita | ✅ Automatizado |
| CA06 | Al seleccionar método de envío, la opción queda marcada | ✅ Automatizado |
| CA07 | Al seleccionar método de pago, la opción queda marcada | ✅ Automatizado |
| CA08 | En Revisión se muestran los datos ingresados | ✅ Automatizado |
| CA09 | Al confirmar pedido, se genera un ID de orden HGZ-XXXXXXXXXX | ✅ Automatizado |

---

# Estrategia de prueba

## Tipo de prueba

- Prueba funcional End-to-End.
- Validación basada en criterios de aceptación.
- Automatización UI utilizando Playwright.

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
pnpm install
```

Ejecutar todas las pruebas:

```bash
pnpm playwright test
```

---

# ✔ Resultados esperados

- Navegación correcta por la aplicación.
- Productos encontrados correctamente.
- Producto agregado exitosamente.
- Información del carrito consistente.
- Flujo principal ejecutado sin errores.

---

# Buenas prácticas implementadas

- Page Object Model (POM)
- Separación entre acciones y validaciones
- Reutilización de métodos
- Localizadores centralizados
- Uso de Playwright Assertions
- Código reutilizable y mantenible

---

# 👨‍💻 Autor

Cristhian Ortiz.