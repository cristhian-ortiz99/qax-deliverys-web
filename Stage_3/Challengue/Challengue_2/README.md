# Challengue 2 - Stage 3 - QAXTrade - Automatización Web con Playwright

## Descripción

Proyecto de automatización End-to-End desarrollado con **Playwright + TypeScript** utilizando el patrón **Page Object Model (POM)**.

La automatización cubre el flujo completo de la plataforma **QAXTrade**, validando la navegación entre módulos, la compra y venta de activos, la administración del portafolio y la gestión de alertas de precio.

---

# Objetivo

Automatizar los principales procesos de negocio de QAXTrade garantizando el correcto funcionamiento de las funcionalidades críticas de la plataforma mediante pruebas E2E.

---

# Historias de Usuario

## HU-01 - Dashboard en vivo

**Como** inversionista

**Quiero** visualizar el dashboard

**Para** incorporarlo a mi portafolio.

### Criterios de aceptación

- El dashboard carga con el resumen del portafolio (valor total, P&L diario, efectivo)
- La watchlist muestra 10 activos con símbolo, precio y cambio %
- Los cambios positivos se muestran en verde y los negativos en rojo
- Las velas del mini-chart se renderizan (20 velas)

---

## HU-02 - Orden de compra

**Como** inversionista

**Quiero** vender/comprar un activo

**Para** visualizar en mi portafolio los detalles y alertas.

### Criterios de aceptación

- Al seleccionar AAPL, se muestra su precio actual
- Al elegir tipo "Market", solo se muestran los campos de cantidad y lado
- Al elegir tipo "Limit", aparece un campo adicional de precio límite
- El botón de submit está deshabilitado hasta completar todos los campos
- Al confirmar la orden, se muestra el modal con ID (ORD-XXXXXXXXXXXXX)
- El efectivo disponible se descuenta y el activo aparece en el portafolio


---

## HU-03 - Portafolio y P&L

**Como** inversionista

**Quiero** visualizar mi portafolio

**Para** conocer el estado de mis inversiones.

### Criterios de aceptación

- La tabla de holdings muestra cantidad, precio promedio y valor total
- La columna P&L muestra verde si es ganancia y rojo si es pérdida
- El gráfico pie se renderiza con segmentos de colores
- Si no hay holdings, se muestra el estado vacío

---

## HU-04 - Alertas de Precio

**Como** inversionista

**Quiero** crear alertas de precio

**Para** recibir una notificación cuando el activo alcance un determinado valor.

### Criterios de aceptación

- El formulario permite crear una alerta con activo, condición (above/below) y precio objetivo
- La alerta creada aparece en la lista con botón de toggle ON/OFF
- Al desactivar la alerta, cambia su estilo visual (opacidad reducida)
- Al eliminar la alerta, desaparece de la lista

---

# Estrategia de pruebas

Se implementó una estrategia basada en pruebas funcionales End-to-End utilizando Playwright.

Las pruebas cubren:

- Navegación entre páginas.
- Validación de formularios.
- Compra y venta de activos.
- Validaciones visuales.
- Validaciones de estados.
- Flujo completo de negocio.

---

# Tecnologías utilizadas

- Playwright
- TypeScript
- PNPM
- Node.js

---

# Instalación

Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

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
---

# Reportes

Visualizar reporte HTML

```bash
pnpm playwright show-report
```

---

# Validaciones implementadas

Durante las automatizaciones se realizaron validaciones sobre:

## Dashboard

- Resumen portafolio
- Navegación
- Cambios de precio

## Mercado

- Información del activo
- Cantidad
- Confirmación de compra

## Portafolio

- Tabla de inversiones
- Leyenda de grafico
- Valor total

## Alertas

- Creación de alertas
- Activación
- Desactivación
- Eliminación

---

# ✔ Buenas prácticas implementadas

- Page Object Model (POM)
- Clase BasePage reutilizable
- Acciones y validaciones separadas
- Métodos reutilizables
- Localizadores centralizados
- Assertions de Playwright
- Uso de `test.step()`
- Uso de anotaciones (`test.info().annotations`)
- Smoke Test independiente

---

# 👨‍💻 Autor

Cristhian Ortiz