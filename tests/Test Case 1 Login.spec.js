import {test, expect} from '@playwright/test';

test.describe('Login exitoso Saucedemo', () => {
    test('Login exitoso con un usuario válido', async({ page }) => {
        //Ir a la página web
        await page.goto('https://www.saucedemo.com/');

        //Ingresar las credenciales
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        //Hacer clic en el botón de login
        await page.click('#login-button');

        //Verificar que el usuario sí accede a la página web
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.inventory_list')).toBeVisible();

    });
});