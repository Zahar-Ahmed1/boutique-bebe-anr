# 🍼 BabyAnnr - E-commerce de Produits pour Enfants

[![Angular](https://img.shields.io/badge/Angular-19.2.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Une plateforme e-commerce moderne et responsive dédiée aux produits pour enfants, construite avec Angular 19 et des technologies web modernes.**

## 🌟 Fonctionnalités Principales

### 🎯 **Interface Utilisateur**
- **Design moderne et minimaliste** avec animations fluides
- **Mode sombre/clair** avec persistance des préférences
- **Responsive design** optimisé pour tous les appareils
- **Animations de scroll** avec Intersection Observer
- **Thème personnalisable** avec variables CSS

### 🛍️ **Gestion des Produits**
- **Catalogue complet** avec catégorisation intelligente
- **Système de badges** (Nouveau, Promo, Bestseller, Trending)
- **Filtres avancés** par catégorie, prix, marque, âge, etc.
- **Recherche en temps réel** avec suggestions
- **Gestion des favoris** avec synchronisation globale

### 🎨 **Sections Spéciales**
- **Slider principal** avec navigation intuitive
- **Nouveautés 2024** avec showcase de 3 produits
- **Meilleurs vendeurs** avec cartes interactives
- **Promotions spéciales** avec badges de réduction
- **Témoignages clients** avec slider automatique
- **Newsletter** avec validation et confirmation

### 🔧 **Fonctionnalités Techniques**
- **Architecture modulaire** avec composants standalone
- **Services centralisés** pour la gestion des données
- **Routing intelligent** avec lazy loading
- **Gestion d'état** avec RxJS et BehaviorSubject
- **Animations CSS** avec keyframes et transitions
- **Optimisation des performances** avec OnPush strategy

## 🚀 Technologies Utilisées

### **Frontend**
- **Angular 19.2.0** - Framework principal
- **TypeScript 5.0** - Langage de programmation
- **CSS3** - Styles personnalisés avec variables CSS
- **HTML5** - Structure sémantique

### **Outils de Développement**
- **Angular CLI** - Outils de développement
- **RxJS** - Gestion des observables et réactivité
- **Intersection Observer API** - Animations de scroll
- **LocalStorage** - Persistance des données utilisateur

### **Architecture**
- **Composants Standalone** - Architecture modulaire
- **Services Injectables** - Logique métier centralisée
- **Interfaces TypeScript** - Typage strict des données
- **Pattern Observer** - Communication entre composants

## 📁 Structure du Projet

```
babyannr/
├── src/
│   ├── app/
│   │   ├── components/           # Composants réutilisables
│   │   │   ├── header/          # Navigation principale
│   │   │   ├── footer/          # Pied de page
│   │   │   ├── slider/          # Carrousel principal
│   │   │   ├── bestseller-card/ # Cartes de produits
│   │   │   └── testimonial-slider/ # Slider de témoignages
│   │   ├── page/                # Pages de l'application
│   │   │   ├── home/            # Page d'accueil
│   │   │   ├── products/        # Catalogue des produits
│   │   │   ├── categories/      # Gestion des catégories
│   │   │   ├── favorites/       # Produits favoris
│   │   │   ├── contact/         # Formulaire de contact
│   │   │   └── about/           # Page à propos
│   │   └── services/            # Services métier
│   │       ├── products.service.ts    # Gestion des produits
│   │       └── favorites.service.ts   # Gestion des favoris
│   ├── assets/                  # Ressources statiques
│   └── styles.css               # Styles globaux
├── angular.json                 # Configuration Angular
├── package.json                 # Dépendances du projet
└── README.md                    # Documentation
```

## 🎨 Composants Principaux

### **Header Component**
- Navigation responsive avec menu hamburger
- Gestion du mode sombre/clair
- Compteur de favoris en temps réel
- Recherche globale avec suggestions

### **Slider Component**
- Carrousel automatique avec contrôles
- Navigation par flèches et indicateurs
- Pause au survol pour une meilleure UX
- Transitions fluides entre slides

### **Bestseller Card Component**
- Affichage des informations produit
- Badges dynamiques (Nouveau, Promo, etc.)
- Actions rapides (Favoris, Panier)
- Indicateurs de disponibilité
- Système de notation avec étoiles

### **Testimonial Slider Component**
- Rotation automatique des témoignages
- Contrôles de lecture/pause
- Navigation manuelle avec indicateurs
- Animations de transition fluides

## 🔌 Services

### **ProductsService**
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  badge?: 'new' | 'sale' | 'trending' | 'bestseller';
  originalPrice?: number;
  price: number;
  features: string[];
  rating: number;
  description: string;
  image: string;
  brand: string;
  ageRange: string;
  // ... autres propriétés
}
```

**Méthodes principales :**
- `getAllProducts()` - Récupération de tous les produits
- `getProductsByCategory()` - Filtrage par catégorie
- `searchProducts()` - Recherche textuelle
- `filterProducts()` - Filtrage avancé multi-critères
- `getBestsellerProducts()` - Produits populaires
- `getNewProducts()` - Nouveautés

### **FavoritesService**
- Gestion globale des favoris
- Synchronisation avec localStorage
- Notifications en temps réel
- Compteur global des favoris

## 🎭 Animations et Transitions

### **Animations de Scroll**
- **Fade In** : Apparition progressive des sections
- **Slide Up** : Glissement vers le haut
- **Scale** : Agrandissement des cartes
- **Rotation** : Effets 3D sur les features

### **Hover Effects**
- **Lévitation** : Élévation des cartes
- **Zoom** : Agrandissement des images
- **Gradient Shift** : Changement de couleurs
- **Shadow Animation** : Ombres dynamiques

### **Transitions CSS**
- **Cubic-bezier** : Courbes d'animation naturelles
- **Transform 3D** : Effets de profondeur
- **Backdrop-filter** : Effets de flou
- **Keyframes** : Animations personnalisées

## 📱 Responsive Design

### **Breakpoints**
- **Desktop** : ≥1024px - Layout complet
- **Tablet** : 768px-1023px - Adaptation des grilles
- **Mobile** : ≤767px - Layout vertical

### **Adaptations**
- Grilles flexibles avec `auto-fit`
- Navigation mobile avec menu hamburger
- Images et cartes adaptatives
- Espacement proportionnel

## 🌙 Mode Sombre

### **Fonctionnalités**
- **Toggle automatique** avec icône dédiée
- **Persistance** des préférences utilisateur
- **Transitions fluides** entre thèmes
- **Variables CSS** pour la cohérence

### **Implémentation**
```typescript
toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
```

## 🚀 Installation et Démarrage

### **Prérequis**
- Node.js 18+ 
- npm 9+ ou yarn 1.22+
- Angular CLI 19+

### **Installation**
```bash
# Cloner le repository
git clone https://github.com/votre-username/babyannr.git
cd babyannr

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Build de production
npm run build
```

### **Scripts Disponibles**
```json
{
  "start": "ng serve",
  "build": "ng build",
  "build:prod": "ng build --configuration production",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
}
```

## 🔧 Configuration

### **Variables CSS Personnalisées**
```css
:root {
  --primary-500: #f97316;
  --secondary-500: #3b82f6;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
}
```

### **Configuration Angular**
- **Standalone Components** activés
- **Strict Mode** TypeScript
- **ES2022** target
- **Optimization** activée en production

## 📊 Performance

### **Optimisations**
- **Lazy Loading** des modules
- **OnPush Change Detection** Strategy
- **TrackBy Functions** pour les listes
- **Unsubscribe** automatique des observables
- **Bundle Analysis** avec webpack-bundle-analyzer

### **Métriques**
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🧪 Tests

### **Tests Unitaires**
```bash
# Lancer tous les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

### **Tests E2E**
```bash
# Lancer les tests end-to-end
npm run e2e

# Tests avec interface graphique
npm run e2e:gui
```

## 📦 Déploiement

### **Build de Production**
```bash
# Build optimisé
npm run build:prod

# Analyse du bundle
npm run analyze
```

### **Plateformes Supportées**
- **Vercel** - Déploiement automatique
- **Netlify** - CI/CD intégré
- **Firebase Hosting** - Google Cloud
- **GitHub Pages** - Hébergement gratuit

## 🤝 Contribution

### **Guidelines**
1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### **Standards de Code**
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages
- **TypeScript strict** pour la sécurité des types

## 📝 Changelog

### **Version 1.0.0** (2024-01-XX)
- ✨ Initial release
- 🎨 Design moderne et responsive
- 🌙 Mode sombre/clair
- 🛍️ Système de produits complet
- 💖 Gestion des favoris
- 🎭 Animations de scroll
- 📱 Support mobile complet

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Ahmed** - *Développement initial* - [@ahmed-dev](https://github.com/ahmed-dev)

## 🙏 Remerciements

- **Angular Team** pour le framework exceptionnel
- **Communauté Angular** pour le support et les ressources
- **Designers** pour l'inspiration visuelle
- **Testeurs** pour le feedback et les suggestions

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/votre-username/babyannr/issues)
- **Discussions** : [GitHub Discussions](https://github.com/votre-username/babyannr/discussions)
- **Email** : support@babyannr.com

---

<div align="center">
  <p>⭐ Si ce projet vous plaît, n'oubliez pas de le star sur GitHub !</p>
  <p>🚀 Construit avec ❤️ et Angular 19</p>
</div>
# boutique-bebe-anr
