import {test, expect} from '@playwright/test';

test.describe('Login failed Saucedemo', () => {
    test('Login failed con un usuario no válido', async({ page }) => {
        //Ir a la página web
        await page.goto('https://www.saucedemo.com/');

        //Ingresar las credenciales
        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');

        //Hacer clic en el botón de login
        await page.click('#login-button');

        //Comprobar que el mensaje de login fallido se desplega
        const errorMessage = page.locator('#login_button_container > div > form > div.error-message-container.error > h3');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    });
});        
