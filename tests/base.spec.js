const { test, expect } = require('@playwright/test');

test.describe.serial('Metas', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('goals');
	});

	test('deve adicionar nova meta', async ({ page }) => {
		expect(
			await page.getByRole('heading', { name: 'Nenhuma meta sendo feita no momento' })
		).toBeVisible();

		await page.getByRole('button', { name: 'Adicionar' }).click();
		await page.getByRole('button', { name: 'Criar meta de consumo' }).click();
		await page.waitForTimeout(1000);

		await page.getByRole('button', { name: 'assistir' }).first().click();
		await page.getByRole('menuitem', { name: 'jogar' }).click();
		await page.getByRole('spinbutton', { name: 'Número de games' }).fill('02');
		await page.getByRole('spinbutton', { name: 'Número de dias' }).fill('10');
		await page.getByRole('button', { name: 'Criar meta de consumo' }).click();
		await page.waitForTimeout(1000);

		expect(await page.getByText('Jogar 2 jogos em 10 dias')).toBeVisible();

		// verificar estado do perfil
		await page.goto('profile');
		await page.waitForLoadState('networkidle');
		expect(await page.getByRole('heading', { name: 'Nenhuma atividade cadastrada' })).toBeVisible();
	});

	test('deve curtir meta', async ({ page }) => {
		expect(await page.getByRole('heading', { name: 'Nenhuma meta favoritada' })).toBeVisible();

		await page.getByRole('button', { name: 'Curtir', exact: true }).click();
		await page.waitForTimeout(1000);

		expect(await page.getByRole('heading', { name: 'Nenhuma meta favoritada' })).not.toBeVisible();
		expect(await page.getByText('Criado por @mockuser')).toBeVisible();
	});

	test('deve mudar o progresso da meta', async ({ page }) => {
		await page.getByRole('button', { name: 'Adicionar' }).click();
		await page.getByRole('button', { name: 'Adicionar registro' }).click();
		await page.waitForTimeout(1000);

		await page.getByRole('button', { name: 'Horizon Zero Dawn' }).click();
		await page.getByRole('button', { name: 'Marcar jogo como concluído' }).click();
		await page.waitForTimeout(1000);
		expect(await page.getByText('50%')).toBeVisible();

		// verificar estado do perfil
		await page.goto('profile');
		await page.waitForLoadState('networkidle');

		expect(await page.locator('div').filter({ hasText: /^Mídias consumidas1$/ })).toBeVisible();
		expect(await page.locator('div').filter({ hasText: /^Pontos1$/ })).toBeVisible();
		expect(await page.locator('div').filter({ hasText: /^1jogos concluídos$/ })).toBeVisible();
		expect(
			await page.getByRole('heading', { name: 'Nenhuma atividade cadastrada' })
		).not.toBeVisible();
	});

	test('deve concluir uma meta', async ({ page }) => {
		await page.getByRole('button', { name: 'Adicionar' }).click();
		await page.getByRole('button', { name: 'Adicionar registro' }).click();
		await page.waitForTimeout(1000);

		await page.getByRole('button', { name: 'Cyberpunk 2077' }).click();
		await page.getByRole('button', { name: 'Marcar jogo como concluído' }).click();
		await page.waitForTimeout(1000);

		await page.goto('goals');
		await page.waitForLoadState('networkidle');
		expect(await page.getByRole('img', { name: 'Meta concluída' })).toBeVisible();

		await page.getByRole('button', { name: 'Descurtir' }).first().click();
		await page.waitForTimeout(1000);

		await page.locator('[id="menu-button-\\:rr\\:"]').click();
		await page.getByRole('menuitem', { name: 'Excluir meta' }).click();

		// verificar estado do perfil
		await page.goto('profile');
		await page.waitForLoadState('networkidle');

		expect(await page.locator('div').filter({ hasText: /^Mídias consumidas2$/ })).toBeVisible();
		expect(await page.locator('div').filter({ hasText: /^Metas concluídas1$/ })).toBeVisible();
		expect(await page.locator('div').filter({ hasText: /^Pontos4$/ })).toBeVisible();
		expect(await page.locator('div').filter({ hasText: /^2jogos concluídos$/ })).toBeVisible();
		expect(
			await page.getByRole('heading', { name: 'Nenhuma atividade cadastrada' })
		).not.toBeVisible();
	});
});
