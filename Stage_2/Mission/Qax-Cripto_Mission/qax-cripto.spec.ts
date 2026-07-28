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

test.describe('HU-03 Widget BTC en iframe', () => {
  test('CP - Validar correctamente el widget BTC', async ({ page }) => {

    const btcWidget = page.frameLocator('.btc-widget-iframe');

    await test.step('Given ingresar a la página de qax cripto', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/crypto/index.html');
      await expect(page).toHaveTitle('Mercado de Criptomonedas | QAXpert Crypto');
    });

    await test.step('When el usuario visualiza el widget BTC', async () => {
      await expect(page.locator('.btc-widget-iframe')).toBeVisible();
    });

    await test.step('Then el iframe carga correctamente', async () => {
      await expect(btcWidget.locator('.widget-title')).toHaveText('BTC / COP');
    });

    await test.step('And se muestra el precio actual de BTC', async () => {
      await expect(btcWidget.locator('#btcPrice')).toBeVisible();
      await expect(btcWidget.locator('#btcPrice')).toContainText('$');
    });

    await test.step('And el gráfico contiene las 20 barras renderizadas', async () => {
      await expect(btcWidget.locator('.chart-bar')).toHaveCount(20);

    });

    await test.step('And las estadísticas de las últimas 24 horas son visibles', async () => {
      await expect(btcWidget.locator('#change24')).toBeVisible();
      await expect(btcWidget.locator('#volume24')).toBeVisible();
      await expect(btcWidget.locator('#high24')).toBeVisible();
      await expect(btcWidget.locator('#low24')).toBeVisible();
    });

    await test.step('And el indicador "En vivo" se encuentra presente', async () => {
      await expect(btcWidget.locator('.widget-status')).toContainText('En vivo');
    });

  });
});

test.describe('HU-04 Venta de criptomonedas con validaciones', () => {

  test('CP - Vender Bitcoin exitosamente', async ({ page }) => {

    const montoCompra = 700000;
    const montoVenta = 300000;


    await test.step('Given ingresar a la página de QAX Crypto', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-2/crypto/index.html');
      await expect(page).toHaveTitle('Mercado de Criptomonedas | QAXpert Crypto');
    });

    await test.step('And realizar una compra para disponer de BTC', async () => {
      await page.getByRole('row', { name: /Bitcoin BTC\/COP/i }).click();
      await page.locator('#amountInput').fill(montoCompra.toString());
      await page.locator('#btnTrade').click();
      await expect(page.locator('#confirmModal')).toHaveClass(/active/);
      await page.getByRole('button', { name: 'Confirmar' }).click();
      await expect(page.locator('#successModal')).toHaveClass(/active/);
      await page.getByRole('button', { name: 'Nueva Operación' }).click();
    });

    await test.step('When cambiar al modo Vender', async () => {
      await page.locator('#btnSellMode').click();
      await expect(page.locator('#btnTrade')).toContainText('Vender');
      await expect(page.locator('#btnTrade')).toHaveCSS(
        'background-color',
        'rgb(255, 71, 87)'
      );
    });

    await test.step('Then validar que no permita vender más de la tenencia disponible', async () => {
      await page.locator('#amountInput').fill('999999999');
      await expect(page.locator('#btnTrade')).toBeDisabled();
    });

    await test.step('When realizar una venta válida', async () => {
      await page.locator('#amountInput').fill(montoVenta.toString());
      await expect(page.locator('#btnTrade')).toBeEnabled();
      await page.locator('#btnTrade').click();
      await expect(page.locator('#confirmModal')).toHaveClass(/active/);
      await page.getByRole('button', { name: 'Confirmar' }).click();
      await expect(page.locator('#successModal')).toHaveClass(/active/);
      await page.getByRole('button', { name: 'Nueva Operación' }).click();
    });

    await test.step('And validar que la venta aparezca en el historial', async () => {
      await page.getByRole('link', { name: 'Historial' }).click();
      await expect(page).toHaveURL(/history\.html/);
      await expect(page.locator('#txBody')).toContainText('Venta');
      await expect(page.locator('#txBody')).toContainText('BTC');
    });
  });
});

