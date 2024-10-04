import { expect, test, vi } from 'vitest';
import { chromium } from 'playwright';
import { Xpub } from '@/routes/admin/_admin.xpub.tsx';
import { render } from '../../../test-utils.tsx';
import * as routerHooks from '@tanstack/react-router';
import { act } from '@testing-library/react';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

test('example testing 2 ', async () => {
  vi.mock(import('@tanstack/react-router'), async (importOriginal) => {
    const mod = await importOriginal(); // type is inferred
    return {
      ...mod,
      // replace some exports
      useSearch: vi.fn(),
    };
  });

  vi.spyOn(routerHooks, 'useSearch').mockImplementation(() => []);

  const { container } = render(<Xpub />);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(container.innerHTML);

  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();

  expect(screenshot).toMatchImageSnapshot();
});
