import {test, expect} from '@playwright/test';

test.describe('Add to cart', () => {
    test('Add to cart', async({ page }) => {
        //Ir a la página web
        await page.goto('https://www.saucedemo.com/');

        //Ingresar las credenciales
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        //Hacer clic en el botón de login
        await page.click('#login-button');

        //Agregar el producto "Sauce Labs Backpack" al carrito
        await page.click('#add-to-cart-sauce-labs-backpack');

        //Corroborar que el carrito muestra un producto agregado
        const shopingCart = page.locator('.shopping_cart_link');
        await expect(shopingCart).toBeVisible();
        await expect(shopingCart).toHaveText('1');

        //Ir al carrito y corroborar que sí está el producto recién añadido
        await page.click('.shopping_cart_link');
        const productInCart = page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Backpack'});
        await expect(productInCart).toBeVisible();

    });
});
