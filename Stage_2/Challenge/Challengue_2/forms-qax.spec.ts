import { test, expect } from '@playwright/test';

test.describe('Feature: Comportamientos avanzados - cobertura total', () => {

  test('HU-01: Cobertura total de alertas nativas', async ({ page }) => {

    await test.step('Given ingresar a la pagina de qax forms', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/forms/index.html');
      await expect(page).toHaveTitle('QAXpert Forms | Sandbox de Comportamientos Avanzados');
    });

    await test.step('When selecciona la pestaña de alertas y modales', async () => {
      await page.getByRole('button', { name: '2. Alertas y Modales' }).click();
    });

    await test.step('Then se valida las distintas alertas', async () => {
        //Alerta simple
        page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Esta es una alerta simple del navegador.');
        await dialog.accept();
        });

        await page.getByRole('button', { name: 'Alerta Simple' }).click();
        await expect(page.locator('#alertResult')).toHaveText('Alerta simple aceptada.');

        //Confirmar
        
        page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('¿Estás seguro de continuar con esta operación?');
        await dialog.accept();
        });

        await page.getByRole('button', { name: 'Confirmar (Aceptar OK)' }).click();
        await expect(page.locator('#alertResult')).toHaveText('You pressed Ok');

        //Confirmar - cancelar

        page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('¿Deseás cancelar esta operación?');
        await dialog.dismiss();
        });

        await page.getByRole('button', { name: 'Confirmar (Cancelar)' }).click();
        await expect(page.locator('#alertResult')).toHaveText('You Pressed Cancel');

        //Prompt

        page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Ingresá tu nombre:');
        await dialog.accept('Cristhian');
        });

        await page.getByRole('button', { name: 'Prompt (Ingresar Texto)' }).click();
        await expect(page.locator('#alertResult')).toHaveText('Hello Cristhian How are you today');
    });

  })

  test('HU-02: Modales personalizados — todos los estados', async ({ page }) => {

    await test.step('Given ingresar a la pagina de qax forms', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/forms/index.html');
      await expect(page).toHaveTitle('QAXpert Forms | Sandbox de Comportamientos Avanzados');
    });

    
    await test.step('When selecciona la pestaña de alertas y modales', async () => {
      await page.getByRole('button', { name: '2. Alertas y Modales' }).click();
    });

    await test.step('Then se valida las distintas alertas', async () => {
        //Cancelar modal sin ejecutar accion
        await page.getByRole('button', {name: 'Abrir Modal de Confirmación'}).click();
        const modal = page.locator('#confirmModal');
        await expect(modal).toBeVisible();
        await expect(modal.getByRole('heading')).toHaveText('¿Confirmar acción?');

        await modal.getByRole('button', {name: 'Cancelar'}).click();
        await expect(modal).not.toBeVisible();
        await expect(page.locator('#alertResult')).not.toContainText('Operación confirmada exitosamente.');
        
        //Confirmar y cierra el modal
        
        await page.getByRole('button', {name: 'Abrir Modal de Confirmación'}).click();
        const modalC = page.locator('#confirmModal');
        await expect(modalC).toBeVisible();
        await expect(modalC.getByRole('heading')).toHaveText('¿Confirmar acción?');
        
        await expect(modalC).toContainText('Estás a punto de realizar una operación importante. ¿Deseás continuar?');
        
        await modalC.getByRole('button', {name: 'Confirmar'}).click();

        await expect(modalC).not.toBeVisible();

        await expect(page.locator('#alertResult')).toContainText('Operación confirmada exitosamente.');
        
    });

  });

  test('HU-03: Iframes — simple y anidados', async ({ page }) => {

    await test.step('Given ingresar a la pagina de qax forms', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/forms/index.html');
      await expect(page).toHaveTitle('QAXpert Forms | Sandbox de Comportamientos Avanzados');
    });

    
    await test.step('When selecciona la pestaña de alertas y modales', async () => {
      await page.getByRole('button', { name: '3. Frames' }).click();
    });

    await test.step('Then se valida el contexto iframe', async () => {
        
        await expect(page.locator('#tab-frames')).toBeVisible();
        await expect(page.locator('#singleIframe')).toBeVisible();
        const simpleFrame = page.frameLocator('#singleIframe');
        await expect(simpleFrame.locator('body')).toBeVisible();
    });
  });
  test('HU-04: Flujo combinado — cambios de contexto', async ({ page }) => {

    await test.step('Given ingresar a la pagina de qax forms', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/forms/index.html');
      await expect(page).toHaveTitle('QAXpert Forms | Sandbox de Comportamientos Avanzados');
    });

    await test.step('When prueba el flujo completo de validación', async () => {
      page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('alerta');
      await dialog.accept();
      });

      //ALERTAS
      await page.locator('[data-tab="alertas"]').click();
      await page.locator('.alert-btn').first().click();

      await expect(page.locator('#alertResult')).toBeVisible();

      //MODAL
      await page.locator('.modal-trigger').first().click();
      const modal = page.locator('#confirmModal');

      await expect(modal).toBeVisible();
      await modal.locator('.btn-primary').click();

      await expect(modal).toBeHidden();
      await expect(page.locator('.navbar')).toBeVisible();

      //CONTEXTO PRINCIPAL

      await expect(page.locator('.page-header h1')).toHaveText('Sandbox de Comportamientos Avanzados');
      await expect(page.locator('.tab-nav')).toBeVisible();

      await page.locator('[data-tab="dragdrop"]').click();
    });

  });


});