import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
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
  @ViewChild('blogSection') blogSection!: ElementRef;
  @ViewChild('testimonialsSection') testimonialsSection!: ElementRef;
  @ViewChild('newsletterSection') newsletterSection!: ElementRef;

  bestsellerProducts: any[] = [];
  newProducts: any[] = [];
  saleProducts: any[] = [];
  features: any[] = [];
  latestBlogArticles: any[] = [];
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

    // Articles de blog pour la page d'accueil
    this.latestBlogArticles = [
      {
        id: 1,
        title: 'Les 10 étapes essentielles du développement de bébé',
        excerpt: 'Découvrez les étapes clés du développement de votre enfant de 0 à 2 ans et comment l\'accompagner au mieux dans chaque phase.',
        image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
        category: 'Développement',
        date: '15 Jan 2024',
        readTime: '8 min',
        views: 1250,
        likes: 89
      },
      {
        id: 2,
        title: 'Comment choisir les jouets parfaits pour votre enfant',
        excerpt: 'Un guide complet pour sélectionner les jouets adaptés à l\'âge et aux besoins de votre enfant, favorisant son épanouissement.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'Conseils',
        date: '12 Jan 2024',
        readTime: '6 min',
        views: 980,
        likes: 67
      },
      {
        id: 3,
        title: 'L\'alimentation équilibrée pour les tout-petits',
        excerpt: 'Tout ce qu\'il faut savoir sur l\'alimentation de votre enfant : diversification, portions, et recettes saines.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        category: 'Santé',
        date: '10 Jan 2024',
        readTime: '10 min',
        views: 1450,
        likes: 112
      }
    ];

    this.features = [
      {
        icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758485976/workspace_premium_24dp_FFFFFF_g98fqb.svg',
        title: 'Qualité',
        description: 'Des produits sûrs, durables et pensés pour le bien-être de vos enfants.'
      },
      {
        icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758486134/local_shipping_24dp_FFFFFF_livts4.svg',
        title: 'Livraison Rapide',
        description: 'Recevez vos commandes en moins de 24h à Casablanca et 48h partout au Maroc.'
      },
      {
        icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758486245/cached_24dp_FFFFFF_akdbxx.svg',
        title: 'Politique de retour',
        description: 'En cas de défaut, le retour et la nouvelle livraison sont pris en charge par nos soins.'
      },
      {
        icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758486313/contact_support_24dp_FFFFFF_w9slot.svg',
        title: 'Service Après-Vente',
        description: 'Nous restons à vos côtés après votre achat.'
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
              entry.target.classList.contains('blog-section')) {
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
      this.blogSection?.nativeElement,
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
    const cards = section.querySelectorAll('.product-card, .showcase-card, .blog-card, .bestseller-card');
    cards.forEach((card: Element, index: number) => {
      setTimeout(() => {
        card.classList.add('card-animate-in');
        // Ajouter un effet de révélation progressive
        card.setAttribute('style', `--index: ${index};`);
      }, index * 200);
    });
  }

  private animateFeatures(section: Element) {
    const featureItems = section.querySelectorAll('.feature-item');
    featureItems.forEach((item: Element, index: number) => {
      setTimeout(() => {
        item.classList.add('feature-animate-in');
        // Ajouter un effet de révélation en cascade
        item.setAttribute('style', `--index: ${index}; transition-delay: ${index * 0.2}s;`);
      }, index * 300);
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
