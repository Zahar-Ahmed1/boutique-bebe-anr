import { Component } from '@angular/core';
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
export class ProductsComponent {
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

  // Prix maximum disponible dans les produits
  get maxProductPrice(): number {
    return Math.max(...this.allProducts.map(p => p.price));
  }

  // Prix minimum disponible dans les produits
  get minProductPrice(): number {
    return Math.min(...this.allProducts.map(p => p.price));
  }

  ngOnInit() {
    // Initialiser les filtres de prix avec les vraies valeurs des produits
    this.priceRange = {
      min: this.minProductPrice,
      max: this.maxProductPrice
    };
  }

  categories: Category[] = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'clothing', name: 'Vêtements' },
    { id: 'toys', name: 'Jouets' },
    { id: 'shoes', name: 'Chaussures' },
    { id: 'accessories', name: 'Accessoires' },
    { id: 'books', name: 'Livres' }
  ];

  // Options de filtrage
  ageRanges = ['0-6 mois', '6-12 mois', '12-24 mois', '2-4 ans', '4-6 ans', '6-8 ans', '8-12 ans'];
  brands = ['BabyAnnr', 'Petit Bateau', 'Okaidi', 'Du Pareil au Même', 'Kiabi', 'H&M Kids'];
  colors = ['Blanc', 'Noir', 'Bleu', 'Rouge', 'Vert', 'Jaune', 'Rose', 'Gris', 'Multicolore'];
  sizes = ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M', '2A', '3A', '4A', '5A', '6A'];
  materials = ['Coton', 'Laine', 'Lin', 'Polyester', 'Bois', 'Plastique', 'Métal'];

  allProducts: Product[] = [
    {
      id: '1',
      name: 'Body en coton bio pour bébé',
      category: 'Vêtements',
      categoryId: 'clothing',
      availability: 'in_stock',
      price: 15.99,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      rating: 4.8,
      reviewCount: 127,
      description: 'Body en coton bio ultra-doux, parfait pour la peau sensible de votre bébé.',
      shortDescription: 'Body bio doux et confortable',
      features: ['100% coton bio', 'Fermeture pression', 'Douceur garantie'],
      isNew: true,
      discount: 20,
      brand: 'BabyAnnr',
      ageRange: '0-6 mois',
      colors: ['Blanc'],
      sizes: ['0-3M'],
      material: 'Coton',
      tags: ['bio', 'nouveau', 'coton', 'body'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Jouet éducatif en bois',
      category: 'Jouets',
      categoryId: 'toys',
      availability: 'in_stock',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      rating: 4.6,
      reviewCount: 89,
      description: 'Jouet éducatif en bois pour stimuler la créativité de votre enfant.',
      shortDescription: 'Jouet éducatif en bois',
      features: ['Bois massif', 'Éducatif', 'Sans danger'],
      discount: 17,
      brand: 'BabyAnnr',
      ageRange: '12-24 mois',
      colors: ['Multicolore'],
      material: 'Bois',
      tags: ['jouet', 'éducatif', 'bois'],
      createdAt: new Date('2023-09-10'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '3',
      name: 'Chaussures de marche confortables',
      category: 'Chaussures',
      categoryId: 'shoes',
      availability: 'in_stock',
      price: 39.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      rating: 4.7,
      reviewCount: 156,
      description: 'Chaussures parfaites pour les premiers pas de votre bébé.',
      shortDescription: 'Chaussures pour premiers pas',
      features: ['Semelle souple', 'Cuir véritable', 'Fermeture velcro'],
      discount: 20,
      brand: 'Petit Bateau',
      ageRange: '12-24 mois',
      colors: ['Bleu'],
      sizes: ['18-24M'],
      material: 'Cuir',
      tags: ['chaussures', 'premiers pas', 'cuir'],
      createdAt: new Date('2023-08-15'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '4',
      name: 'Casquette de soleil pour enfant',
      category: 'Accessoires',
      categoryId: 'accessories',
      availability: 'out_of_stock',
      price: 12.99,
      originalPrice: 16.99,
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      rating: 4.5,
      reviewCount: 78,
      description: 'Casquette de soleil pour protéger votre enfant du soleil.',
      shortDescription: 'Casquette de soleil',
      features: ['Protection UV', 'Ajustable', 'Léger'],
      discount: 24,
      brand: 'Okaidi',
      ageRange: '2-4 ans',
      colors: ['Rouge'],
      sizes: ['2A'],
      material: 'Coton',
      tags: ['casquette', 'soleil', 'protection'],
      createdAt: new Date('2023-10-05'),
      updatedAt: new Date('2024-01-08')
    },
    {
      id: '5',
      name: 'Livre d\'histoires interactif',
      category: 'Livres',
      categoryId: 'books',
      availability: 'in_stock',
      price: 18.99,
      originalPrice: 22.99,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      rating: 4.9,
      reviewCount: 203,
      description: 'Livre interactif pour stimuler l\'imagination de votre enfant.',
      shortDescription: 'Livre interactif',
      features: ['Interactif', 'Éducatif', 'Durable'],
      isNew: true,
      discount: 17,
      brand: 'BabyAnnr',
      ageRange: '2-4 ans',
      colors: ['Multicolore'],
      material: 'Papier',
      tags: ['livre', 'interactif', 'éducatif'],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '6',
      name: 'Pyjama en flanelle douce',
      category: 'Vêtements',
      categoryId: 'clothing',
      availability: 'in_stock',
      price: 22.99,
      originalPrice: 27.99,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      rating: 4.4,
      reviewCount: 92,
      description: 'Pyjama en flanelle douce et chaude pour les nuits d\'hiver.',
      shortDescription: 'Pyjama flanelle douce',
      features: ['Flanelle douce', 'Chaud', 'Confortable'],
      discount: 18,
      brand: 'Kiabi',
      ageRange: '6-12 mois',
      colors: ['Bleu'],
      sizes: ['6-9M'],
      material: 'Coton',
      tags: ['pyjama', 'flanelle', 'hiver'],
      createdAt: new Date('2023-11-20'),
      updatedAt: new Date('2024-01-10')
    }
  ];

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
    this.priceRange = { min: 0, max: 100 };
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
    this.priceRange = {
      min: this.minProductPrice,
      max: this.maxProductPrice
    };
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
