# playwright-ct-vue

Playwright Component Testing Vue Example
https://playwright.dev/docs/test-components

## Coverage Report
- step 1, install monocart-reporter
```sh
npm i monocart-reporter -D
```
- step 2, add monocart-reporter to playwright config
```js
// playwright-ct.config.js
const { defineConfig, devices } = require('@playwright/experimental-ct-vue');
module.exports = defineConfig({
    testDir: './tests',
    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'Playwright CT Vue Report',
            outputFile: 'playwright-report/index.html',
            coverage: {
                excludeDistFile: true,
                sourceFilter: (sourceName) => sourceName.search(/\/src\//) !== -1,
                entryFilter: (entry) => entry.type !== 'css'
            }
        }]
    ],
});
```
- step 3, write component tests
```js
// tests/app.spec.js
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

test('should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Vite + Vue');
});
```

- step 4, run test
```sh
npm run test-ct

# The coverage report will be generated: playwright-report/coverage/index.html
```


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```