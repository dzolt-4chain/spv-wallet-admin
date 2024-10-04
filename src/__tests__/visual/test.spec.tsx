import { expect, test } from '@playwright/experimental-ct-react';
import { Xpub } from '@/routes/admin/_admin.xpub.tsx';
import { chromium, devices } from '@playwright/test';

test('First Test of the component', async ({ mount, page }) => {
  // Setup
  const browser = await chromium.launch();
  const context = await browser.newContext(devices['iPhone 11']);
  const page = await context.newPage();

  await page.route('**/admin/xpubs/search', (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          created_at: new Date('2024-08-02T09:22:06.184649Z'),
          updated_at: new Date('2024-08-02T09:22:06.184649Z'),
          id: 'e7d96399df6400de6a16d34adf63fcb500b0b6cd9f016db4b8201b99d24679df',
          current_balance: 0,
          next_internal_num: 0,
          next_external_num: 1,
          status: '',
        },
        {
          created_at: new Date('2024-08-02T09:22:06.184649Z'),
          updated_at: new Date('2024-08-02T09:22:06.184649Z'),
          id: '378aa9182fc61b1c6b8e132bb6f1b52f3c85320407d259a95a8cf2dcbbfa9d8c',
          current_balance: 121,
          next_internal_num: 8,
          next_external_num: 2,
          status: '',
        },
      ]),
    }),
  );

  const component = await mount(<Xpub />);

  await component.waitFor({ state: 'visible' });

  await expect(component).toHaveScreenshot();
});

/*test('First Test of the component 2', async ({ mount }) => {
  const component = await mount(<AccessKeys />);

  await expect(component).toHaveScreenshot();
})*/
