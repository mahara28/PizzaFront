import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{
  constructor(private  router: Router)
  { 

  }
  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear()
  }

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
