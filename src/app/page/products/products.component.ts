import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BestsellerCardComponent } from '../../components/bestseller-card/bestseller-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsService, Product } from '../../services/products.service';

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BestsellerCardComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedCategory: string = 'all';
  searchQuery: string = '';

  // Filtres avancés
  priceRange = { min: 0, max: 100 };
  selectedRating = 0;
  selectedAgeRange = '';
  selectedBrand = '';
  selectedColor = '';
  selectedSize = '';
  selectedMaterial = '';
  inStockOnly = false;
  showNewOnly = false;
  showDiscountOnly = false;

  // État des filtres
  isFilterPanelOpen = true;
  isMobileFilterOpen = false;

  // Données des produits et catégories
  allProducts: Product[] = [];

  // Prix maximum disponible dans les produits
  get maxProductPrice(): number {
    if (this.allProducts.length === 0) return 100;
    return Math.max(...this.allProducts.map(p => p.price));
  }

  // Prix minimum disponible dans les produits
  get minProductPrice(): number {
    if (this.allProducts.length === 0) return 0;
    return Math.min(...this.allProducts.map(p => p.price));
  }

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // Charger les produits depuis le service
    this.productsService.getAllProducts().subscribe(products => {
      this.allProducts = products;

      // Initialiser les filtres de prix avec les vraies valeurs des produits
      this.priceRange = {
        min: this.minProductPrice,
        max: this.maxProductPrice
      };
    });

    // Charger les catégories depuis le service
    this.productsService.getAllCategories().subscribe(categories => {
      // Ajouter l'option "Tous les produits" au début
      this.categories = [
        { id: 'all', name: 'Tous les produits' },
        ...categories.map(c => ({ id: c.id, name: c.name }))
      ];
    });

    // Charger les tranches d'âge disponibles
    this.productsService.getAvailableAgeRanges().subscribe(ageRanges => {
      this.ageRanges = ageRanges;
    });

    // Charger les marques disponibles
    this.productsService.getAvailableBrands().subscribe(brands => {
      this.brands = brands;
    });

    // Charger les matériaux disponibles
    this.productsService.getAvailableMaterials().subscribe(materials => {
      this.materials = materials;
    });
  }

  // Données des catégories et options de filtrage
  categories: Category[] = [];
  ageRanges: string[] = [];
  brands: string[] = [];
  colors: string[] = ['Blanc', 'Noir', 'Bleu', 'Rouge', 'Vert', 'Jaune', 'Rose', 'Gris', 'Multicolore'];
  sizes: string[] = ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M', '2A', '3A', '4A', '5A', '6A'];
  materials: string[] = [];

  get filteredProducts(): Product[] {
    return this.allProducts.filter(product => {
      // Filtre par catégorie
      if (this.selectedCategory !== 'all' && product.categoryId !== this.selectedCategory) {
        return false;
      }

      // Filtre par recherche
      if (this.searchQuery.trim() && !product.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }

      // Filtre par prix
      if (product.price < this.priceRange.min || product.price > this.priceRange.max) {
        return false;
      }

      // Filtre par note
      if (this.selectedRating > 0 && product.rating < this.selectedRating) {
        return false;
      }

      // Filtre par tranche d'âge
      if (this.selectedAgeRange && product.ageRange !== this.selectedAgeRange) {
        return false;
      }

      // Filtre par marque
      if (this.selectedBrand && product.brand !== this.selectedBrand) {
        return false;
      }

      // Filtre par couleur
      if (this.selectedColor && !product.colors?.includes(this.selectedColor)) {
        return false;
      }

      // Filtre par taille
      if (this.selectedSize && !product.sizes?.includes(this.selectedSize)) {
        return false;
      }

      // Filtre par matériau
      if (this.selectedMaterial && product.material !== this.selectedMaterial) {
        return false;
      }

      // Filtre par stock
      if (this.inStockOnly && product.availability !== 'in_stock') {
        return false;
      }

      // Filtre par nouveauté
      if (this.showNewOnly && !product.isNew) {
        return false;
      }

      // Filtre par réduction
      if (this.showDiscountOnly && !product.discount) {
        return false;
      }

      return true;
    });
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.selectedCategory !== 'all') count++;
    if (this.searchQuery.trim()) count++;
    if (this.priceRange.min > 0 || this.priceRange.max < 100) count++;
    if (this.selectedRating > 0) count++;
    if (this.selectedAgeRange) count++;
    if (this.selectedBrand) count++;
    if (this.selectedColor) count++;
    if (this.selectedSize) count++;
    if (this.selectedMaterial) count++;
    if (this.inStockOnly) count++;
    if (this.showNewOnly) count++;
    if (this.showDiscountOnly) count++;
    return count;
  }

  onSearch() {
    // La recherche se fait automatiquement via le getter filteredProducts
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.name || '';
  }

  clearAllFilters() {
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.resetPriceRange();
    this.selectedRating = 0;
    this.selectedAgeRange = '';
    this.selectedBrand = '';
    this.selectedColor = '';
    this.selectedSize = '';
    this.selectedMaterial = '';
    this.inStockOnly = false;
    this.showNewOnly = false;
    this.showDiscountOnly = false;
  }

  resetPriceRange() {
    this.productsService.getPriceRange().subscribe(range => {
      this.priceRange = {
        min: range.min,
        max: range.max
      };
    });
  }

  toggleFilterPanel() {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  toggleMobileFilter() {
    this.isMobileFilterOpen = !this.isMobileFilterOpen;
  }

  getColorValue(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'Blanc': '#FFFFFF',
      'Noir': '#000000',
      'Bleu': '#3B82F6',
      'Rouge': '#EF4444',
      'Vert': '#10B981',
      'Jaune': '#F59E0B',
      'Rose': '#EC4899',
      'Gris': '#6B7280',
      'Multicolore': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)'
    };
    return colorMap[colorName] || '#6B7280';
  }
}
