import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsService, Product } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  isLoading = signal(true);
  selectedImageIndex = signal(0);
  selectedSize = signal<string>('');
  selectedColor = signal<string>('');
  quantity = signal(1);
  showSizeGuide = signal(false);
  showReviews = signal(false);
  isImageZoomed = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  private loadProduct(productId: string): void {
    this.isLoading.set(true);
    this.productsService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        if (product) {
          // Initialiser les valeurs par défaut
          if (product.sizes && product.sizes.length > 0) {
            this.selectedSize.set(product.sizes[0]);
          }
          if (product.colors && product.colors.length > 0) {
            this.selectedColor.set(product.colors[0]);
          }
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement du produit:', error);
        this.isLoading.set(false);
      }
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
    // Reset zoom when changing image
    this.isImageZoomed.set(false);
  }

  toggleImageZoom(): void {
    this.isImageZoomed.set(!this.isImageZoomed());
  }

  selectSize(size: string): void {
    this.selectedSize.set(size);
  }

  selectColor(color: string): void {
    this.selectedColor.set(color);
  }

  updateQuantity(change: number): void {
    const newQuantity = this.quantity() + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity.set(newQuantity);
    }
  }

  addToCart(): void {
    if (this.product) {
      // Logique d'ajout au panier
      console.log('Ajout au panier:', {
        product: this.product,
        size: this.selectedSize(),
        color: this.selectedColor(),
        quantity: this.quantity()
      });
      // Ici vous pouvez ajouter la logique d'ajout au panier
    }
  }

  addToFavorites(): void {
    if (this.product) {
      // Logique d'ajout aux favoris
      console.log('Ajout aux favoris:', this.product);
      // Ici vous pouvez ajouter la logique d'ajout aux favoris
    }
  }

  toggleSizeGuide(): void {
    this.showSizeGuide.set(!this.showSizeGuide());
  }

  toggleReviews(): void {
    this.showReviews.set(!this.showReviews());
  }

  getStarsArray(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  getDiscountPrice(): number {
    if (this.product?.originalPrice && this.product?.discountPercentage) {
      return this.product.originalPrice - (this.product.originalPrice * this.product.discountPercentage / 100);
    }
    return this.product?.price || 0;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  getColorValue(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'Blanc': '#ffffff',
      'Noir': '#000000',
      'Rouge': '#ef4444',
      'Bleu': '#3b82f6',
      'Vert': '#10b981',
      'Rose': '#f472b6',
      'Jaune': '#fbbf24',
      'Gris': '#6b7280',
      'Marron': '#92400e',
      'Bleu ciel': '#0ea5e9',
      'Rose poudré': '#fce7f3',
      'Vert menthe': '#6ee7b7',
      'Bleu marine': '#1e3a8a'
    };
    return colorMap[colorName] || '#e5e7eb';
  }

  getStockText(): string {
    if (!this.product) return '';
    
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
}