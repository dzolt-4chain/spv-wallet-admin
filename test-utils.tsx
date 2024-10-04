import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, SpvWalletProvider, ThemeProvider } from './src/contexts';
import { ConfigProvider } from '@4chain-ag/react-configuration';
import { TooltipProvider } from './src/components';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { LayoutComponent } from './src/routes/admin/_admin';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  const rootRoute = createRootRoute({
    component: LayoutComponent,
  });

  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => children,
  });

  const routeTree = rootRoute.addChildren([testingRoute]);

  const router = createRouter({ routeTree });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ConfigProvider>
          <SpvWalletProvider>
            <AuthProvider>
              <TooltipProvider>
                <RouterProvider router={router}></RouterProvider>
              </TooltipProvider>
            </AuthProvider>
          </SpvWalletProvider>
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
