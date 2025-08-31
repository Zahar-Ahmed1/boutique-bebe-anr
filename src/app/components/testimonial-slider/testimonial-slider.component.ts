import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

@Component({
  selector: 'app-testimonial-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-slider.component.html',
  styleUrls: ['./testimonial-slider.component.css']
})
export class TestimonialSliderComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Maman de 2 enfants',
      content: 'Excellent service client et produits de qualité. Mes enfants adorent leurs nouveaux vêtements ! La livraison est rapide et le rapport qualité-prix est excellent.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      role: 'Papa de 3 enfants',
      content: 'Livraison rapide et produits conformes aux descriptions. Je recommande vivement ! Les vêtements sont durables et mes enfants les adorent.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2024-01-10'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Maman d\'un bébé',
      content: 'Site facile à utiliser et large choix de produits. Parfait pour les jeunes parents ! La qualité des matériaux est exceptionnelle.',
      rating: 4,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2024-01-08'
    },
    {
      id: 4,
      name: 'Alexandre Moreau',
      role: 'Papa de jumeaux',
      content: 'Service client exceptionnel ! Ils ont répondu à toutes mes questions rapidement. Les produits sont exactement comme décrits.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2024-01-05'
    },
    {
      id: 5,
      name: 'Camille Rousseau',
      role: 'Maman de 4 enfants',
      content: 'Depuis 2 ans, j\'achète tous les vêtements de mes enfants ici. Qualité constante et prix abordables. Je recommande !',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2024-01-03'
    }
  ];

  currentIndex = 0;
  private interval: any;
  isAutoPlaying = true;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.interval = setInterval(() => {
      if (this.isAutoPlaying) {
        this.next();
      }
    }, 5000); // Change toutes les 5 secondes
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  previous() {
    this.currentIndex = this.currentIndex === 0 
      ? this.testimonials.length - 1 
      : this.currentIndex - 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  pauseAutoPlay() {
    this.isAutoPlaying = false;
    this.stopAutoPlay();
  }

  resumeAutoPlay() {
    this.isAutoPlaying = true;
    this.startAutoPlay();
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
}
