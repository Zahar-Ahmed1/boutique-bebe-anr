import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FavoritesService, FavoriteProduct } from '../../services/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteProducts: FavoriteProduct[] = [];
  isDarkMode = false;
  private subscription = new Subscription();

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.checkDarkMode();
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favoriteProducts = favorites;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFromFavorites(productId: string) {
    this.favoritesService.removeFromFavorites(productId);
  }

  clearAllFavorites() {
    this.favoritesService.clearAllFavorites();
  }

  getTotalPrice(): number {
    return this.favoritesService.getTotalPrice();
  }

  getTotalSavings(): number {
    return this.favoritesService.getTotalSavings();
  }

  checkDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  getFavoriteProductsCount(): number {
    return this.favoritesService.getFavoritesCount();
  }
}
