// Import styles, initialize component theme here.
import '../src/index.css';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, SpvWalletProvider, ThemeProvider } from '../src/contexts';
import { ConfigProvider } from '@4chain-ag/react-configuration';
import { TooltipProvider } from '../src/components';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { LayoutComponent } from '../src/routes/admin/_admin';


// Use the routerContext to create your root route
const rootRoute = createRootRoute({
  component: LayoutComponent,
});

beforeMount(async ({ App: TestingElement }) => {
  const queryClient = new QueryClient();

  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <TestingElement />,
  });

  const routeTree = rootRoute.addChildren([testingRoute]);

  const router = createRouter({
    routeTree,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ConfigProvider>
          <SpvWalletProvider>
            <AuthProvider>
              <TooltipProvider>
                <RouterProvider router={router} />
              </TooltipProvider>
            </AuthProvider>
          </SpvWalletProvider>
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
});
