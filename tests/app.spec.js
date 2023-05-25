import { test, expect } from './fixtures.js';

import App from '../src/App.vue';

test.use({
    viewport: {
        width: 500, height: 500
    }
});

test('App should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Vite + Vue');
});
