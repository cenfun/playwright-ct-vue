import { test, expect } from '../fixtures.js';

import HelloWorld from '../../src/components/HelloWorld.vue';

test('HelloWorld should work', async ({ mount, page }) => {
    const component = await mount(HelloWorld, {
        props: {
            msg: 'my message'
        }
    });
    await expect(component).toContainText('my message');
});

test('HelloWorld onClick', async ({ mount, page }) => {
    const component = await mount(HelloWorld, {
        props: {
            msg: 'my message'
        }
    });
    await expect(component).toContainText('my message');

    await page.locator('h1').click();

    await expect(component).toContainText('clicked');

});

