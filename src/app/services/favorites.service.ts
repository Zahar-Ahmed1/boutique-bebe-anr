import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  discount?: number;
  addedToFavorites: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'favoriteProducts';
  private favoritesSubject = new BehaviorSubject<FavoriteProduct[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem(this.favoritesKey);
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      // Convertir les dates string en objets Date
      favorites.forEach((favorite: any) => {
        favorite.addedToFavorites = new Date(favorite.addedToFavorites);
      });
      this.favoritesSubject.next(favorites);
    }
  }

  private saveFavorites(favorites: FavoriteProduct[]): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): FavoriteProduct[] {
    return this.favoritesSubject.value;
  }

  addToFavorites(product: any): void {
    const currentFavorites = this.getFavorites();
    
    // Vérifier si le produit n'est pas déjà dans les favoris
    if (!currentFavorites.find(fav => fav.id === product.id)) {
      const favoriteProduct: FavoriteProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
        isNew: product.isNew,
        discount: product.discount,
        addedToFavorites: new Date()
      };
      
      const newFavorites = [...currentFavorites, favoriteProduct];
      this.saveFavorites(newFavorites);
    }
  }

  removeFromFavorites(productId: string): void {
    const currentFavorites = this.getFavorites();
    const newFavorites = currentFavorites.filter(fav => fav.id !== productId);
    this.saveFavorites(newFavorites);
  }

  isFavorite(productId: string): boolean {
    return this.getFavorites().some(fav => fav.id === productId);
  }

  clearAllFavorites(): void {
    this.saveFavorites([]);
  }

  getFavoritesCount(): number {
    return this.getFavorites().length;
  }

  getTotalPrice(): number {
    return this.getFavorites().reduce((total, product) => total + product.price, 0);
  }

  getTotalSavings(): number {
    return this.getFavorites().reduce((total, product) => {
      if (product.originalPrice) {
        return total + (product.originalPrice - product.price);
      }
      return total;
    }, 0);
  }
}
