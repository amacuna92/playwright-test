import {test, expect} from '@playwright/test';

test.describe('Remove from cart', () => {
    test('Remove from cart', async({ page }) => {
        //Ir a la página web
        await page.goto('https://www.saucedemo.com/');

        //Ingresar las credenciales
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        //Hacer clic en el botón de login
        await page.click('#login-button');

        //Agregar el producto "Sauce Labs Backpack" al carrito
        await page.click('#add-to-cart-sauce-labs-backpack');

        //Ir al carrito
        await page.click('.shopping_cart_link');

        //Eliminar el producto del carrito
        await page.click('#remove-sauce-labs-backpack');

        //Verificar que el producto haya sido eliminado
        const productInCart = page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Backpack'});
        await expect(productInCart).toHaveCount(0);

        const shopingCart = page.locator('.shopping_cart_badge');
        await expect(shopingCart).toHaveCount(0);

    });
});