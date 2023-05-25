import { test as ctBase, expect } from '@playwright/experimental-ct-vue';
import { addCoverageReport } from 'monocart-reporter';

const test = ctBase.extend({
    autoTestFixture: [async ({ page }, use) => {

        // console.log('autoTestFixture setup...');
        // coverage API is chromium only
        if (test.info().project.name === 'chromium') {
            await Promise.all([
                page.coverage.startJSCoverage(),
                page.coverage.startCSSCoverage()
            ]);
        }

        await use('autoTestFixture');

        // console.log('autoTestFixture teardown...');
        if (test.info().project.name === 'chromium') {
            const [jsCoverage, cssCoverage] = await Promise.all([
                page.coverage.stopJSCoverage(),
                page.coverage.stopCSSCoverage()
            ]);
            const coverageList = [... jsCoverage, ... cssCoverage];
            await addCoverageReport(coverageList, test.info());
        }

    }, {
        scope: 'test',
        auto: true
    }]
});

export { test, expect };
