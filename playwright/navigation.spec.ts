import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // still valid, but try to use the new Locators
  await expect(page.locator('h1:text("Hello UpLeveled")')).toBeVisible();

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

  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByRole('link', { name: 'Animals' }).click();
  await page.waitForURL('/animals');
  // don't need to double check
  // await expect(page).toHaveURL('/animals');
  await expect(page.getByText('These are my animals')).toBeVisible();

  const animals = [
    { id: 1, firstName: 'Lucia', type: 'lion', accessory: 'Car' },
    { id: 2, firstName: 'Macca', type: 'Dog', accessory: 'Comb' },
    { id: 3, firstName: 'Jojo', type: 'Dodo', accessory: 'Dojo' },
    { id: 4, firstName: 'Flo', type: 'Parrot', accessory: 'Carrot' },
    { id: 5, firstName: 'Bili', type: 'Capybara', accessory: 'Pen' },
  ];

  // await expect(page.getByTestId(`animal-type-Lion`)).toHaveText(
  //   "Lucia"
  // );
  // await expect(
  //   page.getByRole('img', { name: "Lucia" }),
  // ).toBeVisible();
  // await expect(
  //   page.getByRole('link', { name: "Lucia" }),
  // ).toBeVisible();

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

  await page.getByRole('link', { name: '🍎 Apple' }).click();
  await page.waitForURL('/fruits/1');
  await page.getByRole('textbox').fill('This is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();
});
