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
      title: 'Poussettes & Sièges Auto',
      subtitle: 'Offrez confort et sécurité à votre enfant avec notre sélection de poussettes et sièges auto design et pratiques.\n',
      ctaText: 'Découvrir',
      ctaLink: '/products',
      backgroundColor: '#89675c'

    },
    {
      // https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327851/WhatsApp_Image_2025-09-19_at_23.43.07_1_bav3fc.jpg',
      title: 'Lits & Berceaux',
      subtitle: 'Des lits douillets et berceaux rassurants pour des nuits paisibles et proches de bébé',
      ctaText: 'Découvrir',
      ctaLink: '/contact',
      backgroundColor: '#919c86' // rose clair

    },
    {
      // https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327749/WhatsApp_Image_2025-09-19_at_23.52.18_j6slpq.jpg',
      title: 'Véhicules Enfants',
      subtitle: 'Voitures, motos et trottinettes électriques ou à pédales : le plaisir de conduire dès le plus jeune âge !',
      ctaText: 'Découvrir',
      ctaLink: '/contact',
      backgroundColor: '#f5c751' // rose clair

    },
    {
      // https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327466/WhatsApp_Image_2025-09-19_at_23.43.07_xx6y6c.jpg',
      title: 'Décoration Chambre',
      subtitle: 'Transformez la chambre de votre enfant en un univers magique et plein de tendresse.\n',
      ctaText: 'Découvrir',
      ctaLink: '/products',
      backgroundColor: '#996c40'

    },
    {
      // https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758327642/WhatsApp_Image_2025-09-19_at_23.43.08_s1vfoj.jpg',
      title: 'Vêtements Enfants',
      subtitle: 'Habillez vos petits avec des vêtements de qualité, confortables et stylés pour toutes les occasions.',
      ctaText: 'Découvrir',
      ctaLink: '/about',
      backgroundColor: '#67bed9' // rose clair

    },


    {
      // https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80
      image: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758329800/WhatsApp_Image_2025-09-20_at_02.49.56_tjeeso.jpg',
      title: 'Jouets Éducatifs & Ludiques\n',
      subtitle: 'Des jouets amusants qui éveillent la curiosité et stimulent l’imagination des enfants.',
      ctaText: 'Découvrir',
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
