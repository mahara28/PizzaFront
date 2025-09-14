import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showLoginPopup = false;

  openLoginPopup() {
    this.showLoginPopup = true;
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  }

  closeLoginPopup() {
    this.showLoginPopup = false;
    document.body.style.overflow = 'auto'; // Rétablir le défilement
  }

}
