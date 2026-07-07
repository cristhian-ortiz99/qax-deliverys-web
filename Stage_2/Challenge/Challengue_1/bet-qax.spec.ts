import { test, expect } from '@playwright/test';

test.describe('Feature: Realizar apuesta en QAXpert Bet', () => {

  test('HU-01: Protección contra sobregiro', async ({ page }) => {

    await test.step('Given que el usuario abre la página de eventos', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/bet/index.html');
      await expect(page.getByRole('heading', { name: 'Eventos en Vivo' })).toBeVisible();
    });

    await test.step('When hace clic en la cuota Local del primer partido', async () => {
      const firstEvent = page.locator('.event-card').first();
      await firstEvent.locator('//button[@data-pick="local"]').last().click();
      await expect(page.locator('#ticketSidebar .ticket-item')).toBeVisible();
    });

    
    await test.step('And navega a Mi Ticket', async () => {
      await page.getByRole('button', { name: 'Ir a Apostar →' }).click();
      await expect(page).toHaveURL(/ticket\.html/);
    });

    await test.step('When ingresa monto y hace clic en Realizar Apuesta', async () => {
      await page.locator('//input[@id="amount-0"]').fill('6000000');
      await expect(page.getByRole('button',{name: 'Realizar Apuesta'})).toBeDisabled();
    });

  });

  test('HU-02: Recarga de billetera', async ({ page }) => {

    await test.step('Given que el usuario abre la página de eventos', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/bet/index.html');
      await expect(page.getByRole('heading', { name: 'Eventos en Vivo' })).toBeVisible();
    });

    await test.step('And va hacia la opción billetera', async () => {
      await page.getByRole('link', { name: 'Billetera' }).click();
      await expect(page).toHaveURL(/wallet\.html/);
    });

    await test.step('when agrega fondos a mi billetera con montos predefinidos', async () => {
      await page.getByRole('button', { name: '$100.000' }).click();
      await expect(page.locator('#amount')).toHaveValue('100000');
      await expect(page.getByRole('button', { name: '$100.000' })).toHaveClass(/active/);
      const saldoAnterior = await page.locator('#balanceDisplay').textContent();
      await page.getByRole('button', { name: 'Agregar Fondos a mi Billetera' }).click();
      await expect(page.locator('#balanceDisplay')).not.toHaveText(saldoAnterior!);
    });

    await test.step('Then el saldo anterior más el monto agregado coincide con el nuevo saldo mostrado', async () => {
      await expect(page.locator('#successMsg')).toBeVisible();
    });
    
  });

  test('HU-03: Cancelación de apuesta', async ({ page }) => {

    let saldoInicial: number;
    let saldoFinal: number;

    await test.step('Given que el usuario abre la página de eventos', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/bet/index.html');
      await expect(page.getByRole('heading', { name: 'Eventos en Vivo' })).toBeVisible();

      saldoInicial = await page.evaluate(() => {
        const wallet = JSON.parse(localStorage.getItem('qaxbet_wallet')!);
        return wallet.balance;
      });
      
      const firstEvent = page.locator('.event-card').first();
      await firstEvent.locator('//button[@data-pick="local"]').last().click();
      await expect(page.locator('#ticketSidebar .ticket-item')).toBeVisible();

      await page.getByRole('button', { name: 'Ir a Apostar →' }).click();
      await expect(page).toHaveURL(/ticket\.html/);

    });

    await test.step('When poder cancelar una apuesta antes de confirmarla', async () => {
        await page.locator('[id^="amount-"]').fill('80000');
        await page.getByRole('button', { name: 'Realizar Apuesta' }).click();
        await expect(page.locator('#confirmModal')).toBeVisible();

    });

    await test.step('Then no registrar apuestas no deseadas', async () => {
        await page.getByRole('button', { name: 'Cancelar' }).click();

        saldoFinal = await page.evaluate(() => {
        const wallet = JSON.parse(localStorage.getItem('qaxbet_wallet')!);
        return wallet.balance;});

        expect(saldoFinal).toBe(saldoInicial);

        await page.getByRole('link', { name: 'Historial' }).click();
        await expect(page).toHaveURL(/history\.html/);

        await expect(page.getByText('No se encontraron apuestas')).toBeVisible();
      });
    });

    test('HU-04: Filtros del historial', async ({ page }) => {

    await test.step('Given registro apuestas para contar con data', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/bet/index.html');
      await page.locator('.event-card').nth(0)
      .getByRole('button', { name: 'Local' })
      .click();
      await page.getByRole('button', { name: 'Ir a Apostar →' }).click();
      await page.locator('#amount-0').fill('5000');
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();
      await page.getByRole('button', { name: 'Confirmar Apuesta ✓' }).click();
      await page.getByRole('button', { name: 'Ver Historial' }).click();

      await page.getByRole('link', { name: 'Eventos' }).click();

      await page.locator('.event-card').nth(1)
      .getByRole('button', { name: 'Local' })
      .click();
      await page.getByRole('button', { name: 'Ir a Apostar →' }).click();
      await page.locator('#amount-0').fill('8000');
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();
      await page.getByRole('button', { name: 'Confirmar Apuesta ✓' }).click();
      await page.getByRole('button', { name: 'Ver Historial' }).click();

      await page.getByRole('link', { name: 'Eventos' }).click();

      await page.locator('.event-card').nth(2)
      .getByRole('button', { name: 'Local' })
      .click();
      await page.getByRole('button', { name: 'Ir a Apostar →' }).click();
      await page.locator('#amount-0').fill('9000');
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();
      await page.getByRole('button', { name: 'Confirmar Apuesta ✓' }).click();
      await page.getByRole('button', { name: 'Ver Historial' }).click();
    });


    await test.step('When filtrar mis apuestas por estado y ordenarlas', async () => {
      await page.locator('#filterStatus').selectOption('Pendiente');
      await expect(page.locator('.status')).toHaveCount(3);
    });

    await test.step('Then encontrar rápidamente la información que necesito', async () => {
      await page.locator('#filterSort').selectOption('monto-desc');
      await page.locator('#filterSearch').fill('Atl');

      await expect(page.locator('#historyBody')).toContainText('Atlético');
    });
  });

  test('HU-05: Drag & drop de eventos', async ({ page }) => {

    await test.step('Given que el usuario abre la página de eventos', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/bet/index.html');
      await expect(page.getByRole('heading', { name: 'Eventos en Vivo' })).toBeVisible();
    });

    await test.step('When arrastra un evento desde el catálogo hasta el ticket lateral', async () => {
      await page.locator('.event-card').first().dragTo(page.locator('#ticketSidebar'));
    });

    await test.step('Then agregarlo a mi selección de apuestas sin usar clics', async () => {
      await expect(page.locator('.ticket-item')).toHaveCount(1);
    });

  });
    
  });
