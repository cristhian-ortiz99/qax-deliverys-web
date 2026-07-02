import { test, expect } from '@playwright/test';

test.describe('Popup y Alert', () => {

  test('Aceptar un Alert', async ({ page }) => {

    // Given
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');
    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    // When
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Hello world!');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Launch alert' }).click();

  });

  test('Aceptar un Confirm', async ({ page }) => {

    // Given
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // When
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Is this correct?');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Launch confirm' }).click();

    // Then
    await expect(page.locator('#confirm-text'))
      .toHaveText('You chose: true');

  });

  test('Ingresar un valor en un Prompt', async ({ page }) => {

    // Given
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // When
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('Please enter your name');
      await dialog.accept('Cristhian');
    });

    await page.getByRole('button', { name: 'Launch prompt' }).click();

    // Then
    await expect(page.locator('#prompt-text'))
      .toHaveText('You typed: Cristhian');

  });

  test('Cerrar un Modal', async ({ page }) => {

    // Given
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // When
    await page.getByRole('button', { name: 'Launch modal' }).click();

    await expect(page.getByText('This is the modal body')).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();

    // Then
    await expect(page.locator('#modal-text'))
      .toHaveText('You chose: Close');

  });

  test('Guardar cambios desde un Modal', async ({ page }) => {

    // Given
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // When
    await page.getByRole('button', { name: 'Launch modal' }).click();

    await page.getByRole('button', { name: 'Save changes' }).click();

    // Then
    await expect(page.locator('#modal-text'))
      .toHaveText('You chose: Save changes');

  });

});