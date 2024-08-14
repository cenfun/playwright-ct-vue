> also see [playwright-ct-react](https://github.com/cenfun/playwright-ct-react)

# Playwright Component Testing Vue Example 

[![Coverage Status](https://coveralls.io/repos/github/cenfun/playwright-ct-vue/badge.svg?branch=main)](https://coveralls.io/github/cenfun/playwright-ct-vue?branch=main)
[![codecov](https://codecov.io/gh/cenfun/playwright-ct-vue/branch/main/graph/badge.svg?token=D5LIE37F1K)](https://codecov.io/gh/cenfun/playwright-ct-vue)

see [test-components](https://playwright.dev/docs/test-components)

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
            outputFile: 'docs/index.html',
            coverage: {
                entryFilter: (entry) => true,
                sourceFilter: (sourcePath) => sourcePath.search(/src\//) !== -1,
                lcov: true
            }
        }]
    ],
});
```
- step 3, collect coverage data

Collect coverage with playwright [Automatic fixtures](https://playwright.dev/docs/test-fixtures#automatic-fixtures)
```js
// fixtures.js
import { test as ctBase, expect } from '@playwright/experimental-ct-vue';
import { addCoverageReport } from 'monocart-reporter';

const test = ctBase.extend({
    autoTestFixture: [async ({ page }, use) => {

        // console.log('autoTestFixture setup...');
        // coverage API is chromium only
        if (test.info().project.name === 'chromium') {
            await Promise.all([
                page.coverage.startJSCoverage({
                    resetOnNavigation: false
                }),
                page.coverage.startCSSCoverage({
                    resetOnNavigation: false
                })
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
            console.log(coverageList.map((item) => item.url));
            await addCoverageReport(coverageList, test.info());
        }

    }, {
        scope: 'test',
        auto: true
    }]
});

export { test, expect };

```

```js
// App.spec.js
import { test, expect } from './fixtures.js';

import App from '../src/App.vue';

test('App should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Vite + Vue');
});

```

- step 4, write more tests and run test
```sh
npm run test

# The coverage report will be generated in your output dir: 
```

- step 5, Github action for Codecov
```sh
    - name: Codecov
        uses: codecov/codecov-action@v3
```
See [static.yml](/.github/workflows/static.yml)

## Preview Coverage Report
- https://cenfun.github.io/playwright-ct-vue/coverage/
- [![Coverage Status](https://coveralls.io/repos/github/cenfun/playwright-ct-vue/badge.svg?branch=main)](https://coveralls.io/github/cenfun/playwright-ct-vue?branch=main)
- [![codecov](https://codecov.io/gh/cenfun/playwright-ct-vue/branch/main/graph/badge.svg?token=D5LIE37F1K)](https://codecov.io/gh/cenfun/playwright-ct-vue)

 ![](https://codecov.io/gh/cenfun/playwright-ct-vue/branch/main/graphs/tree.svg?token=D5LIE37F1K)


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
