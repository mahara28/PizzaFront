import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  jwtToken:any
  userInfo:any
  dropdownOpen = false;

  cartItemCount: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(private router: Router,private panierService: PanierService) {}
  ngOnInit(): void {
    this.jwtToken = localStorage.getItem("jwtToken");
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo")!);

    // S'abonner aux changements du panier
    this.cartSubscription = this.panierService.cart$.subscribe(items => {
      this.cartItemCount = this.panierService.getTotalItems();
    });

    // Initialiser avec la valeur actuelle
    this.cartItemCount = this.panierService.getTotalItems();
  }
  
  ngOnDestroy(): void {
    // Nettoyer la souscription
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  showLoginPopup = false;

  openLoginPopup() {
    this.showLoginPopup = true;
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  }

  closeLoginPopup() {
    this.showLoginPopup = false;
    document.body.style.overflow = 'auto'; // Rétablir le défilement
  }

  toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

logout() {
  sessionStorage.clear();
  // rediriger vers la page de login
  this.router.navigate(['/home']);
}
}
