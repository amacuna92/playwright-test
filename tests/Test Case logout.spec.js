import {test, expect} from '@playwright/test';

test.describe('Logout exitoso', () => {
    test('Logout exitoso', async({ page }) => {
        //Ir a la página web
        await page.goto('https://www.saucedemo.com/');

        //Ingresar las credenciales
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        //Hacer clic en el botón de login
        await page.click('#login-button');

        //Abrir el menú de la barra lateral
        await page.click('#react-burger-menu-btn');

        //Hacer clic en el botón de logout
        await page.click('#logout_sidebar_link');

        //Corroborar que el usuario regrese a la página principal de login
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});