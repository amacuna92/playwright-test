import {test, expect} from '@playwright/test';

test.describe('End to End process', () => {
    test('End to End process', async({ page }) => {
        
        //Paso 1: ir a la página
        await page.goto('https://www.saucedemo.com/');

        //Paso 2: Iniciar sesión
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        //Paso 3: verificar que el login ha sido exitoso
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        //Paso 4: Agregar productos en el carrito
        await page.click('#add-to-cart-sauce-labs-bike-light');
        await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

        //Paso 5: Ir al carrito y corroborar que los artículos se encuentran
        await page.click('.shopping_cart_link');
        await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Bike Light'})).toBeVisible();
        await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Bolt T-Shirt'})).toBeVisible();

        //Paso 6: proceder con el checkout
        await page.click('#checkout');

        //Paso 7: ingresar la información de compra
        await page.fill('#first-name', 'Jose');
        await page.fill('#last-name', 'Badilla');
        await page.fill('#postal-code', '30301');
        await page.click('#continue');

        //Paso 8: verificar que los productos se encuentran en la orden de compra
        await expect(page.locator('#checkout_summary_container').filter({hasText: 'Sauce Labs Bike Light'})).toBeVisible();
        await expect(page.locator('#checkout_summary_container').filter({hasText: 'Sauce Labs Bolt T-Shirt'})).toBeVisible();

        //Paso 9: finalizar la compra
        await page.click('#finish');

        //Paso 10: Verificar el mensaje de confirmación
        await expect(page.locator('#checkout_complete_container').filter({hasText: 'Thank you for your order!'})).toBeVisible();

        //Paso 11: cerrar la sesión
        await page.click('#back-to-products');
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
})