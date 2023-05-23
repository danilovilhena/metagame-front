import { chromium } from '@playwright/test';

async function globalSetup(config) {
	console.log('Global setup: started!');
	const { baseURL, storageState } = config.projects[0].use;
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(baseURL);
	await page.waitForTimeout(2000);
	await page.getByRole('button', { name: 'Entrar' }).click();
	await page.getByRole('button', { name: 'Continuar com e-mail' }).click();
	await page.getByPlaceholder('E-mail ou nome de usuário').fill('mock@gmail.com');
	await page.getByPlaceholder('Senha').fill('Mock@123456');
	await page.locator('button[type="submit"]').click();
	await page.waitForTimeout(2000);
	await page.context().storageState({ path: storageState });
	await browser.close();
	console.log('Global setup: finished!');
}

export default globalSetup;
