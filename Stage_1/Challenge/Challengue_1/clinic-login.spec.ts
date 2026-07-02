import { test, expect } from '@playwright/test';

test.describe('Login en QAX Clinic', () => {

  test('Scenario: Iniciar sesión con documento y acceder al formulario de cita', async ({ page }) => {

    // Paso 1 - Given: que el paciente abre la página de login de QAX Clinic
    await test.step('Given que el paciente abre la página de login de QAX Clinic', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-1/clinic/index.html');
      await expect(page).toHaveTitle('QAX Clinic — Ingreso Pacientes');
    });

    // Paso 2 - When: ingresa el documento "1234567890" y la contraseña "paciente123"
    await test.step('When ingresa el documento "1234567890" y la contraseña "paciente123', async () => {
      await page.getByPlaceholder('Ej. 1234567890').fill('1234567890');
      await page.getByPlaceholder('Ingrese su contraseña').fill('paciente123');
      await page.getByRole('button', { name: 'Ingresar' }).click();
    });

    // Paso 3 - Then: el sistema redirige a la página de reserva de cita
    await test.step('Then el sistema redirige a la página de reserva de cita', async () => {
      await expect(page).toHaveURL(/appointment\.html/);
      await expect(page).toHaveTitle('QAX Clinic — Reservar Cita');
      await expect(page.getByLabel('Centro Médico')).toBeVisible();
      await expect(page.getByLabel('Programa de Salud')).toBeVisible();
      await expect(page.getByLabel('Fecha de Visita')).toBeVisible();
    });

  });
});
