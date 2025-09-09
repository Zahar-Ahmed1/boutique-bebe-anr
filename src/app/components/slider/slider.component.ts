import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  background: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private interval: any;
  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80',
      title: 'Bienvenue chez BabyAnnr',
      subtitle: 'Découvrez notre sélection de produits de qualité pour vos enfants',
      ctaText: 'Voir nos produits',
      ctaLink: '/products',
      background: '#fce4ec' // rose pastel
    },
    {
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2070&q=80',
      title: 'Livraison rapide',
      subtitle: 'Recevez vos commandes en 24-48h partout en France',
      ctaText: 'Commander maintenant',
      ctaLink: '/products',
      background: '#e3f2fd' // bleu pastel
    },
    {
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=2070&q=80',
      title: 'Qualité garantie',
      subtitle: 'Tous nos produits sont testés et certifiés pour la sécurité',
      ctaText: 'En savoir plus',
      ctaLink: '/about',
      background: '#f1f8e9' // vert clair
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=2126&q=80',
      title: 'Service client 24/7',
      subtitle: 'Notre équipe est là pour vous accompagner à chaque étape',
      ctaText: 'Nous contacter',
      ctaLink: '/contact',
      background: '#fff3e0' // orange clair
    }
  ];
  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  pauseAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  resumeAutoSlide() {
    this.startAutoSlide();
  }
}
