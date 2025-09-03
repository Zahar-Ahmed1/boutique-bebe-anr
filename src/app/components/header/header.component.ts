import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/favorites.service';
import { ProductsService, Product } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isSearchOpen = false;
  searchQuery = '';
  favoritesCount = 0;
  cartCount = 0;
  isMobileMenuOpen = false;
  searchResults: Product[] = [];
  isSearching = false;
  private subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    // Vérifier le mode sombre sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // S'abonner au service des favoris
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favoritesCount = favorites.length;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = '';
      this.searchResults = [];
    }
  }

  onSearchInput() {
    if (this.searchQuery.trim().length >= 2) {
      this.isSearching = true;
      this.productsService.searchProducts(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results.slice(0, 5); // Limiter à 5 résultats pour l'aperçu
          this.isSearching = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.isSearching = false;
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  selectSearchResult(product: Product) {
    // Rediriger vers la page du produit ou fermer la recherche
    console.log('Produit sélectionné:', product);
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.isSearching = true;
      this.productsService.searchProducts(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results;
          this.isSearching = false;
          console.log('Résultats de recherche:', results);
          
          // Rediriger vers la page des produits avec les résultats de recherche
          if (results.length > 0) {
            // Vous pouvez rediriger vers une page de résultats ou afficher les résultats ici
            console.log(`${results.length} produits trouvés`);
          } else {
            console.log('Aucun produit trouvé');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.isSearching = false;
        }
      });
    }
  }

  addToCart() {
    this.cartCount++;
  }

  addToFavorites() {
    this.favoritesCount++;
  }
}
