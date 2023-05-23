// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	timeout: 30 * 1000,
	expect: { timeout: 10000 },
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: 3,
	reporter: 'html',
	globalSetup: require.resolve('./tests/globalSetup'),
	use: {
		headless: true,
		actionTimeout: 0,
		trace: 'on',
		baseURL: 'http://127.0.0.1:3000',
		storageState: 'state.json',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
