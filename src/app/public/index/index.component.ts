<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 3f598a6027486652be28961a07f1beac58f92a95

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
<<<<<<< HEAD
export class IndexComponent {
constructor(private router: Router) {}
=======
export class IndexComponent implements OnInit{
  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear()
  }
>>>>>>> 3f598a6027486652be28961a07f1beac58f92a95

  choisirOption(type: 'livraison' | 'importation') {
    if (type === 'livraison') {
      // 🔥 Redirection vers page livraison
      this.router.navigate(['/commande/livraison']);
    } else {
      // 🔥 Redirection vers page à emporter
      this.router.navigate(['/commande/importation']);
    }
  }
  Livraison()
  {
   this.router.navigate(['/livraison']);
  }
}
