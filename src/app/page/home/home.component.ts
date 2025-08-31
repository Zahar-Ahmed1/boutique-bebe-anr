import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { BestsellerCardComponent } from '../../components/bestseller-card/bestseller-card.component';
import { TestimonialSliderComponent } from '../../components/testimonial-slider/testimonial-slider.component';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    BestsellerCardComponent,
    TestimonialSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('bestsellersSection') bestsellersSection!: ElementRef;
  @ViewChild('newProductsSection') newProductsSection!: ElementRef;
  @ViewChild('promotionsSection') promotionsSection!: ElementRef;
  @ViewChild('testimonialsSection') testimonialsSection!: ElementRef;
  @ViewChild('newsletterSection') newsletterSection!: ElementRef;

  bestsellerProducts: any[] = [];
  newProducts: any[] = [];
  saleProducts: any[] = [];
  features: any[] = [];
  newsletterEmail: string = '';
  isSubscribed: boolean = false;

  private subscription = new Subscription();
  private observer!: IntersectionObserver;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.subscription.add(
      this.productsService.getBestsellerProducts(5).subscribe(products => {
        this.bestsellerProducts = products;
      })
    );

    this.subscription.add(
      this.productsService.getNewProducts(6).subscribe(products => {
        this.newProducts = products;
      })
    );

    this.subscription.add(
      this.productsService.getSaleProducts().subscribe(products => {
        this.saleProducts = products;
      })
    );

    this.features = [
      {
        icon: '🚚',
        title: 'Livraison Gratuite',
        description: 'Livraison gratuite pour toute commande supérieure à 50€'
      },
      {
        icon: '🔄',
        title: 'Retour Facile',
        description: '30 jours pour changer d\'avis, retour gratuit'
      },
      {
        icon: '🛡️',
        title: 'Garantie 2 Ans',
        description: 'Tous nos produits sont garantis 2 ans'
      },
      {
        icon: '💬',
        title: 'Support 24/7',
        description: 'Notre équipe est disponible pour vous aider'
      }
    ];
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimations() {
    // Configuration de l'Intersection Observer
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animation spéciale pour les cartes de produits
          if (entry.target.classList.contains('bestsellers-section') || 
              entry.target.classList.contains('new-products-section') ||
              entry.target.classList.contains('promotions-section')) {
            this.animateProductCards(entry.target);
          }
          
          // Animation spéciale pour les features
          if (entry.target.classList.contains('features-section')) {
            this.animateFeatures(entry.target);
          }
          
          // Animation spéciale pour le slider
          if (entry.target.classList.contains('hero-section')) {
            this.animateHero(entry.target);
          }
        }
      });
    }, options);

    // Observer tous les éléments de section
    const sections = [
      this.heroSection?.nativeElement,
      this.featuresSection?.nativeElement,
      this.bestsellersSection?.nativeElement,
      this.newProductsSection?.nativeElement,
      this.promotionsSection?.nativeElement,
      this.testimonialsSection?.nativeElement,
      this.newsletterSection?.nativeElement
    ].filter(Boolean);

    sections.forEach(section => {
      if (section) {
        this.observer.observe(section);
      }
    });
  }

  private animateProductCards(section: Element) {
    const cards = section.querySelectorAll('.product-card, .showcase-card');
    cards.forEach((card: Element, index: number) => {
      setTimeout(() => {
        card.classList.add('card-animate-in');
      }, index * 150);
    });
  }

  private animateFeatures(section: Element) {
    const featureItems = section.querySelectorAll('.feature-item');
    featureItems.forEach((item: Element, index: number) => {
      setTimeout(() => {
        item.classList.add('feature-animate-in');
      }, index * 200);
    });
  }

  private animateHero(section: Element) {
    const heroContent = section.querySelector('.hero-content');
    const heroImage = section.querySelector('.hero-image');
    
    if (heroContent) {
      setTimeout(() => heroContent.classList.add('hero-content-animate-in'), 300);
    }
    if (heroImage) {
      setTimeout(() => heroImage.classList.add('hero-image-animate-in'), 600);
    }
  }

  subscribeNewsletter() {
    if (this.isValidEmail(this.newsletterEmail)) {
      this.isSubscribed = true;
      this.newsletterEmail = '';
      setTimeout(() => {
        this.isSubscribed = false;
      }, 3000);
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
}
