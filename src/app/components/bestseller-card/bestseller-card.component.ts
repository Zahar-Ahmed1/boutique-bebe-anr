import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { ProductsService, Product } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bestseller-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './bestseller-card.component.html',
  styleUrls: ['./bestseller-card.component.css']
})
export class BestsellerCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() cardClass: string = '';
  
  isFavorite = false;
  isInCart = false;
  private subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.isFavorite = favorites.some(fav => fav.id === this.product.id);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get discountPercentage(): number {
    if (this.product.originalPrice && this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  getAvailabilityText(): string {
    switch (this.product.availability) {
      case 'in_stock':
        return 'En stock';
      case 'low_stock':
        return 'Stock limité';
      case 'out_of_stock':
        return 'Rupture de stock';
      default:
        return 'Disponibilité inconnue';
    }
  }

  getAvailabilityClass(): string {
    switch (this.product.availability) {
      case 'in_stock':
        return 'availability-in-stock';
      case 'low_stock':
        return 'availability-low-stock';
      case 'out_of_stock':
        return 'availability-out-of-stock';
      default:
        return '';
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.removeFromFavorites(this.product.id);
    } else {
      this.favoritesService.addToFavorites(this.product);
    }
  }

  addToCart() {
    this.isInCart = true;
    // Ici vous pourriez ajouter la logique pour ajouter au panier
    setTimeout(() => {
      this.isInCart = false;
    }, 2000);
  }
}
