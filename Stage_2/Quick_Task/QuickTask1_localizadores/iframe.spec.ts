import { test, expect } from '@playwright/test';

test.describe('IFrame', () => {

  test('Ingresar texto dentro de un iframe', async ({ page }) => {

    // Given
    await page.goto('https://demo.automationtesting.in/Frames.html');

    await expect(page).toHaveTitle('Frames');

    // When
    const frame = page.frameLocator('#singleframe');

    await frame.getByRole('textbox').fill('QAX Playwright');

    // Then
    await expect(frame.getByRole('textbox'))
      .toHaveValue('Playwright');

  });

});