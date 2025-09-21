import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface Statistic {
  number: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('timelineSection') timelineSection!: ElementRef;

  private observer!: IntersectionObserver;
  teamMembers: TeamMember[] = [
    {
      name: 'Marie Dubois',
      role: 'Fondatrice & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      bio: 'Passionnée par la mode enfantine et maman de 2 enfants, Marie a créé BabyAnnr avec la vision d\'offrir des vêtements de qualité, durables et stylés.',
      social: {
        linkedin: '#',
        email: 'marie@babyannr.com'
      }
    },
    {
      name: 'Thomas Martin',
      role: 'Directeur Commercial',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      bio: 'Expert en commerce en ligne avec plus de 10 ans d\'expérience, Thomas supervise la stratégie commerciale et les partenariats.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sophie Bernard',
      role: 'Responsable Produits',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      bio: 'Designer de formation, Sophie sélectionne avec soin chaque produit pour garantir qualité, sécurité et tendance.',
      social: {
        linkedin: '#',
        email: 'sophie@babyannr.com'
      }
    }
  ];

  milestones: Milestone[] = [
    {
      year: '2020',
      title: 'Création de BabyAnnr',
      description: 'Marie Dubois fonde BabyAnnr avec la vision d\'offrir des vêtements de qualité pour enfants.',
      icon: '🚀'
    },
    {
      year: '2021',
      title: 'Première collection',
      description: 'Lancement de notre première collection de vêtements bio et durables pour 0-24 mois.',
      icon: '👕'
    },
    {
      year: '2022',
      title: 'Expansion des catégories',
      description: 'Ajout des catégories chaussures, jouets éducatifs et accessoires.',
      icon: '🛍️'
    },
    {
      year: '2023',
      title: 'Ouverture de la boutique en ligne',
      description: 'Lancement de notre plateforme e-commerce avec plus de 500 produits.',
      icon: '💻'
    },
    {
      year: '2024',
      title: 'Expansion internationale',
      description: 'Début de l\'exportation vers les pays européens et développement de notre communauté.',
      icon: '🌍'
    }
  ];

  values = [
    {
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758470886/WhatsApp_Image_2025-09-21_at_01.32.33_w9vxwt.jpg',
      title: 'Honnêteté',
      description: 'Une relation de confiance et de transparence avec nos clients.'
    },
    {
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758471098/WhatsApp_Image_2025-09-21_at_01.34.05_lf7kfw.jpg',
      title: 'L\'enfant avant tout',
      description: 'La sécurité et le bien-être des plus petits sont notre priorité.'
    },
    {
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758471233/WhatsApp_Image_2025-09-21_at_01.36.39_csc2ug.jpg',
      title: 'Qualité d\'abord',
      description: 'Des produits fiables et soigneusement sélectionnés pour vos enfants.'
    },
    {
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758471270/haute-qualite_jzwgjw.png',
      title: 'Proximité',
      description: 'Être à l’écoute et accompagner chaque famille avec attention et bienveillance.'
    }
  ];


  statistics: Statistic[] = [
    {
      number: '500+',
      label: 'Produits',
      icon: '🛍️'
    },
    {
      number: '10k+',
      label: 'Clients satisfaits',
      icon: '😊'
    },
    {
      number: '4',
      label: 'Années d\'expérience',
      icon: '⭐'
    },
    {
      number: '24/7',
      label: 'Support client',
      icon: '🕒'
    }
  ];

  certifications = [
    {
      name: 'Conformité aux normes de sécurité',
      description: 'tous nos produits respectent les standards de sécurité pour enfants.',
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758471588/WhatsApp_Image_2025-09-21_at_01.29.02_gob0f0.jpg'
    },
    {
      name: 'Qualité testée',
      description: 'chaque produit est soigneusement vérifié avant sa mise en vente.',
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758471588/WhatsApp_Image_2025-09-21_at_01.27.16_dr1lmi.jpg'
    },
    {
      name: 'Matériaux non toxiques',
      description: 'nos articles sont fabriqués avec des matériaux sûrs pour les enfants.',
      icon: 'https://res.cloudinary.com/dxtlsrtoq/image/upload/v1758471588/WhatsApp_Image_2025-09-21_at_01.31.06_cq1g0o.jpg'
    }
  ];

  ngOnInit() {
    // Initialisation
  }

  ngAfterViewInit() {
    this.setupTimelineAnimations();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupTimelineAnimations() {
    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animer la section timeline
          const timelineItems = entry.target.querySelectorAll('.timeline-item');

          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in');
            }, index * 200); // Délai progressif pour chaque élément
          });

          // Arrêter d'observer après l'animation
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observer la section timeline
    if (this.timelineSection?.nativeElement) {
      this.observer.observe(this.timelineSection.nativeElement);
    }
  }
}
