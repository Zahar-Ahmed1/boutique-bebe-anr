import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  article: BlogArticle | null = null;
  relatedArticles: BlogArticle[] = [];
  newsletterEmail: string = '';
  isSubscribed: boolean = false;
  isLiked: boolean = false;

  private allArticles: BlogArticle[] = [
    {
      id: 1,
      title: 'Les 10 étapes essentielles du développement de bébé',
      excerpt: 'Découvrez les étapes clés du développement de votre enfant de 0 à 2 ans et comment l\'accompagner au mieux dans chaque phase.',
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>Le développement de votre bébé est un voyage fascinant qui se déroule à un rythme impressionnant. Chaque jour apporte de nouvelles découvertes, de nouvelles capacités et de nouveaux défis. En tant que parent, comprendre ces étapes vous permet de mieux accompagner votre enfant et de célébrer chaque moment précieux.</p>
        
        <p>Dans cet article, nous allons explorer les 10 étapes essentielles du développement de bébé, de la naissance à 2 ans. Ces étapes sont basées sur les recherches en psychologie du développement et les observations cliniques de milliers d'enfants.</p>

        <h2 id="section1">Les bases du développement</h2>
        <p>Le développement de l'enfant suit des séquences prévisibles, mais chaque bébé progresse à son propre rythme. Il est important de se rappeler que ces étapes sont des guides, pas des règles strictes.</p>

        <h3>1. Développement moteur</h3>
        <p>Le développement moteur commence dès la naissance avec les réflexes primitifs. Votre bébé apprend progressivement à contrôler ses mouvements, d'abord la tête, puis le tronc, et enfin les membres.</p>

        <ul>
          <li><strong>0-3 mois :</strong> Contrôle de la tête, réflexes de succion et de préhension</li>
          <li><strong>3-6 mois :</strong> Retournement, position assise avec support</li>
          <li><strong>6-9 mois :</strong> Position assise autonome, début de la marche à quatre pattes</li>
          <li><strong>9-12 mois :</strong> Marche à quatre pattes, position debout avec support</li>
          <li><strong>12-18 mois :</strong> Premiers pas, escalade</li>
          <li><strong>18-24 mois :</strong> Course, escaliers avec aide</li>
        </ul>

        <h3>2. Développement cognitif</h3>
        <p>Le cerveau de votre bébé se développe rapidement, créant des connexions neuronales qui formeront la base de toutes ses futures capacités d'apprentissage.</p>

        <blockquote>
          "L'expérience façonne le cerveau. Chaque interaction, chaque jeu, chaque moment de tendresse contribue au développement optimal de votre enfant."
        </blockquote>

        <h2 id="section2">Conseils pratiques</h2>
        <p>Voici des conseils pratiques pour accompagner votre bébé dans chaque étape de son développement :</p>

        <h3>Stimulation appropriée</h3>
        <p>Il est important de stimuler votre bébé de manière appropriée à son âge. Trop de stimulation peut être aussi problématique que pas assez.</p>

        <h3>Environnement sécurisé</h3>
        <p>Créez un environnement qui encourage l'exploration tout en maintenant la sécurité. Votre bébé a besoin de liberté pour explorer et apprendre.</p>

        <h2 id="section3">Conclusion</h2>
        <p>Chaque étape du développement de votre bébé est unique et précieuse. En comprenant ces étapes, vous pouvez mieux accompagner votre enfant et profiter pleinement de ce voyage extraordinaire qu'est la parentalité.</p>

        <p>N'oubliez pas que chaque enfant est différent et que le plus important est de créer un environnement aimant et stimulant où votre bébé peut s'épanouir à son propre rythme.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>Choisir les bons jouets pour votre enfant peut sembler simple, mais c'est en réalité une décision importante qui influence son développement. Les jouets ne sont pas seulement des objets de divertissement, ils sont des outils d'apprentissage essentiels.</p>

        <h2 id="section1">Les critères de sélection</h2>
        <p>Plusieurs facteurs doivent être pris en compte lors du choix des jouets :</p>

        <h3>Âge et stade de développement</h3>
        <p>Chaque âge a ses besoins spécifiques. Un jouet trop avancé peut frustrer votre enfant, tandis qu'un jouet trop simple peut ne pas le stimuler suffisamment.</p>

        <h3>Sécurité</h3>
        <p>La sécurité est primordiale. Vérifiez toujours les normes de sécurité et évitez les jouets avec de petites pièces pour les jeunes enfants.</p>

        <h2 id="section2">Types de jouets par âge</h2>
        <p>Voici une sélection de jouets adaptés à chaque tranche d'âge :</p>

        <h3>0-6 mois</h3>
        <ul>
          <li>Mobiles musicaux</li>
          <li>Jouets de dentition</li>
          <li>Livres en tissu</li>
        </ul>

        <h3>6-12 mois</h3>
        <ul>
          <li>Cubes empilables</li>
          <li>Jouets à pousser</li>
          <li>Instruments de musique simples</li>
        </ul>

        <h2 id="section3">Conclusion</h2>
        <p>Le choix des jouets est un investissement dans le développement de votre enfant. Privilégiez la qualité à la quantité et choisissez des jouets qui stimulent l'imagination et la créativité.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>L'alimentation de votre enfant est cruciale pour son développement physique et mental. Une alimentation équilibrée dès le plus jeune âge pose les bases d'une vie en bonne santé.</p>

        <h2 id="section1">Les bases de la nutrition</h2>
        <p>Les besoins nutritionnels des enfants évoluent rapidement. Il est important de comprendre ces besoins pour offrir une alimentation adaptée.</p>

        <h2 id="section2">Conseils pratiques</h2>
        <p>Voici des conseils pour une alimentation saine et équilibrée :</p>

        <h3>Variété des aliments</h3>
        <p>Proposez une grande variété d'aliments pour exposer votre enfant à différents goûts et textures.</p>

        <h3>Portions adaptées</h3>
        <p>Les portions doivent être adaptées à l'âge et à l'appétit de votre enfant.</p>

        <h2 id="section3">Conclusion</h2>
        <p>Une alimentation équilibrée est un cadeau que vous faites à votre enfant pour toute sa vie.</p>
      `,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      category: 'Santé',
      date: '10 Jan 2024',
      author: 'Dr. Jean Petit',
      readTime: '10 min',
      tags: ['Alimentation', 'Santé', 'Nutrition'],
      views: 1450,
      likes: 112
    },
    {
      id: 4,
      title: 'Créer un environnement sécurisé pour bébé',
      excerpt: 'Les essentiels pour aménager une chambre et un espace de vie sécurisé pour votre bébé.',
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>La sécurité de votre bébé est votre priorité absolue. Créer un environnement sécurisé permet à votre enfant d'explorer en toute confiance.</p>

        <h2 id="section1">Sécurisation de la maison</h2>
        <p>Voici les points essentiels à vérifier dans chaque pièce de votre maison.</p>

        <h2 id="section2">Chambre de bébé</h2>
        <p>La chambre de bébé doit être un havre de paix et de sécurité.</p>

        <h2 id="section3">Conclusion</h2>
        <p>Un environnement sécurisé est la base d'un développement sain et confiant.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>La lecture est l'un des plus beaux cadeaux que vous puissiez offrir à votre enfant. Dès les premiers mois, les livres peuvent enrichir son développement.</p>

        <h2 id="section1">Les bénéfices de la lecture précoce</h2>
        <p>La lecture précoce développe de nombreuses compétences essentielles.</p>

        <h2 id="section2">Comment commencer</h2>
        <p>Il n'est jamais trop tôt pour commencer à lire avec votre enfant.</p>

        <h2 id="section3">Conclusion</h2>
        <p>La lecture est un moment de partage précieux qui enrichit la relation parent-enfant.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>Les pleurs de bébé sont un moyen de communication naturel, mais ils peuvent être source de stress pour les parents. Comprendre les causes et savoir comment réagir peut faire toute la différence.</p>

        <h2 id="section1">Comprendre les pleurs</h2>
        <p>Les pleurs sont le principal moyen de communication de votre bébé. Ils peuvent exprimer différents besoins :</p>

        <h3>Les causes courantes</h3>
        <ul>
          <li><strong>Faim :</strong> Le besoin le plus fréquent, surtout chez les nouveau-nés</li>
          <li><strong>Fatigue :</strong> Votre bébé a besoin de sommeil</li>
          <li><strong>Inconfort :</strong> Couche sale, vêtements trop serrés, température</li>
          <li><strong>Coliques :</strong> Douleurs abdominales fréquentes chez les bébés</li>
          <li><strong>Besoins d'attention :</strong> Votre bébé a besoin de réconfort</li>
        </ul>

        <h2 id="section2">Techniques d'apaisement</h2>
        <p>Voici des techniques éprouvées pour calmer votre bébé :</p>

        <h3>La méthode des 5 S</h3>
        <ol>
          <li><strong>Swaddling (emmaillotage) :</strong> Envelopper bébé dans une couverture</li>
          <li><strong>Side/Stomach position :</strong> Position sur le côté ou le ventre</li>
          <li><strong>Shushing :</strong> Faire des "chut" rythmés</li>
          <li><strong>Swinging :</strong> Balancement doux</li>
          <li><strong>Sucking :</strong> Tétine ou allaitement</li>
        </ol>

        <h3>Autres techniques</h3>
        <ul>
          <li>Promenade en poussette ou en voiture</li>
          <li>Musique douce ou bruits blancs</li>
          <li>Massage bébé</li>
          <li>Contact peau à peau</li>
        </ul>

        <h2 id="section3">Quand consulter</h2>
        <p>Consultez un professionnel de santé si :</p>
        <ul>
          <li>Les pleurs durent plus de 3 heures par jour</li>
          <li>Votre bébé a de la fièvre</li>
          <li>Les pleurs sont accompagnés d'autres symptômes</li>
          <li>Vous vous sentez dépassé(e)</li>
        </ul>

        <h2 id="section4">Conclusion</h2>
        <p>Gérer les pleurs de bébé demande patience et compréhension. N'oubliez pas de prendre soin de vous aussi, car un parent reposé est plus à même de réconforter son enfant.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>Le sommeil est essentiel au développement de votre bébé. Comprendre ses rythmes naturels vous aide à instaurer de bonnes habitudes dès le plus jeune âge.</p>

        <h2 id="section1">Les cycles de sommeil</h2>
        <p>Les bébés ont des cycles de sommeil différents des adultes. Leur sommeil évolue rapidement au cours des premiers mois.</p>

        <h2 id="section2">Conseils pratiques</h2>
        <p>Voici des conseils pour favoriser un bon sommeil :</p>

        <h2 id="section3">Conclusion</h2>
        <p>Un bon sommeil est la base d'un développement harmonieux.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>La créativité est une compétence essentielle qui se développe dès le plus jeune âge. Voici des activités pour stimuler l'imagination de votre enfant.</p>

        <h2 id="section1">Activités par âge</h2>
        <p>Chaque âge a ses activités créatives adaptées.</p>

        <h2 id="section2">Matériel nécessaire</h2>
        <p>Des matériaux simples suffisent pour des activités créatives riches.</p>

        <h2 id="section3">Conclusion</h2>
        <p>La créativité s'épanouit dans un environnement encourageant et bienveillant.</p>
      `,
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
      content: `
        <h2 id="introduction">Introduction</h2>
        <p>L'anniversaire de votre enfant est un moment spécial à célébrer. Voici comment organiser une fête mémorable adaptée à son âge.</p>

        <h2 id="section1">Planification</h2>
        <p>Une bonne planification est la clé du succès d'une fête d'anniversaire.</p>

        <h2 id="section2">Idées d'activités</h2>
        <p>Des activités adaptées à l'âge de votre enfant pour une fête réussie.</p>

        <h2 id="section3">Conclusion</h2>
        <p>L'important est de créer des souvenirs heureux pour votre enfant.</p>
      `,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const articleId = +params['id'];
      this.loadArticle(articleId);
    });
  }

  loadArticle(id: number): void {
    this.article = this.allArticles.find(article => article.id === id) || null;
    
    if (this.article) {
      // Simuler l'incrémentation des vues
      this.article.views++;
      
      // Charger les articles similaires
      this.loadRelatedArticles();
    } else {
      // Rediriger vers la page blog si l'article n'existe pas
      this.router.navigate(['/blog']);
    }
  }

  loadRelatedArticles(): void {
    if (!this.article) return;
    
    this.relatedArticles = this.allArticles
      .filter(article => 
        article.id !== this.article!.id && 
        (article.category === this.article!.category || 
         article.tags.some(tag => this.article!.tags.includes(tag)))
      )
      .slice(0, 3);
  }

  getAuthorAvatar(authorName: string): string {
    // Générer un avatar basé sur le nom de l'auteur
    const avatars = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    ];
    
    const index = authorName.length % avatars.length;
    return avatars[index];
  }

  toggleLike(): void {
    if (!this.article) return;
    
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.article.likes++;
    } else {
      this.article.likes--;
    }
  }

  shareArticle(): void {
    if (!this.article) return;
    
    if (navigator.share) {
      navigator.share({
        title: this.article.title,
        text: this.article.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Lien copié dans le presse-papiers !');
      });
    }
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmail && this.newsletterEmail.includes('@')) {
      this.isSubscribed = true;
      console.log('Email inscrit:', this.newsletterEmail);
    }
  }
}
