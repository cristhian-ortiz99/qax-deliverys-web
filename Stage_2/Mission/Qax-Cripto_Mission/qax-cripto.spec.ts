import { test, expect } from '@playwright/test';

test.describe('HU-01 Compra de criptomoneda', () => {

  test('CP-01 - Comprar Bitcoin exitosamente', async ({ page }) => {
    const monto = 600000;
    let saldoInicial: any;
    await test.step('Given ingresar a la pagina de qax cripto', async () => {

        await page.goto('https://qaxpert.com/lab/sites/stage-2/crypto/index.html');
        await expect(page).toHaveTitle('Mercado de Criptomonedas | QAXpert Crypto');
        
    });

    await test.step('When selecciono una criptomoneda e ingreso el monto', async () => {
        await page.getByRole('row', { name: /Bitcoin BTC\/COP/i }).click();
        await expect(page.locator('#coinSelect')).toHaveValue('BTC');
        await expect(page.locator('#currentPrice')).toContainText('COP');
        saldoInicial = await page.locator('#balanceBadge').textContent();

        await page.locator('#amountInput').fill(monto.toString());
        await expect(page.locator('#btnTrade')).toBeEnabled();

    });

    await test.step('Then se procede a realizar la compra y se valida en el historial', async () => {
        await page.locator('#btnTrade').click();
        await expect(page.locator('#confirmModal')).toHaveClass(/active/);
        await expect(page.locator('#modalTitle')).toHaveText('Confirmar Compra');

        await page.getByRole('button',{name: 'Confirmar'}).click();
        await expect(page.locator('#successModal')).toHaveClass(/active/);
        await expect(page.locator('#successMsg')).toContainText('Compraste');
        const saldoFinal = await page.locator('#balanceBadge').textContent();
        expect(saldoFinal).not.toBe(saldoInicial);
        await page.getByRole('button',{name: 'Nueva Operación'}).click();
        
        await page.getByRole('link', { name: 'Historial' }).click();
        await expect(page.locator('#txBody')).toContainText('BTC');
    });

  })
});

test.describe('HU-02 Portafolio de inversión', () => {

  test('CP-01 - Validar que el portafolio se actualiza después de una compra', async ({ page }) => {
    
    await test.step('Given ingresar a la pagina de qax cripto', async () => {

        await page.goto('https://qaxpert.com/lab/sites/stage-2/crypto/index.html');
        await expect(page).toHaveTitle('Mercado de Criptomonedas | QAXpert Crypto');
        
    });

    await test.step('When selecciono una criptomoneda y realizo la compra', async () => {
        await page.getByRole('row', { name: /Bitcoin BTC\/COP/i }).click();
        await expect(page).toHaveURL(/trade\.html/);
        await page.locator('#amountInput').fill('700000');
        await page.locator('#btnTrade').click();

        await expect(page.getByRole('heading', { name: 'Confirmar Compra' })).toBeVisible();
        await page.getByRole('button', { name: 'Confirmar' }).click();
        await expect(page.getByRole('heading', { name: '¡Operación Exitosa!' })).toBeVisible();
        await page.getByRole('button',{name: 'Nueva Operación'}).click();
    });

    await test.step('Then se al portafolio y se valida que exista la tabla', async () => {
        await page.getByRole('link', { name: 'Portafolio' }).click();
        await expect(page).toHaveURL(/portfolio\.html/);
        await expect(page.getByRole('table')).toBeVisible();
        await expect(page.getByText(/Bitcoin/i)).toBeVisible();
        await expect(page.locator('.amount-col')).not.toHaveText('0.00000000');
    });

  })
});