import { test, expect } from '@playwright/test';

test.describe('Doble clic & Click derecho & Select Dropdown', () => {

  test('Seleccionar una opción del dropdown mediante click izquierdo', async ({ page }) => {

    // Given: el usuario abre la página
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    // When: abre el menú desplegable
    await page.getByRole('button', {
      name: 'Use left-click here'
    }).click();

    // And: selecciona la opción "Action"
    await page.getByRole('link', {
      name: 'Action'
    }).first().click();

    // Then: el menú desplegable se oculta
    await expect(page.getByRole('link', {
      name: 'Action'
    }).first()).toBeHidden();
  });

  test('Seleccionar una opción del dropdown mediante click derecho', async ({ page }) => {

    // Given: el usuario abre la página
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    // When: abre el menú desplegable
    await page.getByRole('button', {
      name: 'Use right-click here'
    }).click({button: 'right'});

    // And: selecciona la opción "Action"
    await page.getByRole('link', {
      name: 'Action'
    }).first().click();

    // Then: el menú desplegable se oculta
    await expect(page.getByRole('link', {
      name: 'Action'
    }).first()).toBeHidden();
  });

  test('Seleccionar una opción del dropdown mediante doble click', async ({ page }) => {

    // Given: el usuario abre la página
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    // When: abre el menú desplegable
    await page.getByRole('button', {
      name: 'Use double-click here'
    }).dblclick();

    // And: selecciona la opción "Action"
    await page.getByRole('link', {
      name: 'Action'
    }).first().click();

    // Then: el menú desplegable se oculta
    await expect(page.getByRole('link', {
      name: 'Action'
    }).first()).toBeHidden();
  });

});