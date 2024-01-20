// @ts-check
const { defineConfig, devices } = require('@playwright/experimental-ct-vue');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({

    testDir: './tests/',
    // testDir: './tests/components',

    outputDir: './report',

    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    snapshotDir: './__snapshots__',

    /* Maximum time one test can run for. */
    timeout: 10 * 1000,

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: Boolean(process.env.CI),

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 4,

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'Playwright CT Vue',
            outputFile: 'report/index.html',
            // logging: 'debug',
            coverage: {
                entryFilter: (entry) => {
                    // return entry.type !== 'css';

                    return true;
                },
                sourceFilter: (sourcePath) => {
                    return sourcePath.search(/src\//) !== -1;
                    // console.log(sourcePath);
                    // return true;
                },
                sourcePath: (sp) => {
                    const list = sp.split('/');

                    // locate to playwright dist path
                    if (sp.startsWith('localhost')) {
                        list[0] = 'playwright/.cache';
                    }

                    return list.join('/');
                },
                reports: [
                    'v8',
                    'codecov'
                ],
                lcov: true
            }
        }]
    ],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        /* Port to use for Playwright component endpoint. */
        ctPort: 3100
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ... devices['Desktop Chrome']
            }
        }
        // {
        //     name: 'firefox',
        //     use: {
        //         ... devices['Desktop Firefox']
        //     }
        // },
        // {
        //     name: 'webkit',
        //     use: {
        //         ... devices['Desktop Safari']
        //     }
        // }
    ]
});
