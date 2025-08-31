import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail = '';
  isSubscribed = false;

  subscribeNewsletter() {
    if (this.newsletterEmail.trim() && this.isValidEmail(this.newsletterEmail)) {
      // Ici vous pouvez implémenter la logique d'API pour s'abonner
      console.log('Email abonné:', this.newsletterEmail);
      this.isSubscribed = true;
      this.newsletterEmail = '';
      
      // Réinitialiser le message après 3 secondes
      setTimeout(() => {
        this.isSubscribed = false;
      }, 3000);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
