import { useAuth, useSpvWalletClient } from '@/contexts';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/main.tsx';

function InnerApp() {
  const auth = useAuth();
  const spvWallet = useSpvWalletClient();

  return <RouterProvider router={router} context={{ auth, spvWallet }} />;
}

function App() {
  return <InnerApp />;
}

export default App;
