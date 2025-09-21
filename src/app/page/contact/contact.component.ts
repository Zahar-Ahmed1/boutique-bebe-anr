import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

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
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  // Coordonnées GPS pour la carte
  mapCoordinates = {
    latitude: 33.557209,
    longitude: -7.574079,
    address: 'Casablanca, Maroc'
  };

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
      
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Formulaire envoyé:', this.contactForm);
      this.isSubmitted.set(true);
      this.isSubmitting.set(false);
      
      // Réinitialiser le formulaire
      this.contactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      // Réinitialiser le message après 5 secondes
      setTimeout(() => {
        this.isSubmitted.set(false);
      }, 5000);
    }
  }

  private isFormValid(): boolean {
    return this.contactForm.name.trim() !== '' &&
           this.contactForm.email.trim() !== '' &&
           this.contactForm.subject.trim() !== '' &&
           this.contactForm.message.trim() !== '' &&
           this.isValidEmail(this.contactForm.email);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getMapUrl(): string {
    // URL Google Maps embed avec les coordonnées exactes
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.1234567890!2d${this.mapCoordinates.longitude}!3d${this.mapCoordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMzJzI1LjkiUyA3wrAzNCcyNi43Ilc!5e0!3m2!1sfr!2sma!4v1234567890123!5m2!1sfr!2sma`;
  }

  getGoogleMapsLink(): string {
    // Lien direct vers Google Maps
    return `https://www.google.com/maps?q=${this.mapCoordinates.latitude},${this.mapCoordinates.longitude}`;
  }
}
