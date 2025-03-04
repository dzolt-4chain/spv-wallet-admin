import { Logo, ModeToggle, Profile, Sheet, Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router';
import { ArrowLeftRight, KeyRound, KeySquare, Mail, UsersRound, Webhook } from 'lucide-react';

import { useEffect, useState } from 'react';
import { PageRefreshButton } from '@/components/PageRefreshButton';

export const Route = createFileRoute('/admin/_admin')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAdmin) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  const [route, setRoute] = useState<string>('/admin/xpub');
  const { pathname } = useLocation();

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);

  const highlightRoute = (path: string) => {
    if (path === route) {
      return 'bg-accent text-accent-foreground';
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="/admin/xpub"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
          >
            <Logo className="transition-all group-hover:scale-110" />
            <span className="sr-only">SPV Wallet</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/admin/xpub"
                className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/admin/xpub')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <KeyRound className="h-5 w-5" />
                <span className="sr-only">XPub</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">XPub</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/admin/access-keys"
                className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/admin/access-keys')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <KeySquare className="h-5 w-5" />
                <span className="sr-only">Access Keys</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Access Keys</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/admin/paymails"
                className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/admin/paymails')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Paymails</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Paymails</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/admin/transactions"
                className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/admin/transactions')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <ArrowLeftRight className="h-5 w-5" />
                <span className="sr-only">Transactions</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Transactions</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/admin/contacts"
                className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/admin/contacts')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <UsersRound className="h-5 w-5" />
                <span className="sr-only">Contacts</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Contacts</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/admin/webhooks"
                className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/admin/webhooks')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Webhook className="h-5 w-5" />
                <span className="sr-only">Webhooks</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Webhooks</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <h1>SPV Wallet Admin</h1>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <PageRefreshButton />
            <ModeToggle />
            <Profile />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
