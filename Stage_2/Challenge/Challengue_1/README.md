# Challengue 1 - QAX Bet

---

# Objetivo / Historias de Usuario

Automatizar los principales flujos funcionales de la aplicación **QAX Bet** utilizando **Playwright**, validando el comportamiento esperado de acuerdo con los criterios de aceptación definidos para cada Historia de Usuario.


---

# Historias de Usuario Automatizadas

## HU-01: Protección contra sobregiro


Como	apostador de QAXpert Bet
Quiero	que el sistema me impida apostar más de lo que tengo en la billetera
Para	evitar sobregiros y mantener el control de mis finanzas

---

## HU-02: Recarga de billetera

Como	apostador de QAXpert Bet
Quiero	agregar fondos a mi billetera con montos predefinidos
Para	tener más saldo disponible para apostar

---

## HU-03: Cancelación de apuesta


Como	apostador de QAXpert Bet
Quiero	poder cancelar una apuesta antes de confirmarla
Para	no registrar apuestas no deseadas

---

## HU-04: Filtros del historial


Como	apostador de QAXpert Bet
Quiero	filtrar mis apuestas por estado y ordenarlas
Para	encontrar rápidamente la información que necesito


---

## HU-05: Drag & Drop de eventos

Como	apostador de QAXpert Bet
Quiero	arrastrar un evento desde el catálogo hasta el ticket lateral
Para	agregarlo a mi selección de apuestas sin usar clics

---

# Criterios de aceptación

## HU-01

* Al intentar apostar un monto mayor al saldo disponible, el botón "Realizar Apuesta" está deshabilitado
* El sistema muestra visualmente que el monto excede el saldo

## HU-02

* Al seleccionar un monto preseleccionado, se marca como activo
* Al hacer clic en "Agregar Fondos", el saldo se actualiza con el monto agregado
* El saldo anterior más el monto agregado coincide con el nuevo saldo mostrado

## HU-03

* Al hacer clic en "Cancelar" en el modal de confirmación, la apuesta no se registra
* El saldo permanece sin cambios después de cancelar
* La apuesta cancelada no aparece en el historial

## HU-04

* Al filtrar por estado "Pendiente", solo se muestran apuestas con ese estado
* Al ordenar por "Mayor monto", las apuestas se ordenan de mayor a menor
* Al buscar por nombre de equipo, solo aparecen las apuestas que coinciden

## HU-05

* Al arrastrar un evento al ticket lateral, se agrega automáticamente
* El evento arrastrado se muestra en el ticket con su cuota correspondiente
* Las odds combinadas se recalculan al agregar un nuevo evento por arrastre

---

# Estrategia de prueba

## Casos automatizados

* Validación de protección contra sobregiro.
* Validación de recarga de billetera.
* Validación de cancelación de apuesta.
* Registro de múltiples apuestas para pruebas del historial.
* Filtrado por estado.
* Ordenamiento por monto.
* Búsqueda por nombre del equipo.
* Drag & Drop de eventos hacia el ticket.

---

## Precondiciones

* Node.js instalado.
* Playwright instalado.
* Dependencias del proyecto instaladas mediante **npm install**.
* Acceso a la aplicación QAXpert Bet.
* Navegador Chromium disponible.

---

# Ejecución

## Instalar dependencias

```bash
pnpm install
```

## Ejecutar todas las pruebas

```bash
npx playwright test
```

## Ejecutar en modo headed

```bash
npx playwright test --headed
```

---

# Tecnologías utilizadas

* Playwright
* JavaScript
* Node.js
* Visual Studio Code

---

# Autor

Cristhian Ortiz
