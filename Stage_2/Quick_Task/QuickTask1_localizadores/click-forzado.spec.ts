import { test, expect } from '@playwright/test';

test.describe('Click Forzado', () => {

  test('Realizar click forzado sobre el botón Start', async ({ page }) => {

    // Given: el usuario abre la página de Get User Media
    await page.context().grantPermissions(['camera']);
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/get-user-media.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    // When: realiza un click forzado sobre el botón Start
    await page.getByRole('button', { name: 'Start' }).click({
      force: true
    });

    // Then: el click forzado se ejecuta sin devolver excepciones

  });

});