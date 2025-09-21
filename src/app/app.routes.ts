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
    path: 'product/:id',
    loadComponent: () => import('./page/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
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
    path: 'blog',
    loadComponent: () => import('./page/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./page/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
