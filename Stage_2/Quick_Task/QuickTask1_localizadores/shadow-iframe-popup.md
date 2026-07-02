# Shadow DOM, IFrame y PopUp - Localizadores con Playwright

## Objetivo

Identificar los localizadores para interactuar con elementos ubicados dentro de un Shadow DOM, un IFrame y un PopUp utilizando Playwright.

---

# 1. Shadow DOM

**URL**

https://bonigarcia.dev/selenium-webdriver-java/shadow-dom.html


## Localizadores

const shadow = page.locator('content');
await expect(page.getByText('Hello Shadow DOM')).toBeVisible();


---

# 2. IFrame

**URL**

https://bonigarcia.dev/selenium-webdriver-java/iframes.html

## Localizadores

const iframe = page.frameLocator('#my-iframe');

---

# 3. PopUp (JavaScript Dialogs)

**URL**

https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html

## Localizadores

- Alert
page.locator('#my-alert')

page.on('dialog', async dialog => {
    await dialog.accept();
});

- Confirm
page.getByRole('button', { name: 'Launch confirm' })

page.on('dialog', async dialog => {
    await dialog.accept();
});

page.on('dialog', async dialog => {
    await dialog.dismiss();
});

- Prompt
page.getByRole('button', { name: 'Launch prompt' })

page.on('dialog', async dialog => {
    await dialog.accept('Cristhian QA');
});

- Modal
page.getByRole('button', { name: 'Launch modal' })

page.getByRole('button', { name: 'Close' })

page.getByRole('button', { name: 'Save changes' })

