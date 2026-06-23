# QuickTask 1 - Cajero Automático QAX

Simulador de Cajero Automático desarrollado en TypeScript utilizando entrada y salida por consola mediante el módulo `readline` de Node.js.

## Descripción

Este proyecto permite registrar cuentas bancarias y realizar operaciones básicas de un cajero automático:

- Registro de cuentas bancarias.
- Consulta de saldo.
- Depósitos.
- Retiros con validaciones de negocio.
- Resumen final de cuentas registradas.

---

## Funcionalidades

### Registro de cuentas

- Permite registrar hasta 10 cuentas.
- Cada cuenta contiene:
  - Número de cuenta (4 dígitos).
  - Nombre del titular.
  - Saldo inicial.
- No permite números de cuenta duplicados.

### Operaciones disponibles

1. Consultar saldo.
2. Depositar dinero.
3. Retirar dinero.
4. Salir del sistema.

---

## Reglas de negocio

### Número de cuenta

- Debe contener exactamente 4 dígitos.
- No se permiten cuentas duplicadas.

### Depósitos

- El monto debe ser mayor que cero.

### Retiros

- No se permite retirar más dinero del saldo disponible.
- No se permite retirar más de $10,000 en una sola operación.
- El saldo nunca puede quedar negativo.

---

## 🛠️ Tecnologías utilizadas

- TypeScript
- Node.js
- Readline

---


## ▶️ Ejecución del proyecto

### Instalar dependencias

```bash
pnpm install
```

### Ejecutar el programa

```bash
pnpm add -D typescript @types/node
pnpm add -D tsx
pnpm tsx cajero.ts
```

---

## 💻 Ejemplo de uso

```text
=== CAJERO AUTOMÁTICO QAX ===

Número de cuenta (4 dígitos): 1234
Nombre del titular: Juan Pérez
Saldo inicial: 5000

✔ Cuenta registrada

=== MENÚ CAJERO ===

1. Consultar saldo
2. Depositar
3. Retirar
000. Salir
```

---

## 📊 Resumen Final

Al finalizar la ejecución, el sistema muestra:

- Número de cuenta.
- Titular.
- Saldo final.
- Total acumulado de todas las cuentas registradas.

---

## 👨‍💻 Autor

Cristhian Ortiz