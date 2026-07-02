import { test, expect } from '@playwright/test';

test.describe('Drag and Drop', () => {

  test('Arrastrar el panel hacia el área de destino', async ({ page }) => {

    // Given: el usuario abre la página
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/drag-and-drop.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    const draggable = page.locator('#draggable');
    const target = page.locator('#target');
    await expect(draggable).toBeVisible();
    await expect(target).toBeVisible();

    // When: arrastra el panel hacia el área destino
    await draggable.dragTo(target);

    // Then: se valida que el panel continúe visible
    await expect(draggable).toBeVisible();

  });

});