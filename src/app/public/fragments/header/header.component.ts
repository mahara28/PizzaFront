import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  jwtToken:any
  userInfo:any
  dropdownOpen = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.jwtToken = localStorage.getItem("jwtToken");
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo")!);
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
