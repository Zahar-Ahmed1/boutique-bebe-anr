import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  badge?: 'new' | 'sale' | 'trending' | 'bestseller';
  originalPrice?: number;
  price: number;
  features: string[];
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  material?: string;
  brand: string;
  ageRange: string;
  isNew?: boolean;
  discount?: number;
  discountPercentage?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  parentId?: string;
  children?: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  
  public products$ = this.productsSubject.asObservable();
  public categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Initialiser les catégories
    const categories: Category[] = [
      {
        id: 'clothing',
        name: 'Vêtements',
        description: 'Vêtements confortables et stylés pour tous les âges',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 45
      },
      {
        id: 'shoes',
        name: 'Chaussures',
        description: 'Chaussures robustes et confortables pour les petits pieds',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 32
      },
      {
        id: 'toys',
        name: 'Jouets',
        description: 'Jouets éducatifs et amusants pour stimuler la créativité',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 28
      },
      {
        id: 'accessories',
        name: 'Accessoires',
        description: 'Accessoires pratiques et élégants pour compléter la tenue',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 23
      },
      {
        id: 'baby-care',
        name: 'Soins Bébé',
        description: 'Produits de soin et d\'hygiène pour les tout-petits',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 19
      }
    ];

    // Initialiser les produits
    const products: Product[] = [
      {
        id: '1',
        name: 'Body Bio Coton 0-3 mois',
        category: 'Vêtements',
        categoryId: 'clothing',
        availability: 'in_stock',
        badge: 'new',
        price: 24.99,
        originalPrice: 29.99,
        features: ['100% coton bio', 'Fermeture pression', 'Douceur garantie', 'Certifié GOTS'],
        rating: 4.8,
        reviewCount: 127,
        description: 'Body en coton bio ultra-doux, parfait pour la peau sensible de votre bébé. Fermeture pression pratique pour les changes fréquents.',
        shortDescription: 'Body bio doux et confortable',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        sizes: ['0-3M', '3-6M', '6-9M'],
        colors: ['Blanc', 'Bleu', 'Rose'],
        material: 'Coton bio',
        brand: 'BabyAnnr',
        ageRange: '0-3 mois',
        isNew: true,
        discount: 5,
        discountPercentage: 17,
        tags: ['bio', 'nouveau', 'coton', 'body'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Pyjama Flanelle Hiver',
        category: 'Vêtements',
        categoryId: 'clothing',
        availability: 'in_stock',
        badge: 'trending',
        price: 39.99,
        originalPrice: 49.99,
        features: ['Flanelle douce', 'Fermeture zip', 'Pieds intégrés', 'Chaud et confortable'],
        rating: 4.6,
        reviewCount: 89,
        description: 'Pyjama en flanelle douce et chaude, parfait pour les nuits d\'hiver. Pieds intégrés et fermeture zip pratique.',
        shortDescription: 'Pyjama chaud et confortable',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        sizes: ['12M', '18M', '24M', '2T'],
        colors: ['Bleu marine', 'Rouge', 'Vert'],
        material: 'Flanelle 100% coton',
        brand: 'BabyAnnr',
        ageRange: '12-24 mois',
        discount: 10,
        discountPercentage: 20,
        tags: ['pyjama', 'hiver', 'flanelle', 'chaud'],
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'Chaussures Bébé Premiers Pas',
        category: 'Chaussures',
        categoryId: 'shoes',
        availability: 'low_stock',
        badge: 'bestseller',
        price: 34.99,
        features: ['Semelle souple', 'Cuir véritable', 'Fermeture velcro', 'Confort optimal'],
        rating: 4.9,
        reviewCount: 203,
        description: 'Chaussures parfaites pour les premiers pas de votre bébé. Semelle souple et cuir véritable pour un confort optimal.',
        shortDescription: 'Chaussures pour premiers pas',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        sizes: ['18', '19', '20', '21'],
        colors: ['Blanc', 'Marron', 'Rose'],
        material: 'Cuir véritable',
        brand: 'BabyAnnr',
        ageRange: '12-18 mois',
        tags: ['chaussures', 'premiers pas', 'cuir', 'confort'],
        createdAt: new Date('2023-09-10'),
        updatedAt: new Date('2024-01-05')
      },
      {
        id: '4',
        name: 'Jouet Éducatif Puzzle Bois',
        category: 'Jouets',
        categoryId: 'toys',
        availability: 'in_stock',
        badge: 'sale',
        price: 19.99,
        originalPrice: 24.99,
        features: ['Bois massif', 'Éducatif', 'Sans danger', 'Développe la motricité'],
        rating: 4.7,
        reviewCount: 156,
        description: 'Puzzle en bois massif pour développer la motricité fine et la logique de votre enfant. Peinture non-toxique.',
        shortDescription: 'Puzzle éducatif en bois',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        material: 'Bois massif',
        brand: 'BabyAnnr',
        ageRange: '18-36 mois',
        discount: 5,
        discountPercentage: 20,
        tags: ['jouet', 'éducatif', 'bois', 'puzzle'],
        createdAt: new Date('2023-08-15'),
        updatedAt: new Date('2024-01-12')
      },
      {
        id: '5',
        name: 'Bonnet Tricoté Laine',
        category: 'Accessoires',
        categoryId: 'accessories',
        availability: 'in_stock',
        price: 18.99,
        features: ['Laine naturelle', 'Tricoté main', 'Élastique doux', 'Protection optimale'],
        rating: 4.5,
        reviewCount: 78,
        description: 'Bonnet tricoté main en laine naturelle pour protéger la tête de votre bébé du froid. Élastique doux et confortable.',
        shortDescription: 'Bonnet laine tricoté main',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        sizes: ['0-3M', '3-6M', '6-12M'],
        colors: ['Gris', 'Bleu', 'Rose', 'Blanc'],
        material: 'Laine naturelle',
        brand: 'BabyAnnr',
        ageRange: '0-12 mois',
        tags: ['bonnet', 'laine', 'tricoté', 'hiver'],
        createdAt: new Date('2023-10-05'),
        updatedAt: new Date('2024-01-08')
      },
      {
        id: '6',
        name: 'Lait Hydratant Corps',
        category: 'Soins Bébé',
        categoryId: 'baby-care',
        availability: 'in_stock',
        badge: 'new',
        price: 14.99,
        features: ['Bio et naturel', 'Sans paraben', 'Hydratation longue durée', 'Testé dermatologiquement'],
        rating: 4.8,
        reviewCount: 92,
        description: 'Lait hydratant bio pour le corps de votre bébé. Formule douce et naturelle, sans paraben ni parfum.',
        shortDescription: 'Lait hydratant bio corps',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        material: 'Ingrédients bio',
        brand: 'BabyAnnr',
        ageRange: '0+ mois',
        isNew: true,
        tags: ['soin', 'bio', 'hydratant', 'corps'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '7',
        name: 'Gigoteuse 4 Saisons Premium',
        category: 'Vêtements',
        categoryId: 'clothing',
        availability: 'in_stock',
        badge: 'bestseller',
        price: 49.99,
        features: ['4 saisons', 'Tissu respirant', 'Fermeture éclair', 'Lavable machine'],
        rating: 4.9,
        reviewCount: 187,
        description: 'Gigoteuse premium 4 saisons pour un sommeil confortable de votre bébé. Tissu respirant et fermeture éclair pratique.',
        shortDescription: 'Gigoteuse premium 4 saisons',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
        colors: ['Bleu ciel', 'Rose poudré', 'Vert menthe'],
        material: 'Coton bio + mousse',
        brand: 'BabyAnnr',
        ageRange: '0-12 mois',
        tags: ['gigoteuse', '4 saisons', 'premium', 'sommeil'],
        createdAt: new Date('2023-07-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '8',
        name: 'ahmed',
        category: 'Vêtements',
        categoryId: 'clothing',
        availability: 'in_stock',
        badge: 'new',
        price: 49.99,
        features: ['4 saisons', 'Tissu respirant', 'Fermeture éclair', 'Lavable machine'],
        rating: 4.9,
        reviewCount: 187,
        description: 'Gigoteuse premium 4 saisons pour un sommeil confortable de votre bébé. Tissu respirant et fermeture éclair pratique.',
        shortDescription: 'Gigoteuse premium 4 saisons',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
        colors: ['Bleu ciel', 'Rose poudré', 'Vert menthe'],
        material: 'Coton bio + mousse',
        brand: 'BabyAnnr',
        ageRange: '0-12 mois',
        tags: ['gigoteuse', '4 saisons', 'premium', 'sommeil'],
        createdAt: new Date('2023-07-15'),
        updatedAt: new Date('2024-01-15')
      }
    ];

    this.categoriesSubject.next(categories);
    this.productsSubject.next(products);
  }

  // Méthodes pour les produits
  getAllProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const filtered = products.filter(p => p.categoryId === categoryId);
        observer.next(filtered);
      });
    });
  }

  getProductById(id: string): Observable<Product | undefined> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const product = products.find(p => p.id === id);
        observer.next(product);
      });
    });
  }

  getBestsellerProducts(limit: number = 6): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const bestsellers = products
          .filter(p => p.badge === 'bestseller' || p.rating >= 4.5)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, limit);
        observer.next(bestsellers);
      });
    });
  }

  getNewProducts(limit: number = 6): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const newProducts = products
          .filter(p => p.isNew || p.badge === 'new')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit);
        observer.next(newProducts);
      });
    });
  }

  getSaleProducts(limit: number = 6): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const saleProducts = products
          .filter(p => p.discount && p.discount > 0)
          .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
          .slice(0, limit);
        observer.next(saleProducts);
      });
    });
  }

  searchProducts(query: string): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const searchTerm = query.toLowerCase();
        const results = products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        observer.next(results);
      });
    });
  }

  filterProducts(filters: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    availability?: string;
    badge?: string;
    ageRange?: string;
    brand?: string;
    material?: string;
  }): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        let filtered = products;

        if (filters.category) {
          filtered = filtered.filter(p => p.categoryId === filters.category);
        }

        if (filters.priceMin !== undefined) {
          filtered = filtered.filter(p => p.price >= filters.priceMin!);
        }

        if (filters.priceMax !== undefined) {
          filtered = filtered.filter(p => p.price <= filters.priceMax!);
        }

        if (filters.rating) {
          filtered = filtered.filter(p => p.rating >= filters.rating!);
        }

        if (filters.availability) {
          filtered = filtered.filter(p => p.availability === filters.availability);
        }

        if (filters.badge) {
          filtered = filtered.filter(p => p.badge === filters.badge);
        }

        if (filters.ageRange) {
          filtered = filtered.filter(p => p.ageRange === filters.ageRange);
        }

        if (filters.brand) {
          filtered = filtered.filter(p => p.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
        }

        if (filters.material) {
          filtered = filtered.filter(p => p.material?.toLowerCase().includes(filters.material!.toLowerCase()));
        }

        observer.next(filtered);
      });
    });
  }

  // Méthodes pour les catégories
  getAllCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return new Observable(observer => {
      this.categories$.subscribe(categories => {
        const category = categories.find(c => c.id === id);
        observer.next(category);
      });
    });
  }

  getCategoryProducts(categoryId: string): Observable<Product[]> {
    return this.getProductsByCategory(categoryId);
  }

  // Méthodes utilitaires
  getPriceRange(): Observable<{ min: number; max: number }> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const prices = products.map(p => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        observer.next({ min, max });
      });
    });
  }

  getAvailableBrands(): Observable<string[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const brands = [...new Set(products.map(p => p.brand))];
        observer.next(brands.sort());
      });
    });
  }

  getAvailableMaterials(): Observable<string[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const materials = [...new Set(products.filter(p => p.material).map(p => p.material!))];
        observer.next(materials.sort());
      });
    });
  }

  getAvailableAgeRanges(): Observable<string[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const ageRanges = [...new Set(products.map(p => p.ageRange))];
        observer.next(ageRanges.sort());
      });
    });
  }
}
