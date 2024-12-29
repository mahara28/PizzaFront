import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  email:any
  tel:any
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void {
    this.email = "arijkahlaoui10@gmail.com"
    this.tel = "+216 23 145 687"
  }

}
