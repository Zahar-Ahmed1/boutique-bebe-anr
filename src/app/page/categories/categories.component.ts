import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  ageRange?: string;
  featured: boolean;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      id: 'clothes-0-24',
      name: 'Vêtements 0-24 mois',
      description: 'Vêtements doux et confortables pour les tout-petits, de la naissance à 2 ans.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      productCount: 156,
      ageRange: '0-24 mois',
      featured: true
    },
    {
      id: 'clothes-2-6',
      name: 'Vêtements 2-6 ans',
      description: 'Style et confort pour les enfants en pleine croissance.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      productCount: 203,
      ageRange: '2-6 ans',
      featured: true
    },
    {
      id: 'shoes',
      name: 'Chaussures',
      description: 'Chaussures adaptées à chaque étape du développement de votre enfant.',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      productCount: 89,
      featured: false
    },
    {
      id: 'toys',
      name: 'Jouets éducatifs',
      description: 'Jouets qui stimulent la créativité et l\'apprentissage.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      productCount: 134,
      featured: true
    },
    {
      id: 'accessories',
      name: 'Accessoires',
      description: 'Complétez la tenue de vos enfants avec nos accessoires tendance.',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      productCount: 67,
      featured: false
    },
    {
      id: 'bath',
      name: 'Soins et bain',
      description: 'Produits de soin doux et naturels pour la peau délicate de vos enfants.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      productCount: 45,
      featured: false
    }
  ];

  get featuredCategories(): Category[] {
    return this.categories.filter(cat => cat.featured);
  }

  get regularCategories(): Category[] {
    return this.categories.filter(cat => !cat.featured);
  }
}
