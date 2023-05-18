import { test, expect } from '@playwright/experimental-ct-vue';
import { addCoverageReport } from 'monocart-reporter';

import App from '../src/App.vue';

test.use({
    viewport: {
        width: 500, height: 500
    }
});

test.beforeAll(async ({ page }) => {
    // coverage API is chromium only
    if (test.info().project.name === 'chromium') {
        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage()
        ]);
    }

});

test.afterAll(async ({ page }) => {
    if (test.info().project.name === 'chromium') {
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage()
        ]);
        const coverageList = [... jsCoverage, ... cssCoverage];
        await addCoverageReport(coverageList, test.info());
    }
});

test('App should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Vite + Vue');
});
