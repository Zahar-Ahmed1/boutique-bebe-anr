import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {FavoriteProduct, FavoritesService} from '../../services/favorites.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    ville:'',
    telephone:'',
    message: ''
  };

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  // Coordonnées GPS pour la carte
  mapUrl: SafeResourceUrl;
  mapCoordinates = {
    latitude: 33.557209,
    longitude: -7.574079,
    address: 'Casablanca, Maroc'
  };





  constructor(private favoritesService: FavoritesService, private sanitizer: DomSanitizer) {
    const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.3190545074175!2d-7.574079!3d33.557209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd0c56b7d8e5%3A0x123456789abcdef!2sCasablanca%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1727160000000!5m2!1sfr!2sma";
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      title: 'Email',
      content: 'contact@babyannr.com',
      link: 'mailto:contact@babyannr.com'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      content: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      icon: '📍',
      title: 'Adresse',
      content: 'Casablanca, Maroc'
    },
    {
      icon: '🕒',
      title: 'Horaires',
      content: 'Lun-Ven: 9h-18h, Sam: 10h-17h'
    }
  ];
  async onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting.set(true);

      // Récupérer les produits favoris sauvegardés
      const products: FavoriteProduct[] = this.favoritesService.getSavedOrder();

      let message = `🍼 Nouvelle commande AnnrStore\n\n`;
      message += `👤 Nom: ${this.contactForm.name}\n`;
      message += `📧 Email: ${this.contactForm.email}\n`;
      message += `📍 Ville: ${this.contactForm.ville}\n`;
      message += `📞 Téléphone: ${this.contactForm.telephone}\n\n`;
      message += `📝 Message: ${this.contactForm.message}\n\n`;

      if (products.length > 0) {
        message += `🛍️ Produits sélectionnés:\n`;
        products.forEach((p, i) => {
          message += `   ${i + 1}. ${p.name} - ${p.price}€\n`;
        });
      } else {
        message += `🛍️ Aucun produit favori sélectionné.\n`;
      }

      const whatsappNumber = "212706296134"; // Ton numéro WhatsApp
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // Ouvrir WhatsApp avec le message pré-rempli
      window.open(url, "_blank");

      this.isSubmitted.set(true);
      this.isSubmitting.set(false);

      // Réinitialiser le formulaire
      this.contactForm = {
        name: '',
        email: '',
        ville: '',
        telephone: '',
        message: ''
      };

      setTimeout(() => {
        this.isSubmitted.set(false);
      }, 5000);
    }
  }



  private isFormValid(): boolean {
    return this.contactForm.name.trim() !== '' &&
           this.contactForm.email.trim() !== '' &&
           this.contactForm.ville.trim() !== '' &&
           this.contactForm.telephone.trim() !== ''&&
           this.contactForm.message.trim() !== '' &&
           this.isValidEmail(this.contactForm.email);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getMapUrl(): SafeResourceUrl {
    return this.mapUrl;
  }

  getGoogleMapsLink(): string {
    return `https://www.google.com/maps/search/?api=1&query=${this.mapCoordinates.latitude},${this.mapCoordinates.longitude}`;
  }
}
