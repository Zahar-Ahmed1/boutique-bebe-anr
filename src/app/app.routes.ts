import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./page/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./page/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./page/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./page/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./page/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'produit/:id',
    loadComponent: () => import('./page/productdetailles/productdetailles.component').then(m => m.ProductdetaillesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
