import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
constructor(private router: Router) {}

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
