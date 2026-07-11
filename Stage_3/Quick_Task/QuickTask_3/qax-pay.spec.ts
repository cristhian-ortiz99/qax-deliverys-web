import { test, expect } from '@playwright/test';

test.describe('Solicitud de credito - QAX PayLater', ()=>{

    test.beforeEach(async ({page}) =>{
        await page.goto('index.html');
    });

    async function completarFormulario(page:any) {
        await page.getByLabel(/Nombres/i).fill('Cristhian');
        await page.getByLabel(/Apellidos/i).fill('Ortiz');
        await page.getByLabel(/Tipo Documento/i).selectOption('CC');
        await page.getByLabel(/Numero Documento/i).fill('12345678');
        await page.getByLabel(/Correo Electronico/i).fill('cristhian@test.com');
        await page.getByLabel(/Telefono/i).fill('987654321');
        await page.getByLabel(/Ingreso Mensual/i).fill('3500000');
        await page.getByLabel(/Dependientes/i).selectOption('0');
        await page.getByLabel(/Direccion/i).fill('Arenales');
    }

    test('CP01 - Validar que el título de la página contenga "QAX PayLater"', async ({page}) => {

        await test.step('Given que el usuario ingresa a la pagina principal', async() => {
            await expect(page).toHaveTitle(/PayLater/);
        });
    });

    test('CP02 - Validar que la sección del simulador de crédito esté visible', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

        });
        await test.step('Then se valida el simulador de credito visible ', async() => {
            
            await expect(page.getByRole('heading',{name: /Informacion Personal/i})).toBeVisible();
            await expect(page.locator('#step1Form')).toBeVisible();
            await expect(page.locator("#scoreCard")).toBeVisible();
            
        });
    });

    test('CP03 - Validar que el botón de acción esté deshabilitado inicialmente', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

        });
        await test.step('Then se valida que el boton de accion se encuentre deshabilitado ', async() => {

            await expect(page.getByLabel(/Nombres/i)).toBeEditable();
            await expect(page.getByLabel(/Apellidos/i)).toBeEditable();
            await expect(page.getByRole('button',{name : /Continuar/i})).toBeDisabled();
            
        });
    });

    test('CP04 - Validar que al llenar los campos obligatorios, el botón se habilite', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

        });
        await test.step('Then se llena los campos y el boton se habilita', async() => {

            await completarFormulario(page);
            await expect(page.getByRole('button',{name : /Continuar/i})).toBeEnabled();
            
        });
    });

    test('CP05 - Validar que al enviar el formulario, aparezca un mensaje de confirmación', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario y completa los datos del formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

            await completarFormulario(page);

        });
        await test.step('When se envia el formulario', async() => {

            await page.getByRole('button',{name: /Continuar/i}).click();
        });
        await test.step('Then se visualiza el mensaje de confirmación', async() => {

            const toast = page.locator('.toast');
            await expect.soft(toast).toBeVisible();
            await expect.soft(toast).toContainText('Datos guardados correctamente');
            await expect.soft(page).toHaveURL(/apply-step2\.html/);
        });
    });

    test('CP06 - Validar que el mensaje de confirmación contenga el texto esperado', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario y completa los datos del formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

            await completarFormulario(page);

        });
        await test.step('When se envia el formulario', async() => {

            await page.getByRole('button',{name: /Continuar/i}).click();
        });
        await test.step('Then el mensaje de confirmación contiene el texto esperado', async() => {

            await expect.soft(page.locator('.toast')).toContainText('Datos guardados correctamente');
        });
    });
    test('CP07 - Validar que un campo de entrada mantenga el valor ingresado', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario y completa los datos del formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

            await completarFormulario(page);

        });
        await test.step('Then los campos contienen los datos ingresados', async() => {
            expect.soft(await page.getByLabel(/Nombres/i).inputValue()).toBe('Cristhian');
            expect.soft(await page.getByLabel(/Apellidos/i).inputValue()).toBe('Ortiz');
            expect.soft(await page.getByLabel(/Numero Documento/i).inputValue()).toBe('12345678');
            expect.soft(await page.getByLabel(/Correo Electronico/i).inputValue()).toBe('cristhian@test.com');
            expect.soft(await page.getByLabel(/Telefono/i).inputValue()).toBe('987654321');
            expect.soft(await page.getByLabel(/Ingreso Mensual/i).inputValue()).toBe('3500000');
            expect.soft(await page.getByLabel(/Direccion/i).inputValue()).toBe('Arenales');
        });
        
    });

    test('CP08 - Validar que un campo sea editable', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

        });
        await test.step('Then se valida que los campos son editables', async() => {

            await expect(page.getByLabel(/Nombres/i)).toBeEditable();
            await expect(page.getByLabel(/Apellidos/i)).toBeEditable(); 
        });
    });

    test('CP09 - Validar que el campo Ingreso Mensual acepte formato numérico', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

        });
        await test.step('When ingresa un valor numerico valido', async() => {
            await page.getByLabel(/Ingreso Mensual/i).fill('600000');
        });
        
        await test.step('Then se valida el valor ingresado', async() => {
            await expect(page.getByLabel(/Ingreso Mensual/i)).toHaveValue('600000');
        });
    });

    test.skip('CP10 - Validar que al enviar sin llenar campos obligatorios, aparezca un borde rojo en los campos vacíos', async ({page}) => {

        await test.step('Given que el usuario ingresa al formulario y no completa los datos del formulario', async() => {
            
            await page.getByRole('link',{name: "Solicitar Ahora"}).click();

        });
        await test.step('When selecciona el boton continuar', async() => {
            await page.getByRole('button',{name: "Continuar a Verificacion"}).click();
        });
        
        await test.step('Then se muestra el borde rojo', async() => {
            await expect(page.getByLabel(/Nombres/i)).toHaveCSS('border-color','rgb(255, 0, 0)');
        });
    });

})
