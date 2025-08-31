import { Component } from '@angular/core';
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
export class AboutComponent {
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
      icon: '🌱',
      title: 'Durabilité',
      description: 'Nous nous engageons à proposer des produits durables et respectueux de l\'environnement.'
    },
    {
      icon: '👶',
      title: 'Qualité',
      description: 'Chaque produit est sélectionné pour sa qualité et sa sécurité pour vos enfants.'
    },
    {
      icon: '💝',
      title: 'Service client',
      description: 'Notre équipe est dédiée à vous offrir la meilleure expérience d\'achat possible.'
    },
    {
      icon: '🎨',
      title: 'Créativité',
      description: 'Nous créons des designs uniques qui stimulent l\'imagination de vos enfants.'
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
      name: 'Certification Bio',
      description: 'Tous nos vêtements en coton sont certifiés bio',
      icon: '🌿'
    },
    {
      name: 'Sécurité Enfant',
      description: 'Conformité aux normes européennes de sécurité',
      icon: '🛡️'
    },
    {
      name: 'Commerce Équitable',
      description: 'Partenaire du commerce équitable',
      icon: '🤝'
    }
  ];
}
