import test, { expect } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // await expect(page.locator('h1')).toHaveText('Hello UpLeveled!');

  // test if images are visible
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(2),
  ).toBeVisible();
  // alternative way to test if images are visible
  await expect(page.getByAltText('Smiling cat').first()).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByRole('link', { name: 'Animals' }).click();
  await page.waitForURL('/animals');
  await expect(page).toHaveURL('/animals');
  await expect(page.getByText('These are my animals')).toBeVisible();

  const animals = [
    { id: 1, firstName: 'Lucia', type: 'Lion', accessory: 'Car' },
    { id: 2, firstName: 'Macca', type: 'Dog', accessory: 'Comb' },
    { id: 3, firstName: 'Jojo', type: 'Dodo', accessory: 'Dojo' },
    { id: 4, firstName: 'Flo', type: 'Parrot', accessory: 'Carrot' },
    { id: 5, firstName: 'Bili', type: 'Capybara', accessory: 'Pen' },
  ];

  for (const animal of animals) {
    await expect(page.getByTestId(`animal-type-${animal.type}`)).toHaveText(
      animal.firstName,
    );
    await expect(
      page.getByRole('img', { name: animal.firstName }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('/fruits');
  await expect(page).toHaveURL('/fruits');

  await page.getByRole('link', { name: '🍎 Apple' }).click();
  await page.waitForURL('/fruits/1');
  await expect(page).toHaveURL('/fruits/1');
  await page.getByRole('textbox').fill('This is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();
  await expect(
    page.locator('div').filter({ hasText: 'This is a comment' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('/fruits');
  await expect(page).toHaveURL('/fruits');
  await expect(
    page.locator('[data-test-id="fruit-name-Apple"] > div'),
  ).toHaveText('This is a comment');
});
