import { Outlet, createFileRoute, Link, useLocation, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAdmin) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: LayoutComponent,
});

import {
  Home,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
  UserRound,
  KeyRound,
  KeySquare,
  Route as RouteIcon,
  Mail,
  ArrowLeftRight,
  Binary,
  UsersRound,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

function LayoutComponent() {
  const [route, setRoute] = useState<string>('/xpub');
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
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to="/xpub"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">SPV Wallet</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/xpub"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/xpub')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/access-keys')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/destinations')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <RouteIcon className="h-5 w-5" />
                  <span className="sr-only">Destinations</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Destinations</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/paymails')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/transactions')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/utxos')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Binary className="h-5 w-5" />
                  <span className="sr-only">Utxos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Utxos</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center ${highlightRoute('/contacts')} text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <UsersRound className="h-5 w-5" />
                  <span className="sr-only">Contacts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Contacts</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <h1>SPV Wallet Admin</h1>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">SPV Wallet</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Home className="h-5 w-5" />
                    XPub
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <ShoppingCart className="h-5 w-5" />
                    Access Keys
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground">
                    <Package className="h-5 w-5" />
                    Destinations
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Users2 className="h-5 w-5" />
                    Paymails
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Users2 className="h-5 w-5" />
                    Transactions
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Users2 className="h-5 w-5" />
                    Utxos
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Users2 className="h-5 w-5" />
                    Contacts
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <UserRound />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
      <h1>Layout</h1>
    </div>
  );
}