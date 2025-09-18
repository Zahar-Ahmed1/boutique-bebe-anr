import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  views: number;
  likes: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  newsletterEmail: string = '';
  isSubscribed: boolean = false;
  selectedCategory: string = 'Tous';
  
  categories: string[] = ['Tous', 'Conseils', 'Développement', 'Santé', 'Éducation', 'Lifestyle'];
  
  featuredArticles: BlogArticle[] = [
    {
      id: 1,
      title: 'Les 10 étapes essentielles du développement de bébé',
      excerpt: 'Découvrez les étapes clés du développement de votre enfant de 0 à 2 ans et comment l\'accompagner au mieux dans chaque phase.',
      content: '',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop',
      category: 'Développement',
      date: '15 Jan 2024',
      author: 'Dr. Marie Dubois',
      readTime: '8 min',
      tags: ['Bébé', 'Développement', 'Conseils'],
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: 'Comment choisir les jouets parfaits pour votre enfant',
      excerpt: 'Un guide complet pour sélectionner les jouets adaptés à l\'âge et aux besoins de votre enfant, favorisant son épanouissement.',
      content: '',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      category: 'Conseils',
      date: '12 Jan 2024',
      author: 'Sophie Martin',
      readTime: '6 min',
      tags: ['Jouets', 'Sélection', 'Éducation'],
      views: 980,
      likes: 67
    },
    {
      id: 3,
      title: 'L\'alimentation équilibrée pour les tout-petits',
      excerpt: 'Tout ce qu\'il faut savoir sur l\'alimentation de votre enfant : diversification, portions, et recettes saines.',
      content: '',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      category: 'Santé',
      date: '10 Jan 2024',
      author: 'Dr. Jean Petit',
      readTime: '10 min',
      tags: ['Alimentation', 'Santé', 'Nutrition'],
      views: 1450,
      likes: 112
    }
  ];
  
  allArticles: BlogArticle[] = [
    {
      id: 4,
      title: 'Créer un environnement sécurisé pour bébé',
      excerpt: 'Les essentiels pour aménager une chambre et un espace de vie sécurisé pour votre bébé.',
      content: '',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      category: 'Conseils',
      date: '8 Jan 2024',
      author: 'Emma Rousseau',
      readTime: '5 min',
      tags: ['Sécurité', 'Chambre', 'Aménagement'],
      views: 750,
      likes: 45
    },
    {
      id: 5,
      title: 'Les bienfaits de la lecture dès le plus jeune âge',
      excerpt: 'Pourquoi et comment introduire la lecture dans la routine de votre enfant dès ses premiers mois.',
      content: '',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      category: 'Éducation',
      date: '5 Jan 2024',
      author: 'Lucas Bernard',
      readTime: '7 min',
      tags: ['Lecture', 'Éducation', 'Développement'],
      views: 920,
      likes: 78
    },
    {
      id: 6,
      title: 'Gérer les pleurs de bébé : guide pratique',
      excerpt: 'Comprendre et apaiser les pleurs de votre bébé avec des techniques douces et efficaces.',
      content: '',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      category: 'Conseils',
      date: '3 Jan 2024',
      author: 'Dr. Claire Moreau',
      readTime: '9 min',
      tags: ['Pleurs', 'Apaisement', 'Conseils'],
      views: 1100,
      likes: 95
    },
    {
      id: 7,
      title: 'Le sommeil de bébé : rythmes et bonnes habitudes',
      excerpt: 'Tout savoir sur les cycles de sommeil de bébé et comment instaurer de bonnes habitudes.',
      content: '',
      image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=800&h=600&fit=crop',
      category: 'Santé',
      date: '1 Jan 2024',
      author: 'Dr. Pierre Durand',
      readTime: '8 min',
      tags: ['Sommeil', 'Rythmes', 'Habitudes'],
      views: 1350,
      likes: 102
    },
    {
      id: 8,
      title: 'Activités créatives pour stimuler l\'imagination',
      excerpt: 'Des idées d\'activités manuelles et créatives adaptées aux différents âges de votre enfant.',
      content: '',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      category: 'Éducation',
      date: '28 Déc 2023',
      author: 'Camille Leroy',
      readTime: '6 min',
      tags: ['Créativité', 'Activités', 'Stimulation'],
      views: 680,
      likes: 56
    },
    {
      id: 9,
      title: 'Organiser une fête d\'anniversaire mémorable',
      excerpt: 'Conseils et idées pour organiser une fête d\'anniversaire inoubliable pour votre enfant.',
      content: '',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
      category: 'Lifestyle',
      date: '25 Déc 2023',
      author: 'Julie Moreau',
      readTime: '5 min',
      tags: ['Anniversaire', 'Fête', 'Organisation'],
      views: 890,
      likes: 73
    }
  ];
  
  filteredArticles: BlogArticle[] = [];

  ngOnInit(): void {
    this.filteredArticles = this.allArticles;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'Tous') {
      this.filteredArticles = this.allArticles;
    } else {
      this.filteredArticles = this.allArticles.filter(article => article.category === category);
    }
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmail && this.newsletterEmail.includes('@')) {
      this.isSubscribed = true;
      // Ici vous pourriez ajouter la logique pour envoyer l'email à votre service
      console.log('Email inscrit:', this.newsletterEmail);
    }
  }
}