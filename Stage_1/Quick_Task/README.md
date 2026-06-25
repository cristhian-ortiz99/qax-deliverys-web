# Cajero Automático - QuickTasl_Stage1

---

## Título de la entrega
Simulador de Cajero Automático en TypeScript

---

## Objetivo / Historia de usuario

Como usuario del sistema bancario, quiero poder registrar cuentas y realizar operaciones básicas como consultar saldo, depositar y retirar dinero desde un cajero automático en consola, para simular el comportamiento de un sistema bancario real.

---

## Criterios de aceptación

- Se pueden registrar hasta 10 cuentas bancarias.
- El número de cuenta debe tener exactamente 4 dígitos.
- No se permiten cuentas duplicadas.
- Se puede consultar el saldo de una cuenta existente.
- Se pueden realizar depósitos válidos (> 0).
- Se pueden realizar retiros con las siguientes reglas:
  - No superar el saldo disponible.
  - No superar los $10,000 por transacción.
  - No permitir saldo negativo.
- El sistema finaliza con la opción "000".
- Se muestra un resumen final con todas las cuentas y el total general.
- Se registra un historial de transacciones (depósitos y retiros).

---

## Estrategia de prueba

### ✔ Casos positivos
- Registro de cuentas válidas (4 dígitos).
- Depósitos correctos.
- Retiros dentro del saldo disponible.
- Consulta de saldo correcta.

### ❌ Casos negativos
- Número de cuenta con menos o más de 4 dígitos.
- Cuentas duplicadas.
- Retiro mayor al saldo.
- Retiro mayor a $10,000.
- Depósitos con valores negativos o cero.
- Opciones inválidas en el menú.