test.describe('HU-05 Historial de transacciones', () => {

    test.beforeEach(async ({ page }) => {
        const transactions = [
            {
                type: 'Compra',
                symbol: 'BTC',
                cryptoAmount: 0.012,
                price: 280500000,
                copAmount: 3366000,
                commission: 15000,
                fecha: '2026-01-20T10:00:00'
            },
            {
                type: 'Compra',
                symbol: 'ETH',
                cryptoAmount: 1.5,
                price: 12000000,
                copAmount: 18000000,
                commission: 20000,
                fecha: '2026-01-21T12:00:00'
            },
            {
                type: 'Venta',
                symbol: 'BTC',
                cryptoAmount: 0.005,
                price: 281000000,
                copAmount: 1405000,
                commission: 12000,
                fecha: '2026-01-22T14:00:00'
            }
        ];
        await page.goto('https://qaxpert.com/lab/sites/stage-2/crypto/index.html');
        await page.evaluate((data) => {
            localStorage.setItem(
                'qaxcrypto_transactions',
                JSON.stringify(data)
            );
        }, transactions);
        await page.goto('https://qaxpert.com/lab/sites/stage-2/crypto/history.html');
    });

    test('CP01 - Filtrar únicamente compras', async ({ page }) => {

        await test.step('Given el usuario se encuentra en la página Historial', async () => {
            await expect(page).toHaveTitle(/Historial de Transacciones/i);
        });

        await test.step('When selecciona el filtro Compras', async () => {
            await page.locator('#filterType').selectOption('Compra');
        });

        await test.step('Then solo se muestran transacciones de tipo Compra', async () => {
            const tipos = await page.locator('.type-badge').allTextContents();
            tipos.forEach(tipo => {
                expect(tipo.trim()).toBe('Compra');
            });
        });

    });

    test('CP02 - Buscar transacciones de BTC', async ({ page }) => {

        await test.step('Given el usuario se encuentra en la página Historial', async () => {
            await expect(page).toHaveTitle(/Historial de Transacciones/i);
        });

        await test.step('When busca el símbolo BTC', async () => {
            await page.locator('#filterSearch').fill('BTC');
        });

        await test.step('Then solo aparecen transacciones de Bitcoin', async () => {
            const simbolos = await page.locator('#txBody tr td:nth-child(3)').allTextContents();

            simbolos.forEach(simbolo => {
                expect(simbolo.trim()).toBe('BTC');
            });
        });

    });

    test('CP03 - Ordenar por mayor monto', async ({ page }) => {

        await test.step('Given el usuario se encuentra en la página Historial', async () => {
            await expect(page).toHaveTitle(/Historial de Transacciones/i);
        });
        await test.step('When ordena por Mayor monto', async () => {
            await page.locator('#filterSort').selectOption('monto-desc');
        });
        await test.step('Then las transacciones aparecen ordenadas de mayor a menor', async () => {
            const montosTexto = await page.locator('#txBody tr td:nth-child(6)').allTextContents();
            const montos = montosTexto.map(texto =>
                Number(
                    texto
                        .replace('$', '')
                        .replace(/\./g, '')
                        .replace(/,/g, '')
                        .replace(/\s/g, '')
                )
            );
            const ordenEsperado = [...montos].sort((a, b) => b - a);
            expect(montos).toEqual(ordenEsperado);
        });

    });

    test('CP04 - Combinar filtro por Compra y búsqueda BTC', async ({ page }) => {

        await test.step('Given el usuario se encuentra en la página Historial', async () => {
            await expect(page).toHaveTitle(/Historial de Transacciones/i);
        });

        await test.step('When filtra por Compras y busca BTC', async () => {
            await page.locator('#filterType').selectOption('Compra');
            await page.locator('#filterSearch').fill('BTC');
        });

        await test.step('Then solo aparecen compras de BTC', async () => {
            const tipos = await page.locator('.type-badge').allTextContents();

            const simbolos = await page.locator('#txBody tr td:nth-child(3)').allTextContents();

            tipos.forEach(tipo => {
                expect(tipo.trim()).toBe('Compra');
            });

            simbolos.forEach(simbolo => {
                expect(simbolo.trim()).toBe('BTC');
            });

        });

    });

});