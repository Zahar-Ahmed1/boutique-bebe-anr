import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, catchError, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
    this.initializeData();
  }

  private initializeData(): void {
    // Initialiser les catégories (keeping hardcoded for now)
    const categories: Category[] = [
      {
        id: 'clothing',
        name: 'Vêtements',
        description: 'Vêtements confortables et stylés pour tous les âges',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 45
      },
      {
        id: 'feeding',
        name: 'Alimentation',
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
        id: 'hygiene',
        name: 'Hygiène',
        description: 'Produits de soin et d\'hygiène pour les tout-petits',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 19
      },
      {
        id: 'furniture',
        name: 'Mobilier',
        description: 'Produits de soin et d\'hygiène pour les tout-petits',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        productCount: 19
      }

    ];

    // Set initial categories
    this.categoriesSubject.next(categories);

    // Fetch products from API
    this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching products from API:', error);
          // Fallback to empty array if API call fails
          return of([]);
        })
      )
      .subscribe(products => {
        this.productsSubject.next(products);
      });
  }

  // Méthodes pour les produits
  getAllProducts(): Observable<Product[]> {
    // Direct API call to get all products
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all products:', error);
        // Fallback to cached data if API call fails
        return this.products$;
      }),
      tap(products => {
        // Update the cached data
        this.productsSubject.next(products);
      })
    );
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    // API call to get products by category
    return this.http.get<Product[]>(`${this.apiUrl}/categoryId/${categoryId}`).pipe(
      catchError(error => {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        // Fallback to cached data if API call fails
        return this.products$.pipe(
          map(products => products.filter(p => p.categoryId === categoryId))
        );
      })
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    // API call to get product by ID
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching product with ID ${id}:`, error);
        // Fallback to cached data if API call fails
        return this.products$.pipe(
          map(products => products.find(p => p.id === id))
        );
      })
    );
  }

  getBestsellerProducts(limit: number = 6): Observable<Product[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        return products
          .filter(p => p.badge === 'bestseller' || p.rating >= 4.5)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, limit);
      }),
      catchError(error => {
        console.error('Error getting bestseller products:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            return products
              .filter(p => p.badge === 'bestseller' || p.rating >= 4.5)
              .sort((a, b) => b.rating - a.rating)
              .slice(0, limit);
          })
        );
      })
    );
  }

  getNewProducts(limit: number = 6): Observable<Product[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        return products
          .filter(p => p.isNew || p.badge === 'new')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit);
      }),
      catchError(error => {
        console.error('Error getting new products:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            return products
              .filter(p => p.isNew || p.badge === 'new')
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, limit);
          })
        );
      })
    );
  }

  getSaleProducts(limit: number = 6): Observable<Product[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        return products
          .filter(p => p.discount && p.discount > 0)
          .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
          .slice(0, limit);
      }),
      catchError(error => {
        console.error('Error getting sale products:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            return products
              .filter(p => p.discount && p.discount > 0)
              .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
              .slice(0, limit);
          })
        );
      })
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        const searchTerm = query.toLowerCase();
        return products.filter(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }),
      catchError(error => {
        console.error('Error searching products:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            const searchTerm = query.toLowerCase();
            return products.filter(p =>
              p.name.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm) ||
              p.category.toLowerCase().includes(searchTerm) ||
              p.brand.toLowerCase().includes(searchTerm) ||
              p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
          })
        );
      })
    );
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
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
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

        return filtered;
      }),
      catchError(error => {
        console.error('Error filtering products:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
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

            return filtered;
          })
        );
      })
    );
  }

  // Méthodes pour les catégories
  getAllCategories(): Observable<Category[]> {
    // For now, we're using the cached categories since there's no API endpoint for categories
    return this.categories$;
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    // For now, we're using the cached categories since there's no API endpoint for categories
    return this.categories$.pipe(
      map(categories => categories.find(c => c.id === id))
    );
  }

  getCategoryProducts(categoryId: string): Observable<Product[]> {
    // This already uses the API through getProductsByCategory
    return this.getProductsByCategory(categoryId);
  }

  // Méthodes utilitaires
  getPriceRange(): Observable<{ min: number; max: number }> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        const prices = products.map(p => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return { min, max };
      }),
      catchError(error => {
        console.error('Error getting price range:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            const prices = products.map(p => p.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            return { min, max };
          })
        );
      })
    );
  }

  getAvailableBrands(): Observable<string[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        const brands = [...new Set(products.map(p => p.brand))];
        return brands.sort();
      }),
      catchError(error => {
        console.error('Error getting available brands:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            const brands = [...new Set(products.map(p => p.brand))];
            return brands.sort();
          })
        );
      })
    );
  }

  getAvailableMaterials(): Observable<string[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        const materials = [...new Set(products.filter(p => p.material).map(p => p.material!))];
        return materials.sort();
      }),
      catchError(error => {
        console.error('Error getting available materials:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            const materials = [...new Set(products.filter(p => p.material).map(p => p.material!))];
            return materials.sort();
          })
        );
      })
    );
  }

  getAvailableAgeRanges(): Observable<string[]> {
    // Use getAllProducts to get fresh data from API
    return this.getAllProducts().pipe(
      map(products => {
        const ageRanges = [...new Set(products.map(p => p.ageRange))];
        return ageRanges.sort();
      }),
      catchError(error => {
        console.error('Error getting available age ranges:', error);
        // Fallback to cached data
        return this.products$.pipe(
          map(products => {
            const ageRanges = [...new Set(products.map(p => p.ageRange))];
            return ageRanges.sort();
          })
        );
      })
    );
  }
}
