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
      content: '123 Rue de la Mode, 75001 Paris, France'
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
}
