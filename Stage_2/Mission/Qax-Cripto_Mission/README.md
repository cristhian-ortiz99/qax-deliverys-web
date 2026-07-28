# Stage 2 - Mission - QAX Crypto

---

# Objetivo

Automatizar los principales flujos funcionales de la plataforma **QAX Crypto** utilizando **Playwright**, validando las funcionalidades principales de compra, venta, consulta del portafolio, visualización del widget de mercado e historial de transacciones.

La automatización verifica el correcto funcionamiento de la aplicación desde la perspectiva del usuario final, asegurando la consistencia de la información mostrada después de cada operación.

---

# Historias de Usuario Automatizadas

## HU-01: Compra de criptomoneda

**Como** inversionista de QAX Crypto

**Quiero** comprar una criptomoneda (BTC) con COP

**Para** agregarla a mi portafolio de inversión.

### Criterios de aceptación

* Al seleccionar BTC se muestra su precio actual.
* Al ingresar un monto se calcula la cantidad de criptomoneda, comisión y total.
* El botón **Comprar** solo está habilitado cuando existe saldo suficiente.
* Se muestra un modal de confirmación.
* La compra actualiza el saldo y registra la operación.
* La transacción aparece en el historial.

---

## HU-02: Portafolio de inversión

**Como** inversionista de QAX Crypto

**Quiero** ver mi portafolio actualizado después de una compra

**Para** confirmar que mis activos se registraron correctamente

### Criterios de aceptación

* La tabla de holdings muestra la criptomoneda comprada con cantidad e invertido
* El balance COP, total invertido y # de criptos en las tarjetas de resumen son correctos
* El gráfico dona SVG se renderiza con segmentos de colores y porcentajes
* Si el portafolio está vacío, se muestra el estado correspondiente

---

## HU-03: Widget BTC en iframe

**Como** inversionista de QAX Crypto

**Quiero** ver el widget de Bitcoin en tiempo real en la página de mercado

**Para** monitorear el precio sin cambiar de página.

### Criterios de aceptación

* El iframe carga correctamente.
* Se visualiza el precio actual del BTC.
* El gráfico contiene las 20 barras.
* Las estadísticas de las últimas 24 horas son visibles.
* El indicador **En vivo** está presente.

---

## HU-04: Venta de criptomoneda con validaciones

**Como** inversionista de QAX Crypto

**Quiero** vender mis criptomonedas

**Para** convertirlas nuevamente a COP.

### Criterios de aceptación

* El modo Venta cambia correctamente la interfaz.
* No es posible vender más criptomonedas de las disponibles.
* Una venta exitosa incrementa el saldo COP y disminuye la tenencia.
* La operación queda registrada en el historial.

---

## HU-05: Historial de transacciones

**Como** inversionista de QAX Crypto

**Quiero** consultar mi historial de operaciones

**Para** localizar transacciones específicas.

### Criterios de aceptación

* Filtrar únicamente compras.
* Buscar por símbolo (BTC).
* Ordenar por mayor monto.
* Combinar filtros y búsqueda correctamente.

---

# Estrategia de Pruebas

## Casos automatizados

### HU-01 – Compra de criptomoneda

### CP-01: Comprar Bitcoin exitosamente

**Validaciones**

* Acceso correcto a la aplicación.
* Selección de Bitcoin.
* Precio mostrado correctamente.
* Campo de monto habilitado.
* Botón Comprar habilitado.
* Visualización del modal de confirmación.
* Confirmación exitosa.
* Cambio del saldo disponible.
* Registro de la operación en el historial.

---

### HU-02 – Portafolio

### CP-01: Validar actualización del portafolio

**Validaciones**

* Compra exitosa.
* Navegación al Portafolio.
* Tabla visible.
* Bitcoin presente.
* Cantidad mayor a cero.

---

### HU-03 – Widget BTC

### CP-01: Validar carga del widget BTC

**Validaciones**

* El iframe carga correctamente.
* El precio de BTC es visible.
* Existen 20 barras en el gráfico.
* Se muestran las estadísticas de 24 horas.
* El indicador "En vivo" está visible.

---

### HU-04 – Venta de criptomoneda

### CP-01: Validar venta exitosa

* Cambio de color del botón.
* Cambio de texto a "Vender".
* La operación queda registrada en el historial.

---

### HU-05 – Historial de transacciones

### CP-01: Filtrar únicamente compras

**Validaciones**

* Todas las filas muestran operaciones de tipo Compra.

### CP-02: Buscar transacciones por BTC

**Validaciones**

* Solo se muestran registros correspondientes a BTC.

### CP-03: Ordenar por mayor monto

**Validaciones**

* La primera transacción corresponde al mayor monto registrado.

### CP-04: Combinar filtros

**Validaciones**

* Se aplican simultáneamente el filtro por tipo y la búsqueda por símbolo.

---

# Precondiciones

* Node.js instalado.
* Playwright instalado.
* Navegadores descargados mediante Playwright.
* Acceso a la aplicación:

https://qaxpert.com/lab/sites/stage-2/crypto/index.html

---

# Ejecución

## Instalar dependencias

```bash
pnpm install
```

## Ejecutar todas las pruebas

```bash
pnpm playwright test
```

## Ejecutar en modo headed

```bash
pnpm playwright test --headed
```

---

# Resultados esperados

Al finalizar la ejecución se valida que:

* ✅ La compra de Bitcoin se realiza correctamente.
* ✅ El portafolio refleja el activo adquirido.
* ✅ El widget de BTC carga correctamente dentro del iframe.
* ✅ El precio, estadísticas y gráfico del widget son visibles.
* ✅ El modo Venta funciona correctamente.
* ✅ Una venta actualiza el saldo y la tenencia del usuario.
* ✅ El historial registra correctamente compras y ventas.
* ✅ Los filtros y ordenamientos funcionan correctamente.

---

# Tecnologías utilizadas

* Playwright
* TypeScript
* Node.js

---

# Estado de la automatización

| Historia                         | Estado         |
| -------------------------------- | -------------- |
| HU-01 Compra de criptomoneda     | ✅ Automatizada |
| HU-02 Portafolio de inversión    | ✅ Automatizada |
| HU-03 Widget BTC en iframe       | ✅ Automatizada |
| HU-04 Venta de criptomoneda      | ✅ Automatizada |
| HU-05 Historial de transacciones | ✅ Automatizada |
