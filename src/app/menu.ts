// src/app/mock-menus.ts
export interface NavigationRoute {
  icon: string;
  page: string;
  path: string;
  moduleId: number;
  pageActions: string;
  isSelected: boolean;
  child?: NavigationRoute[];
  isOpen?: boolean;
}

export interface FavoriteRoute {
  icon: string;
  page: string;
  path: string;
  moduleId: number;
  pageActions: string;
}

// Dummy navigation menu
export const navigationRoutes: NavigationRoute[] = [
  {
    icon: 'dashboard',
    page: 'Dashboard',
    path: '/dashboard',
    moduleId: 1,
    pageActions: 'view,edit',
    isSelected: true,
  },
  {
    icon: 'usergroup-add',
    page: 'Customers',
    path: '/customers',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'shop',
    page: 'Suppliers',
    path: '/suppliers',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'appstore',
    page: 'Products',
    path: '/products',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
    {
    icon: 'shopping-cart',
    page: 'Sale Orders',
    path: '/sale-orders',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
    {
    icon: 'shopping',
    page: 'Purchase Orders',
    path: '/purchase-orders',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'schedule',
    page: 'Installment Ledger',
    path: '/installment-ledger',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'schedule',
    page: 'Installment Collection',
    path: '/installment-collection',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'product',
    page: 'Product Category',
    path: '/product-category',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'read',
    page: 'Installment Rules',
    path: '/installment-rules',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
  {
    icon: 'line-chart',
    page: 'Profit Ledger',
    path: '/profit-ledger',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
    {
    icon: 'calculator',
    page: 'Calculator',
    path: '/calculator',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },
    {
    icon: 'database',
    page: 'Inventory',
    path: '/inventory',
    moduleId: 1,
    pageActions: 'view,edit,delete',
    isSelected: false
  },

];

// Dummy favorites menu
export const favoritesRoutes: FavoriteRoute[] = [
  {
    icon: 'account-book',
    page: 'About',
    path: '/about',
    moduleId: 1,
    pageActions: 'view'
  },
  {
    icon: 'account-book',
    page: 'Test',
    path: '/test',
    moduleId: 4,
    pageActions: 'view,edit'
  }
];
