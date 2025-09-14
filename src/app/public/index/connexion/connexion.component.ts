import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  @Output() close = new EventEmitter<void>();
  
  // Fermer le popup avec la touche Échap
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closePopup();
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // Ici, vous ajouterez la logique de soumission du formulaire
    console.log('Formulaire soumis');
    // this.closePopup(); // Décommentez pour fermer après soumission
  }
}
