import {test, expect} from '@playwright/test';

test.describe('Checkout exitoso', () => {
    test('Checkout exitoso', async({ page }) => {
        //Ir a la página web
        await page.goto('https://www.saucedemo.com/');

        //Ingresar las credenciales
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        //Hacer clic en el botón de login
        await page.click('#login-button');

        //Agregar 2 productos al carrito
        await page.click('#add-to-cart-sauce-labs-fleece-jacket');
        await page.click('#add-to-cart-sauce-labs-onesie');

        //Ir al carrito para corroborar que los productos fueron añadidos
        await page.click('.shopping_cart_link');
        await expect(page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Fleece Jacket'})).toBeVisible();
        await expect(page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Onesie'})).toBeVisible();

        //Proceder con el checkout
        await page.click('#checkout');
        await page.fill('#first-name', 'Amanda');
        await page.fill('#last-name', 'Aguilera');
        await page.fill('#postal-code', '30301');

        //Continuar con el pago
        await page.click('#continue');

        //Corroborar que los productos continúan en la orden de compra
        await expect(page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Fleece Jacket'})).toBeVisible();
        await expect(page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Onesie'})).toBeVisible();

        //Finalizar la compra y verificar mensaje de confirmación de compra
        await page.click('#finish');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
});