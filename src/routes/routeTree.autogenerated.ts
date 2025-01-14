/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './__root'
import { Route as LoginImport } from './login'
import { Route as IndexImport } from './index'
import { Route as UserUserImport } from './user/_user'
import { Route as AdminAdminImport } from './admin/_admin'
import { Route as UserUserXpubImport } from './user/_user.xpub'
import { Route as UserUserTransactionsImport } from './user/_user.transactions'
import { Route as UserUserAccessKeysImport } from './user/_user.access-keys'
import { Route as AdminAdminXpubImport } from './admin/_admin.xpub'
import { Route as AdminAdminWebhooksImport } from './admin/_admin.webhooks'
import { Route as AdminAdminTransactionsImport } from './admin/_admin.transactions'
import { Route as AdminAdminPaymailsImport } from './admin/_admin.paymails'
import { Route as AdminAdminContactsImport } from './admin/_admin.contacts'
import { Route as AdminAdminAccessKeysImport } from './admin/_admin.access-keys'

// Create Virtual Routes

const UserImport = createFileRoute('/user')()
const AdminImport = createFileRoute('/admin')()
const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const UserRoute = UserImport.update({
  path: '/user',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./about.lazy').then((d) => d.Route))

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserUserRoute = UserUserImport.update({
  id: '/_user',
  getParentRoute: () => UserRoute,
} as any)

const AdminAdminRoute = AdminAdminImport.update({
  id: '/_admin',
  getParentRoute: () => AdminRoute,
} as any)

const UserUserXpubRoute = UserUserXpubImport.update({
  path: '/xpub',
  getParentRoute: () => UserUserRoute,
} as any)

const UserUserTransactionsRoute = UserUserTransactionsImport.update({
  path: '/transactions',
  getParentRoute: () => UserUserRoute,
} as any)

const UserUserAccessKeysRoute = UserUserAccessKeysImport.update({
  path: '/access-keys',
  getParentRoute: () => UserUserRoute,
} as any)

const AdminAdminXpubRoute = AdminAdminXpubImport.update({
  path: '/xpub',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminWebhooksRoute = AdminAdminWebhooksImport.update({
  path: '/webhooks',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminTransactionsRoute = AdminAdminTransactionsImport.update({
  path: '/transactions',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminPaymailsRoute = AdminAdminPaymailsImport.update({
  path: '/paymails',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminContactsRoute = AdminAdminContactsImport.update({
  path: '/contacts',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminAccessKeysRoute = AdminAdminAccessKeysImport.update({
  path: '/access-keys',
  getParentRoute: () => AdminAdminRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/_admin': {
      id: '/admin/_admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAdminImport
      parentRoute: typeof AdminRoute
    }
    '/user': {
      id: '/user'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/user/_user': {
      id: '/user/_user'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserUserImport
      parentRoute: typeof UserRoute
    }
    '/admin/_admin/access-keys': {
      id: '/admin/_admin/access-keys'
      path: '/access-keys'
      fullPath: '/admin/access-keys'
      preLoaderRoute: typeof AdminAdminAccessKeysImport
      parentRoute: typeof AdminAdminImport
    }
    '/admin/_admin/contacts': {
      id: '/admin/_admin/contacts'
      path: '/contacts'
      fullPath: '/admin/contacts'
      preLoaderRoute: typeof AdminAdminContactsImport
      parentRoute: typeof AdminAdminImport
    }
    '/admin/_admin/paymails': {
      id: '/admin/_admin/paymails'
      path: '/paymails'
      fullPath: '/admin/paymails'
      preLoaderRoute: typeof AdminAdminPaymailsImport
      parentRoute: typeof AdminAdminImport
    }
    '/admin/_admin/transactions': {
      id: '/admin/_admin/transactions'
      path: '/transactions'
      fullPath: '/admin/transactions'
      preLoaderRoute: typeof AdminAdminTransactionsImport
      parentRoute: typeof AdminAdminImport
    }
    '/admin/_admin/webhooks': {
      id: '/admin/_admin/webhooks'
      path: '/webhooks'
      fullPath: '/admin/webhooks'
      preLoaderRoute: typeof AdminAdminWebhooksImport
      parentRoute: typeof AdminAdminImport
    }
    '/admin/_admin/xpub': {
      id: '/admin/_admin/xpub'
      path: '/xpub'
      fullPath: '/admin/xpub'
      preLoaderRoute: typeof AdminAdminXpubImport
      parentRoute: typeof AdminAdminImport
    }
    '/user/_user/access-keys': {
      id: '/user/_user/access-keys'
      path: '/access-keys'
      fullPath: '/user/access-keys'
      preLoaderRoute: typeof UserUserAccessKeysImport
      parentRoute: typeof UserUserImport
    }
    '/user/_user/transactions': {
      id: '/user/_user/transactions'
      path: '/transactions'
      fullPath: '/user/transactions'
      preLoaderRoute: typeof UserUserTransactionsImport
      parentRoute: typeof UserUserImport
    }
    '/user/_user/xpub': {
      id: '/user/_user/xpub'
      path: '/xpub'
      fullPath: '/user/xpub'
      preLoaderRoute: typeof UserUserXpubImport
      parentRoute: typeof UserUserImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LoginRoute,
  AboutLazyRoute,
  AdminRoute: AdminRoute.addChildren({
    AdminAdminRoute: AdminAdminRoute.addChildren({
      AdminAdminAccessKeysRoute,
      AdminAdminContactsRoute,
      AdminAdminPaymailsRoute,
      AdminAdminTransactionsRoute,
      AdminAdminWebhooksRoute,
      AdminAdminXpubRoute,
    }),
  }),
  UserRoute: UserRoute.addChildren({
    UserUserRoute: UserUserRoute.addChildren({
      UserUserAccessKeysRoute,
      UserUserTransactionsRoute,
      UserUserXpubRoute,
    }),
  }),
})

/* prettier-ignore-end */
