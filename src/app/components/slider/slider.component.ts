import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string; // rose clair
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
      // https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758329797/WhatsApp_Image_2025-09-20_at_02.49.55_acfmym.jpg',
      title: 'Livraison rapide',
      subtitle: 'Recevez vos commandes en 24-48h partout en France',
      ctaText: 'Nos Produits',
      ctaLink: '/products',
      backgroundColor: '#89675c'

    },
    {
      // https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327851/WhatsApp_Image_2025-09-19_at_23.43.07_1_bav3fc.jpg',
      title: 'Cododo',
      subtitle: 'Notre équipe est là pour vous accompagner à chaque étape',
      ctaText: 'Nous contacter',
      ctaLink: '/contact',
      backgroundColor: '#919c86' // rose clair

    },
    {
      // https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327749/WhatsApp_Image_2025-09-19_at_23.52.18_j6slpq.jpg',
      title: 'Service client 24/7',
      subtitle: 'Notre équipe est là pour vous accompagner à chaque étape',
      ctaText: 'Nous contacter',
      ctaLink: '/contact',
      backgroundColor: '#f5c751' // rose clair

    },
    {
      // https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327466/WhatsApp_Image_2025-09-19_at_23.43.07_xx6y6c.jpg',
      title: 'Bienvenue chez AnnrStore',
      subtitle: 'Découvrez notre sélection de produits de qualité pour vos enfants',
      ctaText: 'Voir nos produits',
      ctaLink: '/products',
      backgroundColor: '#d8c5ac'

    },
    {
      // https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327642/WhatsApp_Image_2025-09-19_at_23.43.08_s1vfoj.jpg',
      title: 'Qualité garantie',
      subtitle: 'Tous nos produits sont testés et certifiés pour la sécurité',
      ctaText: 'En savoir plus',
      ctaLink: '/about',
      backgroundColor: '#e9dccd' // rose clair

    },


    {
      // https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758329800/WhatsApp_Image_2025-09-20_at_02.49.56_tjeeso.jpg',
      title: 'decoration',
      subtitle: 'Notre équipe est là pour vous accompagner à chaque étape',
      ctaText: 'Nous contacter',
      ctaLink: '/contact',
      backgroundColor: '#e67514' +
        '' // rose clair

    },
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
