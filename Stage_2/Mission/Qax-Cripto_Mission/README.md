# Stage 2 - Mission - QAX Crypto

---

# Objetivo

Automatizar los principales flujos funcionales de la plataforma **QAX Crypto** utilizando **Playwright**, validando el proceso de compra de criptomonedas y la actualización del portafolio del usuario.

La automatización verifica el correcto funcionamiento de la aplicación desde la perspectiva del usuario final, asegurando la consistencia de la información mostrada después de cada operación.

---

# Historias de Usuario Automatizadas

## HU-01: Compra de criptomoneda

**Como** inversionista de QAX Crypto

**Quiero** comprar una criptomoneda (BTC) con COP

**Para** agregarlo a mi portafolio de inversión

### Criterios de aceptación

- Al seleccionar BTC, se muestra su precio actual en COP
- Al ingresar un monto en COP, el sistema calcula: cripto a recibir, comisión 0.5% y total
- El botón "Comprar" está habilitado solo si el total no supera el saldo
- Al hacer clic en "Comprar", se abre un modal de confirmación con los detalles de la operación
- Al confirmar, el saldo se descuenta, el BTC se agrega al portafolio y se muestra el modal de éxito
- La transacción aparece en el historial con todos sus datos

---

## HU-02: Portafolio de inversión

**Como** inversionista de QAX Crypto

**Quiero** ver mi portafolio actualizado después de una compra

**Para** confirmar que mis activos se registraron correctamente

### Criterios de aceptación

- La tabla de holdings muestra la criptomoneda comprada con cantidad e invertido
- El balance COP, total invertido y # de criptos en las tarjetas de resumen son correctos
- El gráfico dona SVG se renderiza con segmentos de colores y porcentajes
 -Si el portafolio está vacío, se muestra el estado correspondiente
---

# Estrategia de Pruebas

## Casos automatizados

### HU-01 - Compra de criptomoneda

**CP-01:** Comprar Bitcoin exitosamente

**Validaciones**

- Acceso correcto a la aplicación.
- Selección de Bitcoin.
- Precio mostrado correctamente.
- Campo de monto habilitado.
- Botón Comprar habilitado.
- Visualización del modal de confirmación.
- Confirmación exitosa.
- Cambio del saldo disponible.
- Registro de la operación en Historial.

---

### HU-02 - Portafolio

**CP-01:** Validar actualización del portafolio

**Validaciones**

- Compra exitosa de Bitcoin.
- Navegación al Portafolio.
- Tabla visible.
- Bitcoin presente en el listado.
- Cantidad comprada diferente de cero.

---

# Precondiciones

- Node.js instalado.
- Playwright instalado.
- Navegadores descargados mediante Playwright.
- Acceso a la aplicación:

https://qaxpert.com/lab/sites/stage-2/crypto/index.html

---

# Ejecución

## Instalar dependencias

```bash
pnpm install
```

## Ejecutar pruebas

```bash
pnpm playwright test
```

---

# Resultados esperados

Al finalizar la ejecución se valida que:

- ✅ La compra de Bitcoin se realiza correctamente.
- ✅ El modal de confirmación funciona correctamente.
- ✅ El saldo del usuario disminuye después de la compra.
- ✅ La transacción queda registrada en el Historial.
- ✅ El Portafolio refleja el nuevo activo adquirido.
- ✅ La cantidad comprada es mayor que cero.

---

# Tecnologías utilizadas

- Playwright
- TypeScript
- Node.js

---

# Estado de la automatización

| Historia | Estado |
|----------|--------|
| HU-01 Compra de criptomoneda | ✅ Automatizada |
| HU-02 Portafolio de inversión | ✅ Automatizada |
| HU-03 Venta de criptomoneda | ⏳ Pendiente |
| HU-04 Historial de transacciones | ⏳ Pendiente |
| HU-05 Filtros y búsquedas | ⏳ Pendiente |